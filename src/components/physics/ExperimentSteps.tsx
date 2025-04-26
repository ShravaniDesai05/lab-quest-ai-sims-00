
import React from 'react';
import { ExperimentStep } from '@/types/experiments';

interface ExperimentStepsProps {
  steps: ExperimentStep[];
}

const ExperimentSteps: React.FC<ExperimentStepsProps> = ({ steps }) => {
  return (
    <div className="bg-purple-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Procedure Steps</h3>
      <ol className="list-decimal list-inside space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="text-gray-700">{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default ExperimentSteps;
