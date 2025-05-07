
import React from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import { Card } from '@/components/ui/card';
import EnhancedChemistrySimulation from '@/components/chemistry/EnhancedChemistrySimulation';
import { FlaskConical, Beaker, Shield, Info } from 'lucide-react';

const ChemistryLab = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Interactive Chemistry Laboratory</h1>
          <p className="text-gray-600 mt-2">
            Mix chemicals, observe reactions, and learn chemistry through hands-on experimentation
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <FlaskConical className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Interactive Chemistry Workbench</h2>
              <p className="text-gray-600">Drag chemicals from the shelf to containers, observe realistic reactions, and record your findings</p>
            </div>
          </div>
          
          <Card>
            <EnhancedChemistrySimulation />
          </Card>
        </div>
        
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-800">Safety Reminder</h3>
              <p className="text-amber-700 text-sm mt-1">
                While our virtual lab lets you explore chemical reactions safely, always follow proper safety protocols 
                if performing real experiments. Remember to wear appropriate safety gear and follow lab safety guidelines.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Science Lab AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ChemistryLab;
