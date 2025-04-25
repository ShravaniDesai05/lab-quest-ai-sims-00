import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Beaker } from 'lucide-react';

const ChemistryExperiment = () => {
  const { experimentId } = useParams();
  const [ph, setPh] = useState(7);
  
  // Chemistry experiments data
  const experiments = {
    'acid-base': {
      title: 'Acid-Base Titration',
      description: 'Determine the concentration of an acid or base by neutralizing it with a standard solution of known concentration.',
      difficulty: 'Intermediate',
      duration: '35 minutes',
      content: 'This experiment demonstrates the principles of acid-base reactions and stoichiometry.',
      steps: [
        'Start with a known volume of acid solution in an Erlenmeyer flask',
        'Add a few drops of indicator (e.g., phenolphthalein)',
        'Slowly add the base solution from a burette',
        'Continue until the indicator changes color',
        'Record the volume of base used'
      ]
    },
    'flame-test': {
      title: 'Flame Test',
      description: 'Identify metal ions based on the characteristic color they produce when heated in a flame.',
      difficulty: 'Beginner',
      duration: '25 minutes',
      content: 'This experiment shows how different metal salts produce distinct colors when heated in a flame.'
    },
    'baking-soda': {
      title: 'Vinegar and Baking Soda Reaction',
      description: 'Observe an acid-base reaction that produces carbon dioxide gas through the reaction of vinegar with baking soda.',
      difficulty: 'Beginner',
      duration: '20 minutes',
      content: 'This experiment demonstrates a simple acid-base reaction and gas formation.'
    },
    'electrolysis': {
      title: 'Electrolysis of Water',
      description: 'Split water into hydrogen and oxygen gases by passing an electric current through water.',
      difficulty: 'Intermediate',
      duration: '40 minutes',
      content: 'This experiment shows how electrical energy can be used to drive chemical reactions.'
    },
    'catalyst': {
      title: 'Catalyst Reaction',
      description: 'Investigate how catalysts increase the rate of chemical reactions without being consumed in the process.',
      difficulty: 'Advanced',
      duration: '45 minutes',
      content: 'This experiment demonstrates the effect of catalysts on reaction rates.'
    }
  };
  
  const experiment = experimentId && experiments[experimentId as keyof typeof experiments];
  
  useEffect(() => {
    // Log experiment viewing
    if (experiment) {
      console.log(`Chemistry experiment viewed: ${experiment.title}`);
    } else {
      console.error(`Chemistry experiment not found: ${experimentId}`);
    }
  }, [experiment, experimentId]);

  if (!experiment) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Experiment Not Found</h1>
            <p className="mb-6">The requested experiment does not exist.</p>
            <Button asChild>
              <Link to="/chemistry">Return to Chemistry Experiments</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleTitration = (amount: number) => {
    setPh(prevPh => {
      const newPh = prevPh + amount;
      return Math.max(0, Math.min(14, newPh));
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="mb-4">
            <Link to="/chemistry" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chemistry Experiments
            </Link>
          </Button>
          
          <div className="flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <Beaker className="h-6 w-6 text-lab-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{experiment.title}</h1>
              <p className="text-gray-600 mt-1">{experiment.description}</p>
            </div>
          </div>
          
          <div className="flex items-center mt-4 space-x-4">
            <span className="bg-blue-100 text-lab-blue text-sm font-medium rounded px-2 py-1">
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
              <h3 className="text-lg font-semibold mb-4">Interactive Titration Simulation</h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="h-4 rounded-full transition-all duration-300"
                    style={{
                      width: `${(ph / 14) * 100}%`,
                      backgroundColor: ph < 7 ? '#ef4444' : ph > 7 ? '#3b82f6' : '#10b981'
                    }}
                  />
                </div>
                <div className="text-lg font-semibold">pH: {ph.toFixed(1)}</div>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => handleTitration(-0.5)}
                    variant="outline"
                  >
                    Add Acid
                  </Button>
                  <Button 
                    onClick={() => handleTitration(0.5)}
                    variant="outline"
                  >
                    Add Base
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Procedure Steps</h3>
            <ol className="list-decimal list-inside space-y-2">
              {experiment.steps.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>
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

export default ChemistryExperiment;
