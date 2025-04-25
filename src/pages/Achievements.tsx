
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SiteHeader from '@/components/layout/SiteHeader';
import { Award, Star, Trophy } from 'lucide-react';

const Achievements = () => {
  // Sample achievement data
  const achievements = [
    {
      id: 1,
      title: 'Biology Beginner',
      description: 'Complete your first 3 biology experiments',
      progress: 66,
      icon: <Microscope className="h-6 w-6 text-lab-green" />,
      completed: false,
      category: 'biology'
    },
    {
      id: 2,
      title: 'Chemistry Explorer',
      description: 'Complete any 5 chemistry experiments',
      progress: 40,
      icon: <Flask className="h-6 w-6 text-lab-blue" />,
      completed: false,
      category: 'chemistry'
    },
    {
      id: 3,
      title: 'Physics Master',
      description: 'Complete all physics experiments',
      progress: 20,
      icon: <Lightbulb className="h-6 w-6 text-lab-purple" />,
      completed: false,
      category: 'physics'
    },
    {
      id: 4,
      title: 'Time Optimizer',
      description: 'Complete any experiment in under 10 minutes',
      progress: 100,
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      completed: true,
      category: 'challenge'
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Get all answers correct in a knowledge check',
      progress: 100,
      icon: <Trophy className="h-6 w-6 text-amber-500" />,
      completed: true,
      category: 'challenge'
    },
    {
      id: 6,
      title: 'Science Scholar',
      description: 'Complete at least 1 experiment in each subject area',
      progress: 66,
      icon: <Award className="h-6 w-6 text-blue-500" />,
      completed: false,
      category: 'special'
    }
  ];

  // Group achievements by category
  const biologySectionData = achievements.filter(a => a.category === 'biology');
  const chemistrySectionData = achievements.filter(a => a.category === 'chemistry');
  const physicsSectionData = achievements.filter(a => a.category === 'physics');
  const challengeSectionData = achievements.filter(a => a.category === 'challenge');
  const specialSectionData = achievements.filter(a => a.category === 'special');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Achievements & Badges</h1>
          <p className="text-gray-600 mt-2">Track your progress and earn rewards as you complete experiments</p>
          
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
        </div>
        
        {/* Special Achievements */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="h-5 w-5 text-amber-500 mr-2" />
            Special Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialSectionData.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
        
        {/* Subject Achievements */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Microscope className="h-5 w-5 text-lab-green mr-2" />
            Biology Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {biologySectionData.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Flask className="h-5 w-5 text-lab-blue mr-2" />
            Chemistry Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chemistrySectionData.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 text-lab-purple mr-2" />
            Physics Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {physicsSectionData.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
        
        {/* Challenge Achievements */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Trophy className="h-5 w-5 text-amber-500 mr-2" />
            Challenge Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challengeSectionData.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
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

// Achievement Card Component
interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  completed: boolean;
  category: string;
}

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
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

// Import necessary icons for the component
import { Microscope, Flask, Lightbulb, Clock } from 'lucide-react';

export default Achievements;
