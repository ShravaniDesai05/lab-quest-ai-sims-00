import React from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import { Award, Star, Trophy, Microscope, FlaskConical, Lightbulb, Clock } from 'lucide-react';
import { AchievementCard, Achievement } from '@/components/achievements/AchievementCard';
import { AchievementStats } from '@/components/achievements/AchievementStats';
import { AchievementSection } from '@/components/achievements/AchievementSection';

const Achievements = () => {
  const achievements: Achievement[] = [
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
      icon: <FlaskConical className="h-6 w-6 text-lab-blue" />,
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
          <AchievementStats />
        </div>

        <AchievementSection
          title="Special Achievements"
          icon={<Star />}
          achievements={specialSectionData}
          iconColor="text-amber-500"
        />

        <AchievementSection
          title="Biology Achievements"
          icon={<Microscope />}
          achievements={biologySectionData}
          iconColor="text-lab-green"
        />

        <AchievementSection
          title="Chemistry Achievements"
          icon={<FlaskConical />}
          achievements={chemistrySectionData}
          iconColor="text-lab-blue"
        />

        <AchievementSection
          title="Physics Achievements"
          icon={<Lightbulb />}
          achievements={physicsSectionData}
          iconColor="text-lab-purple"
        />

        <AchievementSection
          title="Challenge Achievements"
          icon={<Trophy />}
          achievements={challengeSectionData}
          iconColor="text-amber-500"
        />
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Science Lab AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Achievements;
