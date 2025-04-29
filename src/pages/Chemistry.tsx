
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/layout/SiteHeader';
import { Bookmark, Clock, FlaskConical, Atom } from 'lucide-react';

const Chemistry = () => {
  const experiments = [
    {
      id: 'catalyst',
      title: 'Catalyst Reaction',
      description: 'Investigate how catalysts increase the rate of chemical reactions without being consumed in the process.',
      difficulty: 'Intermediate',
      duration: '25 minutes',
      image: '/placeholder.svg',
      featured: true,
      icon: <Atom className="w-8 h-8 text-purple-500" />
    },
    {
      id: 'flame-test',
      title: 'Flame Test',
      description: 'Identify metal ions based on the characteristic color they produce when heated in a flame.',
      difficulty: 'Beginner',
      duration: '25 minutes',
      image: '/placeholder.svg',
      icon: <FlaskConical className="w-8 h-8 text-orange-500" />
    },
    {
      id: 'acid-base',
      title: 'Acid-Base Titration',
      description: 'Determine the concentration of an acid or base by neutralizing it with a standard solution of known concentration.',
      difficulty: 'Intermediate',
      duration: '35 minutes',
      image: '/placeholder.svg'
    },
    {
      id: 'baking-soda',
      title: 'Vinegar and Baking Soda Reaction',
      description: 'Observe an acid-base reaction that produces carbon dioxide gas through the reaction of vinegar with baking soda.',
      difficulty: 'Beginner',
      duration: '20 minutes',
      image: '/placeholder.svg'
    },
    {
      id: 'electrolysis',
      title: 'Electrolysis of Water',
      description: 'Split water into hydrogen and oxygen gases by passing an electric current through water.',
      difficulty: 'Intermediate',
      duration: '40 minutes',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Chemistry Experiments</h1>
          <p className="text-gray-600 mt-2">Explore the fascinating world of chemical reactions and transformations</p>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {experiments
            .filter(exp => exp.featured)
            .map((experiment) => (
              <Card key={experiment.id} className="overflow-hidden hover:shadow-lg transition-shadow border-purple-200">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    {experiment.icon || (
                      <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                        <FlaskConical className="w-6 h-6 text-purple-700" />
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="text-xl font-bold mb-1">{experiment.title}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium rounded px-2 py-1 mr-2">
                          {experiment.difficulty}
                        </span>
                        <Clock className="h-3 w-3 mr-1" />
                        {experiment.duration}
                      </div>
                    </div>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold rounded-full px-3 py-1">
                    Featured
                  </span>
                </div>
                <CardContent className="pt-6">
                  <p className="text-gray-700">{experiment.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between bg-white">
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link to={`/chemistry/${experiment.id}`}>
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments
            .filter(exp => !exp.featured)
            .map((experiment) => (
              <Card key={experiment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {experiment.icon ? (
                    <div className="flex items-center justify-center w-full h-full bg-opacity-10 bg-blue-50">
                      {experiment.icon}
                    </div>
                  ) : (
                    <img 
                      src={experiment.image} 
                      alt={experiment.title}
                      className="w-16 h-16 opacity-30" 
                    />
                  )}
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-lab-blue text-xs font-medium rounded px-2 py-1">
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
                    <Link to={`/chemistry/${experiment.id}`}>
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

export default Chemistry;
