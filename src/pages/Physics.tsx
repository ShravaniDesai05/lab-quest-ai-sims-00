
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/layout/SiteHeader';
import { Bookmark, Clock } from 'lucide-react';

const Physics = () => {
  const experiments = [
    {
      id: 'sound-speed',
      title: 'Speed of Sound via Echo',
      description: 'Measure the speed of sound by calculating the time it takes for an echo to return from a distant object.',
      difficulty: 'Intermediate',
      duration: '30 minutes',
      image: '/placeholder.svg'
    },
    {
      id: 'pendulum',
      title: 'Pendulum for Newton\'s Laws',
      description: 'Investigate the factors affecting pendulum motion and observe Newton\'s laws of motion in action.',
      difficulty: 'Beginner',
      duration: '25 minutes',
      image: '/placeholder.svg'
    },
    {
      id: 'refraction',
      title: 'Refraction of Light',
      description: 'Observe how light changes direction when passing from one medium to another with different refractive indices.',
      difficulty: 'Beginner',
      duration: '20 minutes',
      image: '/placeholder.svg'
    },
    {
      id: 'ohms-law',
      title: 'Ohm\'s Law',
      description: 'Explore the relationship between voltage, current, and resistance in electrical circuits.',
      difficulty: 'Intermediate',
      duration: '35 minutes',
      image: '/placeholder.svg'
    },
    {
      id: 'wave-interference',
      title: 'Water Wave Interference',
      description: 'Visualize constructive and destructive interference patterns created by overlapping water waves.',
      difficulty: 'Advanced',
      duration: '40 minutes',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Physics Experiments</h1>
          <p className="text-gray-600 mt-2">Explore the fundamental laws and principles that govern our physical world</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <Card key={experiment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img 
                  src={experiment.image} 
                  alt={experiment.title}
                  className="w-16 h-16 opacity-30" 
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-purple-100 text-lab-purple text-xs font-medium rounded px-2 py-1">
                    {experiment.difficulty}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {experiment.duration}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{experiment.title}</h3>
                <p className="text-gray-600 text-sm">{experiment.description}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/physics/${experiment.id}`}>
                    Start Experiment
                  </Link>
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
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

export default Physics;
