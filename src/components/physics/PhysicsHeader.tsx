
import React from 'react';
import { Atom } from 'lucide-react';

const PhysicsHeader = () => {
  return (
    <div className="relative w-full mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center opacity-10"></div>
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
      </div>
      
      <div className="relative z-10 py-12 px-6 text-center text-white">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Atom className="h-8 w-8 text-cyan-400 animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight">⚛️ Physics Lab</h1>
        </div>
        <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
          Experiment with Forces, Energy, and Motion
        </p>
      </div>
    </div>
  );
};

export default PhysicsHeader;
