import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  FlaskConical, 
  TestTube, 
  Pipette, 
  ThermometerSun, 
  Clock, 
  Flame, 
  Beaker,
  AlertTriangle,
  Trash2,
  Info,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Chemical, ChemicalMixture, Glassware, LabSimulationState, ReactionResult } from '@/types/experiments';
import ChemicalShelf from './simulation/ChemicalShelf';
import LabBench from './simulation/LabBench';
import ControlPanel from './simulation/ControlPanel';
import ObservationsPanel from './simulation/ObservationsPanel';
import ReactionHandler from './simulation/ReactionHandler';

// Sounds for reactions
const SOUNDS = {
  bubbling: new Audio('/sounds/bubbling.mp3'),
  explosion: new Audio('/sounds/explosion.mp3'),
  pour: new Audio('/sounds/pour.mp3'),
  fizz: new Audio('/sounds/fizz.mp3')
};

const EnhancedChemistrySimulation: React.FC = () => {
  const { toast } = useToast();
  const reactionHandlerRef = useRef<ReactionHandler | null>(null);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(true);
  const [isChemicalShelfOpen, setIsChemicalShelfOpen] = useState(true);
  const [showObservationPanel, setShowObservationPanel] = useState(true);

  const [labState, setLabState] = useState<LabSimulationState>({
    activeExperiment: 'free-mix',
    mode: 'explore',
    glassware: [
      {
        id: 'beaker1',
        type: 'beaker',
        capacity: 250,
        contents: [],
        position: { x: 100, y: 350 }
      },
      {
        id: 'test_tube1',
        type: 'test-tube',
        capacity: 50,
        contents: [],
        position: { x: 250, y: 350 }
      },
      {
        id: 'flask1',
        type: 'flask',
        capacity: 150,
        contents: [],
        position: { x: 400, y: 350 }
      }
    ],
    chemicals: [],
    temperature: 25,
    heaterOn: false,
    timer: 0,
    timerRunning: false,
    ph: 7,
    observations: [],
    procedureStep: 0,
    reactionLog: []
  });

  // Initialize reaction handler
  useEffect(() => {
    reactionHandlerRef.current = new ReactionHandler();
    
    // Load chemicals
    fetch('/data/chemicals.json')
      .catch(() => {
        // Use fallback if fetch fails
        return { json: () => Promise.resolve(getDefaultChemicals()) };
      })
      .then(response => response.json())
      .then(chemicals => {
        setLabState(prev => ({
          ...prev,
          chemicals
        }));
      });
      
    // Preload sounds
    Object.values(SOUNDS).forEach(audio => {
      audio.load();
    });
    
    return () => {
      // Cleanup sounds
      Object.values(SOUNDS).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

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
    } else if (labState.temperature > 25) {
      // Cooling effect when heater is off
      intervalId = setInterval(() => {
        setLabState(prev => ({
          ...prev,
          temperature: Math.max(prev.temperature - 0.2, 25)
        }));
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [labState.heaterOn, labState.temperature]);

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

  const handleAddChemical = (chemical: Chemical, glasswaredId: string) => {
    // Add chemical to the glassware
    setLabState(prev => {
      const updatedGlassware = prev.glassware.map(glass => {
        if (glass.id === glasswaredId) {
          // Check if container already has this chemical
          const existingChemical = glass.contents.find(c => c.chemicalId === chemical.id);
          
          if (existingChemical) {
            // Increase volume of existing chemical
            return {
              ...glass,
              contents: glass.contents.map(c => 
                c.chemicalId === chemical.id 
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
                  chemicalId: chemical.id, 
                  volume: 10, 
                  concentration: chemical.concentration || 1 
                }
              ]
            };
          }
        }
        return glass;
      });

      // Play pouring sound
      SOUNDS.pour.currentTime = 0;
      SOUNDS.pour.play();
      
      // Check for reactions
      const targetGlassware = updatedGlassware.find(g => g.id === glasswaredId);
      let observations = [...prev.observations];
      let reactionLog = [...prev.reactionLog];
      
      if (targetGlassware && targetGlassware.contents.length > 1) {
        // Check for potential reactions between chemicals
        observations.push(`Added ${chemical.name} to ${targetGlassware.type}`);
        
        // Process reactions with the reaction handler
        const reactionResults = reactionHandlerRef.current?.processReactions(
          targetGlassware.contents,
          prev.chemicals,
          labState.temperature
        );

        if (reactionResults && reactionResults.length > 0) {
          // Handle reaction results
          reactionResults.forEach(result => {
            // Add to observations
            observations.push(result.observation);
            
            // Add to reaction log with chemical equation
            if (result.equation) {
              reactionLog.push({
                time: new Date().toISOString(),
                equation: result.equation,
                observation: result.observation
              });
            }
            
            // Play sound effects
            if (result.type === 'gas') {
              SOUNDS.bubbling.currentTime = 0;
              SOUNDS.bubbling.play();
            } else if (result.type === 'explosion') {
              SOUNDS.explosion.currentTime = 0;
              SOUNDS.explosion.play();
              
              // Show explosion warning toast
              toast({
                title: "Caution! Explosive Reaction",
                description: "This combination created too much pressure and shattered the container!",
                variant: "destructive"
              });
            } else if (result.type === 'precipitate' || result.type === 'color') {
              SOUNDS.fizz.currentTime = 0;
              SOUNDS.fizz.play();
            }
          });
        }

        // Check for safety hazards
        const hazardLevel = checkHazardLevel(targetGlassware.contents, prev.chemicals);
        if (hazardLevel === 'high') {
          toast({
            title: "Safety Warning",
            description: "This combination of chemicals may be dangerous. Proceed with caution!",
            variant: "destructive"
          });
        } else if (hazardLevel === 'medium') {
          toast({
            title: "Caution",
            description: "Be careful when mixing these chemicals.",
            variant: "default"
          });
        }
      } else {
        observations.push(`Added ${chemical.name} to ${targetGlassware?.type || 'container'}`);
      }

      return {
        ...prev,
        glassware: updatedGlassware,
        observations,
        reactionLog
      };
    });

    toast({
      title: "Chemical Added",
      description: `Added ${chemical.name} to the container`,
    });
  };

  const checkHazardLevel = (
    contents: ChemicalMixture[], 
    chemicals: Chemical[]
  ): 'low' | 'medium' | 'high' => {
    // Count high hazard chemicals
    const highHazardCount = contents.filter(content => {
      const chemical = chemicals.find(c => c.id === content.chemicalId);
      return chemical && chemical.hazardLevel === 'high';
    }).length;

    // Check for specific dangerous combinations
    const hasStrongAcid = contents.some(content => {
      const chemical = chemicals.find(c => c.id === content.chemicalId);
      return chemical && chemical.type === 'acid' && chemical.hazardLevel === 'high';
    });

    const hasStrongBase = contents.some(content => {
      const chemical = chemicals.find(c => c.id === content.chemicalId);
      return chemical && chemical.type === 'base' && chemical.hazardLevel === 'high';
    });

    // Strong acid + strong base is potentially dangerous
    if (hasStrongAcid && hasStrongBase) return 'high';
    
    // More than one high hazard chemical is dangerous
    if (highHazardCount > 1) return 'high';
    
    // One high hazard chemical is medium risk
    if (highHazardCount === 1) return 'medium';
    
    // Default to low
    return 'low';
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
      glassware: [
        {
          id: 'beaker1',
          type: 'beaker',
          capacity: 250,
          contents: [],
          position: { x: 100, y: 350 }
        },
        {
          id: 'test_tube1',
          type: 'test-tube',
          capacity: 50,
          contents: [],
          position: { x: 250, y: 350 }
        },
        {
          id: 'flask1',
          type: 'flask',
          capacity: 150,
          contents: [],
          position: { x: 400, y: 350 }
        }
      ],
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

  const handleExperimentChange = (experimentId: string) => {
    setLabState(prev => ({
      ...prev,
      activeExperiment: experimentId,
      procedureStep: 0,
      observations: [...prev.observations, `Selected ${experimentId} experiment`]
    }));

    // Reset containers for new experiment
    resetExperiment();
  };

  const handleModeChange = (mode: 'explore' | 'procedure') => {
    setLabState(prev => ({
      ...prev,
      mode,
      observations: [...prev.observations, `Switched to ${mode} mode`]
    }));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4">
        {/* Left Control Panel */}
        <div className={`${isControlPanelOpen ? 'col-span-3' : 'col-span-1'} bg-white shadow-md rounded-lg p-3 transition-all duration-300 relative h-[600px]`}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute -right-3 top-10 bg-white shadow rounded-full p-1"
            onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}
          >
            {isControlPanelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          
          {isControlPanelOpen ? (
            <ControlPanel
              labState={labState}
              onExperimentChange={handleExperimentChange}
              onModeChange={handleModeChange}
              onHeaterToggle={handleHeaterToggle}
              onTimerToggle={handleTimerToggle}
              onReset={resetExperiment}
              formatTime={formatTime}
            />
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <FlaskConical className="h-6 w-6" />
              <ThermometerSun className="h-6 w-6 text-orange-500" />
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          )}
        </div>
        
        {/* Main Lab Area */}
        <div className="col-span-6 bg-gray-100 rounded-lg p-4 relative h-[600px]">
          <LabBench
            labState={labState}
            onAddChemical={handleAddChemical}
          />
        </div>
        
        {/* Right Chemical Shelf */}
        <div className={`${isChemicalShelfOpen ? 'col-span-3' : 'col-span-1'} bg-white shadow-md rounded-lg p-3 transition-all duration-300 relative h-[600px]`}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute -left-3 top-10 bg-white shadow rounded-full p-1"
            onClick={() => setIsChemicalShelfOpen(!isChemicalShelfOpen)}
          >
            {isChemicalShelfOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          {isChemicalShelfOpen ? (
            <ChemicalShelf
              chemicals={labState.chemicals}
            />
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <TestTube className="h-6 w-6" />
              <Beaker className="h-6 w-6 text-blue-500" />
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Observation Panel */}
      <div className={`mt-4 bg-white shadow-md rounded-lg p-4 transition-all duration-300 ${showObservationPanel ? 'h-[200px]' : 'h-12'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold flex items-center gap-2">
            <Info className="h-4 w-4" />
            Observations & Reaction Log
          </h3>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6" 
            onClick={() => setShowObservationPanel(!showObservationPanel)}
          >
            {showObservationPanel ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        
        {showObservationPanel && (
          <ObservationsPanel
            observations={labState.observations}
            reactionLog={labState.reactionLog}
            activeExperiment={labState.activeExperiment}
          />
        )}
      </div>
    </div>
  );
};

// Fallback default chemicals if API fetch fails
const getDefaultChemicals = () => [
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
        precipitate: false,
        equation: 'HCl + NaOH → NaCl + H₂O'
      },
      'zn': {
        gasProduction: true,
        gasName: 'Hydrogen',
        equation: 'Zn + 2HCl → ZnCl₂ + H₂'
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
    description: 'Strong base used in many reactions',
    reactions: {
      'phenolphthalein': {
        colorChange: 'magenta',
        equation: 'Phenolphthalein + OH⁻ → Pink complex'
      }
    }
  },
  {
    id: 'phenolphthalein',
    name: 'Phenolphthalein',
    formula: 'C₂₀H₁₄O₄',
    type: 'indicator',
    color: 'rgba(255, 255, 255, 0.8)',
    hazardLevel: 'low',
    description: 'pH indicator that turns pink in basic solutions'
  },
  {
    id: 'agno3',
    name: 'Silver Nitrate',
    formula: 'AgNO₃',
    type: 'salt',
    color: 'rgba(255, 255, 255, 0.9)',
    hazardLevel: 'medium',
    hazardLabel: 'Irritant',
    description: 'Used in precipitation reactions',
    reactions: {
      'nacl': {
        precipitate: true,
        precipitateColor: 'white',
        productName: 'Silver Chloride',
        productFormula: 'AgCl',
        equation: 'AgNO₃ + NaCl → AgCl + NaNO₃'
      }
    }
  },
  {
    id: 'nacl',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    type: 'salt',
    color: 'rgba(255, 255, 255, 0.9)',
    hazardLevel: 'low',
    description: 'Common salt'
  },
  {
    id: 'pb_no3_2',
    name: 'Lead Nitrate',
    formula: 'Pb(NO₃)₂',
    type: 'salt',
    color: 'rgba(255, 255, 255, 0.9)',
    hazardLevel: 'high',
    hazardLabel: 'Toxic',
    description: 'Toxic salt used in precipitation reactions',
    reactions: {
      'ki': {
        precipitate: true,
        precipitateColor: 'yellow',
        productName: 'Lead Iodide',
        productFormula: 'PbI₂',
        equation: 'Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃'
      }
    }
  },
  {
    id: 'ki',
    name: 'Potassium Iodide',
    formula: 'KI',
    type: 'salt',
    color: 'rgba(255, 255, 255, 0.9)',
    hazardLevel: 'low',
    description: 'Salt used in precipitation reactions'
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
        temperatureChange: 5,
        equation: '2H₂O₂ → 2H₂O + O₂'
      }
    }
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
    id: 'zn',
    name: 'Zinc Metal',
    formula: 'Zn',
    type: 'metal',
    color: '#B3B3B3',
    hazardLevel: 'low',
    description: 'Reactive metal that produces hydrogen with acids'
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
        flameColor: '#00FF7F',
        equation: 'CuCl₂ heat→ Cu²⁺ + excited electrons → light emission'
      }
    }
  }
];

export default EnhancedChemistrySimulation;
