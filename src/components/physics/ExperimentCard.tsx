
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, CircuitBoard, Gauge, LightbulbOff, Atom } from 'lucide-react';

interface ExperimentCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  completed: boolean;
  image: string;
}

const difficultyColors = {
  'Beginner': 'bg-green-100 text-green-700',
  'Intermediate': 'bg-amber-100 text-amber-700',
  'Advanced': 'bg-red-100 text-red-700',
};

const getExperimentIcon = (title: string) => {
  if (title.includes("Ohm")) return <CircuitBoard className="h-12 w-12 opacity-70" />;
  if (title.includes("Pendulum")) return <LightbulbOff className="h-12 w-12 opacity-70" />;
  if (title.includes("Wave")) return <Gauge className="h-12 w-12 opacity-70" />;
  return <Atom className="h-12 w-12 opacity-70" />;
};

const ExperimentCard = ({ id, title, description, difficulty, duration, completed, image }: ExperimentCardProps) => {
  const difficultyClass = difficultyColors[difficulty as keyof typeof difficultyColors] || 'bg-blue-100 text-blue-700';
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group bg-white border-0 shadow-lg">
      <div className="relative h-48 bg-blue-900/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-indigo-900/10"></div>
        {getExperimentIcon(title)}
        {completed && (
          <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium rounded px-2 py-1 ${difficultyClass}`}>
            {difficulty}
          </span>
          <div className="flex items-center text-gray-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700 text-white w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all">
          <Link to={`/physics/${id}`}>
            Start Experiment
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExperimentCard;
