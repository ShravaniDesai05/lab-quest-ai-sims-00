
import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import PollenGerminationSimulation from '@/components/biology/PollenGerminationSimulation';

const BiologyPollenGermination = () => {
  const experimentData = {
    title: 'Pollen Germination on Stigma',
    subject: 'Biology',
    difficulty: 'Intermediate',
    duration: '30 minutes',
    description: 'Observe the process of pollen grain germination on the stigma of a flower, and the growth of the pollen tube down the style toward the ovary.',
    objectives: [
      'Identify different structures in the pollen germination process',
      'Observe the stages of pollen tube growth',
      'Understand the process of double fertilization',
      'Compare permanent slide view with SEM visualization'
    ],
    theory: `Pollination is a crucial step in the reproduction of flowering plants (angiosperms). When a pollen grain lands on the stigma of a compatible flower, it begins the process of germination.

    The process of pollen germination includes several key stages:

    1. **Hydration**: When a pollen grain lands on a receptive stigma, it absorbs moisture from the stigma surface.
    
    2. **Activation**: The pollen grain becomes metabolically active, and proteins in the pollen coat interact with the stigma surface.
    
    3. **Germination**: The pollen grain forms a protrusion that develops into the pollen tube, which grows through specialized cells in the style.
    
    4. **Tube Growth**: The pollen tube grows down through the style toward the ovary, guided by chemical signals.
    
    5. **Double Fertilization**: When the pollen tube reaches the ovary, it releases two sperm cells. One fuses with the egg cell to form the zygote (future embryo), while the other fuses with the central cell to form the endosperm (nutritive tissue).
    
    This process is essential for seed formation and the reproductive success of flowering plants.`
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-green-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2"
              asChild
            >
              <Link to="/biology">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Link>
            </Button>
            
            <nav className="flex items-center text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
              <Link to="/biology" className="text-gray-500 hover:text-gray-900">Biology</Link>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
              <span className="text-gray-900">{experimentData.title}</span>
            </nav>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{experimentData.title}</h1>
          
          <div className="flex items-center flex-wrap gap-2 mt-4">
            <span className="bg-green-100 text-green-800 text-xs font-medium rounded px-2 py-1">
              {experimentData.difficulty}
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium rounded px-2 py-1 flex items-center">
              <span className="mr-1">⏱️</span>
              {experimentData.duration}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded px-2 py-1">
              {experimentData.subject}
            </span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="simulation" className="w-full">
              <TabsList>
                <TabsTrigger value="simulation">Simulation</TabsTrigger>
                <TabsTrigger value="theory">Theory</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>
              
              <TabsContent value="simulation" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <PollenGerminationSimulation />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="theory" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Pollen Germination Theory</h3>
                    <p className="text-gray-700 whitespace-pre-line mb-4">{experimentData.theory}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                      <h4 className="text-blue-800 font-medium mb-2 flex items-center">
                        <span className="mr-2">ℹ️</span> Key Structures
                      </h4>
                      <ul className="list-disc ml-5 text-blue-700 space-y-1">
                        <li>Stigma - The receptive surface where pollen lands</li>
                        <li>Pollen grain - Contains the male gametophyte</li>
                        <li>Pollen tube - Growth extension from the pollen grain</li>
                        <li>Style - The stalk connecting the stigma to the ovary</li>
                        <li>Ovary - Contains the ovules with egg cells</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="quiz" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Test Your Knowledge</h3>
                    <div className="space-y-6">
                      {/* Quiz content will be implemented in a future update */}
                      <p className="text-gray-600 italic">Interactive quiz coming soon. The quiz will include structure labeling, sequence matching, and knowledge testing about the pollen germination process.</p>
                      <div className="flex justify-center">
                        <Button disabled>Start Quiz</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Learning Objectives</h3>
                <ul className="space-y-2">
                  {experimentData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 bg-green-100 rounded-full p-1">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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

export default BiologyPollenGermination;
