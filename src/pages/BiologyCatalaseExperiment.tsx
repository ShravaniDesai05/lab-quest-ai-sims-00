
import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { CatalaseEnzymeSimulation } from '@/components/biology/CatalaseEnzymeSimulation';
import { ArrowLeft, Check, ChevronRight, Eye, Info, Timer, Trophy, Award, Microscope, FlaskConical } from 'lucide-react';

const BiologyCatalaseExperiment = () => {
  const experimentData = {
    title: 'Effect of Temperature on Catalase Activity',
    subject: 'Biology',
    difficulty: 'Intermediate',
    duration: '45 minutes',
    description: 'Investigate how temperature affects the activity of catalase enzyme in breaking down hydrogen peroxide, resulting in the production of oxygen gas bubbles.',
    objectives: [
      'Observe how temperature affects enzyme activity',
      'Identify the optimal temperature for catalase',
      'Understand enzyme denaturation at extreme temperatures',
      'Analyze the relationship between temperature and reaction rate'
    ],
    theory: `Catalase is an enzyme found in nearly all living organisms. It catalyzes the decomposition of hydrogen peroxide (H₂O₂) into water and oxygen.

    2 H₂O₂ → 2 H₂O + O₂ (gas)

    Like all enzymes, catalase is a protein with a specific three-dimensional shape that allows it to function. This shape is maintained by weak bonds between different parts of the protein molecule.

    Enzymes work best at their optimal temperature - for catalase, this is around 37°C (human body temperature). At low temperatures, molecules move slower, reducing collision frequency between enzyme and substrate, slowing the reaction. As temperature increases toward the optimum, reaction rate increases.

    At high temperatures (typically above 50°C for catalase), these weak bonds break, causing the enzyme to unfold or "denature." Once denatured, the enzyme loses its specific shape and can no longer function properly, resulting in decreased activity or complete inactivation.

    The relationship between temperature and enzyme activity typically forms a bell-shaped curve, with maximum activity at the optimal temperature.`
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
              <Timer className="h-3 w-3 mr-1" />
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
                <TabsTrigger value="procedure">Procedure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="simulation" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <CatalaseEnzymeSimulation />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="theory" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Enzyme Theory</h3>
                    <p className="text-gray-700 whitespace-pre-line mb-4">{experimentData.theory}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                      <h4 className="text-blue-800 font-medium mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" /> Key Concepts
                      </h4>
                      <ul className="list-disc ml-5 text-blue-700 space-y-1">
                        <li>Enzymes are biological catalysts that speed up chemical reactions</li>
                        <li>Temperature affects the rate of enzyme-catalyzed reactions</li>
                        <li>Optimal temperature is where enzyme activity is highest</li>
                        <li>Denaturation occurs when an enzyme loses its shape due to high temperature</li>
                      </ul>
                    </div>
                    
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-8 w-8 text-gray-400 mr-2" />
                      <span className="text-gray-500">Interactive diagram coming soon</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="procedure" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Experiment Procedure</h3>
                    
                    <ol className="list-decimal ml-5 space-y-4">
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Prepare materials</span>
                        <p className="mt-1">Gather hydrogen peroxide solution, catalase source (such as liver or potato), test tubes, water baths.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Set up water baths</span>
                        <p className="mt-1">Prepare water baths at different temperatures (0°C, 10°C, 20°C, 37°C, 60°C, 80°C).</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Prepare enzyme source</span>
                        <p className="mt-1">Create a catalase solution by blending liver or potato in cold water and filtering.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Temperature equilibration</span>
                        <p className="mt-1">Place enzyme samples in each water bath for 5 minutes to equilibrate.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Conduct reaction</span>
                        <p className="mt-1">Add hydrogen peroxide to each enzyme sample and observe oxygen bubble production.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Measure reaction rate</span>
                        <p className="mt-1">Count bubbles produced per minute or measure height of foam.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Analysis</span>
                        <p className="mt-1">Plot reaction rate versus temperature and determine optimal temperature.</p>
                      </li>
                    </ol>
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
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  Related Achievements
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Microscope className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Biology Experimenter</h4>
                      <div className="mt-1 h-1.5 w-36 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-600 h-full rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Enzyme Master</h4>
                      <div className="mt-1 h-1.5 w-36 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default BiologyCatalaseExperiment;
