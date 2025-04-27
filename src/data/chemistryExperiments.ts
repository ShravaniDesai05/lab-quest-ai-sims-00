
import { ChemistryExperiments, MetalIon } from '@/types/experiments';

export const metalIons: MetalIon[] = [
  {
    symbol: "Na⁺",
    name: "Sodium",
    color: "#FFE5B4",
    flameColor: "#FFD700",
    description: "Produces an intense yellow flame"
  },
  {
    symbol: "K⁺",
    name: "Potassium",
    color: "#E5D4FF",
    flameColor: "#9D4EDD",
    description: "Creates a distinctive lilac or light purple flame"
  },
  {
    symbol: "Ca²⁺",
    name: "Calcium",
    color: "#FFD6CC",
    flameColor: "#FF4500",
    description: "Shows an orange-red colored flame"
  },
  {
    symbol: "Cu²⁺",
    name: "Copper",
    color: "#90EE90",
    flameColor: "#00FF7F",
    description: "Exhibits a bright green-blue flame"
  },
  {
    symbol: "Li⁺",
    name: "Lithium",
    color: "#FFB6C1",
    flameColor: "#DC143C",
    description: "Displays a crimson red flame"
  },
  {
    symbol: "Sr²⁺",
    name: "Strontium",
    color: "#FFCCCB",
    flameColor: "#FF0000",
    description: "Produces a bright red flame"
  },
  {
    symbol: "Ba²⁺",
    name: "Barium",
    color: "#CCFFCC",
    flameColor: "#98FB98",
    description: "Creates a pale green flame"
  }
];

export const experiments: ChemistryExperiments = {
  'flame-test': {
    title: 'Flame Test Analysis',
    description: 'Identify metal ions by observing the characteristic colors they produce in a flame.',
    difficulty: 'Beginner',
    duration: '20 minutes',
    content: 'The flame test is a qualitative analysis method used to detect the presence of certain metal ions based on the characteristic color the ions emit when they are heated in a flame. This happens because the heat from the flame excites the electrons in the metal atoms, causing them to jump to higher energy levels. When these electrons return to their ground state, they release energy in the form of light with specific wavelengths, resulting in distinctive colors.',
    steps: [
      'Set up the Bunsen burner and adjust for a non-luminous flame',
      'Clean the wire loop with HCl and heat until no color shows',
      'Dip the loop into the test solution',
      'Hold the loop in the flame and observe the color',
      'Compare the observed color with standard results',
      'Clean the loop thoroughly before testing the next sample'
    ],
    metalIons: metalIons
  }
};
