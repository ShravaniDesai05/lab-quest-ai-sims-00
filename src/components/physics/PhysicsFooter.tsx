
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Beaker, Microscope, History, BookText, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const PhysicsFooter = () => {
  return (
    <footer className="border-t border-border py-8 mt-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div 
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <span className="w-1.5 h-6 bg-lab-blue rounded-full"></span>
            Quick Links
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm" className="border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-purple-200 dark:border-purple-900 hover:border-purple-500 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors">
              <Link to="/chemistry">
                <Beaker className="mr-2 h-4 w-4" />
                Chemistry Lab
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-green-200 dark:border-green-900 hover:border-green-500 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950 transition-colors">
              <Link to="/biology">
                <Microscope className="mr-2 h-4 w-4" />
                Biology Lab
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <span className="w-1.5 h-6 bg-lab-blue rounded-full"></span>
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <motion.a 
                href="#" 
                className="text-lab-blue hover:text-lab-blue/80 flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <History className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Session History</span>
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="#" 
                className="text-lab-blue hover:text-lab-blue/80 flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <BookText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Saved Notes</span>
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="#" 
                className="text-lab-blue hover:text-lab-blue/80 flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Lightbulb className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Physics Tips</span>
              </motion.a>
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <span className="w-1.5 h-6 bg-lab-blue rounded-full"></span>
            Help
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Need assistance with your physics experiments?
              <br />
              Use the PhysixBot in the corner or visit our help center.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="default" className="mt-3 bg-lab-blue hover:bg-lab-blue/90 dark:bg-lab-blue/90 dark:hover:bg-lab-blue/80">
                Help Center
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="container mt-8 pt-6 border-t border-border text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} VigyaanKosh: AI-Powered Virtual Science Labs. All rights reserved.
      </div>
    </footer>
  );
};

export default PhysicsFooter;
