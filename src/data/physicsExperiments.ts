import { PhysicsExperiments } from '@/types/experiments';

export const experiments: PhysicsExperiments = {
  'sound-speed': {
    title: 'Speed of Sound via Echo',
    description: 'Measure the speed of sound by calculating the time it takes for an echo to return from a distant object.',
    difficulty: 'Intermediate',
    duration: '30 minutes',
    content: 'This experiment demonstrates how sound waves travel through air and reflect off surfaces.',
    steps: [
      'Find a large flat surface like a wall or cliff face',
      'Stand at a measured distance from the surface',
      'Create a loud sharp sound (clap or whistle)',
      'Measure the time until the echo returns',
      'Calculate the speed using distance and time'
    ]
  },
  'pendulum': {
    title: 'Pendulum for Newton\'s Laws',
    description: 'Investigate the factors affecting pendulum motion and observe Newton\'s laws of motion in action.',
    difficulty: 'Beginner',
    duration: '25 minutes',
    content: 'This experiment explores the principles of simple harmonic motion and conservation of energy.',
    steps: [
      'Set up a simple pendulum with string and weight',
      'Measure the length of the pendulum',
      'Release the pendulum from different angles',
      'Time the period of oscillation',
      'Calculate the relationship between length and period'
    ]
  },
  'refraction': {
    title: 'Refraction of Light',
    description: 'Observe how light changes direction when passing from one medium to another with different refractive indices.',
    difficulty: 'Beginner',
    duration: '20 minutes',
    content: 'This experiment demonstrates Snell\'s Law and the behavior of light at interfaces between media.',
    steps: [
      'Fill a transparent container with water',
      'Place a pencil or straw in the water',
      'Observe the apparent bending of the object',
      'Measure the angles of incidence and refraction',
      'Calculate the refractive index'
    ]
  },
  'ohms-law': {
    title: 'Ohm\'s Law',
    description: 'Explore the relationship between voltage, current, and resistance in electrical circuits.',
    difficulty: 'Intermediate',
    duration: '35 minutes',
    content: 'This experiment shows how to measure electrical quantities and verify Ohm\'s Law.',
    steps: [
      'Set up a simple circuit with battery, resistor, and ammeter',
      'Measure current at different voltages',
      'Record voltage and current readings',
      'Plot voltage vs current graph',
      'Calculate resistance from the slope'
    ]
  },
  'wave-interference': {
    title: 'Water Wave Interference',
    description: 'Visualize constructive and destructive interference patterns created by overlapping water waves.',
    difficulty: 'Advanced',
    duration: '40 minutes',
    content: 'This experiment demonstrates the principles of wave interference and superposition.',
    steps: [
      'Fill a ripple tank with water',
      'Create two wave sources',
      'Observe interference patterns',
      'Measure wavelength and frequency',
      'Identify nodes and antinodes'
    ]
  }
};
