
import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Award, Thermometer, FlaskConical, Circle, TestTube, ChartLine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartTooltip, 
  ChartLegendContent, 
  ChartLegend
} from "@/components/ui/chart";
import { 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: React.ReactNode;
}

// Define the optimal temperature range for catalase enzyme
const OPTIMAL_TEMP_MIN = 35;
const OPTIMAL_TEMP_MAX = 40;
const MAX_BUBBLES = 50;
const MAX_TIME = 60; // 60 seconds game time

export const CatalaseEnzymeSimulation = () => {
  const [temperature, setTemperature] = useState<number>(20); // Default temperature: 20°C
  const [bubbleRate, setBubbleRate] = useState<number>(0);
  const [bubbles, setBubbles] = useState<Array<{id: number; x: number; y: number; size: number; speed: number}>>([]);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(MAX_TIME);
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<Array<{temp: number, rate: number}>>([]);
  const [showFormula, setShowFormula] = useState<boolean>(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { 
      id: 'bubble-master', 
      name: 'Bubble Master', 
      description: 'Found optimal temperature quickly', 
      unlocked: false,
      icon: <Circle className="h-4 w-4 text-blue-500" />
    },
    { 
      id: 'cool-chemist', 
      name: 'Cool Chemist', 
      description: 'Kept enzyme stable for 30 seconds', 
      unlocked: false,
      icon: <TestTube className="h-4 w-4 text-green-500" />
    },
    { 
      id: 'denatured', 
      name: 'Oops! Denatured!', 
      description: 'Burned the enzyme', 
      unlocked: false,
      icon: <FlaskConical className="h-4 w-4 text-red-500" />
    }
  ]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stabilityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stableTimeRef = useRef<number>(0);
  const { toast } = useToast();
  
  // Calculate reaction rate based on temperature
  // Uses a bell curve with max at ~37°C (optimal temperature for catalase)
  const calculateReactionRate = (temp: number) => {
    // Bell curve formula: rate = exp(-0.01 * (temp - 37)^2)
    const rate = Math.exp(-0.01 * Math.pow(temp - 37, 2));
    return rate;
  };
  
  // Update bubble rate when temperature changes
  useEffect(() => {
    const rate = calculateReactionRate(temperature);
    setBubbleRate(rate);
    
    // Add data point every time temperature changes significantly
    if (gameActive && temperature % 5 === 0) {
      setDataPoints(prev => [...prev, { temp: temperature, rate: rate }]);
    }
    
    // Check for achievements
    if (temperature >= 70 && !achievements.find(a => a.id === 'denatured')?.unlocked) {
      unlockAchievement('denatured');
    }
    
    // If temperature is in optimal range, check for stability
    if (temperature >= OPTIMAL_TEMP_MIN && temperature <= OPTIMAL_TEMP_MAX && gameActive) {
      if (!stabilityTimerRef.current) {
        stableTimeRef.current = 0;
        stabilityTimerRef.current = setInterval(() => {
          stableTimeRef.current += 1;
          if (stableTimeRef.current >= 30 && !achievements.find(a => a.id === 'cool-chemist')?.unlocked) {
            unlockAchievement('cool-chemist');
            if (stabilityTimerRef.current) {
              clearInterval(stabilityTimerRef.current);
              stabilityTimerRef.current = null;
            }
          }
        }, 1000);
      }
    } else if (stabilityTimerRef.current) {
      clearInterval(stabilityTimerRef.current);
      stabilityTimerRef.current = null;
    }
  }, [temperature, gameActive]);
  
  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(a => 
      a.id === achievementId ? { ...a, unlocked: true } : a
    ));
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      toast({
        title: "Achievement Unlocked!",
        description: `${achievement.name}: ${achievement.description}`,
        duration: 3000,
      });
      // Also play a sound here
      // const sound = new Audio('/achievement-sound.mp3');
      // sound.play();
    }
  };
  
  // Start game mode
  const startGame = () => {
    setGameActive(true);
    setTimeLeft(MAX_TIME);
    setGameScore(0);
    setDataPoints([]);
    
    // Reset achievements for new game
    setAchievements(prev => prev.map(a => ({ ...a, unlocked: false })));
    
    // Start countdown
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    gameTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
      
      // Add score based on current bubble rate
      setGameScore(prev => prev + Math.round(bubbleRate * 10));
    }, 1000);
  };
  
  const endGame = () => {
    setGameActive(false);
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }
    if (stabilityTimerRef.current) {
      clearInterval(stabilityTimerRef.current);
      stabilityTimerRef.current = null;
    }
    
    // Check for "Bubble Master" achievement
    if (gameScore > 300 && !achievements.find(a => a.id === 'bubble-master')?.unlocked) {
      unlockAchievement('bubble-master');
    }
    
    toast({
      title: "Experiment Complete!",
      description: `Final score: ${gameScore}`,
      duration: 5000,
    });
  };
  
  // Generate data for the complete enzyme activity curve
  const generateEnzymeActivityCurve = () => {
    const data = [];
    for (let temp = 0; temp <= 80; temp += 5) {
      data.push({
        temp,
        rate: calculateReactionRate(temp)
      });
    }
    return data;
  };

  // Animation loop for bubble simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Test tube properties
    const tubeWidth = canvas.width * 0.3;
    const tubeHeight = canvas.height * 0.7;
    const tubeX = canvas.width / 2 - tubeWidth / 2;
    const tubeY = canvas.height - tubeHeight - 20;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw test tube
      ctx.fillStyle = '#D3E4FD'; // Light blue liquid
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      
      // Test tube body
      ctx.beginPath();
      ctx.moveTo(tubeX, tubeY);
      ctx.lineTo(tubeX, tubeY + tubeHeight - 20);
      ctx.arc(tubeX + tubeWidth / 2, tubeY + tubeHeight - 20, tubeWidth / 2, Math.PI, 0);
      ctx.lineTo(tubeX + tubeWidth, tubeY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Test tube rim
      ctx.beginPath();
      ctx.ellipse(tubeX + tubeWidth / 2, tubeY, tubeWidth / 2, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f3f3f3';
      ctx.fill();
      ctx.stroke();
      
      // Draw thermometer
      const thermWidth = 10;
      const thermHeight = tubeHeight * 0.8;
      const thermX = tubeX + tubeWidth + 40;
      const thermY = tubeY + (tubeHeight - thermHeight) / 2;
      
      // Thermometer body
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#333';
      ctx.beginPath();
      ctx.roundRect(thermX, thermY, thermWidth, thermHeight, [5]);
      ctx.fill();
      ctx.stroke();
      
      // Thermometer bulb
      ctx.beginPath();
      ctx.arc(thermX + thermWidth / 2, thermY + thermHeight, thermWidth, 0, Math.PI * 2);
      ctx.fillStyle = '#EA384C'; // Red for thermometer
      ctx.fill();
      ctx.stroke();
      
      // Thermometer mercury
      const mercuryHeight = (temperature / 80) * thermHeight;
      ctx.fillStyle = '#EA384C';
      ctx.beginPath();
      ctx.roundRect(thermX + 2, thermY + thermHeight - mercuryHeight, thermWidth - 4, mercuryHeight, [3]);
      ctx.fill();
      
      // Temperature markings
      ctx.fillStyle = '#333';
      ctx.font = '10px Arial';
      for (let i = 0; i <= 8; i++) {
        const y = thermY + thermHeight - (i / 8) * thermHeight;
        ctx.fillText(`${i * 10}°C`, thermX + thermWidth + 5, y + 3);
        
        // Marking lines
        ctx.beginPath();
        ctx.moveTo(thermX - 3, y);
        ctx.lineTo(thermX + thermWidth + 3, y);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Create bubbles based on reaction rate
      if (gameActive) {
        const maxNewBubbles = Math.floor(bubbleRate * 3);
        
        if (bubbles.length < MAX_BUBBLES && Math.random() < bubbleRate) {
          for (let i = 0; i < maxNewBubbles; i++) {
            if (Math.random() < 0.3) { // Throttle bubble creation
              const size = Math.random() * 8 + 2;
              const newBubble = {
                id: Date.now() + Math.random(),
                x: tubeX + Math.random() * tubeWidth * 0.8 + tubeWidth * 0.1,
                y: tubeY + tubeHeight - 30,
                size,
                speed: bubbleRate * (Math.random() * 2 + 1)
              };
              setBubbles(prev => [...prev, newBubble]);
            }
          }
        }
      }
      
      // Update and draw existing bubbles
      setBubbles(prev => 
        prev
          .map(bubble => ({
            ...bubble,
            y: bubble.y - bubble.speed
          }))
          .filter(bubble => bubble.y + bubble.size > 0) // Remove bubbles that are off-screen
      );
      
      // Draw bubbles
      bubbles.forEach(bubble => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      
      // Enzyme health visualization
      let enzymeHealth = 1;
      if (temperature < 10) {
        // Enzyme too cold
        enzymeHealth = temperature / 10;
      } else if (temperature > 50) {
        // Enzyme too hot (denaturing)
        enzymeHealth = Math.max(0, 1 - (temperature - 50) / 30);
      }
      
      // Draw enzyme health indicator
      ctx.fillStyle = enzymeHealth < 0.3 ? '#EA384C' : enzymeHealth < 0.7 ? '#FFA500' : '#4CAF50';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Enzyme Health: ${Math.round(enzymeHealth * 100)}%`, canvas.width / 2 - 70, 20);
      
      // Draw enzyme molecules (with deformation based on temperature)
      drawEnzymeMolecule(ctx, tubeX + tubeWidth / 4, tubeY + tubeHeight / 2, enzymeHealth);
      drawEnzymeMolecule(ctx, tubeX + tubeWidth / 2, tubeY + tubeHeight / 3, enzymeHealth);
      drawEnzymeMolecule(ctx, tubeX + 3 * tubeWidth / 4, tubeY + 2 * tubeHeight / 3, enzymeHealth);
      
      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bubbles, temperature, bubbleRate, gameActive]);
  
  // Draw an enzyme molecule with deformation based on enzyme health
  const drawEnzymeMolecule = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    health: number
  ) => {
    ctx.save();
    
    // Enzyme size
    const size = 15;
    
    // Apply deformation based on health
    if (health < 1) {
      // Apply skew/deformation for unhealthy enzyme
      ctx.translate(x, y);
      if (health < 0.5) {
        // Extreme deformation for very unhealthy enzymes
        const deformFactor = 1 - health * 1.5;
        ctx.rotate(deformFactor * Math.PI / 6);
        ctx.scale(1, 1 - deformFactor * 0.5);
        x = 0;
        y = 0;
      }
    }
    
    // Draw enzyme shape
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.bezierCurveTo(
      x - size, y - size, 
      x + size, y - size, 
      x + size, y
    );
    ctx.bezierCurveTo(
      x + size, y + size, 
      x - size, y + size, 
      x - size, y
    );
    
    // Color based on health
    const r = Math.round(255 - health * 150);
    const g = Math.round(health * 200);
    const b = Math.round(100 + health * 100);
    
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Add "active site" to enzyme
    ctx.beginPath();
    ctx.arc(x, y, size / 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 200, 0.8)';
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
      if (stabilityTimerRef.current) {
        clearInterval(stabilityTimerRef.current);
      }
    };
  }, []);
  
  // Generate curve data
  const curveData = generateEnzymeActivityCurve();
  
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="w-full md:w-3/4 space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '350px' }}>
            <canvas 
              ref={canvasRef} 
              className="w-full h-full"
              style={{ touchAction: 'none' }}
            />
            
            {temperature > 65 && (
              <div className="absolute top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md animate-pulse">
                Warning! Enzyme denaturing!
              </div>
            )}
            
            {gameActive && (
              <div className="absolute top-4 left-4 bg-white bg-opacity-80 rounded-md p-2 flex flex-col">
                <span className="text-sm font-bold">Time: {timeLeft}s</span>
                <span className="text-sm font-bold">Score: {gameScore}</span>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Thermometer className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-semibold">Temperature Control: {temperature}°C</span>
            </div>
            <Slider
              min={0}
              max={80}
              step={1}
              value={[temperature]}
              onValueChange={([value]) => setTemperature(value)}
              className="mb-4"
            />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Reaction Rate</span>
                <span className="text-sm font-medium">{(bubbleRate * 100).toFixed(0)}%</span>
              </div>
              <Progress value={bubbleRate * 100} className="h-2" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {!gameActive ? (
              <Button onClick={startGame} variant="default">
                Start Challenge Mode
              </Button>
            ) : (
              <Button onClick={endGame} variant="destructive">
                End Experiment
              </Button>
            )}
            
            <Button 
              onClick={() => setShowGraph(!showGraph)} 
              variant="outline"
            >
              {showGraph ? "Hide Graph" : "Show Graph"}
            </Button>
            
            <Button 
              onClick={() => setShowFormula(!showFormula)} 
              variant="outline"
            >
              {showFormula ? "Hide Formula" : "Show Formula"}
            </Button>
          </div>
          
          {showFormula && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-2">Catalase Enzyme Activity Formula</h3>
              <p className="mb-2">The reaction rate (r) for an enzyme at temperature (T) follows a bell curve:</p>
              <div className="bg-white p-2 rounded text-center font-mono">
                r = e^(-k(T-Tₒ)²)
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Where Tₒ is the optimal temperature (37°C) and k is a constant determining 
                the width of the curve. This models how enzyme activity peaks at optimal temperature 
                and decreases as temperature diverges from optimal.
              </p>
            </div>
          )}
          
          {showGraph && (
            <Card className="bg-white p-2 rounded-lg">
              <CardContent>
                <h3 className="font-semibold mb-2 flex items-center">
                  <ChartLine className="h-5 w-5 mr-2 text-blue-500" />
                  Temperature vs. Reaction Rate
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={curveData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="temp" 
                        label={{ value: 'Temperature (°C)', position: 'bottom', offset: 0 }}
                        domain={[0, 80]}
                      />
                      <YAxis
                        label={{ value: 'Reaction Rate', angle: -90, position: 'insideLeft' }}
                        domain={[0, 1]}
                      />
                      <Tooltip 
                        formatter={(value: number) => [value.toFixed(2), 'Reaction Rate']}
                        labelFormatter={(label) => `Temperature: ${label}°C`}
                      />
                      <Legend />
                      
                      {/* Optimal temperature reference range */}
                      <ReferenceLine x={37} stroke="green" strokeDasharray="3 3" label="Optimal" />
                      
                      <Line
                        type="monotone"
                        dataKey="rate"
                        name="Enzyme Activity"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                      
                      {/* Highlight data points collected during game */}
                      {gameActive && dataPoints.map((point, index) => (
                        <Line
                          key={`data-${index}`}
                          data={[point]}
                          type="monotone"
                          dataKey="rate"
                          name="Your Data"
                          stroke="#ef4444"
                          strokeWidth={0}
                          dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4, fill: '#ef4444' }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right sidebar with achievements and experiment info */}
        <div className="w-full md:w-1/4 space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-3 flex items-center">
              <Award className="h-5 w-5 text-amber-500 mr-2" />
              Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`flex items-center p-2 rounded-md ${
                    achievement.unlocked ? 'bg-amber-50 border border-amber-200 animate-achievement-unlock' : 'bg-gray-50'
                  }`}
                >
                  <div className={`p-1 rounded-full mr-2 ${
                    achievement.unlocked ? 'bg-amber-100' : 'bg-gray-200'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${
                      achievement.unlocked ? 'text-amber-800' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {achievement.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Experiment Info</h3>
            <p className="text-sm text-gray-600 mb-2">
              Catalase is an enzyme that breaks down hydrogen peroxide (H₂O₂) into water and oxygen:
            </p>
            <div className="bg-gray-50 p-2 rounded text-center mb-2">
              2 H₂O₂ → 2 H₂O + O₂ (gas bubbles)
            </div>
            <p className="text-sm text-gray-600">
              Like all enzymes, catalase works best at its optimal temperature (around 37°C). 
              At low temperatures, enzyme activity slows due to reduced molecular motion. 
              At high temperatures, the enzyme denatures (loses its shape) and stops working.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
