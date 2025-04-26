
import React, { useState, useEffect } from 'react';
import { Check, X, Droplets, Info, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BloodGroup, BloodTest } from '@/types/experiments';

const bloodGroups: BloodGroup[] = [
  { 
    name: 'A+', 
    hasAntigenA: true, 
    hasAntigenB: false, 
    isRhPositive: true,
    description: 'Has A antigens on red blood cells and anti-B antibodies in plasma. Contains Rh factor.'
  },
  { 
    name: 'A-', 
    hasAntigenA: true, 
    hasAntigenB: false, 
    isRhPositive: false,
    description: 'Has A antigens on red blood cells and anti-B antibodies in plasma. Does not contain Rh factor.'
  },
  { 
    name: 'B+', 
    hasAntigenA: false, 
    hasAntigenB: true, 
    isRhPositive: true,
    description: 'Has B antigens on red blood cells and anti-A antibodies in plasma. Contains Rh factor.'
  },
  { 
    name: 'B-', 
    hasAntigenA: false, 
    hasAntigenB: true, 
    isRhPositive: false,
    description: 'Has B antigens on red blood cells and anti-A antibodies in plasma. Does not contain Rh factor.'
  },
  { 
    name: 'AB+', 
    hasAntigenA: true, 
    hasAntigenB: true, 
    isRhPositive: true,
    description: 'Has both A and B antigens on red blood cells and no antibodies in plasma. Contains Rh factor.'
  },
  { 
    name: 'AB-', 
    hasAntigenA: true, 
    hasAntigenB: true, 
    isRhPositive: false,
    description: 'Has both A and B antigens on red blood cells and no antibodies in plasma. Does not contain Rh factor.'
  },
  { 
    name: 'O+', 
    hasAntigenA: false, 
    hasAntigenB: false, 
    isRhPositive: true,
    description: 'Has no A or B antigens on red blood cells but contains anti-A and anti-B antibodies in plasma. Contains Rh factor.'
  },
  { 
    name: 'O-', 
    hasAntigenA: false, 
    hasAntigenB: false, 
    isRhPositive: false,
    description: 'Has no A or B antigens on red blood cells but contains anti-A and anti-B antibodies in plasma. Does not contain Rh factor.'
  }
];

const BloodGroupSimulation: React.FC = () => {
  const [currentBloodGroup, setCurrentBloodGroup] = useState<BloodGroup | null>(null);
  const [selectedTests, setSelectedTests] = useState<Record<string, boolean>>({
    'Anti-A': false,
    'Anti-B': false,
    'Anti-D': false
  });
  const [testResults, setTestResults] = useState<BloodTest[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [gameState, setGameState] = useState<'playing' | 'submitted' | 'feedback'>('playing');
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  
  // Initialize with a random blood group
  useEffect(() => {
    startNewTest();
  }, []);
  
  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, gameState]);
  
  const startNewTest = () => {
    const randomIndex = Math.floor(Math.random() * bloodGroups.length);
    setCurrentBloodGroup(bloodGroups[randomIndex]);
    setSelectedTests({
      'Anti-A': false,
      'Anti-B': false,
      'Anti-D': false
    });
    setTestResults([]);
    setUserAnswer('');
    setGameState('playing');
    setTimer(0);
    setIsTimerRunning(true);
    setShowHint(false);
  };

  const toggleTest = (testType: string) => {
    if (gameState !== 'playing') return;
    
    setSelectedTests(prev => ({
      ...prev,
      [testType]: !prev[testType]
    }));
  };
  
  const performTest = (testType: string) => {
    if (!currentBloodGroup || !selectedTests[testType]) return null;
    
    let result = false;
    
    switch (testType) {
      case 'Anti-A':
        result = currentBloodGroup.hasAntigenA;
        break;
      case 'Anti-B':
        result = currentBloodGroup.hasAntigenB;
        break;
      case 'Anti-D':
        result = currentBloodGroup.isRhPositive;
        break;
    }
    
    // Add to test results if not already there
    const existingTest = testResults.find(test => test.reagent === testType);
    if (!existingTest) {
      setTestResults(prev => [
        ...prev,
        {
          reagent: testType,
          bloodType: currentBloodGroup.name,
          result
        }
      ]);
    }
    
    return result;
  };
  
  const checkAnswer = () => {
    if (!currentBloodGroup) return;
    
    const isCorrect = userAnswer === currentBloodGroup.name;
    
    if (isCorrect) {
      toast.success("Correct! That's the right blood type.");
      setScore(prev => prev + 1);
    } else {
      toast.error(`Incorrect. The actual blood type was ${currentBloodGroup.name}`);
    }
    
    setTotalAttempts(prev => prev + 1);
    setGameState('feedback');
    setIsTimerRunning(false);
  };
  
  const getAgglutinationClass = (testType: string): string => {
    if (!selectedTests[testType]) return 'bg-red-100';
    
    const result = performTest(testType);
    if (result === null) return 'bg-red-100';
    
    return result 
      ? 'bg-red-400 animate-pulse-slow' // agglutination effect
      : 'bg-red-200'; // no agglutination
  };
  
  const getReactionText = (testType: string): string => {
    if (!selectedTests[testType]) return 'No test performed';
    
    const result = performTest(testType);
    if (result === null) return 'No test performed';
    
    return result 
      ? 'Agglutination (clumping)' 
      : 'No reaction';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const calculateAccuracy = (): string => {
    if (totalAttempts === 0) return '0%';
    return `${Math.round((score / totalAttempts) * 100)}%`;
  };
  
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="mb-6">
        <div className="bg-purple-50 p-4 mb-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Blood Group Identification</h3>
          <p className="text-sm text-gray-600">
            Identify the blood group by applying antibodies and observing agglutination reactions. 
            Agglutination (clumping) indicates a positive reaction.
          </p>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                Score: {score}/{totalAttempts}
              </div>
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                Accuracy: {calculateAccuracy()}
              </div>
            </div>
            <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
              Time: {formatTime(timer)}
            </div>
          </div>
        </div>
        
        {gameState === 'playing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Test tubes / Slides */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <h4 className="text-md font-medium mb-4">Test Results</h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Anti-A</span>
                      <Button 
                        size="sm" 
                        variant={selectedTests['Anti-A'] ? "default" : "outline"}
                        onClick={() => toggleTest('Anti-A')}
                      >
                        {selectedTests['Anti-A'] ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                    <div className={`h-20 rounded-lg flex items-end justify-center p-2 transition-all duration-500 ${getAgglutinationClass('Anti-A')}`}>
                      <div className="relative">
                        {selectedTests['Anti-A'] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            {performTest('Anti-A') && (
                              <div className="w-full h-full bg-red-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                              </div>
                            )}
                          </div>
                        )}
                        <Droplets className="h-8 w-8 text-red-500" />
                      </div>
                    </div>
                    <p className="text-xs text-center">{getReactionText('Anti-A')}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Anti-B</span>
                      <Button 
                        size="sm" 
                        variant={selectedTests['Anti-B'] ? "default" : "outline"}
                        onClick={() => toggleTest('Anti-B')}
                      >
                        {selectedTests['Anti-B'] ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                    <div className={`h-20 rounded-lg flex items-end justify-center p-2 transition-all duration-500 ${getAgglutinationClass('Anti-B')}`}>
                      <div className="relative">
                        {selectedTests['Anti-B'] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            {performTest('Anti-B') && (
                              <div className="w-full h-full bg-red-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                              </div>
                            )}
                          </div>
                        )}
                        <Droplets className="h-8 w-8 text-red-500" />
                      </div>
                    </div>
                    <p className="text-xs text-center">{getReactionText('Anti-B')}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Anti-D (Rh)</span>
                      <Button 
                        size="sm" 
                        variant={selectedTests['Anti-D'] ? "default" : "outline"}
                        onClick={() => toggleTest('Anti-D')}
                      >
                        {selectedTests['Anti-D'] ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                    <div className={`h-20 rounded-lg flex items-end justify-center p-2 transition-all duration-500 ${getAgglutinationClass('Anti-D')}`}>
                      <div className="relative">
                        {selectedTests['Anti-D'] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            {performTest('Anti-D') && (
                              <div className="w-full h-full bg-red-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full m-0.5"></div>
                              </div>
                            )}
                          </div>
                        )}
                        <Droplets className="h-8 w-8 text-red-500" />
                      </div>
                    </div>
                    <p className="text-xs text-center">{getReactionText('Anti-D')}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setShowHint(!showHint)}
                    className="mb-2"
                  >
                    <Info className="h-4 w-4 mr-1" /> {showHint ? 'Hide Hint' : 'Show Hint'}
                  </Button>
                  
                  {showHint && (
                    <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 mb-4">
                      <p className="font-medium mb-1">How to identify blood groups:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>If Anti-A causes agglutination, blood has A antigen (A or AB)</li>
                        <li>If Anti-B causes agglutination, blood has B antigen (B or AB)</li>
                        <li>If both Anti-A and Anti-B cause agglutination, blood type is AB</li>
                        <li>If neither Anti-A nor Anti-B cause agglutination, blood type is O</li>
                        <li>If Anti-D causes agglutination, blood is Rh+ (positive)</li>
                        <li>If Anti-D shows no reaction, blood is Rh- (negative)</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Identification Panel */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-md font-medium mb-4">Identify the Blood Group</h4>
                
                <div className="space-y-2 mb-6">
                  <p className="text-sm">Based on the reactions, select the blood group:</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {bloodGroups.map((group) => (
                      <Button
                        key={group.name}
                        size="sm"
                        variant={userAnswer === group.name ? "default" : "outline"}
                        onClick={() => setUserAnswer(group.name)}
                        className="justify-center"
                      >
                        {group.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={checkAnswer} 
                    disabled={!userAnswer || Object.values(selectedTests).filter(Boolean).length === 0}
                  >
                    Submit Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {gameState === 'feedback' && currentBloodGroup && (
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full mr-3 ${userAnswer === currentBloodGroup.name ? 'bg-green-100' : 'bg-red-100'}`}>
                {userAnswer === currentBloodGroup.name 
                  ? <Check className="h-6 w-6 text-green-600" />
                  : <X className="h-6 w-6 text-red-600" />
                }
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  {userAnswer === currentBloodGroup.name 
                    ? 'Correct!' 
                    : 'Incorrect'
                  }
                </h3>
                <p className="text-sm text-gray-600">
                  The blood group was {currentBloodGroup.name}
                </p>
              </div>
              
              {userAnswer === currentBloodGroup.name && (
                <div className="ml-auto">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Explanation</h4>
              <p className="text-sm">{currentBloodGroup.description}</p>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs font-medium mb-1">Anti-A Test</p>
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${currentBloodGroup.hasAntigenA ? 'bg-red-100' : 'bg-gray-100'}`}>
                    {currentBloodGroup.hasAntigenA ? '+' : '-'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium mb-1">Anti-B Test</p>
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${currentBloodGroup.hasAntigenB ? 'bg-red-100' : 'bg-gray-100'}`}>
                    {currentBloodGroup.hasAntigenB ? '+' : '-'}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium mb-1">Anti-D Test</p>
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${currentBloodGroup.isRhPositive ? 'bg-red-100' : 'bg-gray-100'}`}>
                    {currentBloodGroup.isRhPositive ? '+' : '-'}
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={startNewTest} className="w-full">
              Try Another Blood Sample
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodGroupSimulation;
