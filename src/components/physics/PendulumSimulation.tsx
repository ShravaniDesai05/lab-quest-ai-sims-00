
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const PendulumSimulation = () => {
  const [pendulumAngle, setPendulumAngle] = useState(0);

  const handlePendulumAnimation = () => {
    setPendulumAngle(prev => -prev);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-20 h-40 relative">
        <div 
          className="absolute top-0 left-1/2 w-1 h-32 bg-gray-300 origin-top"
          style={{ transform: `rotate(${pendulumAngle}deg)` }}
        >
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
  );
};

export default PendulumSimulation;
