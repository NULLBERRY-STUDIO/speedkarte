
import { PENALTIES, ROAD_TYPES, RoadType, FREQUENCY_MULTIPLIER, FrequencyType, LICENSE_SUSPENSION_THRESHOLD, SPEED_LIMITS } from './constants';

export interface SpeedingData {
  urban: number;
  rural: number;
  highway: number;
  frequency: FrequencyType;
}

export interface PenaltyResult {
  totalPoints: number;
  totalFine: number;
  banMonths: number;
  licenseSuspensionRisk: number; // 0-1 scale
  monthsUntilSuspension: number | null;
  detailedPenalties: {
    roadType: RoadType;
    overSpeedAmount: number;
    points: number;
    fine: number;
    banMonths: number;
  }[];
}

// Helper function to find the applicable penalty for a specific road type and speed
const findPenalty = (roadType: RoadType, actualSpeed: number) => {
  const speedLimit = SPEED_LIMITS[roadType];
  const overSpeed = Math.max(0, actualSpeed - speedLimit);
  
  // No penalty if not speeding
  if (overSpeed <= 0) {
    return {
      overSpeedAmount: 0,
      points: 0,
      fine: 0,
      banMonths: 0
    };
  }
  
  // Find the applicable penalty
  const penaltyTiers = PENALTIES[roadType];
  const applicablePenalty = penaltyTiers.find(
    tier => overSpeed >= tier.minOverSpeed && overSpeed <= tier.maxOverSpeed
  ) || penaltyTiers[penaltyTiers.length - 1]; // Use the highest tier if over all defined ranges
  
  return {
    overSpeedAmount: overSpeed,
    points: applicablePenalty.points,
    fine: applicablePenalty.fine,
    banMonths: applicablePenalty.banMonths
  };
};

// Calculate penalties based on speeding data
export const calculatePenalty = (data: SpeedingData): PenaltyResult => {
  const frequencyMultiplier = FREQUENCY_MULTIPLIER[data.frequency];
  
  // Calculate penalties for each road type
  const urbanPenalty = findPenalty(ROAD_TYPES.URBAN, data.urban);
  const ruralPenalty = findPenalty(ROAD_TYPES.RURAL, data.rural);
  const highwayPenalty = findPenalty(ROAD_TYPES.HIGHWAY, data.highway);
  
  // Calculate totals
  const detailedPenalties = [
    { roadType: ROAD_TYPES.URBAN, ...urbanPenalty },
    { roadType: ROAD_TYPES.RURAL, ...ruralPenalty },
    { roadType: ROAD_TYPES.HIGHWAY, ...highwayPenalty }
  ];
  
  const totalPoints = detailedPenalties.reduce((sum, p) => sum + p.points, 0);
  const totalFine = detailedPenalties.reduce((sum, p) => sum + p.fine, 0);
  const banMonths = Math.max(...detailedPenalties.map(p => p.banMonths));
  
  // Apply frequency multiplier to get a realistic annual accumulation rate
  const annualPointRate = totalPoints * frequencyMultiplier;
  
  // Calculate suspension risk (0-1 scale)
  const licenseSuspensionRisk = Math.min(1, (totalPoints * frequencyMultiplier) / LICENSE_SUSPENSION_THRESHOLD);
  
  // Calculate months until license suspension (if speeding at current rate)
  let monthsUntilSuspension = null;
  if (annualPointRate > 0) {
    const pointsNeededForSuspension = LICENSE_SUSPENSION_THRESHOLD;
    const yearsUntilSuspension = pointsNeededForSuspension / annualPointRate;
    monthsUntilSuspension = Math.round(yearsUntilSuspension * 12);
  }
  
  return {
    totalPoints,
    totalFine,
    banMonths,
    licenseSuspensionRisk,
    monthsUntilSuspension,
    detailedPenalties
  };
};
