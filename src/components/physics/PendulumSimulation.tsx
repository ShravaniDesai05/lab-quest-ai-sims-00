
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { motion } from "framer-motion"; 

const PendulumSimulation = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-6 p-8 border border-red-100 rounded-lg bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/20 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }}
      >
        <AlertCircle className="h-16 w-16 text-red-500 dark:text-red-400" />
      </motion.div>
      
      <div className="text-center">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2"
        >
          Experiment Removed
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-red-600 dark:text-red-400 max-w-md"
        >
          This experiment has been removed from our curriculum.
          Please select another experiment from the Physics page.
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          variant="outline"
          className="hover-button border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PendulumSimulation;
