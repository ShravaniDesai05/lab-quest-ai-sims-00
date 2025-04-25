
import React from 'react';

export const AchievementStats = () => {
  return (
    <div className="mt-6 flex justify-center items-center space-x-4">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-lab-blue">8</div>
        <div className="text-sm text-gray-500">Experiments<br/>Completed</div>
      </div>
      <div className="h-12 w-px bg-gray-200"></div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-amber-500">2</div>
        <div className="text-sm text-gray-500">Badges<br/>Earned</div>
      </div>
      <div className="h-12 w-px bg-gray-200"></div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-lab-purple">43%</div>
        <div className="text-sm text-gray-500">Overall<br/>Progress</div>
      </div>
    </div>
  );
};
