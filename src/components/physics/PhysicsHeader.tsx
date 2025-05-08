
import React from 'react';
import { Atom } from 'lucide-react';

const PhysicsHeader = () => {
  return (
    <div className="relative w-full mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-indigo-900 opacity-90 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center opacity-10"></div>
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
      </div>
      
      <div className="relative z-10 py-16 px-6 text-center text-white">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Atom className="h-10 w-10 text-cyan-400 animate-pulse" />
          <h1 className="text-5xl font-bold tracking-tight">⚛️ Physics Lab</h1>
        </div>
        <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
          Experiment with Forces, Energy, and Motion
        </p>
        <div className="flex justify-center mt-6 gap-4">
          <div className="px-4 py-2 bg-blue-800/50 rounded-lg backdrop-blur-sm">
            <span className="text-cyan-300 font-medium">5 Interactive Simulations</span>
          </div>
          <div className="px-4 py-2 bg-blue-800/50 rounded-lg backdrop-blur-sm">
            <span className="text-cyan-300 font-medium">Advanced Physics Concepts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsHeader;
