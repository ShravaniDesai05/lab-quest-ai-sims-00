
import { PhysicsExperiments } from '@/types/experiments';

export const experiments: PhysicsExperiments = {
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
    content: 'This experiment shows how voltage, current, and resistance are related through Ohm\'s Law (V = IR). By adjusting the voltage of a battery or the resistance in a circuit, you can observe how the current changes according to this fundamental electrical principle.',
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
    content: 'This experiment demonstrates the principles of wave interference and superposition using a virtual ripple tank. By adjusting the frequency, wavelength, and phase difference between wave sources, you can observe how waves combine to create complex interference patterns. This simulation also covers concepts of diffraction and Young\'s double slit experiment.',
    steps: [
      'Set up two wave sources in the ripple tank',
      'Adjust frequency and wavelength parameters',
      'Observe interference patterns',
      'Use measurement tools to analyze patterns',
      'Experiment with obstacles to observe diffraction'
    ]
  },
  'newtons-laws': {
    title: 'Newton\'s Three Laws of Motion',
    description: 'Explore and demonstrate Newton\'s three fundamental laws that describe the relationship between an object and the forces acting upon it.',
    difficulty: 'Intermediate',
    duration: '45 minutes',
    content: 'This experiment allows you to interact with simulations of Newton\'s three laws of motion: the Law of Inertia, F=ma, and Action-Reaction. Through interactive demonstrations, you\'ll observe how objects behave under different forces, masses, and environmental conditions.',
    steps: [
      'Explore the Law of Inertia by sliding objects across different surfaces',
      'Test the Second Law (F=ma) by applying different forces to objects with varying masses',
      'Observe the Third Law by experimenting with action-reaction pairs',
      'Complete challenges to test your understanding of each law',
      'Record observations and conclusions in the virtual lab notebook'
    ]
  }
};
