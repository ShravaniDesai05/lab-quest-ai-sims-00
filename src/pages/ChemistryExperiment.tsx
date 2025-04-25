
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Beaker } from 'lucide-react';

const ChemistryExperiment = () => {
  const { experimentId } = useParams();
  
  // Chemistry experiments data
  const experiments = {
    'acid-base': {
      title: 'Acid-Base Titration',
      description: 'Determine the concentration of an acid or base by neutralizing it with a standard solution of known concentration.',
      difficulty: 'Intermediate',
      duration: '35 minutes',
      content: 'This experiment demonstrates the principles of acid-base reactions and stoichiometry.'
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
          <p>{experiment.content}</p>
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Experiment Coming Soon</h3>
            <p className="mb-4">We're currently developing the interactive version of this experiment. Check back soon!</p>
            <Button>Get Notified When Ready</Button>
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
