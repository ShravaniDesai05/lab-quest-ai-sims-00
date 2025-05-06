
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
