
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Atom } from 'lucide-react';
import { PhysicsExperimentData } from '@/types/experiments';

interface ExperimentHeaderProps {
  experiment: PhysicsExperimentData;
}

const ExperimentHeader: React.FC<ExperimentHeaderProps> = ({ experiment }) => {
  return (
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
  );
};

export default ExperimentHeader;
