
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/layout/SiteHeader';
import { Bookmark, Clock, Microscope } from 'lucide-react';

const Biology = () => {
  const experiments = [
    {
      id: 'osmosis',
      title: 'Observing Osmosis in a Potato',
      description: 'Explore how water moves across cell membranes by observing changes in potato slices placed in different salt concentrations.',
      difficulty: 'Beginner',
      duration: '30 minutes',
      image: '/placeholder.svg',
      path: '/biology/osmosis'
    },
    {
      id: 'blood-groups',
      title: 'Blood Group Identification',
      description: 'Learn how to identify different blood groups (A, B, AB, O, Rh+ and Rh-) by simulating the agglutination reaction with antibodies.',
      difficulty: 'Intermediate',
      duration: '25 minutes',
      image: '/placeholder.svg',
      path: '/biology/blood-groups'
    },
    {
      id: 'catalase',
      title: 'Effect of Temperature on Catalase Activity',
      description: 'Investigate how temperature affects enzyme activity by observing catalase breaking down hydrogen peroxide into water and oxygen.',
      difficulty: 'Intermediate',
      duration: '45 minutes',
      image: '/placeholder.svg',
      path: '/biology/catalase'
    },
    {
      id: 'onion-cells',
      title: 'Examining Onion Cells',
      description: 'Observe plant cell structure by examining onion cells under a microscope and identifying key cell components.',
      difficulty: 'Beginner',
      duration: '25 minutes',
      image: '/placeholder.svg',
      path: '/biology/onion-cells'
    },
    {
      id: 'pollen-germination',
      title: 'Pollen Germination on Stigma',
      description: 'Visualize and interact with the process of pollen grain germination on a flower stigma using microscope and SEM views.',
      difficulty: 'Intermediate',
      duration: '30 minutes',
      image: '/placeholder.svg',
      path: '/biology/pollen-germination'
    },
    {
      id: 'photosynthesis',
      title: 'Photosynthesis in Aquatic Plants',
      description: 'Measure the rate of photosynthesis by counting oxygen bubbles produced by aquatic plants under different light conditions.',
      difficulty: 'Intermediate',
      duration: '45 minutes',
      image: '/placeholder.svg',
      path: '/biology/photosynthesis'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-green-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Biology Experiments</h1>
          <p className="text-gray-600 mt-2">Explore the wonders of living organisms through interactive simulations</p>
          
          <div className="mt-4">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/biology/models">
                <Microscope className="h-4 w-4" />
                Explore 3D Biology Models
              </Link>
            </Button>
          </div>
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
                  <span className="bg-green-100 text-green-800 text-xs font-medium rounded px-2 py-1">
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
                  <Link to={experiment.path}>
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

export default Biology;
