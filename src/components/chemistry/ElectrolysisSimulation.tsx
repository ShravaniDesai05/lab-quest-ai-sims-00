
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Battery,
  ZapIcon as Zap,
  Play,
  Pause,
  Plus,
  Minus,
} from 'lucide-react';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';

interface ElectrolysisSimulationProps {
  electrolytes?: Array<{
    name: string;
    formula: string;
    efficiency: number;
    color: string;
  }>;
}

const ElectrolysisSimulation: React.FC<ElectrolysisSimulationProps> = ({ 
  electrolytes = [
    { name: "Sulfuric Acid", formula: "H₂SO₄", efficiency: 1, color: "transparent" },
    { name: "Sodium Chloride", formula: "NaCl", efficiency: 0.7, color: "transparent" },
    { name: "Potassium Hydroxide", formula: "KOH", efficiency: 0.9, color: "rgba(173, 216, 230, 0.1)" }
  ]
}) => {
  const [isActive, setIsActive] = useState(false);
  const [voltage, setVoltage] = useState(9);
  const [reversedPolarity, setReversedPolarity] = useState(false);
  const [hydrogenVolume, setHydrogenVolume] = useState(0);
  const [oxygenVolume, setOxygenVolume] = useState(0);
  const [selectedElectrolyte, setSelectedElectrolyte] = useState(electrolytes[0]);
  const [challenge, setChallenge] = useState<{active: boolean, timeLeft: number, completed: boolean}>({ 
    active: false, 
    timeLeft: 30, 
    completed: false 
  });
  const [bubbleCount, setBubbleCount] = useState({hydrogen: 0, oxygen: 0});
  
  // Animation frame reference
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const challengeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Canvas references
  const beakerRef = useRef<HTMLDivElement>(null);
  
  // Sound effects
  const bubblingSound = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    bubblingSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
    bubblingSound.current.loop = true;
    
    return () => {
      bubblingSound.current?.pause();
    };
  }, []);
  
  // Effect to handle electrolysis process
  useEffect(() => {
    if (!isActive) {
      if (bubblingSound.current) {
        bubblingSound.current.pause();
      }
      return;
    }
    
    if (bubblingSound.current) {
      bubblingSound.current.volume = 0.2;
      bubblingSound.current.play().catch(() => console.log('Audio playback prevented'));
    }
    
    const baseBubbleRate = 0.1; // Base rate of bubble production
    let lastBubbleTime = 0;
    
    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      
      const deltaTime = time - previousTimeRef.current;
      previousTimeRef.current = time;
      
      // Calculate bubble creation based on voltage and electrolyte
      const bubbleRate = baseBubbleRate * (voltage / 10) * selectedElectrolyte.efficiency;
      
      // Increment gas volumes
      if (isActive) {
        // Scale volume increase with time, voltage, and electrolyte efficiency
        const volumeIncreaseBase = deltaTime * 0.002 * (voltage / 10) * selectedElectrolyte.efficiency;
        const hydrogenIncrease = volumeIncreaseBase * 2; // Hydrogen produces twice as much
        const oxygenIncrease = volumeIncreaseBase;
        
        setHydrogenVolume(prev => Math.min(prev + hydrogenIncrease, 100));
        setOxygenVolume(prev => Math.min(prev + oxygenIncrease, 50));
        
        // Create bubbles if enough time has passed
        if (time - lastBubbleTime > (1000 / bubbleRate)) {
          setBubbleCount(prev => ({
            hydrogen: prev.hydrogen + (reversedPolarity ? 1 : 2),
            oxygen: prev.oxygen + (reversedPolarity ? 2 : 1)
          }));
          lastBubbleTime = time;
        }
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, voltage, selectedElectrolyte, reversedPolarity]);
  
  // Challenge timer effect
  useEffect(() => {
    if (challenge.active && challenge.timeLeft > 0) {
      challengeTimerRef.current = setInterval(() => {
        setChallenge(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } 
    
    return () => {
      if (challengeTimerRef.current) {
        clearInterval(challengeTimerRef.current);
      }
    };
  }, [challenge.active]);
  
  // Check challenge completion
  useEffect(() => {
    if (challenge.active && !challenge.completed) {
      if (hydrogenVolume >= 40 && oxygenVolume >= 20) {
        setChallenge(prev => ({
          ...prev,
          completed: true
        }));
        if (challengeTimerRef.current) {
          clearInterval(challengeTimerRef.current);
        }
      } else if (challenge.timeLeft <= 0) {
        // Challenge failed
        setChallenge(prev => ({
          ...prev, 
          active: false
        }));
      }
    }
  }, [challenge, hydrogenVolume, oxygenVolume]);

  // Reset the simulation
  const resetSimulation = () => {
    setIsActive(false);
    setHydrogenVolume(0);
    setOxygenVolume(0);
    setBubbleCount({hydrogen: 0, oxygen: 0});
    setChallenge({active: false, timeLeft: 30, completed: false});
    
    if (bubblingSound.current) {
      bubblingSound.current.pause();
    }
  };
  
  // Start challenge mode
  const startChallenge = () => {
    resetSimulation();
    setIsActive(true);
    setChallenge({
      active: true, 
      timeLeft: 30, 
      completed: false
    });
  };

  // Generate bubbles for visual effect
  const renderBubbles = (side: 'left' | 'right', count: number) => {
    return [...Array(Math.min(count, 20))].map((_, i) => {
      const randomDelay = Math.random() * 5;
      const randomLeft = side === 'left' ? Math.random() * 15 + 20 : Math.random() * 15 + 65;
      const randomSize = Math.random() * 5 + 2;
      
      return (
        <div 
          key={`bubble-${side}-${i}`}
          className="absolute rounded-full bg-white bg-opacity-70 animate-bubble"
          style={{
            left: `${randomLeft}%`, 
            bottom: `${Math.random() * 40 + 60}%`, 
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      );
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="relative h-[500px] bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden">
            <CardContent className="p-0 h-full flex items-center justify-center">
              {/* Lab apparatus container */}
              <div className="relative w-full h-full flex flex-col items-center">
                {/* Power supply */}
                <div className="absolute top-4 w-64 h-20 bg-gray-700 rounded-lg flex items-center justify-between px-6">
                  <div className="flex flex-col items-center">
                    <span className="text-white text-xs mb-1">Voltage</span>
                    <div className="bg-black p-2 rounded-md">
                      <span className="text-green-400 font-mono">{voltage}V</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-1">
                    <Battery className="w-8 h-8 text-yellow-400" />
                  </div>
                  
                  <div className="flex space-x-1">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  </div>
                </div>
                
                {/* Beaker */}
                <div 
                  ref={beakerRef} 
                  className="relative w-3/4 h-[350px] mt-28 bg-blue-100 bg-opacity-50 border-2 border-gray-300 rounded-b-xl overflow-hidden"
                  style={{backgroundColor: selectedElectrolyte.color}}
                >
                  {/* Water level */}
                  <div className="absolute w-full h-3/4 bottom-0 bg-blue-200 bg-opacity-40">
                    {/* Add ripple effect */}
                    <div className="absolute top-0 w-full h-4 bg-white bg-opacity-20"></div>
                    
                    {/* Test tubes */}
                    <div className="absolute top-[-100px] left-1/4 transform -translate-x-1/2 w-20 h-40">
                      {/* Hydrogen tube */}
                      <div className="absolute w-14 h-28 bg-transparent border-2 border-gray-300 rounded-t-full overflow-hidden">
                        {/* Hydrogen gas */}
                        <div 
                          className="absolute bottom-0 w-full bg-gray-100 bg-opacity-80 transition-all duration-500 rounded-t-full"
                          style={{ height: `${hydrogenVolume}%` }}
                        >
                          <div className="absolute top-2 left-0 right-0 text-center text-xs font-semibold">
                            H₂
                          </div>
                          <div className="absolute bottom-2 left-0 right-0 text-center text-[8px]">
                            {hydrogenVolume.toFixed(1)} ml
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-[-5px] left-7 transform -translate-x-1/2 w-1 h-20 bg-gray-500"></div>
                      <div className="absolute bottom-[-20px] left-7 transform -translate-x-1/2 text-xs font-semibold">
                        {reversedPolarity ? "Anode" : "Cathode"}
                      </div>
                    </div>
                    
                    {/* Test tubes */}
                    <div className="absolute top-[-100px] right-1/4 transform translate-x-1/2 w-20 h-40">
                      {/* Oxygen tube */}
                      <div className="absolute w-14 h-28 bg-transparent border-2 border-gray-300 rounded-t-full overflow-hidden">
                        {/* Oxygen gas */}
                        <div 
                          className="absolute bottom-0 w-full bg-gray-100 bg-opacity-80 transition-all duration-500 rounded-t-full"
                          style={{ height: `${oxygenVolume}%` }}
                        >
                          <div className="absolute top-2 left-0 right-0 text-center text-xs font-semibold">
                            O₂
                          </div>
                          <div className="absolute bottom-2 left-0 right-0 text-center text-[8px]">
                            {oxygenVolume.toFixed(1)} ml
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-[-5px] right-7 transform translate-x-1/2 w-1 h-20 bg-gray-500"></div>
                      <div className="absolute bottom-[-20px] right-7 transform translate-x-1/2 text-xs font-semibold">
                        {reversedPolarity ? "Cathode" : "Anode"}
                      </div>
                    </div>
                    
                    {/* Electrodes */}
                    <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 w-2 h-24 bg-gray-800 rounded-t-md"></div>
                    <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 w-2 h-24 bg-gray-800 rounded-t-md"></div>
                    
                    {/* Bubbles */}
                    {isActive && renderBubbles('left', bubbleCount.hydrogen)}
                    {isActive && renderBubbles('right', bubbleCount.oxygen)}
                    
                    {/* Wires */}
                    <div className={`absolute bottom-[-10px] left-1/4 transform -translate-x-1/2 w-2 h-10 ${reversedPolarity ? 'bg-red-500' : 'bg-black'}`}></div>
                    <div className={`absolute bottom-[-10px] right-1/4 transform translate-x-1/2 w-2 h-10 ${reversedPolarity ? 'bg-black' : 'bg-red-500'}`}></div>
                  </div>
                </div>
                
                {/* Reaction equation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 p-2 rounded-lg shadow-md">
                  <div className="font-mono text-center">
                    2H₂O(l) → 2H₂(g) + O₂(g)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Electrolysis Controls</h3>
              
              {/* Control Panel */}
              <div className="space-y-6">
                {/* Start/Stop Button */}
                <div className="flex justify-center">
                  <Button 
                    className={`px-8 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    {isActive ? (
                      <>
                        <Pause className="mr-2" size={16} />
                        Stop Electrolysis
                      </>
                    ) : (
                      <>
                        <Play className="mr-2" size={16} />
                        Start Electrolysis
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Voltage Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="voltage">Voltage</Label>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 w-8 p-0" 
                        onClick={() => setVoltage(v => Math.max(3, v - 1))}
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="w-8 text-center">{voltage}V</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setVoltage(v => Math.min(15, v + 1))}
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                  </div>
                  <Slider 
                    value={[voltage]} 
                    min={3} 
                    max={15} 
                    step={1} 
                    onValueChange={([val]) => setVoltage(val)} 
                  />
                </div>
                
                {/* Electrolyte Selection */}
                <div className="space-y-2">
                  <Label>Electrolyte</Label>
                  <ToggleGroup type="single" defaultValue="H₂SO₄" onValueChange={(value) => {
                    const selected = electrolytes.find(e => e.formula === value);
                    if (selected) setSelectedElectrolyte(selected);
                  }}>
                    {electrolytes.map((electrolyte) => (
                      <ToggleGroupItem
                        key={electrolyte.formula}
                        value={electrolyte.formula}
                        variant="outline"
                        size="sm"
                      >
                        <span title={electrolyte.name}>{electrolyte.formula}</span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <div className="text-sm text-gray-500">
                    {selectedElectrolyte.name}
                  </div>
                </div>
                
                {/* Polarity Reversal */}
                <div className="flex justify-between items-center">
                  <Label htmlFor="reverse-polarity">Reverse Polarity</Label>
                  <Switch 
                    id="reverse-polarity" 
                    checked={reversedPolarity}
                    onCheckedChange={setReversedPolarity}
                  />
                </div>
                
                {/* Reset Button */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={resetSimulation}
                >
                  Reset Experiment
                </Button>
                
                {/* Challenge Mode */}
                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-semibold flex items-center">
                    <Zap className="inline-block mr-1 w-4 h-4 text-yellow-500" />
                    Challenge Mode
                  </h4>
                  
                  {challenge.active && !challenge.completed ? (
                    <div className="space-y-2">
                      <div className="text-sm">
                        Collect exactly 40 ml of H₂ and 20 ml of O₂ before time runs out!
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Time left:</span>
                        <span className={`font-mono ${challenge.timeLeft < 10 ? "text-red-600" : ""}`}>
                          {challenge.timeLeft}s
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000" 
                          style={{ width: `${(challenge.timeLeft / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : challenge.completed ? (
                    <div className="bg-green-100 border-green-300 border rounded-md p-3 text-green-800">
                      <div className="font-semibold">Challenge completed!</div>
                      <div className="text-sm mt-1">
                        Great job! You've successfully collected the required gas volumes.
                      </div>
                      <Button className="w-full mt-2 bg-green-600" onClick={resetSimulation}>
                        Start Again
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700" 
                      onClick={startChallenge}
                    >
                      Start Challenge
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ElectrolysisSimulation;
