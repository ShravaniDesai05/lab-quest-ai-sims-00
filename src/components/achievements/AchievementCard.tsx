
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  completed: boolean;
  category: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <Card 
      className={`relative overflow-hidden ${
        achievement.completed ? 'border-amber-300 shadow-amber-100 shadow-lg' : 'border-gray-200'
      }`}
    >
      {achievement.completed && (
        <div className="absolute top-0 right-0">
          <div className="w-16 h-16 bg-amber-500 rotate-45 transform origin-bottom-left"></div>
          <Star className="absolute top-2 right-2 h-4 w-4 text-white" />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <div className={`p-2 rounded-lg ${
            achievement.completed ? 'bg-amber-100' : 'bg-gray-100'
          } mr-3`}>
            {achievement.icon}
          </div>
          <div>
            <h3 className="font-medium">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={achievement.progress} className="h-2" />
          <div className="text-xs flex justify-between text-gray-500">
            <span>{achievement.progress}% complete</span>
            {achievement.completed && <span className="text-amber-500 font-medium">Completed!</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
