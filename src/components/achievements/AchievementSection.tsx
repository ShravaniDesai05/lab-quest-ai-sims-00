
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AchievementCard, Achievement } from './AchievementCard';

interface AchievementSectionProps {
  title: string;
  icon: React.ReactNode;
  achievements: Achievement[];
  iconColor: string;
}

export const AchievementSection = ({ 
  title, 
  icon, 
  achievements, 
  iconColor 
}: AchievementSectionProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {React.cloneElement(icon as React.ReactElement, { 
          className: `h-5 w-5 ${iconColor} mr-2` 
        })}
        {title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};
