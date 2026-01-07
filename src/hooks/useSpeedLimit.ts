import { useState, useEffect, useRef, useCallback } from 'react';
import {
  fetchSpeedLimit,
  SpeedLimitResult,
  haversineDistance,
} from '@/lib/osmSpeedLimit';
import { RoadType, ROAD_TYPES, SPEED_LIMITS } from '@/lib/constants';

export interface SpeedLimitState {
  speedLimit: number | null;
  roadType: RoadType;
  roadName: string | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  hasExplicitLimit: boolean;
  manualOverride: boolean;
}

interface UseSpeedLimitOptions {
  minDistanceForUpdate?: number; // Minimum distance in meters before fetching new data
  minTimeForUpdate?: number; // Minimum time in ms between API calls
}

const DEFAULT_OPTIONS: UseSpeedLimitOptions = {
  minDistanceForUpdate: 50, // 50 meters
  minTimeForUpdate: 5000, // 5 seconds
};

/**
 * Hook for fetching and managing speed limits based on location
 * Uses OpenStreetMap Overpass API with rate limiting and caching
 */
export function useSpeedLimit(
  latitude: number | null,
  longitude: number | null,
  options: UseSpeedLimitOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [state, setState] = useState<SpeedLimitState>({
    speedLimit: SPEED_LIMITS[ROAD_TYPES.URBAN],
    roadType: ROAD_TYPES.URBAN,
    roadName: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
    hasExplicitLimit: false,
    manualOverride: false,
  });

  const lastFetchRef = useRef<{
    lat: number;
    lng: number;
    timestamp: number;
  } | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Check if we should fetch new data based on distance and time
   */
  const shouldFetch = useCallback(
    (lat: number, lng: number): boolean => {
      // Don't fetch if manual override is active
      if (state.manualOverride) {
        return false;
      }

      const lastFetch = lastFetchRef.current;

      if (!lastFetch) {
        return true;
      }

      const distance = haversineDistance(lastFetch.lat, lastFetch.lng, lat, lng);
      const timeSinceLastFetch = Date.now() - lastFetch.timestamp;

      // Fetch if moved enough distance OR enough time has passed
      return (
        distance >= opts.minDistanceForUpdate! ||
        timeSinceLastFetch >= opts.minTimeForUpdate! * 2
      );
    },
    [opts.minDistanceForUpdate, opts.minTimeForUpdate, state.manualOverride]
  );

  /**
   * Fetch speed limit for current location
   */
  useEffect(() => {
    if (latitude === null || longitude === null) {
      return;
    }

    if (!shouldFetch(latitude, longitude)) {
      return;
    }

    // Rate limit API calls
    const lastFetch = lastFetchRef.current;
    if (lastFetch && Date.now() - lastFetch.timestamp < opts.minTimeForUpdate!) {
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await fetchSpeedLimit(latitude, longitude);

        // Only update if not aborted
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        lastFetchRef.current = {
          lat: latitude,
          lng: longitude,
          timestamp: Date.now(),
        };

        setState(prev => ({
          ...prev,
          speedLimit: result.speedLimit,
          roadType: result.roadType,
          roadName: result.roadName,
          isLoading: false,
          error: null,
          lastUpdated: Date.now(),
          hasExplicitLimit: result.hasExplicitLimit,
        }));
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch speed limit',
        }));
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [latitude, longitude, shouldFetch, opts.minTimeForUpdate]);

  /**
   * Manually set road type (overrides API)
   */
  const setManualRoadType = useCallback((roadType: RoadType) => {
    setState(prev => ({
      ...prev,
      roadType,
      speedLimit: SPEED_LIMITS[roadType],
      manualOverride: true,
      hasExplicitLimit: false,
      roadName: null,
    }));
  }, []);

  /**
   * Clear manual override and return to API-based limits
   */
  const clearManualOverride = useCallback(() => {
    setState(prev => ({
      ...prev,
      manualOverride: false,
    }));

    // Force a new fetch
    lastFetchRef.current = null;
  }, []);

  /**
   * Force refresh the speed limit
   */
  const refresh = useCallback(() => {
    lastFetchRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    setManualRoadType,
    clearManualOverride,
    refresh,
  };
}
