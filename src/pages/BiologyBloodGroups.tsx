
import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Check, ChevronRight, Eye, Info, Timer, Trophy, Award, Droplets } from 'lucide-react';
import BloodGroupSimulation from '@/components/biology/BloodGroupSimulation';
import ExperimentSteps from '@/components/physics/ExperimentSteps';

const BiologyBloodGroups = () => {
  const experimentData = {
    title: 'Blood Group Identification',
    subject: 'Biology',
    difficulty: 'Intermediate',
    duration: '25 minutes',
    description: 'Learn how to identify different blood groups (A, B, AB, O, Rh+ and Rh-) by simulating the agglutination reaction with antibodies (Anti-A, Anti-B, Anti-D).',
    objectives: [
      'Understand the ABO blood group system and Rh factor',
      'Identify different blood groups based on agglutination patterns',
      'Learn the principles of antigen-antibody reactions',
      'Apply knowledge of blood typing to medical scenarios'
    ],
    theory: `Blood typing is essential in medicine, particularly for blood transfusions and certain medical procedures. The two main classification systems are the ABO system and the Rh system.

In the ABO system, there are four blood types: A, B, AB, and O. These types are determined by the presence or absence of A and B antigens on the surface of red blood cells:
- Type A has A antigens
- Type B has B antigens
- Type AB has both A and B antigens
- Type O has neither A nor B antigens

The Rh system classifies blood as either Rh-positive or Rh-negative, based on the presence or absence of the Rh D antigen on red blood cells.

Blood typing is performed by mixing a blood sample with antibodies (Anti-A, Anti-B, and Anti-D) and observing whether agglutination (clumping) occurs. Agglutination indicates that the corresponding antigen is present in the blood.`,
    steps: [
      'Collect blood samples and prepare them for testing',
      'Label three slides or wells for Anti-A, Anti-B, and Anti-D reagents',
      'Place a drop of blood on each slide',
      'Add the corresponding antibody reagent to each slide',
      'Mix gently and wait for 2-3 minutes',
      'Observe for agglutination (clumping) in each slide',
      'Record the results for each antibody test',
      'Determine the blood group based on the pattern of agglutination'
    ]
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
                    <BloodGroupSimulation />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="theory" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Blood Typing Theory</h3>
                    <p className="text-gray-700 whitespace-pre-line mb-4">{experimentData.theory}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                      <h4 className="text-blue-800 font-medium mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" /> Key Concepts
                      </h4>
                      <ul className="list-disc ml-5 text-blue-700 space-y-1">
                        <li>ABO blood group system: A, B, AB, and O blood types</li>
                        <li>Rh factor: Rh+ (positive) or Rh- (negative)</li>
                        <li>Agglutination: Clumping of red blood cells due to antigen-antibody reactions</li>
                        <li>Transfusion compatibility: Matching donor and recipient blood types</li>
                      </ul>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium mb-2">ABO Blood Groups</h4>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Blood Type</th>
                              <th className="text-center py-2">Has A Antigen</th>
                              <th className="text-center py-2">Has B Antigen</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">A</td>
                              <td className="text-center">Yes</td>
                              <td className="text-center">No</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">B</td>
                              <td className="text-center">No</td>
                              <td className="text-center">Yes</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">AB</td>
                              <td className="text-center">Yes</td>
                              <td className="text-center">Yes</td>
                            </tr>
                            <tr>
                              <td className="py-2">O</td>
                              <td className="text-center">No</td>
                              <td className="text-center">No</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium mb-2">Agglutination Reactions</h4>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Blood Type</th>
                              <th className="text-center py-2">Anti-A</th>
                              <th className="text-center py-2">Anti-B</th>
                              <th className="text-center py-2">Anti-D</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">A+</td>
                              <td className="text-center">+</td>
                              <td className="text-center">-</td>
                              <td className="text-center">+</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">A-</td>
                              <td className="text-center">+</td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">B+</td>
                              <td className="text-center">-</td>
                              <td className="text-center">+</td>
                              <td className="text-center">+</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">B-</td>
                              <td className="text-center">-</td>
                              <td className="text-center">+</td>
                              <td className="text-center">-</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">AB+</td>
                              <td className="text-center">+</td>
                              <td className="text-center">+</td>
                              <td className="text-center">+</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">AB-</td>
                              <td className="text-center">+</td>
                              <td className="text-center">+</td>
                              <td className="text-center">-</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">O+</td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                              <td className="text-center">+</td>
                            </tr>
                            <tr>
                              <td className="py-2">O-</td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="procedure" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <ExperimentSteps steps={experimentData.steps} bgColor="bg-green-50" />
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
                      <Droplets className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Blood Typing Expert</h4>
                      <div className="mt-1 h-1.5 w-36 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-600 h-full rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Biology Explorer</h4>
                      <div className="mt-1 h-1.5 w-36 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }}></div>
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

export default BiologyBloodGroups;
