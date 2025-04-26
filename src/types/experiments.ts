
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
