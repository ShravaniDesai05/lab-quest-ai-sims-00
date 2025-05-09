
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const PendulumSimulation = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-6 border border-red-100 rounded-md bg-red-50">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <h3 className="text-lg font-semibold text-red-700">Experiment Removed</h3>
      <p className="text-center text-sm text-red-600">
        This experiment has been removed from our curriculum.
        Please select another experiment from the Physics page.
      </p>
      <Button 
        variant="outline"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </div>
  );
};

export default PendulumSimulation;
