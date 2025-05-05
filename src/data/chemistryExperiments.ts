
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
  },
  'catalyst': {
    title: 'Catalyst Reaction Demonstration',
    description: 'Investigate how catalysts increase the rate of chemical reactions without being consumed in the process.',
    difficulty: 'Intermediate',
    duration: '25 minutes',
    content: 'Catalysts are substances that speed up chemical reactions without being consumed in the process. They work by providing an alternative pathway for the reaction that has a lower activation energy, enabling more reactant molecules to transform into products in a shorter time. This simulation demonstrates the effect of different catalysts on the decomposition of hydrogen peroxide (H₂O₂) into water (H₂O) and oxygen (O₂), with emphasis on how catalysts remain unchanged after the reaction is complete.',
    steps: [
      'Set up two beakers with equal amounts of hydrogen peroxide solution',
      'Add a catalyst to one beaker while leaving the other as a control',
      'Observe and compare the reaction rates in both beakers',
      'Time the reactions to quantify the catalytic effect',
      'Try different catalysts and compare their effectiveness',
      'Verify that the catalyst remains unchanged after the reaction'
    ],
    catalystOptions: [
      {
        name: "Manganese Dioxide",
        formula: "MnO₂",
        effectiveness: 0.9,
        color: "#3D3C3A"
      },
      {
        name: "Potassium Iodide",
        formula: "KI",
        effectiveness: 0.7,
        color: "#FFFFFF"
      },
      {
        name: "Iron(III) Chloride",
        formula: "FeCl₃",
        effectiveness: 0.5,
        color: "#9B5A47"
      },
      {
        name: "Catalase Enzyme",
        formula: "Enzyme",
        effectiveness: 1.0,
        color: "#AAD4B5"
      }
    ]
  },
  'electrolysis': {
    title: 'Electrolysis of Water',
    description: 'Split water into hydrogen and oxygen gases by passing an electric current through water.',
    difficulty: 'Intermediate',
    duration: '40 minutes',
    content: 'Electrolysis is an electrochemical process where an electric current is passed through a liquid or solution containing ions, causing chemical changes at the electrodes. In water electrolysis, an electric current splits water (H₂O) into hydrogen gas (H₂) and oxygen gas (O₂). This experiment illustrates both the principles of electrochemistry and the chemical properties of water. The hydrogen ions (H⁺) are attracted to the negatively charged cathode, where they gain electrons and form hydrogen gas, while hydroxide ions (OH⁻) move to the positively charged anode, where they lose electrons and form oxygen gas and water.',
    steps: [
      'Set up the electrolysis apparatus with distilled water',
      'Add a small amount of electrolyte (acid or salt) to increase conductivity',
      'Connect the electrodes to a direct current power source',
      'Observe bubble formation at both electrodes',
      'Note that hydrogen gas volume is twice that of oxygen gas',
      'Identify the gases collected by their properties'
    ],
    electrolytes: [
      {
        name: "Sulfuric Acid",
        formula: "H₂SO₄",
        efficiency: 1,
        color: "transparent"
      },
      {
        name: "Sodium Chloride",
        formula: "NaCl",
        efficiency: 0.7,
        color: "rgba(173, 216, 230, 0.1)"
      },
      {
        name: "Potassium Hydroxide",
        formula: "KOH",
        efficiency: 0.9,
        color: "rgba(173, 216, 230, 0.1)"
      }
    ]
  }
};
