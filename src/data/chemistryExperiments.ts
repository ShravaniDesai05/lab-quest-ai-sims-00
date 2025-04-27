
import { ChemistryExperiments } from '@/types/experiments';

export const experiments: ChemistryExperiments = {
  'flame-test': {
    title: 'Flame Test Analysis',
    description: 'Identify metal ions by observing the characteristic colors they produce in a flame.',
    difficulty: 'Beginner',
    duration: '20 minutes',
    content: 'The flame test is a qualitative analysis method used to detect the presence of certain metal ions based on the characteristic color the ions emit when they are heated in a flame.',
    steps: [
      'Set up the Bunsen burner and adjust for a non-luminous flame',
      'Clean the wire loop with HCl and heat until no color shows',
      'Dip the loop into the test solution',
      'Hold the loop in the flame and observe the color',
      'Compare the observed color with standard results',
      'Clean the loop thoroughly before testing the next sample'
    ]
  }
};
