
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { Line, Tooltip, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Beaker, FlaskConical, TestTube, Atom } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Catalyst {
  name: string;
  formula: string;
  effectiveness: number;
  color: string;
}

interface CatalystReactionSimulationProps {
  catalystOptions: Catalyst[];
}

const CatalystReactionSimulation: React.FC<CatalystReactionSimulationProps> = ({ 
  catalystOptions = [] 
}) => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [hasCatalyst, setHasCatalyst] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [reactionProgressA, setReactionProgressA] = useState(0);
  const [reactionProgressB, setReactionProgressB] = useState(0);
  const [selectedCatalyst, setSelectedCatalyst] = useState<Catalyst | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [challengeMode, setChallengeMode] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Constants for reaction rates
  const BASE_REACTION_RATE = 5; // progress points per second without catalyst
  const MAX_REACTION_TIME = 30; // seconds for the reaction to complete
  
  useEffect(() => {
    if (catalystOptions.length > 0 && !selectedCatalyst) {
      setSelectedCatalyst(catalystOptions[0]);
    }
  }, [catalystOptions]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleStartReaction = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setElapsedTime(0);
    setReactionProgressA(0);
    setReactionProgressB(0);
    setChartData([{ time: 0, withCatalyst: 0, withoutCatalyst: 0 }]);
    setChallengeCompleted(false);
    
    startTimeRef.current = performance.now();
    lastUpdateTimeRef.current = performance.now();
    
    // Show a toast notification
    toast({
      title: "Reaction Started",
      description: hasCatalyst 
        ? `Added ${selectedCatalyst?.name} as catalyst` 
        : "Running without catalyst",
    });
    
    animationFrameRef.current = requestAnimationFrame(updateReaction);
  };

  const handleResetReaction = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setIsRunning(false);
    setElapsedTime(0);
    setReactionProgressA(0);
    setReactionProgressB(0);
    setChartData([]);
    startTimeRef.current = null;
  };

  const updateReaction = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const deltaTime = (timestamp - lastUpdateTimeRef.current) / 1000; // seconds
    lastUpdateTimeRef.current = timestamp;
    
    const newElapsedTime = (timestamp - startTimeRef.current) / 1000;
    setElapsedTime(newElapsedTime);
    
    // Calculate progress rates
    const progressRateA = BASE_REACTION_RATE * deltaTime;
    const catalystEffectiveness = hasCatalyst && selectedCatalyst ? selectedCatalyst.effectiveness : 0;
    const progressRateB = (BASE_REACTION_RATE + (BASE_REACTION_RATE * 4 * catalystEffectiveness)) * deltaTime;
    
    setReactionProgressA(prev => Math.min(prev + progressRateA, 100));
    setReactionProgressB(prev => Math.min(prev + progressRateB, 100));
    
    // Update chart data every half second
    if (Math.floor(newElapsedTime * 2) > Math.floor(((timestamp - startTimeRef.current) / 1000 - deltaTime) * 2)) {
      setChartData(prevData => [
        ...prevData,
        {
          time: Math.round(newElapsedTime * 10) / 10,
          withoutCatalyst: progressRateA / deltaTime,
          withCatalyst: progressRateB / deltaTime,
        }
      ]);
    }
    
    // Check if reactions are complete
    if (reactionProgressB >= 100) {
      if (challengeMode && !challengeCompleted) {
        const calculatedScore = Math.round((1 - (newElapsedTime / MAX_REACTION_TIME)) * 1000);
        setScore(calculatedScore > 0 ? calculatedScore : 0);
        setChallengeCompleted(true);
        toast({
          title: "Challenge Completed!",
          description: `Your score: ${calculatedScore > 0 ? calculatedScore : 0} points`,
        });
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsRunning(false);
      return;
    }
    
    if (newElapsedTime >= MAX_REACTION_TIME) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsRunning(false);
      
      if (challengeMode && !challengeCompleted) {
        setChallengeCompleted(true);
        setScore(0);
        toast({
          title: "Time's Up!",
          description: "The reaction couldn't be completed in time.",
          variant: "destructive",
        });
      }
      return;
    }
    
    animationFrameRef.current = requestAnimationFrame(updateReaction);
  };

  const handleToggleCatalyst = (checked: boolean) => {
    if (isRunning) return;
    setHasCatalyst(checked);
  };

  const handleSelectCatalyst = (catalystName: string) => {
    if (isRunning) return;
    const catalyst = catalystOptions.find(c => c.name === catalystName);
    if (catalyst) {
      setSelectedCatalyst(catalyst);
    }
  };

  const handleToggleChallengeMode = (checked: boolean) => {
    if (isRunning) return;
    setChallengeMode(checked);
    handleResetReaction();
  };

  // Calculate bubbles based on reaction progress and catalyst presence
  const getBubbleCount = (progress: number, withCatalyst: boolean) => {
    const baseCount = Math.floor(progress / 10);
    return withCatalyst ? baseCount * 2 : baseCount;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Challenge Mode</span>
          <Switch 
            checked={challengeMode} 
            onCheckedChange={handleToggleChallengeMode} 
            disabled={isRunning}
          />
        </div>
        {challengeMode && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Time:</span>
            <span>{Math.round((MAX_REACTION_TIME - elapsedTime) * 10) / 10}s</span>
          </div>
        )}
      </div>
      
      {challengeMode && challengeCompleted && (
        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Challenge Result</h3>
              <p className="text-lg mb-4">Your Score: <span className="font-bold text-purple-700">{score}</span></p>
              {score > 800 && (
                <Badge className="bg-yellow-500 mb-2">🏆 Catalyst Champion!</Badge>
              )}
              {score > 500 && score <= 800 && (
                <Badge className="bg-blue-500 mb-2">⚡ Reaction Accelerator</Badge>
              )}
              {score > 0 && score <= 500 && (
                <Badge className="bg-green-500 mb-2">🧪 Lab Assistant</Badge>
              )}
              {score === 0 && (
                <Badge className="bg-gray-500 mb-2">🔬 Novice Chemist</Badge>
              )}
              <Button 
                className="mt-4"
                onClick={handleResetReaction}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Control Panel */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Reaction Controls</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Atom className="h-5 w-5 text-purple-600" />
                    <span>Add Catalyst</span>
                  </div>
                  <Switch 
                    checked={hasCatalyst} 
                    onCheckedChange={handleToggleCatalyst} 
                    disabled={isRunning}
                  />
                </div>
                
                {hasCatalyst && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Catalyst
                    </label>
                    <Select
                      value={selectedCatalyst?.name}
                      onValueChange={handleSelectCatalyst}
                      disabled={isRunning}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a catalyst" />
                      </SelectTrigger>
                      <SelectContent>
                        {catalystOptions.map((catalyst) => (
                          <SelectItem key={catalyst.name} value={catalyst.name}>
                            {catalyst.name} ({catalyst.formula})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedCatalyst && (
                      <div className="mt-2 text-sm text-gray-600">
                        Effectiveness: {Math.round(selectedCatalyst.effectiveness * 100)}%
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={handleStartReaction} 
                    className="flex-1"
                    disabled={isRunning}
                  >
                    Start Reaction
                  </Button>
                  <Button 
                    onClick={handleResetReaction}
                    variant="outline"
                    className="flex-1"
                    disabled={!isRunning && elapsedTime === 0}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Reaction Time</h3>
            <div className="text-3xl font-mono text-center">
              {elapsedTime.toFixed(1)}s
            </div>
            {challengeMode && (
              <div className="mt-2">
                <Progress 
                  value={(elapsedTime / MAX_REACTION_TIME) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </div>
          
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {selectedCatalyst && hasCatalyst && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">Catalyst Status:</span>
                    </div>
                    <Badge className="bg-green-600">
                      Unchanged After Reaction ✓
                    </Badge>
                  </div>
                )}
                
                {hasCatalyst && selectedCatalyst && elapsedTime > 0 && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FlaskConical className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-medium">Did You Notice?</span>
                    </div>
                    <p className="text-sm">
                      With {selectedCatalyst.name}, the reaction is significantly faster because the catalyst 
                      provides an alternative pathway with lower activation energy. The catalyst itself remains 
                      chemically unchanged after the reaction!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Reaction Visualization */}
        <div className="space-y-6">
          {/* Beakers */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <div className="bg-gray-100 p-3 text-center font-medium border-b">
                Without Catalyst
              </div>
              <div className="h-64 relative bg-gradient-to-b from-blue-50 to-blue-100 flex items-end justify-center p-4">
                <div className="h-4/5 w-4/5 bg-blue-200 bg-opacity-80 rounded-b-xl relative overflow-hidden">
                  {/* Liquid */}
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-300 to-blue-200 transition-all duration-300"
                    style={{ height: '80%' }}
                  >
                    {/* Bubbles */}
                    {Array.from({ length: getBubbleCount(reactionProgressA, false) }).map((_, i) => (
                      <div 
                        key={`bubble-a-${i}`}
                        className="absolute rounded-full bg-white opacity-80"
                        style={{
                          width: `${Math.random() * 10 + 5}px`,
                          height: `${Math.random() * 10 + 5}px`,
                          left: `${Math.random() * 80 + 10}%`,
                          bottom: `${Math.random() * 70}%`,
                          animation: `bubbleRise ${Math.random() * 3 + 2}s linear infinite`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="absolute top-2 left-0 right-0 flex justify-center">
                    <Badge className="bg-blue-600 text-xs">
                      {Math.round(reactionProgressA)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="bg-gray-100 p-3 text-center font-medium border-b">
                With {hasCatalyst ? selectedCatalyst?.name : "No"} Catalyst
              </div>
              <div className="h-64 relative bg-gradient-to-b from-blue-50 to-blue-100 flex items-end justify-center p-4">
                <div className="h-4/5 w-4/5 bg-blue-200 bg-opacity-80 rounded-b-xl relative overflow-hidden">
                  {/* Liquid */}
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-300 to-blue-200 transition-all duration-300"
                    style={{ height: '80%' }}
                  >
                    {/* Catalyst particles */}
                    {hasCatalyst && selectedCatalyst && (
                      <div 
                        className="absolute bottom-2 left-0 right-0 flex justify-center"
                      >
                        <div 
                          className="h-3 w-3/4 rounded-full" 
                          style={{ backgroundColor: selectedCatalyst.color }}
                        />
                      </div>
                    )}
                    
                    {/* Bubbles */}
                    {Array.from({ length: getBubbleCount(reactionProgressB, hasCatalyst) }).map((_, i) => (
                      <div 
                        key={`bubble-b-${i}`}
                        className="absolute rounded-full bg-white opacity-80"
                        style={{
                          width: `${Math.random() * 10 + 5}px`,
                          height: `${Math.random() * 10 + 5}px`,
                          left: `${Math.random() * 80 + 10}%`,
                          bottom: `${Math.random() * 70}%`,
                          animation: `bubbleRise ${Math.random() * 2 + 1}s linear infinite`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="absolute top-2 left-0 right-0 flex justify-center">
                    <Badge className={hasCatalyst ? "bg-purple-600 text-xs" : "bg-blue-600 text-xs"}>
                      {Math.round(reactionProgressB)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Reaction Rate vs Time Graph */}
          {chartData.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Reaction Rate vs Time</h3>
                <div className="h-64">
                  <ChartContainer 
                    className="h-full" 
                    config={{
                      withCatalyst: { 
                        label: "With Catalyst", 
                        color: "#9b87f5" 
                      },
                      withoutCatalyst: { 
                        label: "Without Catalyst", 
                        color: "#33C3F0" 
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <Line 
                        data={chartData}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="time" 
                          label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} 
                        />
                        <YAxis 
                          label={{ value: 'Rate', angle: -90, position: 'insideLeft' }} 
                        />
                        <Tooltip 
                          content={
                            <ChartTooltipContent nameKey="dataKey" />
                          } 
                        />
                        <Legend />
                        <Line 
                          type="monotone"
                          name="withoutCatalyst" 
                          dataKey="withoutCatalyst" 
                          stroke="#33C3F0" 
                          dot={false} 
                        />
                        <Line 
                          type="monotone"
                          name="withCatalyst" 
                          dataKey="withCatalyst" 
                          stroke="#9b87f5" 
                          dot={false} 
                        />
                      </Line>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CatalystReactionSimulation;
