
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  FlaskConical, 
  TestTube, 
  Pipette, 
  ThermometerSun, 
  Clock, 
  Flame, 
  Battery,
  Beaker,
  AlertTriangle,
  Trash2,
  Filter,
  Download,
  Info,
  PlayCircle,
  FastForward,
  Scale,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Chemical, LabSimulationState } from '@/types/experiments';

const defaultChemicals: Chemical[] = [
  {
    id: 'hcl',
    name: 'Hydrochloric Acid',
    formula: 'HCl',
    type: 'acid',
    color: 'rgba(255, 255, 255, 0.8)',
    concentration: 0.1,
    hazardLevel: 'high',
    hazardLabel: 'Corrosive',
    description: 'Strong acid often used in lab experiments',
    reactions: {
      'naoh': {
        productName: 'Sodium Chloride',
        productFormula: 'NaCl',
        colorChange: 'transparent',
        precipitate: false
      }
    }
  },
  {
    id: 'naoh',
    name: 'Sodium Hydroxide',
    formula: 'NaOH',
    type: 'base',
    color: 'rgba(255, 255, 255, 0.8)',
    concentration: 0.1,
    hazardLevel: 'high',
    hazardLabel: 'Corrosive',
    description: 'Strong base used in many reactions'
  },
  {
    id: 'ph_indicator',
    name: 'Universal pH Indicator',
    formula: 'Indicator',
    type: 'indicator',
    color: 'rgba(148, 0, 211, 0.7)',
    hazardLevel: 'low',
    description: 'Shows pH through color changes'
  },
  {
    id: 'mgcl2',
    name: 'Magnesium Chloride',
    formula: 'MgCl₂',
    type: 'salt',
    color: 'rgba(255, 255, 255, 0.9)',
    hazardLevel: 'low',
    description: 'Salt used in flame tests',
    reactions: {
      'flame': {
        flameColor: '#f8f8f8'
      }
    }
  },
  {
    id: 'cucl2',
    name: 'Copper Chloride',
    formula: 'CuCl₂',
    type: 'salt',
    color: 'rgba(0, 200, 215, 0.5)',
    hazardLevel: 'medium',
    hazardLabel: 'Irritant',
    description: 'Salt that produces green-blue flame',
    reactions: {
      'flame': {
        flameColor: '#00FF7F'
      }
    }
  },
  {
    id: 'srcl2',
    name: 'Strontium Chloride',
    formula: 'SrCl₂',
    type: 'salt',
    color: 'rgba(255, 255, 255, 0.9)',
    hazardLevel: 'medium',
    description: 'Salt that produces crimson flame',
    reactions: {
      'flame': {
        flameColor: '#FF0000'
      }
    }
  },
  {
    id: 'h2o',
    name: 'Distilled Water',
    formula: 'H₂O',
    type: 'solvent',
    color: 'rgba(200, 200, 255, 0.2)',
    hazardLevel: 'low',
    description: 'Universal solvent'
  },
  {
    id: 'mno2',
    name: 'Manganese Dioxide',
    formula: 'MnO₂',
    type: 'catalyst',
    color: '#3D3C3A',
    hazardLevel: 'medium',
    description: 'Catalyst for H₂O₂ decomposition'
  },
  {
    id: 'h2o2',
    name: 'Hydrogen Peroxide',
    formula: 'H₂O₂',
    type: 'solvent',
    color: 'rgba(200, 200, 255, 0.2)',
    concentration: 0.03,
    hazardLevel: 'medium',
    hazardLabel: 'Oxidizer',
    description: 'Decomposes into water and oxygen',
    reactions: {
      'mno2': {
        gasProduction: true,
        gasName: 'Oxygen',
        temperatureChange: 5
      }
    }
  }
];

const defaultGlassware = [
  {
    id: 'beaker1',
    type: 'beaker' as const,
    capacity: 250,
    contents: [],
    position: { x: 100, y: 350 }
  },
  {
    id: 'test_tube1',
    type: 'test-tube' as const,
    capacity: 50,
    contents: [],
    position: { x: 250, y: 350 }
  },
  {
    id: 'flask1',
    type: 'flask' as const,
    capacity: 150,
    contents: [],
    position: { x: 400, y: 350 }
  }
];

const experiments = [
  { id: 'flame-test', name: 'Flame Test', icon: <Flame className="w-5 h-5" /> },
  { id: 'titration', name: 'Acid-Base Titration', icon: <Pipette className="w-5 h-5" /> },
  { id: 'catalyst', name: 'Catalyst Reaction', icon: <FlaskConical className="w-5 h-5" /> },
  { id: 'electrolysis', name: 'Electrolysis', icon: <Battery className="w-5 h-5" /> }
];

const ChemistryLabSimulation: React.FC = () => {
  const { toast } = useToast();
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(true);
  const [isChemicalShelfOpen, setIsChemicalShelfOpen] = useState(true);
  const [labState, setLabState] = useState<LabSimulationState>({
    activeExperiment: 'flame-test',
    mode: 'explore',
    glassware: defaultGlassware,
    chemicals: defaultChemicals,
    temperature: 25,
    heaterOn: false,
    timer: 0,
    timerRunning: false,
    ph: 7,
    observations: [],
    procedureStep: 0
  });

  const [chemicalFilter, setChemicalFilter] = useState<string>('all');
  const [draggedChemical, setDraggedChemical] = useState<Chemical | null>(null);
  const [hoveredGlassware, setHoveredGlassware] = useState<string | null>(null);
  const [showObservationPanel, setShowObservationPanel] = useState(true);

  useEffect(() => {
    // Temperature effect when heater is on
    let intervalId: NodeJS.Timeout;
    
    if (labState.heaterOn) {
      intervalId = setInterval(() => {
        setLabState(prev => ({
          ...prev,
          temperature: Math.min(prev.temperature + 0.5, 100)
        }));
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [labState.heaterOn]);

  useEffect(() => {
    // Timer effect
    let timerIntervalId: NodeJS.Timeout;
    
    if (labState.timerRunning) {
      timerIntervalId = setInterval(() => {
        setLabState(prev => ({
          ...prev,
          timer: prev.timer + 1
        }));
      }, 1000);
    }
    
    return () => {
      if (timerIntervalId) clearInterval(timerIntervalId);
    };
  }, [labState.timerRunning]);

  const handleDragStart = (chemical: Chemical) => {
    setDraggedChemical(chemical);
  };

  const handleDragOver = (e: React.DragEvent, glasswaredId: string) => {
    e.preventDefault();
    setHoveredGlassware(glasswaredId);
  };

  const handleDragLeave = () => {
    setHoveredGlassware(null);
  };

  const handleDrop = (e: React.DragEvent, glasswaredId: string) => {
    e.preventDefault();
    if (!draggedChemical) return;

    // Add chemical to the glassware
    setLabState(prev => {
      const updatedGlassware = prev.glassware.map(glass => {
        if (glass.id === glasswaredId) {
          // Check if container already has this chemical
          const existingChemical = glass.contents.find(c => c.chemicalId === draggedChemical.id);
          
          if (existingChemical) {
            // Increase volume of existing chemical
            return {
              ...glass,
              contents: glass.contents.map(c => 
                c.chemicalId === draggedChemical!.id 
                  ? { ...c, volume: c.volume + 10 } 
                  : c
              )
            };
          } else {
            // Add new chemical
            return {
              ...glass,
              contents: [
                ...glass.contents,
                { 
                  chemicalId: draggedChemical.id, 
                  volume: 10, 
                  concentration: draggedChemical.concentration || 1 
                }
              ]
            };
          }
        }
        return glass;
      });
      
      // Check for reactions
      const targetGlassware = updatedGlassware.find(g => g.id === glasswaredId);
      let observations = [...prev.observations];
      
      if (targetGlassware && targetGlassware.contents.length > 1) {
        // Check for potential reactions between chemicals
        observations.push(`Added ${draggedChemical.name} to ${targetGlassware.type}`);
        
        for (const content of targetGlassware.contents) {
          if (content.chemicalId !== draggedChemical.id) {
            const existingChemical = prev.chemicals.find(c => c.id === content.chemicalId);
            if (existingChemical?.reactions && existingChemical.reactions[draggedChemical.id]) {
              const reaction = existingChemical.reactions[draggedChemical.id];
              
              if (reaction.colorChange) {
                observations.push(`Color changed to ${reaction.colorChange}`);
              }
              
              if (reaction.precipitate) {
                observations.push(`A precipitate formed!`);
              }
              
              if (reaction.gasProduction) {
                observations.push(`Gas bubbles formed: ${reaction.gasName || 'Unknown gas'}`);
              }
            }
          }
        }
      }

      return {
        ...prev,
        glassware: updatedGlassware,
        observations
      };
    });

    setHoveredGlassware(null);
    setDraggedChemical(null);

    toast({
      title: "Chemical Added",
      description: `Added ${draggedChemical.name} to the container`,
    });
  };

  const handleHeaterToggle = (checked: boolean) => {
    setLabState(prev => ({
      ...prev,
      heaterOn: checked,
      observations: checked 
        ? [...prev.observations, "Turned heater on."] 
        : [...prev.observations, "Turned heater off."]
    }));
  };

  const handleTimerToggle = () => {
    setLabState(prev => ({
      ...prev,
      timerRunning: !prev.timerRunning,
      observations: !prev.timerRunning 
        ? [...prev.observations, "Started timer."] 
        : [...prev.observations, `Stopped timer at ${formatTime(prev.timer)}.`]
    }));
  };

  const resetExperiment = () => {
    setLabState(prev => ({
      ...prev,
      glassware: defaultGlassware,
      temperature: 25,
      heaterOn: false,
      timer: 0,
      timerRunning: false,
      ph: 7,
      observations: ["Experiment reset."],
      procedureStep: 0
    }));

    toast({
      title: "Experiment Reset",
      description: "All glassware and measurements have been reset.",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getFilteredChemicals = () => {
    if (chemicalFilter === 'all') return labState.chemicals;
    return labState.chemicals.filter(chem => chem.type === chemicalFilter);
  };

  const getMixedColor = (contents: ChemicalMixture[]) => {
    if (contents.length === 0) return 'transparent';
    if (contents.length === 1) {
      const chemical = labState.chemicals.find(c => c.id === contents[0].chemicalId);
      return chemical?.color || 'transparent';
    }
    
    // Basic color mixing logic - in a real app, this would be more sophisticated
    // Here we just return a predetermined color for known reactions or a mix
    const ids = contents.map(c => c.chemicalId).sort();
    
    if (ids.includes('hcl') && ids.includes('naoh')) {
      return 'rgba(255, 255, 255, 0.8)'; // Salt water
    }
    
    if (ids.includes('ph_indicator')) {
      // Very basic pH indicator logic
      if (ids.includes('hcl')) return 'rgba(255, 50, 50, 0.7)'; // Red for acid
      if (ids.includes('naoh')) return 'rgba(50, 50, 255, 0.7)'; // Blue for base
      return 'rgba(100, 255, 100, 0.7)'; // Green for neutral
    }
    
    return 'rgba(200, 180, 220, 0.6)'; // Generic mixture color
  };

  const getGlasswareIcon = (type: string, contents: ChemicalMixture[]) => {
    const color = getMixedColor(contents);
    const fillLevel = contents.reduce((sum, c) => sum + c.volume, 0) / 100; // Normalize to 0-1
    
    switch(type) {
      case 'beaker':
        return (
          <div className="relative" style={{ width: '80px', height: '100px' }}>
            <Beaker className="w-full h-full text-gray-300" />
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 rounded-b-lg transition-all duration-500" 
              style={{ 
                height: `${Math.min(fillLevel * 80, 80)}px`, 
                backgroundColor: color 
              }} 
            />
          </div>
        );
      case 'test-tube':
        return (
          <div className="relative" style={{ width: '40px', height: '120px' }}>
            <TestTube className="w-full h-full text-gray-300" />
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 rounded-b-full transition-all duration-500" 
              style={{ 
                height: `${Math.min(fillLevel * 100, 100)}px`, 
                backgroundColor: color 
              }} 
            />
          </div>
        );
      case 'flask':
        return (
          <div className="relative" style={{ width: '80px', height: '100px' }}>
            <FlaskConical className="w-full h-full text-gray-300" />
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 rounded-b-full transition-all duration-500" 
              style={{ 
                height: `${Math.min(fillLevel * 60, 60)}px`, 
                backgroundColor: color 
              }} 
            />
          </div>
        );
      default:
        return <TestTube className="w-16 h-16 text-gray-300" />;
    }
  };

  const renderBunsenBurner = () => {
    return (
      <div className="relative" style={{ width: '60px', height: '100px' }}>
        <div className="absolute bottom-0 w-full h-3/5 bg-gray-700 rounded-md" />
        {labState.heaterOn && (
          <div className="absolute bottom-3/5 left-1/2 transform -translate-x-1/2">
            <div className="w-10 h-16 rounded-t-full bg-blue-500 animate-pulse opacity-70" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Left Control Panel */}
        <div className={`${isControlPanelOpen ? 'col-span-3' : 'col-span-1'} bg-white shadow-md rounded-lg p-3 transition-all duration-300 relative h-[500px]`}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute -right-3 top-10 bg-white shadow rounded-full p-1"
            onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}
          >
            {isControlPanelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          
          {isControlPanelOpen ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                Control Panel
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Experiment:</label>
                  <Select
                    value={labState.activeExperiment}
                    onValueChange={(value) => setLabState(prev => ({
                      ...prev,
                      activeExperiment: value,
                      observations: [...prev.observations, `Selected ${experiments.find(e => e.id === value)?.name} experiment`]
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Experiment" />
                    </SelectTrigger>
                    <SelectContent>
                      {experiments.map(exp => (
                        <SelectItem key={exp.id} value={exp.id} className="flex items-center">
                          <div className="flex items-center gap-2">
                            {exp.icon}
                            <span>{exp.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Heater</span>
                  </div>
                  <Switch checked={labState.heaterOn} onCheckedChange={handleHeaterToggle} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="h-5 w-5 text-red-500" />
                      <span className="text-sm">Temperature</span>
                    </div>
                    <span className="text-sm font-semibold">{labState.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-300 via-green-300 to-red-500 h-2 rounded-full" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Timer</span>
                    <span className="font-mono">{formatTime(labState.timer)}</span>
                  </div>
                  <Button size="sm" onClick={handleTimerToggle}>
                    {labState.timerRunning ? <span>Stop</span> : <span>Start</span>}
                  </Button>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Mode:</label>
                  <div className="flex mt-1 space-x-2">
                    <Button 
                      size="sm" 
                      variant={labState.mode === 'explore' ? "default" : "outline"}
                      onClick={() => setLabState(prev => ({ ...prev, mode: 'explore' }))}
                      className="flex-1"
                    >
                      Explore
                    </Button>
                    <Button 
                      size="sm" 
                      variant={labState.mode === 'procedure' ? "default" : "outline"}
                      onClick={() => setLabState(prev => ({ ...prev, mode: 'procedure' }))}
                      className="flex-1"
                    >
                      Procedure
                    </Button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="destructive" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={resetExperiment}
                  >
                    <Trash2 className="h-4 w-4" /> Reset Experiment
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <FlaskConical className="h-6 w-6" />
              <ThermometerSun className="h-6 w-6 text-orange-500" />
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          )}
        </div>
        
        {/* Main Lab Area */}
        <div className="col-span-6 bg-gray-100 rounded-lg p-4 relative h-[500px]">
          <div className="h-full relative flex items-center justify-center bg-gray-50 rounded-lg shadow-inner overflow-hidden">
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-200 to-transparent" />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-end space-x-8">
              {renderBunsenBurner()}
              
              {labState.glassware.map(glass => (
                <div 
                  key={glass.id}
                  className={`relative cursor-pointer transition-transform ${hoveredGlassware === glass.id ? 'scale-105' : ''}`}
                  onDragOver={(e) => handleDragOver(e, glass.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, glass.id)}
                >
                  {getGlasswareIcon(glass.type, glass.contents)}
                </div>
              ))}
            </div>
            
            {labState.mode === 'procedure' && (
              <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-green-500" />
                  Procedure Steps
                </h4>
                <p className="text-xs text-gray-700 mb-2">
                  {labState.activeExperiment === 'flame-test' && 
                    "Step 1: Add metal salt to the test tube."}
                  {labState.activeExperiment === 'catalyst' && 
                    "Step 1: Add hydrogen peroxide to the flask."}
                </p>
                <Button size="sm">Next Step</Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Chemical Shelf */}
        <div className={`${isChemicalShelfOpen ? 'col-span-3' : 'col-span-1'} bg-white shadow-md rounded-lg p-3 transition-all duration-300 relative h-[500px]`}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute -left-3 top-10 bg-white shadow rounded-full p-1"
            onClick={() => setIsChemicalShelfOpen(!isChemicalShelfOpen)}
          >
            {isChemicalShelfOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          {isChemicalShelfOpen ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Chemical Shelf
              </h3>
              
              <div className="flex items-center gap-2 pb-2 overflow-x-auto">
                <Badge
                  className={`cursor-pointer ${chemicalFilter === 'all' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  onClick={() => setChemicalFilter('all')}
                >
                  All
                </Badge>
                <Badge
                  className={`cursor-pointer ${chemicalFilter === 'acid' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  onClick={() => setChemicalFilter('acid')}
                >
                  Acids
                </Badge>
                <Badge
                  className={`cursor-pointer ${chemicalFilter === 'base' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  onClick={() => setChemicalFilter('base')}
                >
                  Bases
                </Badge>
                <Badge
                  className={`cursor-pointer ${chemicalFilter === 'salt' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  onClick={() => setChemicalFilter('salt')}
                >
                  Salts
                </Badge>
                <Badge
                  className={`cursor-pointer ${chemicalFilter === 'indicator' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  onClick={() => setChemicalFilter('indicator')}
                >
                  Indicators
                </Badge>
              </div>
              
              <ScrollArea className="h-[360px] pr-3 pb-8">
                <div className="grid grid-cols-1 gap-2">
                  {getFilteredChemicals().map(chemical => (
                    <div
                      key={chemical.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-grab transition-colors"
                      draggable
                      onDragStart={() => handleDragStart(chemical)}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: chemical.color }}
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{chemical.name}</h4>
                          <p className="text-xs text-gray-500 font-mono">{chemical.formula}</p>
                          <div className="flex items-center mt-1">
                            {chemical.hazardLevel !== 'low' && (
                              <Badge variant="outline" className="text-xs flex items-center gap-1 border-amber-400">
                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                                {chemical.hazardLabel || chemical.hazardLevel}
                              </Badge>
                            )}
                            {chemical.concentration && (
                              <Badge variant="secondary" className="ml-1 text-xs">
                                {chemical.concentration * 100}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <TestTube className="h-6 w-6" />
              <Beaker className="h-6 w-6 text-blue-500" />
              <Filter className="h-6 w-6 text-purple-500" />
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Observation Panel */}
      <div className={`mt-4 bg-white shadow-md rounded-lg p-4 transition-all duration-300 ${showObservationPanel ? 'h-[150px]' : 'h-12'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold flex items-center gap-2">
            <Info className="h-4 w-4" />
            Observations & Data
          </h3>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Download className="h-3 w-3" /> Export Data
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={() => setShowObservationPanel(!showObservationPanel)}
            >
              {showObservationPanel ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {showObservationPanel && (
          <div className="grid grid-cols-2 gap-4 h-full">
            <ScrollArea className="h-[80px]">
              <div className="space-y-1">
                {labState.observations.slice().reverse().map((obs, i) => (
                  <p key={i} className="text-xs text-gray-700">{obs}</p>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex items-center justify-center text-center text-gray-500 text-sm">
              {labState.activeExperiment === 'flame-test' && (
                <div className="w-full">
                  <h4 className="font-medium mb-2">Flame Test Results</h4>
                  <p className="text-xs">Heat a metal salt in a flame to observe its characteristic color.</p>
                </div>
              )}
              {labState.activeExperiment === 'titration' && (
                <div className="w-full">
                  <h4 className="font-medium mb-2">Titration Data</h4>
                  <p className="text-xs">Add chemicals to beaker to start recording pH changes.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChemistryLabSimulation;
