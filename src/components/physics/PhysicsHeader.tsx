
import React from 'react';
import { Atom } from 'lucide-react';
import { motion } from 'framer-motion';

const PhysicsHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full mb-10 overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-indigo-900 opacity-90 dark:opacity-80">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center opacity-10"></div>
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400/20 dark:bg-cyan-300/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 8 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 py-16 px-6 text-center text-white">
        <motion.div 
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Atom className="h-12 w-12 text-cyan-400" />
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold tracking-tight"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ⚛️ Physics Lab
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-xl text-cyan-100 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Experiment with Forces, Energy, and Motion
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center mt-6 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="px-4 py-2 bg-blue-800/50 rounded-lg backdrop-blur-sm hover:bg-blue-700/60 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-cyan-300 font-medium">5 Interactive Simulations</span>
          </motion.div>
          <motion.div 
            className="px-4 py-2 bg-blue-800/50 rounded-lg backdrop-blur-sm hover:bg-blue-700/60 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-cyan-300 font-medium">Advanced Physics Concepts</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhysicsHeader;
