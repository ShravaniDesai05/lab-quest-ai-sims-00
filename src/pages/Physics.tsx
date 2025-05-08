
import React, { useState } from 'react';
import PhysicsHeader from '@/components/physics/PhysicsHeader';
import ExperimentCard from '@/components/physics/ExperimentCard';
import ProgressTracker from '@/components/physics/ProgressTracker';
import PhysicsFooter from '@/components/physics/PhysicsFooter';
import PhysicsChatBot from '@/components/physics/PhysicsChatBot';
import { experiments } from '@/data/physicsExperiments';
import { useToast } from "@/hooks/use-toast";

const Physics = () => {
  const { toast } = useToast();
  // Track completed experiments (would connect to user data in a real app)
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);
  
  // Convert experiments data for display
  const experimentsList = Object.entries(experiments).map(([id, data]) => ({
    id,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    duration: data.duration,
    completed: completedExperiments.includes(id)
  }));
  
  // Check if we've unlocked bonus challenges
  const showBonusChallenge = completedExperiments.length >= 3;
  
  // Show toast for unlock (would be triggered when a third experiment is completed)
  React.useEffect(() => {
    if (completedExperiments.length === 3) {
      toast({
        title: "🎉 Bonus Challenge Unlocked!",
        description: "You've completed 3 experiments! Try the Quantum Physics challenge.",
      });
    }
  }, [completedExperiments.length, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-1 container py-8">
        <PhysicsHeader />
        
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-600 rounded-full"></span>
              Available Experiments
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {experimentsList.map((experiment) => (
                <ExperimentCard
                  key={experiment.id}
                  {...experiment}
                  image="/placeholder.svg"
                />
              ))}
              
              {showBonusChallenge && (
                <div className="col-span-full bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 text-white shadow-glow animate-pulse-badge mt-4">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <span className="text-cyan-300">✨</span> Bonus Challenge Unlocked!
                  </h3>
                  <p className="mb-4">You've completed enough experiments to access advanced physics challenges.</p>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-md transition-colors">
                    Explore Quantum Physics
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-600 rounded-full"></span>
              Your Progress
            </h2>
            <div className="space-y-6">
              <ProgressTracker 
                completedExperiments={completedExperiments.length} 
                totalExperiments={Object.keys(experiments).length} 
              />
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Did You Know?</h3>
                <p className="text-sm text-gray-700">
                  The concept of electromagnetism, unified by James Clerk Maxwell, 
                  demonstrates how electric currents create magnetic fields, and changing 
                  magnetic fields create electric currents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <PhysicsFooter />
      <PhysicsChatBot />
    </div>
  );
};

export default Physics;
