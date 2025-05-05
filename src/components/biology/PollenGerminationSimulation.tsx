import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Microscope
} from 'lucide-react';

// Define stages of pollen germination
const germinationStages = [
  {
    id: "landing",
    name: "Pollen Landing",
    description: "Pollen grain lands on the stigma surface"
  },
  {
    id: "hydration",
    name: "Hydration",
    description: "Pollen grain absorbs moisture from the stigma and swells"
  },
  {
    id: "germination",
    name: "Tube Emergence",
    description: "Pollen tube begins to emerge from the pollen grain"
  },
  {
    id: "growth",
    name: "Tube Growth",
    description: "Pollen tube elongates and grows through the style"
  },
  {
    id: "fertilization",
    name: "Fertilization",
    description: "Pollen tube reaches ovary and releases sperm cells for fertilization"
  }
];

// Define structures to be labeled
const structures = [
  {
    id: "pollenGrain",
    name: "Pollen Grain",
    description: "Contains the male gametophyte of the flowering plant",
    visibleStages: ["landing", "hydration", "germination", "growth"]
  },
  {
    id: "stigma",
    name: "Stigma",
    description: "Receptive surface of the carpel where pollen lands",
    visibleStages: ["landing", "hydration", "germination", "growth", "fertilization"]
  },
  {
    id: "pollenTube",
    name: "Pollen Tube",
    description: "Extension from the pollen grain that grows toward the ovary",
    visibleStages: ["germination", "growth", "fertilization"]
  },
  {
    id: "style",
    name: "Style",
    description: "Stalk connecting the stigma to the ovary",
    visibleStages: ["growth", "fertilization"]
  },
  {
    id: "ovary",
    name: "Ovary",
    description: "Contains ovules with egg cells for fertilization",
    visibleStages: ["fertilization"]
  }
];

const PollenGerminationSimulation = () => {
  const [viewMode, setViewMode] = useState<'slide' | 'sem'>('slide');
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const stageIntervalRef = useRef<number>(3000); // 3 seconds per stage
  
  // Handle play/pause animation
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setInterval(() => {
        setCurrentStage(prev => {
          if (prev >= germinationStages.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, stageIntervalRef.current);
    } else if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleStageChange = (stage: number) => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    setCurrentStage(stage);
  };
  
  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(prev => prev + 0.5);
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.5);
    }
  };
  
  const handleRotate = (direction: 'clockwise' | 'counterclockwise') => {
    if (viewMode === 'sem') {
      if (direction === 'clockwise') {
        setRotation(prev => (prev + 15) % 360);
      } else {
        setRotation(prev => (prev - 15 + 360) % 360);
      }
    }
  };
  
  const handleStructureClick = (structureId: string) => {
    setSelectedStructure(structureId === selectedStructure ? null : structureId);
  };
  
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Pollen Germination Simulation</h3>
        <div className="flex gap-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'slide' | 'sem')}>
            <ToggleGroupItem value="slide" aria-label="Slide View">
              <Microscope className="h-4 w-4 mr-1" />
              Slide View
            </ToggleGroupItem>
            <ToggleGroupItem value="sem" aria-label="SEM View">
              <span className="mr-1">🔬</span>
              SEM View
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      {/* Main simulation view */}
      <div className="relative border rounded-lg overflow-hidden bg-white" style={{ height: '400px' }}>
        {/* Simulation canvas */}
        <div 
          className={`w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out`}
          style={{ 
            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
            background: viewMode === 'slide' ? '#f0f9ff' : '#1a1a1a',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Placeholder for the actual simulation - to be replaced with WebGL/Canvas */}
          <div className="relative w-4/5 h-4/5">
            {/* Background image would be here */}
            <div 
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
                ${viewMode === 'sem' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {/* This is where the main visualization will go */}
              <div className={`text-center p-4 ${showHelp ? 'visible' : 'hidden'}`}>
                <p>Visualization: {germinationStages[currentStage].name}</p>
                <p className="text-sm opacity-70 mt-2">
                  In the completed simulation, this area will show an interactive 
                  {viewMode === 'slide' ? ' microscope slide' : ' SEM'} view of pollen germination.
                </p>
              </div>
            </div>
            
            {/* Simulation overlays for each stage */}
            {viewMode === 'slide' ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-3/4 h-3/4 rounded-full ${
                  currentStage >= 0 ? 'bg-yellow-200 border-2 border-yellow-300' : 'hidden'
                } relative`} style={{ opacity: 0.8 }}>
                  {/* Stigma */}
                  <div className="absolute top-1/2 left-1/2 w-full h-20 bg-pink-200 rounded-lg transform -translate-x-1/2 -translate-y-1/2"></div>
                  
                  {/* Pollen grain */}
                  <div className={`absolute top-1/3 left-1/2 w-12 h-12 rounded-full bg-orange-400 border-2 border-orange-500 transform -translate-x-1/2 -translate-y-1/2 ${
                    currentStage >= 0 ? 'opacity-100' : 'opacity-0'
                  } transition-all duration-500`}></div>
                  
                  {/* Pollen tube */}
                  {currentStage >= 2 && (
                    <div 
                      className="absolute bg-orange-300 rounded-b-lg" 
                      style={{
                        top: '45%',
                        left: '46%',
                        width: '8%',
                        height: currentStage >= 3 ? '40%' : '10%',
                        transition: 'height 1.5s ease-out'
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-3/4 h-3/4 ${
                  currentStage >= 0 ? 'bg-gray-700 border-2 border-gray-600' : 'hidden'
                } relative rounded-lg`} style={{ opacity: 0.9 }}>
                  {/* SEM style stigma */}
                  <div className="absolute top-1/2 left-1/2 w-full h-32 bg-gray-800 rounded-lg transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center overflow-hidden">
                    {Array(50).fill(0).map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-700 m-0.5 rounded-sm"></div>
                    ))}
                  </div>
                  
                  {/* SEM style pollen grain */}
                  <div className={`absolute top-1/3 left-1/2 w-16 h-16 rounded-full bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 ${
                    currentStage >= 0 ? 'opacity-100' : 'opacity-0'
                  } transition-all duration-500 flex items-center justify-center`}>
                    {Array(8).fill(0).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-2 h-4 bg-gray-400 rounded-full"
                        style={{ 
                          transform: `rotate(${i * 45}deg) translateY(-10px)`
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* SEM style pollen tube */}
                  {currentStage >= 2 && (
                    <div 
                      className="absolute bg-gray-600 rounded-b-lg" 
                      style={{
                        top: '45%',
                        left: '46%',
                        width: '8%',
                        height: currentStage >= 3 ? '40%' : '10%',
                        transition: 'height 1.5s ease-out'
                      }}
                    ></div>
                  )}
                </div>
              </div>
            )}
            
            {/* Structure labels */}
            {showLabels && (
              <>
                {structures.map(structure => {
                  if (structure.visibleStages.includes(germinationStages[currentStage].id)) {
                    // Position is hardcoded for now - would be dynamic in a real implementation
                    let position = { top: '50%', left: '50%' };
                    
                    if (structure.id === 'pollenGrain') {
                      position = { top: '30%', left: '40%' };
                    } else if (structure.id === 'stigma') {
                      position = { top: '50%', left: '75%' };
                    } else if (structure.id === 'pollenTube') {
                      position = { top: '60%', left: '45%' };
                    } else if (structure.id === 'style') {
                      position = { top: '75%', left: '60%' };
                    } else if (structure.id === 'ovary') {
                      position = { top: '90%', left: '50%' };
                    }
                    
                    return (
                      <div 
                        key={structure.id}
                        className={`absolute cursor-pointer transition-opacity duration-300 ${
                          selectedStructure === structure.id ? 'opacity-100' : 'opacity-70'
                        }`}
                        style={{ 
                          top: position.top, 
                          left: position.left,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 5
                        }}
                        onClick={() => handleStructureClick(structure.id)}
                      >
                        <Badge 
                          variant="outline" 
                          className={`${
                            selectedStructure === structure.id 
                            ? 'bg-blue-100 text-blue-800 border-blue-300' 
                            : viewMode === 'sem' ? 'bg-gray-800 text-gray-200' : 'bg-white'
                          }`}
                        >
                          {structure.name}
                        </Badge>
                      </div>
                    );
                  }
                  return null;
                })}
              </>
            )}
          </div>
        </div>
        
        {/* Zoom controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/80 p-1 rounded-md shadow-sm">
          <Button size="sm" onClick={handleZoomIn} variant="ghost">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={handleZoomOut} variant="ghost">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Rotation controls (SEM only) */}
        {viewMode === 'sem' && (
          <div className="absolute top-4 left-4 flex gap-2 bg-white/80 p-1 rounded-md shadow-sm">
            <Button size="sm" onClick={() => handleRotate('counterclockwise')} variant="ghost">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => handleRotate('clockwise')} variant="ghost">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Selected structure info */}
        {selectedStructure && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-2 rounded-md shadow-sm max-w-md mx-auto">
            <h4 className="text-sm font-semibold">
              {structures.find(s => s.id === selectedStructure)?.name}
            </h4>
            <p className="text-xs text-gray-600">
              {structures.find(s => s.id === selectedStructure)?.description}
            </p>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        {/* Stage controls */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Stage: {germinationStages[currentStage].name}
            </span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handlePlayPause}
              className="flex items-center gap-1"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
          
          <div className="flex gap-2 items-center">
            <Slider
              value={[currentStage]}
              min={0}
              max={germinationStages.length - 1}
              step={1}
              onValueChange={(value) => handleStageChange(value[0])}
              className="flex-1"
            />
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            {germinationStages[currentStage].description}
          </p>
        </div>
        
        {/* Toggle options */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={showLabels ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </Button>
          
          <Button 
            variant={showHelp ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setShowHelp(!showHelp)}
          >
            {showHelp ? 'Hide Help' : 'Show Help'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PollenGerminationSimulation;
