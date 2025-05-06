import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { WaveSource, WaveMedium, Obstacle, WaveSimulationSettings } from "@/types/experiments";
import { Circle, Ruler, BarChart, Waves } from "lucide-react";

const WaveInterferenceSimulation: React.FC = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("setup");
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const [settings, setSettings] = useState<WaveSimulationSettings>({
    sources: [
      {
        id: 'source1',
        x: 150,
        y: 200,
        frequency: 2,
        amplitude: 10,
        phase: 0,
        enabled: true,
        type: 'circular',
        color: 'rgba(0, 120, 255, 0.7)'
      },
      {
        id: 'source2',
        x: 350,
        y: 200,
        frequency: 2,
        amplitude: 10,
        phase: 0,
        enabled: true,
        type: 'circular',
        color: 'rgba(255, 0, 120, 0.7)'
      }
    ],
    medium: {
      name: 'Water',
      waveSpeed: 5,
      damping: 0.02,
      color: '#e5f7ff'
    },
    showIntensityMap: false,
    showWavefronts: true,
    showMathOverlay: false,
    obstacles: [],
    measurementMode: 'none'
  });

  const [challengeCompleted, setChallengeCaompleted] = useState({
    matchPattern: false,
    measureWavelength: false,
    obstacleMastery: false
  });

  const [time, setTime] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<string>('default');
  
  // Scenarios
  const scenarios = {
    default: { name: "Default Setup", description: "Two circular wave sources with identical frequencies" },
    youngSlit: { name: "Young's Double Slit", description: "Plane waves passing through two narrow slits" },
    interference: { name: "Interference Patterns", description: "Sources with equal frequency but different phase" },
    diffraction: { name: "Diffraction", description: "Waves bending around obstacles" }
  };

  // Animation frame handler
  useEffect(() => {
    if (isRunning) {
      const animate = () => {
        setTime(prev => prev + 0.05);
        drawWaves();
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [isRunning, settings]);

  // Draw waves on canvas
  const drawWaves = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = settings.medium.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw grid lines
    for (let x = 0; x <= canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Create an array to hold intensity values for the entire canvas
    const intensity = Array(canvas.width).fill(0).map(() => Array(canvas.height).fill(0));
    
    // Calculate wave displacement for each pixel
    for (let x = 0; x < canvas.width; x += 4) {
      for (let y = 0; y < canvas.height; y += 4) {
        let netDisplacement = 0;
        
        // Calculate contribution from each source
        settings.sources.forEach(source => {
          if (source.enabled) {
            let distance = 0;
            
            if (source.type === 'circular') {
              // For circular waves, distance is from source position
              distance = Math.sqrt(Math.pow(x - source.x, 2) + Math.pow(y - source.y, 2));
            } else {
              // For plane waves, distance depends on orientation (simplified here)
              distance = y;
            }
            
            // Wave equation: A * sin(kx - ωt + φ)
            // where k is wavenumber, ω is angular frequency, φ is phase
            const wavelength = settings.medium.waveSpeed / source.frequency;
            const wavenumber = (2 * Math.PI) / wavelength;
            const angularFrequency = 2 * Math.PI * source.frequency;
            
            // Include damping factor based on distance from source
            const damping = Math.exp(-settings.medium.damping * distance);
            
            // Calculate displacement
            const displacement = source.amplitude * damping * 
              Math.sin(wavenumber * distance - angularFrequency * time + source.phase * (Math.PI / 180));
            
            netDisplacement += displacement;
          }
        });
        
        // Store the intensity (squared displacement)
        intensity[x][y] = Math.pow(netDisplacement, 2);
        
        // Skip pixels for performance
        if (settings.showWavefronts || settings.showIntensityMap) {
          // Draw wave displacement
          if (settings.showWavefronts) {
            // Use color gradient based on displacement
            let color;
            if (netDisplacement > 0) {
              color = `rgba(0, 0, 255, ${Math.min(Math.abs(netDisplacement) / 20, 0.7)})`;
            } else {
              color = `rgba(255, 0, 0, ${Math.min(Math.abs(netDisplacement) / 20, 0.7)})`;
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 4, 4);
          }
          
          // Draw intensity map
          if (settings.showIntensityMap) {
            const intensityValue = Math.min(intensity[x][y] / 100, 1);
            ctx.fillStyle = `rgba(255, 255, 0, ${intensityValue})`;
            ctx.fillRect(x, y, 4, 4);
          }
        }
      }
    }
    
    // Draw obstacles
    ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
    settings.obstacles.forEach(obstacle => {
      ctx.save();
      ctx.translate(obstacle.x, obstacle.y);
      ctx.rotate(obstacle.rotation * Math.PI / 180);
      ctx.fillRect(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);
      ctx.restore();
    });
    
    // Draw sources
    settings.sources.forEach(source => {
      if (source.enabled) {
        ctx.beginPath();
        ctx.arc(source.x, source.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = source.color;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.stroke();
        
        // Label source
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(source.id === 'source1' ? 'S1' : 'S2', source.x + 10, source.y - 10);
      }
    });
    
    // Draw measurement tools
    if (settings.measurementMode === 'ruler') {
      // Draw ruler
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 300);
      ctx.lineTo(400, 300);
      ctx.stroke();
      
      // Draw ticks
      for (let x = 100; x <= 400; x += 10) {
        const height = x % 50 === 0 ? 15 : (x % 25 === 0 ? 10 : 5);
        ctx.beginPath();
        ctx.moveTo(x, 300);
        ctx.lineTo(x, 300 + height);
        ctx.stroke();
        
        if (x % 50 === 0) {
          ctx.fillStyle = 'black';
          ctx.font = '12px Arial';
          ctx.fillText(`${(x - 100) / 10}`, x - 5, 330);
        }
      }
      
      // Label
      ctx.fillStyle = 'black';
      ctx.font = '14px Arial';
      ctx.fillText('Distance (cm)', 220, 350);
    }
    
    // Draw math overlay if enabled
    if (settings.showMathOverlay) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(10, 10, 300, 80);
      ctx.fillStyle = 'black';
      ctx.font = '14px Arial';
      
      // Get wave parameters for equation display
      const wavelength = settings.medium.waveSpeed / settings.sources[0].frequency;
      const period = 1 / settings.sources[0].frequency;
      
      ctx.fillText(`λ = ${wavelength.toFixed(2)} cm`, 20, 30);
      ctx.fillText(`f = ${settings.sources[0].frequency.toFixed(2)} Hz`, 20, 50);
      ctx.fillText(`T = ${period.toFixed(2)} s`, 20, 70);
      ctx.fillText(`v = ${settings.medium.waveSpeed.toFixed(2)} cm/s`, 150, 30);
      ctx.fillText(`Δφ = ${(settings.sources[1].phase - settings.sources[0].phase).toFixed(2)}°`, 150, 50);
      
      // Calculate distance between sources
      const distance = Math.sqrt(
        Math.pow(settings.sources[1].x - settings.sources[0].x, 2) + 
        Math.pow(settings.sources[1].y - settings.sources[0].y, 2)
      );
      ctx.fillText(`d = ${(distance / 10).toFixed(2)} cm`, 150, 70);
    }
  };

  // Handle source position drag
  const handleSourceDrag = (event: React.MouseEvent<HTMLCanvasElement>, sourceIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setSettings(prev => {
      const newSources = [...prev.sources];
      newSources[sourceIndex] = {
        ...newSources[sourceIndex],
        x,
        y
      };
      return { ...prev, sources: newSources };
    });
  };

  // Update source frequency
  const updateFrequency = (value: number, sourceIndex: number) => {
    setSettings(prev => {
      const newSources = [...prev.sources];
      newSources[sourceIndex] = {
        ...newSources[sourceIndex],
        frequency: value
      };
      return { ...prev, sources: newSources };
    });
  };

  // Update source phase
  const updatePhase = (value: number, sourceIndex: number) => {
    setSettings(prev => {
      const newSources = [...prev.sources];
      newSources[sourceIndex] = {
        ...newSources[sourceIndex],
        phase: value
      };
      return { ...prev, sources: newSources };
    });
  };

  // Toggle source type
  const toggleSourceType = (sourceIndex: number) => {
    setSettings(prev => {
      const newSources = [...prev.sources];
      newSources[sourceIndex] = {
        ...newSources[sourceIndex],
        type: newSources[sourceIndex].type === 'circular' ? 'linear' : 'circular'
      };
      return { ...prev, sources: newSources };
    });
  };

  // Load scenario
  const loadScenario = (scenarioKey: string) => {
    setSelectedScenario(scenarioKey);
    
    switch(scenarioKey) {
      case 'youngSlit':
        setSettings({
          ...settings,
          sources: [
            {
              id: 'source1',
              x: 250,
              y: 50,
              frequency: 2,
              amplitude: 10,
              phase: 0,
              enabled: true,
              type: 'linear',
              color: 'rgba(0, 120, 255, 0.7)'
            }
          ],
          obstacles: [
            {
              type: 'barrier',
              x: 250,
              y: 150,
              width: 400,
              height: 20,
              rotation: 0
            },
            {
              type: 'slit',
              x: 200,
              y: 150,
              width: 20,
              height: 20,
              rotation: 0
            },
            {
              type: 'slit',
              x: 300,
              y: 150,
              width: 20,
              height: 20,
              rotation: 0
            }
          ],
          showIntensityMap: true,
          measurementMode: 'ruler'
        });
        break;
        
      case 'interference':
        setSettings({
          ...settings,
          sources: [
            {
              id: 'source1',
              x: 150,
              y: 200,
              frequency: 2,
              amplitude: 10,
              phase: 0,
              enabled: true,
              type: 'circular',
              color: 'rgba(0, 120, 255, 0.7)'
            },
            {
              id: 'source2',
              x: 350,
              y: 200,
              frequency: 2,
              amplitude: 10,
              phase: 180,
              enabled: true,
              type: 'circular',
              color: 'rgba(255, 0, 120, 0.7)'
            }
          ],
          obstacles: [],
          showIntensityMap: true
        });
        break;
        
      case 'diffraction':
        setSettings({
          ...settings,
          sources: [
            {
              id: 'source1',
              x: 150,
              y: 200,
              frequency: 3,
              amplitude: 12,
              phase: 0,
              enabled: true,
              type: 'circular',
              color: 'rgba(0, 120, 255, 0.7)'
            }
          ],
          obstacles: [
            {
              type: 'barrier',
              x: 300,
              y: 200,
              width: 20,
              height: 100,
              rotation: 0
            }
          ],
          showIntensityMap: false,
          showWavefronts: true
        });
        break;
        
      default:
        setSettings({
          ...settings,
          sources: [
            {
              id: 'source1',
              x: 150,
              y: 200,
              frequency: 2,
              amplitude: 10,
              phase: 0,
              enabled: true,
              type: 'circular',
              color: 'rgba(0, 120, 255, 0.7)'
            },
            {
              id: 'source2',
              x: 350,
              y: 200,
              frequency: 2,
              amplitude: 10,
              phase: 0,
              enabled: true,
              type: 'circular',
              color: 'rgba(255, 0, 120, 0.7)'
            }
          ],
          obstacles: [],
          showIntensityMap: false,
          showWavefronts: true
        });
    }
    
    toast({
      title: "Scenario Loaded",
      description: `Loaded scenario: ${scenarios[scenarioKey as keyof typeof scenarios].name}`,
      variant: "default",
    });
  };

  // Challenge verification
  const verifyChallenge = (challengeType: string) => {
    switch(challengeType) {
      case 'matchPattern':
        // Check if the user has replicated the target pattern
        if (settings.sources[0].frequency === 2 && 
            settings.sources[1].frequency === 2 && 
            settings.sources[1].phase === 180) {
          setChallengeCaompleted(prev => ({...prev, matchPattern: true}));
          
          if (!earnedBadges.includes('matchPattern')) {
            setEarnedBadges(prev => [...prev, 'matchPattern']);
            toast({
              title: "Challenge Completed!",
              description: "You've successfully matched the interference pattern!",
              variant: "default",
            });
          }
        } else {
          toast({
            title: "Not Quite Right",
            description: "Try adjusting your frequencies and phase difference to match the target pattern.",
            variant: "default",
          });
        }
        break;
        
      case 'measureWavelength':
        // Verify the user has measured correctly
        if (settings.measurementMode === 'ruler') {
          setChallengeCaompleted(prev => ({...prev, measureWavelength: true}));
          
          if (!earnedBadges.includes('measureWavelength')) {
            setEarnedBadges(prev => [...prev, 'measureWavelength']);
            toast({
              title: "Challenge Completed!",
              description: "You've successfully used the measurement tools to determine wavelength!",
              variant: "default",
            });
          }
        }
        break;
        
      case 'obstacleMastery':
        // Check if the user has used obstacles to create diffraction
        if (settings.obstacles.length > 0) {
          setChallengeCaompleted(prev => ({...prev, obstacleMastery: true}));
          
          if (!earnedBadges.includes('obstacleMastery')) {
            setEarnedBadges(prev => [...prev, 'obstacleMastery']);
            toast({
              title: "Challenge Completed!",
              description: "You've mastered wave diffraction around obstacles!",
              variant: "default",
            });
          }
        }
        break;
    }
    
    // Check if all badges have been earned
    if (challengeCompleted.matchPattern && 
        challengeCompleted.measureWavelength && 
        challengeCompleted.obstacleMastery &&
        !earnedBadges.includes('wavemaster')) {
      setEarnedBadges(prev => [...prev, 'wavemaster']);
      toast({
        title: "Wave Master!",
        description: "You've mastered all wave interference challenges!",
        variant: "default",
      });
    }
  };

  // Export simulation data
  const exportData = () => {
    // Create CSV content
    let csvContent = "x,y,intensity\n";
    
    // Create a dummy run through the simulation to get data
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Sample points
    for (let x = 0; x < width; x += 10) {
      for (let y = 0; y < height; y += 10) {
        let netDisplacement = 0;
        
        // Calculate contribution from each source
        settings.sources.forEach(source => {
          if (source.enabled) {
            const distance = Math.sqrt(Math.pow(x - source.x, 2) + Math.pow(y - source.y, 2));
            const wavelength = settings.medium.waveSpeed / source.frequency;
            const wavenumber = (2 * Math.PI) / wavelength;
            const angularFrequency = 2 * Math.PI * source.frequency;
            const damping = Math.exp(-settings.medium.damping * distance);
            const displacement = source.amplitude * damping * 
              Math.sin(wavenumber * distance - angularFrequency * time + source.phase * (Math.PI / 180));
            netDisplacement += displacement;
          }
        });
        
        const intensity = Math.pow(netDisplacement, 2);
        csvContent += `${x},${y},${intensity}\n`;
      }
    }
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'wave_interference_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Data Exported",
      description: "Wave interference data has been exported as CSV",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-2">Water Wave Interference Simulation</h2>
        <p className="text-gray-600">
          Explore wave interference patterns, constructive and destructive interference, 
          and observe how changing parameters affects the wave behavior.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Scenario Selection</h3>
                <div className="space-y-4">
                  <Select value={selectedScenario} onValueChange={loadScenario}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(scenarios).map(([key, scenario]) => (
                        <SelectItem key={key} value={key}>
                          {scenario.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedScenario && (
                    <p className="text-sm text-gray-600">
                      {scenarios[selectedScenario as keyof typeof scenarios].description}
                    </p>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-4">Medium Properties</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="waveSpeed">Wave Speed (cm/s): {settings.medium.waveSpeed}</Label>
                    <Slider
                      id="waveSpeed"
                      value={[settings.medium.waveSpeed]}
                      min={1}
                      max={10}
                      step={0.5}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev, 
                        medium: { ...prev.medium, waveSpeed: value[0] }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="damping">Damping Factor: {settings.medium.damping}</Label>
                    <Slider
                      id="damping"
                      value={[settings.medium.damping]}
                      min={0}
                      max={0.1}
                      step={0.005}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev, 
                        medium: { ...prev.medium, damping: value[0] }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Visualization Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showWavefronts">Show Wavefronts</Label>
                    <Switch
                      id="showWavefronts"
                      checked={settings.showWavefronts}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        showWavefronts: checked
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showIntensityMap">Show Intensity Map</Label>
                    <Switch
                      id="showIntensityMap"
                      checked={settings.showIntensityMap}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        showIntensityMap: checked
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showMathOverlay">Show Mathematical Overlay</Label>
                    <Switch
                      id="showMathOverlay"
                      checked={settings.showMathOverlay}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        showMathOverlay: checked
                      }))}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="measurementMode">Measurement Tool</Label>
                    <Select 
                      value={settings.measurementMode} 
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        measurementMode: value as 'none' | 'ruler' | 'probe'
                      }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Tool" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="ruler">Ruler</SelectItem>
                        <SelectItem value="probe">Amplitude Probe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    onClick={exportData} 
                    className="w-full">
                    Export Data as CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Wave Source Settings</h3>
              
              <div className="space-y-6">
                {settings.sources.map((source, index) => (
                  <div key={source.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Source {index + 1}</h4>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleSourceType(index)}>
                          {source.type === 'circular' ? <Circle size={16} /> : <Waves size={16} />}
                          {source.type === 'circular' ? 'Circular' : 'Linear'}
                        </Button>
                        
                        <Switch
                          id={`source-${index}-enabled`}
                          checked={source.enabled}
                          onCheckedChange={(checked) => {
                            setSettings(prev => {
                              const newSources = [...prev.sources];
                              newSources[index] = {
                                ...newSources[index],
                                enabled: checked
                              };
                              return { ...prev, sources: newSources };
                            });
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-3">
                      <div>
                        <Label htmlFor={`frequency-${index}`}>
                          Frequency (Hz): {source.frequency}
                        </Label>
                        <Slider
                          id={`frequency-${index}`}
                          value={[source.frequency]}
                          min={1}
                          max={5}
                          step={0.1}
                          onValueChange={(value) => updateFrequency(value[0], index)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`phase-${index}`}>
                          Phase (degrees): {source.phase}
                        </Label>
                        <Slider
                          id={`phase-${index}`}
                          value={[source.phase]}
                          min={0}
                          max={360}
                          step={10}
                          onValueChange={(value) => updatePhase(value[0], index)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`amplitude-${index}`}>
                          Amplitude: {source.amplitude}
                        </Label>
                        <Slider
                          id={`amplitude-${index}`}
                          value={[source.amplitude]}
                          min={1}
                          max={15}
                          step={1}
                          onValueChange={(value) => {
                            setSettings(prev => {
                              const newSources = [...prev.sources];
                              newSources[index] = {
                                ...newSources[index],
                                amplitude: value[0]
                              };
                              return { ...prev, sources: newSources };
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="simulation" className="p-4">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex space-x-4">
              <Button 
                onClick={() => setIsRunning(!isRunning)}
                variant={isRunning ? "destructive" : "default"}
              >
                {isRunning ? "Pause Simulation" : "Start Simulation"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setTime(0);
                  if (canvasRef.current) {
                    drawWaves();
                  }
                }}
              >
                Reset
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <canvas 
                ref={canvasRef} 
                width={500} 
                height={400} 
                className="bg-blue-50"
              />
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Click and drag wave sources to reposition them. Use controls in Setup tab to adjust parameters.</p>
            </div>
            
            {settings.showMathOverlay && (
              <Card className="mt-4 w-full">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">Wave Equations</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <p>Wave Speed (v) = Frequency (f) × Wavelength (λ)</p>
                      <p>v = {settings.medium.waveSpeed} cm/s</p>
                    </div>
                    <div>
                      <p>Wave Number (k) = 2π / λ</p>
                      <p>Angular Frequency (ω) = 2πf</p>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-4">Interference Conditions:</h4>
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    <li>Constructive Interference: Path difference = nλ</li>
                    <li>Destructive Interference: Path difference = (n+1/2)λ</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">Match the Interference Pattern</h3>
                  {challengeCompleted.matchPattern && (
                    <Badge className="bg-green-600">Completed</Badge>
                  )}
                </div>
                
                <p className="text-gray-600 mt-2">
                  Create a pattern with destructive interference along the center line by adjusting 
                  the phase difference between two sources.
                </p>
                
                <div className="mt-4">
                  <h4 className="font-medium">Success Criteria:</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    <li>Set both sources to circular</li>
                    <li>Equal frequencies (2 Hz)</li>
                    <li>Phase difference of 180°</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => verifyChallenge('matchPattern')}
                  className="mt-4 w-full"
                >
                  Verify Pattern
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">Measure the Wavelength</h3>
                  {challengeCompleted.measureWavelength && (
                    <Badge className="bg-green-600">Completed</Badge>
                  )}
                </div>
                
                <p className="text-gray-600 mt-2">
                  Using the ruler tool, measure the distance between adjacent interference fringes
                  and calculate the wavelength.
                </p>
                
                <div className="mt-4">
                  <h4 className="font-medium">Success Criteria:</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    <li>Enable the ruler measurement tool</li>
                    <li>Measure the distance between adjacent bright fringes</li>
                    <li>Calculate wavelength using the formula: λ = d·fringe-spacing / D</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => verifyChallenge('measureWavelength')}
                  className="mt-4 w-full"
                >
                  Submit Measurement
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">Obstacle Mastery</h3>
                  {challengeCompleted.obstacleMastery && (
                    <Badge className="bg-green-600">Completed</Badge>
                  )}
                </div>
                
                <p className="text-gray-600 mt-2">
                  Create a diffraction pattern by placing obstacles in the path of waves.
                  Try different scenarios like Young's double slit experiment.
                </p>
                
                <div className="mt-4">
                  <h4 className="font-medium">Success Criteria:</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    <li>Use the Young's Double Slit scenario</li>
                    <li>Enable the intensity map visualization</li>
                    <li>Observe the interference pattern behind the slits</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => verifyChallenge('obstacleMastery')}
                  className="mt-4 w-full"
                >
                  Check Diffraction
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Your Achievements</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge className={earnedBadges.includes('matchPattern') ? "bg-green-600" : "bg-gray-200"}>
                      Pattern Matcher
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {earnedBadges.includes('matchPattern') ? "Achieved!" : "Not completed"}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={earnedBadges.includes('measureWavelength') ? "bg-green-600" : "bg-gray-200"}>
                      Wave Analyst
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {earnedBadges.includes('measureWavelength') ? "Achieved!" : "Not completed"}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={earnedBadges.includes('obstacleMastery') ? "bg-green-600" : "bg-gray-200"}>
                      Diffraction Master
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {earnedBadges.includes('obstacleMastery') ? "Achieved!" : "Not completed"}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Badge variant="outline" className={earnedBadges.includes('wavemaster') ? "border-green-600 text-green-600" : "border-gray-300 text-gray-400"}>
                      WAVE INTERFERENCE MASTER
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {earnedBadges.includes('wavemaster') ? "Achieved!" : "Complete all challenges"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaveInterferenceSimulation;
