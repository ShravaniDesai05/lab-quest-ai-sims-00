
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, CircuitBoard, Gauge, LightbulbOff, Atom, Pendulum, Prism } from 'lucide-react';

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
  if (title.includes("Ohm")) return <CircuitBoard className="h-16 w-16 opacity-80" />;
  if (title.includes("Pendulum")) return <Atom className="h-16 w-16 opacity-80" />;
  if (title.includes("Wave")) return <Gauge className="h-16 w-16 opacity-80" />;
  if (title.includes("Light") || title.includes("Refraction")) return <Prism className="h-16 w-16 opacity-80" />;
  return <Atom className="h-16 w-16 opacity-80" />;
};

const ExperimentCard = ({ id, title, description, difficulty, duration, completed, image }: ExperimentCardProps) => {
  const difficultyClass = difficultyColors[difficulty as keyof typeof difficultyColors] || 'bg-blue-100 text-blue-700';
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group bg-white border-0 shadow-lg">
      <div className="relative h-56 bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {getExperimentIcon(title)}
        </div>
        {completed && (
          <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1.5 shadow-glow animate-pulse">
            <Check className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium rounded-full px-3 py-1 ${difficultyClass}`}>
            {difficulty}
          </span>
          <div className="flex items-center text-gray-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-700 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <Button asChild variant="default" className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white transform transition-all group-hover:shadow-glow">
          <Link to={`/physics/${id}`}>
            Start Experiment
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExperimentCard;
