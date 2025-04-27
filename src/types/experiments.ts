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

export interface ChemistryExperimentData {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  content: string;
  steps: ExperimentStep[];
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
