import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, MapPin, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DrivingDisplay } from '@/components/DrivingDisplay';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useSpeedLimit } from '@/hooks/useSpeedLimit';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { calculateInstantFine, InstantFineResult } from '@/lib/calculateInstantFine';
import { useLanguage } from '@/contexts/LanguageContext';
import { RoadType, ROAD_TYPES, SPEED_LIMITS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ViewState = 'permission' | 'driving' | 'error' | 'unsupported';

export default function DrivingMode() {
  const { t, language } = useLanguage();
  const [viewState, setViewState] = useState<ViewState>('permission');
  const [showRoadTypeSelector, setShowRoadTypeSelector] = useState(false);
  const [fineResult, setFineResult] = useState<InstantFineResult | null>(null);

  // Hooks
  const geo = useGeolocation();
  const speedLimit = useSpeedLimit(geo.latitude, geo.longitude);
  const voice = useVoiceAnnouncer({
    language: language === 'de' ? 'de-DE' : 'en-US',
    cooldownMs: 8000,
  });

  // Determine view state based on geolocation status
  useEffect(() => {
    if (geo.permissionStatus === 'unavailable') {
      setViewState('unsupported');
    } else if (geo.permissionStatus === 'denied') {
      setViewState('error');
    } else if (geo.isTracking && geo.latitude !== null) {
      setViewState('driving');
    } else if (geo.error) {
      setViewState('error');
    }
  }, [geo.permissionStatus, geo.isTracking, geo.latitude, geo.error]);

  // Destructure voice functions to use in dependencies
  const { announceFine, setLanguage: setVoiceLanguage } = voice;

  // Calculate fine when speed or limit changes
  useEffect(() => {
    if (geo.speed === null || speedLimit.speedLimit === null) {
      setFineResult(null);
      return;
    }

    const result = calculateInstantFine(
      geo.speed,
      speedLimit.speedLimit,
      speedLimit.roadType
    );

    setFineResult(result);

    // Announce if speeding
    if (result.isOverLimit) {
      announceFine(result, language);
    }
  }, [geo.speed, speedLimit.speedLimit, speedLimit.roadType, language, announceFine]);

  // Update voice language when app language changes
  useEffect(() => {
    setVoiceLanguage(language === 'de' ? 'de-DE' : 'en-US');
  }, [language, setVoiceLanguage]);

  // Start tracking handler
  const handleStartTracking = async () => {
    const granted = await geo.requestPermission();
    if (granted) {
      geo.startTracking();
    }
  };

  // Road type selector
  const roadTypes: { type: RoadType; label: string; icon: string }[] = [
    { type: ROAD_TYPES.URBAN, label: t.urbanRoads || 'Urban', icon: '🏙️' },
    { type: ROAD_TYPES.RURAL, label: t.ruralRoads || 'Rural', icon: '🛣️' },
    { type: ROAD_TYPES.HIGHWAY, label: t.highways || 'Highway', icon: '🛤️' },
  ];

  // Permission Request View
  if (viewState === 'permission' && !geo.isTracking) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{t.drivingModeTitle || 'Driving Mode'}</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="text-6xl">🚗</div>
          <h2 className="text-2xl font-bold text-center">
            {t.startDrivingMode || 'Start Driving Mode'}
          </h2>
          <p className="text-center text-muted-foreground max-w-sm">
            {t.drivingModeDescription ||
              'Track your speed in real-time and see instant fine calculations based on German traffic laws.'}
          </p>

          <div className="space-y-4 w-full max-w-sm">
            <Button
              onClick={handleStartTracking}
              size="lg"
              className="w-full text-lg py-6"
            >
              <MapPin className="mr-2 h-5 w-5" />
              {t.enableLocation || 'Enable Location'}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              {t.locationPrivacy ||
                'Your location data stays on your device and is not sent to any server.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Unsupported Browser View
  if (viewState === 'unsupported') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="flex items-center justify-between p-4 border-b">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{t.drivingModeTitle || 'Driving Mode'}</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="text-6xl">😕</div>
          <h2 className="text-2xl font-bold text-center">
            {t.gpsNotSupported || 'GPS Not Supported'}
          </h2>
          <p className="text-center text-muted-foreground max-w-sm">
            {t.gpsNotSupportedDescription ||
              'Your browser does not support GPS location. Please try a different browser or use the manual calculator.'}
          </p>
          <Link to="/">
            <Button>{t.backToCalculator || 'Back to Calculator'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Error View (Permission Denied)
  if (viewState === 'error') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="flex items-center justify-between p-4 border-b">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{t.drivingModeTitle || 'Driving Mode'}</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="text-6xl">📍</div>
          <h2 className="text-2xl font-bold text-center">
            {t.locationRequired || 'Location Required'}
          </h2>
          <p className="text-center text-muted-foreground max-w-sm">
            {geo.error?.message ||
              t.locationRequiredDescription ||
              'Please enable location access in your browser settings to use driving mode.'}
          </p>
          <div className="space-y-2">
            <Button onClick={handleStartTracking}>
              {t.tryAgain || 'Try Again'}
            </Button>
            <Link to="/" className="block">
              <Button variant="outline" className="w-full">
                {t.useManualCalculator || 'Use Manual Calculator'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Driving View
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <Link to="/">
          <Button variant="ghost" size="icon" onClick={() => geo.stopTracking()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {/* Road Type Selector Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowRoadTypeSelector(!showRoadTypeSelector)}
            className={cn(speedLimit.manualOverride && 'text-primary')}
          >
            <Settings2 className="h-5 w-5" />
          </Button>

          {/* Voice Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => voice.toggleMute()}
            className={cn(!voice.isMuted && 'text-primary')}
          >
            {voice.isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Road Type Selector (collapsible) */}
      {showRoadTypeSelector && (
        <div className="p-4 border-b bg-muted/50">
          <p className="text-sm text-muted-foreground mb-3 text-center">
            {t.selectRoadType || 'Select road type manually'}
          </p>
          <div className="flex gap-2 justify-center">
            {roadTypes.map(({ type, label, icon }) => (
              <Button
                key={type}
                variant={speedLimit.roadType === type && speedLimit.manualOverride ? 'default' : 'outline'}
                size="sm"
                onClick={() => speedLimit.setManualRoadType(type)}
                className="flex-1 max-w-[120px]"
              >
                <span className="mr-1">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>
          {speedLimit.manualOverride && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => speedLimit.clearManualOverride()}
              className="w-full mt-2 text-xs"
            >
              {t.useAutoDetection || 'Use auto-detection'}
            </Button>
          )}
        </div>
      )}

      {/* Main Display */}
      <main className="flex-1">
        <DrivingDisplay
          currentSpeed={geo.speed}
          speedLimit={speedLimit.speedLimit}
          fineResult={fineResult}
          roadType={speedLimit.roadType}
          roadName={speedLimit.roadName}
          isLoading={speedLimit.isLoading}
          accuracy={geo.accuracy}
        />
      </main>

      {/* Footer with voice status */}
      {voice.isSpeaking && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg">
          <Volume2 className="h-4 w-4 animate-pulse" />
          {t.speaking || 'Speaking...'}
        </div>
      )}
    </div>
  );
}
