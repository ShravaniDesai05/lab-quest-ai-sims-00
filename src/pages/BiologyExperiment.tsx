import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Check, ChevronRight, Eye, Info, Timer, Trophy, Award, Microscope, FlaskConical } from 'lucide-react';

const OsmosisSimulation = () => {
  const [saltConcentration, setSaltConcentration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [potatoSize, setPotatoSize] = useState(100);
  
  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (elapsedTime < 100) {
          setElapsedTime(prev => prev + 1);
          
          const targetSize = saltConcentration < 50 
            ? 100 + ((50 - saltConcentration) * 0.6) 
            : 100 - ((saltConcentration - 50) * 0.6);
          
          setPotatoSize(prev => {
            const diff = targetSize - prev;
            return prev + (diff * 0.1);
          });
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isRunning, elapsedTime, saltConcentration]);
  
  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      if (elapsedTime >= 100) {
        setElapsedTime(0);
        setPotatoSize(100);
      }
    }
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setPotatoSize(100);
  };
  
  return (
    <div>
      <div className="bg-white border rounded-lg p-4 mb-4">
        <div className="h-64 relative bg-blue-50 rounded-md mb-4 overflow-hidden">
          <div className="absolute inset-0 bg-blue-100">
            {Array.from({ length: Math.round(saltConcentration / 5) }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse-subtle"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div 
                className="bg-yellow-800 rounded-md transition-all duration-300"
                style={{ 
                  width: `${potatoSize}px`, 
                  height: `${potatoSize * 0.6}px`
                }}
              >
                <div className="absolute inset-2 border-2 border-dashed border-yellow-600 rounded-sm opacity-70"></div>
              </div>
            </div>
          </div>
          
          {isRunning && (
            <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs flex items-center">
              <Timer className="w-3 h-3 mr-1" />
              {elapsedTime}s
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salt Concentration: {saltConcentration}%
            </label>
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              value={[saltConcentration]}
              onValueChange={([value]) => setSaltConcentration(value)}
              disabled={isRunning && elapsedTime > 0}
            />
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={isRunning && elapsedTime > 0 && elapsedTime < 100}
            >
              Reset
            </Button>
            <Button 
              onClick={handleStartStop}
              variant={isRunning ? "destructive" : "default"}
            >
              {isRunning ? "Stop" : "Start"} Simulation
            </Button>
          </div>
        </div>
      </div>
      
      {elapsedTime >= 100 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-green-800">Experiment Complete!</h4>
            <p className="text-green-700 text-sm">
              You have observed how {saltConcentration < 50 ? 'low' : 'high'} salt concentration affects osmosis in plant cells.
              {saltConcentration < 50 
                ? ' Water moved into the potato cells making them more turgid and the potato expanded.' 
                : ' Water moved out of the potato cells making them less turgid and the potato shrunk.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const BiologyExperiment = () => {
  const { experimentId } = useParams<{ experimentId: string }>();
  
  const experimentData = {
    title: 'Observing Osmosis in a Potato',
    subject: 'Biology',
    difficulty: 'Beginner',
    duration: '30 minutes',
    description: 'Explore how water moves across cell membranes through osmosis by observing changes in potato slices placed in solutions with different salt concentrations.',
    objectives: [
      'Observe the effect of osmosis in plant cells',
      'Compare how different salt concentrations affect osmosis rates',
      'Understand hypotonic and hypertonic solutions'
    ],
    theory: `Osmosis is the movement of water molecules from an area of high water concentration 
    (low solute concentration) to an area of low water concentration (high solute concentration) 
    across a semi-permeable membrane. Plant cells have a semi-permeable membrane that allows water 
    to move in and out of the cell based on the concentration gradient.
    
    When a plant cell is placed in a hypotonic solution (low salt, high water), water moves into the cell,
    causing it to swell and become turgid. When placed in a hypertonic solution (high salt, low water),
    water moves out of the cell, causing it to shrink and become flaccid.`
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
            <span className="bg-green-100 text-lab-green text-xs font-medium rounded px-2 py-1">
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
                <TabsTrigger value="data">Data Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="simulation" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <OsmosisSimulation />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="theory" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Osmosis Theory</h3>
                    <p className="text-gray-700 whitespace-pre-line mb-4">{experimentData.theory}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                      <h4 className="text-blue-800 font-medium mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" /> Key Concepts
                      </h4>
                      <ul className="list-disc ml-5 text-blue-700 space-y-1">
                        <li>Semi-permeable membranes allow some substances to pass through but not others</li>
                        <li>Hypotonic: Solution has lower solute concentration than the cell</li>
                        <li>Hypertonic: Solution has higher solute concentration than the cell</li>
                        <li>Isotonic: Solution has equal solute concentration as the cell</li>
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
                        <span className="font-medium text-gray-900">Prepare solutions</span>
                        <p className="mt-1">Create solutions with different salt concentrations (0%, 25%, 50%, 75%, 100%).</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Prepare potato samples</span>
                        <p className="mt-1">Cut potato into equal-sized cubes or cylinders.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Initial measurements</span>
                        <p className="mt-1">Measure and record the mass and size of each potato sample.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Immerse samples</span>
                        <p className="mt-1">Place each potato sample in a different solution concentration.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Wait for osmosis</span>
                        <p className="mt-1">Allow the samples to sit for 30 minutes as osmosis occurs.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Final measurements</span>
                        <p className="mt-1">Remove samples, blot dry, and measure final mass and size.</p>
                      </li>
                      <li className="text-gray-700">
                        <span className="font-medium text-gray-900">Analysis</span>
                        <p className="mt-1">Calculate percent change in mass and size for each sample.</p>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="data" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Data Analysis</h3>
                    <p className="text-gray-700 mb-4">
                      After completing your experiment, plot your results here to analyze the relationship
                      between salt concentration and changes in potato mass due to osmosis.
                    </p>
                    
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-8 w-8 text-gray-400 mr-2" />
                      <span className="text-gray-500">Data plotting feature coming soon</span>
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
                      <Microscope className="h-5 w-5 text-lab-green" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Biology Beginner</h4>
                      <div className="mt-1 h-1.5 w-36 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-lab-green h-full rounded-full" style={{ width: '66%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Science Explorer</h4>
                      <div className="mt-1 h-1.5 w-36 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '30%' }}></div>
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

export default BiologyExperiment;
