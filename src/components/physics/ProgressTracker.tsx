
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Rocket, Award, Zap } from "lucide-react";

interface ProgressTrackerProps {
  completedExperiments: number;
  totalExperiments: number;
}

const ProgressTracker = ({ completedExperiments, totalExperiments }: ProgressTrackerProps) => {
  const progressPercentage = (completedExperiments / totalExperiments) * 100;
  
  return (
    <div className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 backdrop-blur-sm p-6 rounded-lg shadow-glow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-400" />
          Your Progress
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-cyan-400 font-bold text-lg">{completedExperiments}</span>
          <span className="text-white/80">/</span>
          <span className="text-white/80">{totalExperiments}</span>
          <span className="text-white/80 ml-1">Completed</span>
        </div>
      </div>
      
      <div className="relative mb-6">
        <Progress value={progressPercentage} className="h-4 bg-blue-950/70" />
        <Rocket 
          className={`absolute top-1/2 -translate-y-1/2 text-orange-500 transition-all duration-1000 drop-shadow-glow`} 
          style={{ left: `${Math.min(progressPercentage, 97)}%` }}
          size={24}
        />
      </div>
      
      {completedExperiments > 0 && (
        <div className="mt-4">
          <h4 className="text-white/90 font-medium mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            Earned Badges
          </h4>
          <div className="flex flex-wrap gap-2">
            {completedExperiments >= 1 && (
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse">
                <span className="h-2 w-2 bg-white rounded-full"></span>
                Physics Explorer
              </div>
            )}
            {completedExperiments >= 2 && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="h-2 w-2 bg-white rounded-full"></span>
                Motion Master
              </div>
            )}
            {completedExperiments >= 3 && (
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="h-2 w-2 bg-white rounded-full"></span>
                Electric Genius
              </div>
            )}
            {completedExperiments >= 4 && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="h-2 w-2 bg-white rounded-full"></span>
                Quantum Explorer
              </div>
            )}
          </div>
          
          {completedExperiments >= 3 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded border border-yellow-500/30 text-yellow-100 text-xs">
              <div className="font-bold mb-1 flex items-center gap-1">
                <Zap className="h-4 w-4" /> Advanced Challenge Unlocked!
              </div>
              Try the Quantum Physics Challenge in the Bonus section.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
