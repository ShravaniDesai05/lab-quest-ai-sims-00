
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HomeIcon, Beaker, Microscope, History, BookText, Lightbulb } from 'lucide-react';

const PhysicsFooter = () => {
  return (
    <footer className="border-t border-blue-900/20 py-8 mt-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Quick Links
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm" className="border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Link to="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-purple-200 hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <Link to="/chemistry">
                <Beaker className="mr-2 h-4 w-4" />
                Chemistry Lab
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-green-200 hover:border-green-500 hover:bg-green-50 transition-colors">
              <Link to="/biology">
                <Microscope className="mr-2 h-4 w-4" />
                Biology Lab
              </Link>
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center group">
                <History className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Session History</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center group">
                <BookText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Saved Notes</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center group">
                <Lightbulb className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Physics Tips</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Help
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700">
              Need assistance with your physics experiments?
              <br />
              Use the PhysixBot in the corner or visit our help center.
            </p>
            <Button size="sm" variant="default" className="mt-3 bg-blue-600 hover:bg-blue-700">
              Help Center
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 pt-6 border-t border-blue-900/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Science Lab AI. All rights reserved.
      </div>
    </footer>
  );
};

export default PhysicsFooter;
