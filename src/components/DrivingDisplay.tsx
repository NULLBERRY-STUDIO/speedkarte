import { useLanguage } from '@/contexts/LanguageContext';
import { InstantFineResult, getSeverityLevel } from '@/lib/calculateInstantFine';
import { RoadType, ROAD_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface DrivingDisplayProps {
  currentSpeed: number | null;
  speedLimit: number | null;
  fineResult: InstantFineResult | null;
  roadType: RoadType;
  roadName: string | null;
  isLoading: boolean;
  accuracy: number | null;
}

export function DrivingDisplay({
  currentSpeed,
  speedLimit,
  fineResult,
  roadType,
  roadName,
  isLoading,
  accuracy,
}: DrivingDisplayProps) {
  const { t } = useLanguage();

  const overSpeed = fineResult?.overSpeed ?? 0;
  const severity = getSeverityLevel(overSpeed);

  // Color classes based on severity
  const severityColors = {
    safe: 'text-green-500 dark:text-green-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    danger: 'text-orange-500 dark:text-orange-400',
    severe: 'text-red-500 dark:text-red-400',
  };

  const severityBgColors = {
    safe: 'bg-green-500/10 border-green-500/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
    danger: 'bg-orange-500/10 border-orange-500/30',
    severe: 'bg-red-500/10 border-red-500/30',
  };

  const roadTypeLabels: Record<RoadType, string> = {
    [ROAD_TYPES.URBAN]: t('urbanRoads'),
    [ROAD_TYPES.RURAL]: t('ruralRoads'),
    [ROAD_TYPES.HIGHWAY]: t('highways'),
  };

  const roadTypeIcons: Record<RoadType, string> = {
    [ROAD_TYPES.URBAN]: '🏙️',
    [ROAD_TYPES.RURAL]: '🛣️',
    [ROAD_TYPES.HIGHWAY]: '🛤️',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 space-y-6">
      {/* Current Speed - HUGE display */}
      <div className="text-center">
        <div
          className={cn(
            'text-8xl sm:text-9xl font-bold tabular-nums transition-colors duration-300',
            severityColors[severity]
          )}
        >
          {currentSpeed !== null ? currentSpeed : '--'}
        </div>
        <div className="text-2xl text-muted-foreground">km/h</div>
      </div>

      {/* Speed Limit */}
      <div className="flex items-center gap-4 text-xl">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{t('limit') || 'Limit'}:</span>
          <span className="font-semibold text-2xl">
            {speedLimit !== null ? `${speedLimit} km/h` : t('noLimit') || 'No limit'}
          </span>
        </div>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Over Speed and Fine Display */}
      {fineResult && fineResult.isOverLimit && (
        <div
          className={cn(
            'w-full max-w-md p-6 rounded-2xl border-2 transition-all duration-300',
            severityBgColors[severity]
          )}
        >
          {/* Over Speed Amount */}
          <div className="text-center mb-4">
            <div className={cn('text-5xl sm:text-6xl font-bold', severityColors[severity])}>
              +{fineResult.overSpeed}
            </div>
            <div className="text-lg text-muted-foreground">
              km/h {t('overLimit') || 'over limit'}
            </div>
          </div>

          {/* Fine */}
          <div className="text-center space-y-3">
            <div className="text-4xl sm:text-5xl font-bold">
              {fineResult.fine} €
            </div>

            {/* Points */}
            {fineResult.points > 0 && (
              <div className="text-xl flex items-center justify-center gap-2">
                <span className="text-2xl">📍</span>
                <span>
                  {fineResult.points} {fineResult.points === 1 ? t('point') || 'Point' : t('points') || 'Points'}
                </span>
              </div>
            )}

            {/* Driving Ban */}
            {fineResult.banMonths > 0 && (
              <div className="text-xl flex items-center justify-center gap-2 text-red-500 dark:text-red-400">
                <span className="text-2xl">🚫</span>
                <span>
                  {fineResult.banMonths} {fineResult.banMonths === 1 ? t('month') || 'Month' : t('months') || 'Months'} {t('drivingBan') || 'driving ban'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Safe Speed Message */}
      {(!fineResult || !fineResult.isOverLimit) && currentSpeed !== null && (
        <div
          className={cn(
            'w-full max-w-md p-6 rounded-2xl border-2 text-center',
            severityBgColors.safe
          )}
        >
          <div className="text-3xl mb-2">✓</div>
          <div className="text-xl font-medium text-green-600 dark:text-green-400">
            {t('speedOk') || 'Speed is fine'}
          </div>
        </div>
      )}

      {/* Waiting for GPS */}
      {currentSpeed === null && (
        <div className="w-full max-w-md p-6 rounded-2xl border-2 border-muted bg-muted/50 text-center">
          <div className="text-3xl mb-2 animate-pulse">📡</div>
          <div className="text-xl text-muted-foreground">
            {t('waitingForGPS') || 'Waiting for GPS signal...'}
          </div>
        </div>
      )}

      {/* Road Info Footer */}
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <div className="flex items-center gap-2 text-lg">
          <span>{roadTypeIcons[roadType]}</span>
          <span>{roadTypeLabels[roadType]}</span>
        </div>
        {roadName && (
          <div className="text-sm opacity-75">{roadName}</div>
        )}
        {accuracy !== null && (
          <div className="text-xs opacity-50">
            GPS ±{Math.round(accuracy)}m
          </div>
        )}
      </div>
    </div>
  );
}
