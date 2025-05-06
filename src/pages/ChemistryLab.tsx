
import React from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import { Card, CardContent } from '@/components/ui/card';
import ChemistryLabSimulation from '@/components/chemistry/ChemistryLabSimulation';
import { FlaskConical, Beaker, TestTube, BookOpen } from 'lucide-react';

const ChemistryLab = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Virtual Chemistry Laboratory</h1>
          <p className="text-gray-600 mt-2">
            Experiment with chemicals and reactions in a safe, virtual environment
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <FlaskConical className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Interactive Chemistry Workbench</h2>
              <p className="text-gray-600">Drag chemicals, observe reactions, and record your findings</p>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4 md:p-6">
              <ChemistryLabSimulation />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Beaker className="h-5 w-5 mr-2 text-blue-500" />
                <h3 className="text-lg font-semibold">Core Experiments</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="bg-blue-100 rounded-full p-1 mr-2">•</span>
                  <span>Flame Tests - Identify metals by color</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 rounded-full p-1 mr-2">•</span>
                  <span>Acid-Base Titrations - Measure pH change</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 rounded-full p-1 mr-2">•</span>
                  <span>Catalyst Reactions - Observe reaction rate</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 rounded-full p-1 mr-2">•</span>
                  <span>Electrolysis - Split compounds with electricity</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TestTube className="h-5 w-5 mr-2 text-green-500" />
                <h3 className="text-lg font-semibold">Safety First</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our virtual lab lets you explore chemical reactions that would be dangerous in real life.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-amber-700 text-sm">
                  <strong>Note:</strong> Always follow proper safety protocols when performing real chemical experiments. 
                  Remember that virtual behaviors may not perfectly match real chemical properties.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                <h3 className="text-lg font-semibold">Learning Outcomes</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="bg-purple-100 rounded-full p-1 mr-2">•</span>
                  <span>Understand chemical reactions visually</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-100 rounded-full p-1 mr-2">•</span>
                  <span>Practice lab techniques virtually</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-100 rounded-full p-1 mr-2">•</span>
                  <span>Record and analyze experimental data</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-100 rounded-full p-1 mr-2">•</span>
                  <span>Learn about chemical properties safely</span>
                </li>
              </ul>
            </CardContent>
          </Card>
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
