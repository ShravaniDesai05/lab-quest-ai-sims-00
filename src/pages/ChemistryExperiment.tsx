
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExperimentHeader from '@/components/physics/ExperimentHeader';
import FlameTestSimulation from '@/components/chemistry/FlameTestSimulation';
import CatalystReactionSimulation from '@/components/chemistry/CatalystReactionSimulation';
import ExperimentSteps from '@/components/physics/ExperimentSteps';
import { experiments } from '@/data/chemistryExperiments';

const ChemistryExperiment = () => {
  const { experimentId } = useParams();
  const experiment = experimentId && experiments[experimentId as keyof typeof experiments];

  useEffect(() => {
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
            <Button 
              onClick={() => window.location.href = "/chemistry"} 
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              asChild
            >
              <Link to="/chemistry">Return to Chemistry Experiments</Link>
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
        <ExperimentHeader experiment={experiment} />
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Experiment Details</h2>
          <p className="mb-6">{experiment.content}</p>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Interactive Chemistry Simulation</h3>
              {experimentId === 'flame-test' ? (
                <FlameTestSimulation metalIons={experiment.metalIons || []} />
              ) : experimentId === 'catalyst' ? (
                <CatalystReactionSimulation catalystOptions={experiment.catalystOptions || []} />
              ) : (
                <p className="text-center text-gray-500">
                  Interactive simulation for this experiment is coming soon!
                </p>
              )}
            </CardContent>
          </Card>

          {experiment.steps && <ExperimentSteps steps={experiment.steps} />}
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
