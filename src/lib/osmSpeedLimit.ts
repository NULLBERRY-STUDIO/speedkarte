import { RoadType, ROAD_TYPES } from './constants';

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

// Cache for speed limit queries
interface CacheEntry {
  speedLimit: number | null;
  roadType: RoadType;
  roadName: string | null;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION_MS = 10000; // 10 seconds

// OSM highway tag to road type mapping
const HIGHWAY_TO_ROAD_TYPE: Record<string, RoadType> = {
  // Highway types
  motorway: ROAD_TYPES.HIGHWAY,
  motorway_link: ROAD_TYPES.HIGHWAY,
  trunk: ROAD_TYPES.HIGHWAY,
  trunk_link: ROAD_TYPES.HIGHWAY,

  // Rural types
  primary: ROAD_TYPES.RURAL,
  primary_link: ROAD_TYPES.RURAL,
  secondary: ROAD_TYPES.RURAL,
  secondary_link: ROAD_TYPES.RURAL,

  // Urban types
  tertiary: ROAD_TYPES.URBAN,
  tertiary_link: ROAD_TYPES.URBAN,
  residential: ROAD_TYPES.URBAN,
  living_street: ROAD_TYPES.URBAN,
  unclassified: ROAD_TYPES.URBAN,
  service: ROAD_TYPES.URBAN,
};

// Default speed limits based on road type (German law)
const DEFAULT_SPEED_LIMITS: Record<RoadType, number> = {
  [ROAD_TYPES.URBAN]: 50,
  [ROAD_TYPES.RURAL]: 100,
  [ROAD_TYPES.HIGHWAY]: 130, // Advisory, not enforced
};

export interface SpeedLimitResult {
  speedLimit: number | null; // null means no limit (Autobahn)
  roadType: RoadType;
  roadName: string | null;
  isFromCache: boolean;
  hasExplicitLimit: boolean; // Whether OSM had an explicit maxspeed tag
}

/**
 * Parse German implicit speed limits from OSM
 * e.g., "DE:urban" -> 50, "DE:rural" -> 100
 */
function parseGermanMaxspeed(maxspeed: string): number | null {
  const germanImplicit: Record<string, number | null> = {
    'DE:urban': 50,
    'DE:rural': 100,
    'DE:motorway': null, // No limit
    'DE:living_street': 7, // Schrittgeschwindigkeit
    'DE:walk': 7,
    'DE:zone30': 30,
    'DE:zone:30': 30,
    none: null, // Explicitly no limit
  };

  if (maxspeed in germanImplicit) {
    return germanImplicit[maxspeed];
  }

  // Try to parse numeric value
  const numeric = parseInt(maxspeed, 10);
  if (!isNaN(numeric)) {
    return numeric;
  }

  return undefined as unknown as number | null; // Unknown format
}

/**
 * Generate a cache key from coordinates
 */
function getCacheKey(lat: number, lng: number): string {
  // Round to ~50m precision for caching
  const precision = 4;
  return `${lat.toFixed(precision)},${lng.toFixed(precision)}`;
}

/**
 * Calculate distance between two points using Haversine formula
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Fetch speed limit from OpenStreetMap Overpass API
 */
export async function fetchSpeedLimit(
  lat: number,
  lng: number
): Promise<SpeedLimitResult> {
  const cacheKey = getCacheKey(lat, lng);

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return {
      speedLimit: cached.speedLimit,
      roadType: cached.roadType,
      roadName: cached.roadName,
      isFromCache: true,
      hasExplicitLimit: cached.speedLimit !== null,
    };
  }

  // Build Overpass query to find nearest road with maxspeed
  const query = `
    [out:json][timeout:10];
    (
      way(around:30,${lat},${lng})[highway][maxspeed];
      way(around:30,${lat},${lng})[highway];
    );
    out body;
  `;

  try {
    const response = await fetch(OVERPASS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();

    // Find the most relevant road (prefer ones with maxspeed tag)
    const ways = data.elements || [];

    // Sort: roads with maxspeed first, then by highway importance
    const sortedWays = ways.sort((a: any, b: any) => {
      const aHasMaxspeed = a.tags?.maxspeed ? 1 : 0;
      const bHasMaxspeed = b.tags?.maxspeed ? 1 : 0;
      return bHasMaxspeed - aHasMaxspeed;
    });

    const bestWay = sortedWays[0];

    if (!bestWay) {
      // No road found - assume urban as safest default
      const result: SpeedLimitResult = {
        speedLimit: DEFAULT_SPEED_LIMITS[ROAD_TYPES.URBAN],
        roadType: ROAD_TYPES.URBAN,
        roadName: null,
        isFromCache: false,
        hasExplicitLimit: false,
      };
      cache.set(cacheKey, { ...result, timestamp: Date.now() });
      return result;
    }

    const tags = bestWay.tags || {};
    const highwayType = tags.highway;
    const roadType = HIGHWAY_TO_ROAD_TYPE[highwayType] || ROAD_TYPES.URBAN;
    const roadName = tags.name || null;

    let speedLimit: number | null;
    let hasExplicitLimit = false;

    if (tags.maxspeed) {
      hasExplicitLimit = true;
      speedLimit = parseGermanMaxspeed(tags.maxspeed);

      // If parsing failed, use default for road type
      if (speedLimit === undefined) {
        speedLimit = DEFAULT_SPEED_LIMITS[roadType];
        hasExplicitLimit = false;
      }
    } else {
      // No maxspeed tag - use default based on road type
      speedLimit = DEFAULT_SPEED_LIMITS[roadType];
    }

    const result: SpeedLimitResult = {
      speedLimit,
      roadType,
      roadName,
      isFromCache: false,
      hasExplicitLimit,
    };

    // Cache the result
    cache.set(cacheKey, { ...result, timestamp: Date.now() });

    return result;
  } catch (error) {
    console.error('Failed to fetch speed limit from OSM:', error);

    // Return cached value if available, even if stale
    if (cached) {
      return {
        speedLimit: cached.speedLimit,
        roadType: cached.roadType,
        roadName: cached.roadName,
        isFromCache: true,
        hasExplicitLimit: false,
      };
    }

    // Default fallback
    return {
      speedLimit: DEFAULT_SPEED_LIMITS[ROAD_TYPES.URBAN],
      roadType: ROAD_TYPES.URBAN,
      roadName: null,
      isFromCache: false,
      hasExplicitLimit: false,
    };
  }
}

/**
 * Clear the speed limit cache
 */
export function clearSpeedLimitCache(): void {
  cache.clear();
}
