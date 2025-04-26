
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
