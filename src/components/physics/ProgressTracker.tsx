
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Rocket } from "lucide-react";

interface ProgressTrackerProps {
  completedExperiments: number;
  totalExperiments: number;
}

const ProgressTracker = ({ completedExperiments, totalExperiments }: ProgressTrackerProps) => {
  const progressPercentage = (completedExperiments / totalExperiments) * 100;
  
  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm p-6 rounded-lg shadow-glow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-white">Your Progress</h3>
        <div className="flex items-center gap-1">
          <span className="text-cyan-400 font-bold">{completedExperiments}</span>
          <span className="text-white/80">/</span>
          <span className="text-white/80">{totalExperiments}</span>
          <span className="text-white/80 ml-1">Completed</span>
        </div>
      </div>
      
      <div className="relative">
        <Progress value={progressPercentage} className="h-3 bg-blue-950" />
        <Rocket 
          className={`absolute top-1/2 -translate-y-1/2 text-orange-500 transition-all duration-1000`} 
          style={{ left: `${Math.min(progressPercentage, 97)}%` }}
          size={20}
        />
      </div>
      
      {completedExperiments > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2 mt-2">
            {completedExperiments >= 2 && (
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                Motion Master
              </div>
            )}
            {completedExperiments >= 3 && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                Electric Genius
              </div>
            )}
            {completedExperiments >= 4 && (
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs px-2 py-1 rounded-full">
                Quantum Explorer
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
