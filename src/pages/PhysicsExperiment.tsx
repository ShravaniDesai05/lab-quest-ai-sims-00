
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Atom } from 'lucide-react';

const PhysicsExperiment = () => {
  const { experimentId } = useParams();
  const [pendulumAngle, setPendulumAngle] = useState(0);
  
  // Physics experiments data with detailed steps
  const experiments = {
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
  
  const experiment = experimentId && experiments[experimentId as keyof typeof experiments];
  
  useEffect(() => {
    if (experiment) {
      console.log(`Physics experiment viewed: ${experiment.title}`);
    } else {
      console.error(`Physics experiment not found: ${experimentId}`);
    }
  }, [experiment, experimentId]);

  const handlePendulumAnimation = () => {
    setPendulumAngle(prev => -prev);
  };

  if (!experiment) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Experiment Not Found</h1>
            <p className="mb-6">The requested experiment does not exist.</p>
            <Button asChild>
              <Link to="/physics">Return to Physics Experiments</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="mb-4">
            <Link to="/physics" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Physics Experiments
            </Link>
          </Button>
          
          <div className="flex items-center">
            <div className="mr-4 bg-purple-100 p-3 rounded-full">
              <Atom className="h-6 w-6 text-lab-purple" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{experiment.title}</h1>
              <p className="text-gray-600 mt-1">{experiment.description}</p>
            </div>
          </div>
          
          <div className="flex items-center mt-4 space-x-4">
            <span className="bg-purple-100 text-lab-purple text-sm font-medium rounded px-2 py-1">
              {experiment.difficulty}
            </span>
            <span className="flex items-center text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {experiment.duration}
            </span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Experiment Details</h2>
          <p className="mb-6">{experiment.content}</p>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Interactive Physics Simulation</h3>
              {experimentId === 'pendulum' && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-40 relative">
                    <div className="absolute top-0 left-1/2 w-1 h-32 bg-gray-300 origin-top"
                         style={{ transform: `rotate(${pendulumAngle}deg)` }}>
                      <div className="absolute bottom-0 -left-2 w-5 h-5 bg-purple-500 rounded-full" />
                    </div>
                  </div>
                  <Button 
                    onClick={handlePendulumAnimation}
                    variant="outline"
                  >
                    Start Pendulum
                  </Button>
                </div>
              )}
              {experimentId !== 'pendulum' && (
                <p className="text-center text-gray-500">
                  Interactive simulation for this experiment is coming soon!
                </p>
              )}
            </CardContent>
          </Card>

          {experiment.steps && (
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Procedure Steps</h3>
              <ol className="list-decimal list-inside space-y-2">
                {experiment.steps.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Science Lab AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PhysicsExperiment;
