
export const ROAD_TYPES = {
  URBAN: 'urban',
  RURAL: 'rural',
  HIGHWAY: 'highway'
} as const;

export type RoadType = typeof ROAD_TYPES[keyof typeof ROAD_TYPES];

export const FREQUENCY = {
  RARELY: 'rarely',
  OCCASIONALLY: 'occasionally', 
  REGULARLY: 'regularly',
  OFTEN: 'often'
} as const;

export type FrequencyType = typeof FREQUENCY[keyof typeof FREQUENCY];

export const FREQUENCY_MULTIPLIER: Record<FrequencyType, number> = {
  [FREQUENCY.RARELY]: 0.25,
  [FREQUENCY.OCCASIONALLY]: 0.5,
  [FREQUENCY.REGULARLY]: 1,
  [FREQUENCY.OFTEN]: 2
};

// Speed limits in Germany (in km/h)
export const SPEED_LIMITS: Record<RoadType, number> = {
  [ROAD_TYPES.URBAN]: 50,
  [ROAD_TYPES.RURAL]: 100,
  [ROAD_TYPES.HIGHWAY]: 130, // Not a legal limit but a recommendation for highways
};

// Min/Max values for the sliders (km/h)
export const SLIDER_RANGES: Record<RoadType, { min: number; max: number }> = {
  [ROAD_TYPES.URBAN]: { min: 0, max: 100 },
  [ROAD_TYPES.RURAL]: { min: 0, max: 160 },
  [ROAD_TYPES.HIGHWAY]: { min: 0, max: 220 },
};

// German traffic law data for speeding penalties
export interface PenaltyItem {
  minOverSpeed: number;
  maxOverSpeed: number;
  points: number;
  fine: number;
  banMonths: number;
}

// Penalty data based on the German traffic laws
export const PENALTIES: Record<RoadType, PenaltyItem[]> = {
  [ROAD_TYPES.URBAN]: [
    { minOverSpeed: 0, maxOverSpeed: 10, points: 0, fine: 30, banMonths: 0 },
    { minOverSpeed: 11, maxOverSpeed: 15, points: 1, fine: 50, banMonths: 0 },
    { minOverSpeed: 16, maxOverSpeed: 20, points: 1, fine: 70, banMonths: 0 },
    { minOverSpeed: 21, maxOverSpeed: 25, points: 1, fine: 115, banMonths: 0 },
    { minOverSpeed: 26, maxOverSpeed: 30, points: 2, fine: 180, banMonths: 1 },
    { minOverSpeed: 31, maxOverSpeed: 40, points: 2, fine: 260, banMonths: 1 },
    { minOverSpeed: 41, maxOverSpeed: 50, points: 2, fine: 400, banMonths: 1 },
    { minOverSpeed: 51, maxOverSpeed: 60, points: 2, fine: 560, banMonths: 2 },
    { minOverSpeed: 61, maxOverSpeed: 70, points: 2, fine: 700, banMonths: 3 },
    { minOverSpeed: 71, maxOverSpeed: Infinity, points: 2, fine: 800, banMonths: 3 },
  ],
  [ROAD_TYPES.RURAL]: [
    { minOverSpeed: 0, maxOverSpeed: 10, points: 0, fine: 20, banMonths: 0 },
    { minOverSpeed: 11, maxOverSpeed: 15, points: 1, fine: 40, banMonths: 0 },
    { minOverSpeed: 16, maxOverSpeed: 20, points: 1, fine: 60, banMonths: 0 },
    { minOverSpeed: 21, maxOverSpeed: 25, points: 1, fine: 100, banMonths: 0 },
    { minOverSpeed: 26, maxOverSpeed: 30, points: 1, fine: 150, banMonths: 0 },
    { minOverSpeed: 31, maxOverSpeed: 40, points: 1, fine: 200, banMonths: 1 },
    { minOverSpeed: 41, maxOverSpeed: 50, points: 2, fine: 320, banMonths: 1 },
    { minOverSpeed: 51, maxOverSpeed: 60, points: 2, fine: 480, banMonths: 1 },
    { minOverSpeed: 61, maxOverSpeed: 70, points: 2, fine: 600, banMonths: 2 },
    { minOverSpeed: 71, maxOverSpeed: Infinity, points: 2, fine: 700, banMonths: 3 },
  ],
  [ROAD_TYPES.HIGHWAY]: [
    { minOverSpeed: 0, maxOverSpeed: 10, points: 0, fine: 20, banMonths: 0 },
    { minOverSpeed: 11, maxOverSpeed: 15, points: 1, fine: 40, banMonths: 0 },
    { minOverSpeed: 16, maxOverSpeed: 20, points: 1, fine: 60, banMonths: 0 },
    { minOverSpeed: 21, maxOverSpeed: 25, points: 1, fine: 100, banMonths: 0 },
    { minOverSpeed: 26, maxOverSpeed: 30, points: 1, fine: 150, banMonths: 0 },
    { minOverSpeed: 31, maxOverSpeed: 40, points: 1, fine: 200, banMonths: 0 },
    { minOverSpeed: 41, maxOverSpeed: 50, points: 1, fine: 320, banMonths: 1 },
    { minOverSpeed: 51, maxOverSpeed: 60, points: 2, fine: 480, banMonths: 1 },
    { minOverSpeed: 61, maxOverSpeed: 70, points: 2, fine: 600, banMonths: 2 },
    { minOverSpeed: 71, maxOverSpeed: Infinity, points: 2, fine: 700, banMonths: 3 },
  ],
};

// German traffic law license suspension threshold
export const LICENSE_SUSPENSION_THRESHOLD = 8; // Points
export const POINT_EXPIRY_YEARS = 2.5; // Points expire after 2.5 years

// Educational information about the German point system
export const EDUCATIONAL_INFO = [
  {
    title: "Point System",
    content: "In Germany, traffic violations are tracked using a point system. Once you accumulate 8 points, your license will be suspended.",
  },
  {
    title: "Point Expiry",
    content: "Points typically expire after 2.5 years if no new violations occur during that period.",
  },
  {
    title: "License Revocation",
    content: "If your license is suspended, you'll need to attend a Medical-Psychological Assessment (MPU) to get it back.",
  },
  {
    title: "Voluntary Seminars",
    content: "You can voluntarily attend driving seminars to reduce your points by 1 (if you have 1-5 points).",
  },
  {
    title: "New Drivers",
    content: "Drivers in their probationary period (first 2 years) face stricter penalties for traffic violations.",
  },
];
