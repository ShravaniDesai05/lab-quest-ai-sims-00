
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HomeIcon, Beaker, Microscope, History, BookText } from 'lucide-react';

const PhysicsFooter = () => {
  return (
    <footer className="border-t border-blue-900/20 py-6 mt-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm" className="border-blue-200 hover:border-blue-500">
              <Link to="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-purple-200 hover:border-purple-500">
              <Link to="/chemistry">
                <Beaker className="mr-2 h-4 w-4" />
                Chemistry Lab
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-green-200 hover:border-green-500">
              <Link to="/biology">
                <Microscope className="mr-2 h-4 w-4" />
                Biology Lab
              </Link>
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center">
                <History className="mr-2 h-4 w-4" />
                Session History
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center">
                <BookText className="mr-2 h-4 w-4" />
                Saved Notes
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Help</h3>
          <p className="text-sm text-gray-600">
            Need assistance with your physics experiments?
            <br />
            Use the PhysixBot in the corner or visit our help center.
          </p>
        </div>
      </div>
      
      <div className="container mt-6 pt-4 border-t border-blue-900/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Science Lab AI. All rights reserved.
      </div>
    </footer>
  );
};

export default PhysicsFooter;
