import { useState, useEffect, useCallback, useRef } from 'react';
import { haversineDistance } from '@/lib/osmSpeedLimit';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  speed: number | null; // km/h
  accuracy: number | null;
  heading: number | null;
  timestamp: number | null;
  error: GeolocationError | null;
  isTracking: boolean;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unavailable';
}

export interface GeolocationError {
  code: number;
  message: string;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
  minDistanceForSpeedCalc?: number; // Minimum distance in meters for speed calculation
}

const DEFAULT_OPTIONS: UseGeolocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 1000,
  timeout: 10000,
  minDistanceForSpeedCalc: 5, // 5 meters
};

/**
 * Hook for tracking GPS location and speed
 * Calculates speed from position changes if device doesn't provide it
 */
export function useGeolocation(options: UseGeolocationOptions = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    speed: null,
    accuracy: null,
    heading: null,
    timestamp: null,
    error: null,
    isTracking: false,
    permissionStatus: 'prompt',
  });

  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<{
    lat: number;
    lng: number;
    timestamp: number;
  } | null>(null);

  // Check permission status
  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, permissionStatus: 'unavailable' }));
      return;
    }

    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(result => {
          setState(prev => ({
            ...prev,
            permissionStatus: result.state as 'prompt' | 'granted' | 'denied',
          }));

          result.addEventListener('change', () => {
            setState(prev => ({
              ...prev,
              permissionStatus: result.state as 'prompt' | 'granted' | 'denied',
            }));
          });
        })
        .catch(() => {
          // Permission API not supported, we'll find out when we try to use it
        });
    }
  }, []);

  /**
   * Calculate speed from position change (fallback when device doesn't provide speed)
   */
  const calculateSpeedFromPosition = useCallback(
    (lat: number, lng: number, timestamp: number): number | null => {
      const lastPos = lastPositionRef.current;

      if (!lastPos) {
        lastPositionRef.current = { lat, lng, timestamp };
        return null;
      }

      const distance = haversineDistance(lastPos.lat, lastPos.lng, lat, lng);
      const timeDelta = (timestamp - lastPos.timestamp) / 1000; // seconds

      // Update last position
      lastPositionRef.current = { lat, lng, timestamp };

      // Avoid division by zero and filter out noise
      if (timeDelta < 0.5 || distance < opts.minDistanceForSpeedCalc!) {
        return null;
      }

      // Calculate speed in km/h
      const speedMps = distance / timeDelta;
      const speedKmh = speedMps * 3.6;

      // Filter out unrealistic speeds (likely GPS jumps)
      if (speedKmh > 300) {
        return null;
      }

      return Math.round(speedKmh);
    },
    [opts.minDistanceForSpeedCalc]
  );

  /**
   * Start tracking location
   */
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: { code: 0, message: 'Geolocation is not supported' },
        permissionStatus: 'unavailable',
      }));
      return;
    }

    // Clear any existing watch
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    setState(prev => ({ ...prev, isTracking: true, error: null }));

    watchIdRef.current = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude, speed, accuracy, heading } = position.coords;
        const timestamp = position.timestamp;

        // Convert speed from m/s to km/h if available
        let speedKmh: number | null = null;

        if (speed !== null && speed >= 0) {
          speedKmh = Math.round(speed * 3.6);
        } else {
          // Calculate speed from position change
          speedKmh = calculateSpeedFromPosition(latitude, longitude, timestamp);
        }

        setState(prev => ({
          ...prev,
          latitude,
          longitude,
          speed: speedKmh,
          accuracy,
          heading,
          timestamp,
          error: null,
          permissionStatus: 'granted',
        }));
      },
      error => {
        let permissionStatus: GeolocationState['permissionStatus'] = 'prompt';

        if (error.code === 1) {
          permissionStatus = 'denied';
        }

        setState(prev => ({
          ...prev,
          error: { code: error.code, message: error.message },
          isTracking: false,
          permissionStatus,
        }));
      },
      {
        enableHighAccuracy: opts.enableHighAccuracy,
        maximumAge: opts.maximumAge,
        timeout: opts.timeout,
      }
    );
  }, [opts.enableHighAccuracy, opts.maximumAge, opts.timeout, calculateSpeedFromPosition]);

  /**
   * Stop tracking location
   */
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    lastPositionRef.current = null;

    setState(prev => ({
      ...prev,
      isTracking: false,
      speed: null,
    }));
  }, []);

  /**
   * Request permission (triggers browser prompt)
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      return false;
    }

    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        () => {
          setState(prev => ({ ...prev, permissionStatus: 'granted' }));
          resolve(true);
        },
        error => {
          if (error.code === 1) {
            setState(prev => ({ ...prev, permissionStatus: 'denied' }));
          }
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    ...state,
    startTracking,
    stopTracking,
    requestPermission,
  };
}
