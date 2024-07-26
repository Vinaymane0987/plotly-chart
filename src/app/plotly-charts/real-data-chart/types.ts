export interface Positions {
  backswingAI: number;
  address: number;
  finishAI: number;
  backswing: number;
  impact: number;
  impactAI: number;
  finish: number;
  addressAI: number;
}

export interface KPIComponents {
  maxPressure?: number;
  timeDifference?: number;
  maxPressureRatio?: number;
  baselinePressure?: number;
  leadFootPressure?: number;
  rhythm?: number;
  transitionTimestamp?: number;
}

export interface KPI {
  verticalTiming: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
  maxVertical: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
  transitionTiming: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
  backswing: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
  impact: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
  setup: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
  overall: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
  rhythm: {
    score: number;
    components: KPIComponents;
    hasError: boolean;
    timing: string | null;
    calculationError: string | null;
  };
}

export interface SensorData {
  r: number[];
  l: number[];
  t: number;
  cpr: {
    x: number;
    y: number;
  };
  cp: {
    x: number;
    y: number;
  };
  cpl: {
    x: number;
    y: number;
  };
}

export interface SwingData {
  positions: Positions;
  handedness: string;
  kpi: KPI;
  swingId: string;
  createdDate: number;
  recordedDate: number;
  studentId: string;
  dataMigrateVersion: number;
  isReassessmentSwing: boolean;
  fps: number;
  videoId: string;
  isChunkedSensorsData: boolean;
  name: string;
  videoDurationInMilliseconds: number;
  videoFramePositions: number[];
  sessionId: string;
  insoleSize: string;
  reassessmentKPI: string;
  isFavorite: boolean;
  cameraPosition: string;
  updatedDate: number;
  sensorsData: SensorData[];
  userId: string;
}

// Interface for the series data
export interface Series {
  name: number; // Represents the name (could be a number or string based on your context)
  value: number; // Represents the value associated with the series
}

// Interface for the chart data
export interface ISensorsChartData {
  name: string; // Represents the name of the data category (e.g., "Left" or "Right")
  series: Series[]; // An array of series data
}

// Example of the chart data array
export type ChartDataArray = ISensorsChartData[];
