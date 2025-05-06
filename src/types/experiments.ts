
export type ExperimentStep = string;

export interface PhysicsExperimentData {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  content: string;
  steps: ExperimentStep[];
}

export type PhysicsExperiments = {
  [key: string]: PhysicsExperimentData;
}

export interface MetalIon {
  symbol: string;
  name: string;
  color: string;
  flameColor: string;
  description: string;
}

export interface CatalystOption {
  name: string;
  formula: string;
  effectiveness: number;
  color: string;
}

export interface Electrolyte {
  name: string;
  formula: string;
  efficiency: number;
  color: string;
}

// Chemistry Experiment Types
export interface ChemistryExperimentData {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  content: string;
  steps: ExperimentStep[];
  metalIons?: MetalIon[];
  catalystOptions?: CatalystOption[];
  electrolytes?: Electrolyte[];
}

export type ChemistryExperiments = {
  [key: string]: ChemistryExperimentData;
}

// Chemistry Lab Simulation Types
export interface Chemical {
  id: string;
  name: string;
  formula: string;
  type: 'acid' | 'base' | 'salt' | 'indicator' | 'solvent' | 'catalyst' | 'metal';
  color: string;
  concentration?: number;
  hazardLevel: 'low' | 'medium' | 'high';
  hazardLabel?: string;
  description: string;
  reactions?: Record<string, ReactionResult>;
}

export interface ReactionResult {
  productName?: string;
  productFormula?: string;
  colorChange?: string;
  precipitate?: boolean;
  gasProduction?: boolean;
  gasName?: string;
  temperatureChange?: number;
  phChange?: number;
  flameColor?: string;
}

export interface Glassware {
  id: string;
  type: 'beaker' | 'test-tube' | 'flask' | 'burette' | 'pipette';
  capacity: number;
  contents: ChemicalMixture[];
  position: { x: number; y: number };
}

export interface ChemicalMixture {
  chemicalId: string;
  volume: number;
  concentration: number;
}

export interface LabSimulationState {
  activeExperiment: string;
  mode: 'procedure' | 'explore';
  glassware: Glassware[];
  chemicals: Chemical[];
  temperature: number;
  heaterOn: boolean;
  timer: number;
  timerRunning: boolean;
  ph: number;
  observations: string[];
  procedureStep: number;
}

// Blood group types
export interface BloodGroup {
  name: string;
  hasAntigenA: boolean;
  hasAntigenB: boolean;
  isRhPositive: boolean;
  description: string;
}

export interface BloodTest {
  reagent: string;
  bloodType: string;
  result: boolean; // true = agglutination (clumping), false = no reaction
}

// Physics simulation types
export interface RefractionMedium {
  name: string;
  refractiveIndex: number;
  color: string;
}

export interface SurfaceType {
  name: string;
  frictionCoefficient: number;
  color: string;
}

export interface ForceDirection {
  x: number;
  y: number;
}

export interface PhysicalObject {
  name: string;
  mass: number;
  initialVelocity: number;
  color: string;
}

// Water Wave Interference types
export interface WaveSource {
  id: string;
  x: number;
  y: number;
  frequency: number;
  amplitude: number;
  phase: number;
  enabled: boolean;
  type: 'circular' | 'linear';
  color: string;
}

export interface WaveMedium {
  name: string;
  waveSpeed: number;
  damping: number;
  color: string;
}

export interface Obstacle {
  type: 'barrier' | 'slit';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface WaveSimulationSettings {
  sources: WaveSource[];
  medium: WaveMedium;
  showIntensityMap: boolean;
  showWavefronts: boolean;
  showMathOverlay: boolean;
  obstacles: Obstacle[];
  measurementMode: 'none' | 'ruler' | 'probe';
}
