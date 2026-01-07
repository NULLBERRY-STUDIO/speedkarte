import { PENALTIES, RoadType } from './constants';

export interface InstantFineResult {
  overSpeed: number;
  fine: number;
  points: number;
  banMonths: number;
  isOverLimit: boolean;
}

/**
 * Calculate the instant fine for a single speed reading
 * Used for real-time driving mode
 */
export function calculateInstantFine(
  currentSpeed: number,
  speedLimit: number,
  roadType: RoadType
): InstantFineResult {
  const overSpeed = Math.max(0, Math.round(currentSpeed - speedLimit));

  // Not speeding
  if (overSpeed <= 0) {
    return {
      overSpeed: 0,
      fine: 0,
      points: 0,
      banMonths: 0,
      isOverLimit: false,
    };
  }

  // Find the applicable penalty tier
  const penaltyTiers = PENALTIES[roadType];
  const applicablePenalty = penaltyTiers.find(
    tier => overSpeed >= tier.minOverSpeed && overSpeed <= tier.maxOverSpeed
  ) || penaltyTiers[penaltyTiers.length - 1];

  return {
    overSpeed,
    fine: applicablePenalty.fine,
    points: applicablePenalty.points,
    banMonths: applicablePenalty.banMonths,
    isOverLimit: true,
  };
}

/**
 * Get the severity level based on how much over the limit
 * Used for color coding the UI
 */
export function getSeverityLevel(overSpeed: number): 'safe' | 'warning' | 'danger' | 'severe' {
  if (overSpeed <= 0) return 'safe';
  if (overSpeed <= 10) return 'warning';
  if (overSpeed <= 20) return 'danger';
  return 'severe';
}

/**
 * Format the fine result for voice announcement
 */
export function formatFineForVoice(
  result: InstantFineResult,
  language: string = 'de'
): string {
  const { overSpeed, fine, points, banMonths, isOverLimit } = result;

  if (!isOverLimit) {
    return language === 'de'
      ? 'Geschwindigkeit in Ordnung'
      : 'Speed is fine';
  }

  if (language === 'de') {
    let message = `${overSpeed} km/h zu schnell`;

    if (fine > 0) {
      message += ` - ${fine} Euro`;
    }

    if (points > 0) {
      message += points === 1 ? ' und 1 Punkt' : ` und ${points} Punkte`;
    }

    if (banMonths > 0) {
      message += banMonths === 1
        ? ', 1 Monat Fahrverbot'
        : `, ${banMonths} Monate Fahrverbot`;
    }

    return message;
  }

  // English fallback
  let message = `${overSpeed} km/h over`;

  if (fine > 0) {
    message += ` - ${fine} Euro`;
  }

  if (points > 0) {
    message += points === 1 ? ' and 1 point' : ` and ${points} points`;
  }

  if (banMonths > 0) {
    message += banMonths === 1
      ? ', 1 month driving ban'
      : `, ${banMonths} months driving ban`;
  }

  return message;
}
