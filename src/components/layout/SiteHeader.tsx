
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flask, BookOpen, Award } from 'lucide-react';

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Flask className="h-8 w-8 text-lab-blue" />
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
            Science Lab AI
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/biology" className="text-sm font-medium text-gray-700 hover:text-lab-green transition-colors">
            Biology
          </Link>
          <Link to="/chemistry" className="text-sm font-medium text-gray-700 hover:text-lab-blue transition-colors">
            Chemistry
          </Link>
          <Link to="/physics" className="text-sm font-medium text-gray-700 hover:text-lab-purple transition-colors">
            Physics
          </Link>
          <Link to="/achievements" className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors">
            <Award className="h-4 w-4" />
            <span>Achievements</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center gap-2"
            asChild
          >
            <Link to="/about">
              <BookOpen className="h-4 w-4" />
              <span>About</span>
            </Link>
          </Button>
          <Button className="bg-lab-blue hover:bg-blue-700">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
