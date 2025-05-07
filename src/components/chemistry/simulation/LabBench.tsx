import React, { useState, useEffect } from 'react';
import { Beaker, FlaskConical, TestTube, Flame, ThermometerSun as Thermometer, PlayCircle } from "lucide-react";
import { LabSimulationState, Chemical, ChemicalMixture, Glassware } from '@/types/experiments';

interface LabBenchProps {
  labState: LabSimulationState;
  onAddChemical: (chemical: Chemical, glasswaredId: string) => void;
}

const LabBench: React.FC<LabBenchProps> = ({ labState, onAddChemical }) => {
  const [hoveredGlassware, setHoveredGlassware] = useState<string | null>(null);
  const [explosionEffects, setExplosionEffects] = useState<Record<string, boolean>>({});
  const [bubbleEffects, setBubbleEffects] = useState<Record<string, boolean>>({});
  const [precipitateEffects, setPrecipitateEffects] = useState<Record<string, { active: boolean, color: string }>>({});
  
  const handleDragOver = (e: React.DragEvent, glasswaredId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setHoveredGlassware(glasswaredId);
  };

  const handleDragLeave = () => {
    setHoveredGlassware(null);
  };

  const handleDrop = (e: React.DragEvent, glasswaredId: string) => {
    e.preventDefault();
    try {
      const chemicalData = e.dataTransfer.getData('chemical');
      if (!chemicalData) {
        console.error('No chemical data found in drop event');
        return;
      }
      
      const chemical = JSON.parse(chemicalData) as Chemical;
      onAddChemical(chemical, glasswaredId);
      
      // Check for reactions that would trigger visual effects
      const glassware = labState.glassware.find(g => g.id === glasswaredId);
      if (glassware) {
        const chemicals = glassware.contents.map(c => 
          labState.chemicals.find(chem => chem.id === c.chemicalId)
        ).filter(Boolean) as Chemical[];
        
        // Check for reactions that produce gas
        const gasReaction = chemicals.some(chem => 
          chem.reactions && Object.values(chem.reactions).some(r => r.gasProduction)
        );
        
        if (gasReaction) {
          setBubbleEffects(prev => ({ ...prev, [glasswaredId]: true }));
          setTimeout(() => {
            setBubbleEffects(prev => ({ ...prev, [glasswaredId]: false }));
          }, 5000);
        }
        
        // Check for reactions that could cause explosion (special case)
        const hasZinc = chemicals.some(chem => chem.id === 'zn');
        const hasStrongAcid = chemicals.some(chem => chem.type === 'acid' && chem.hazardLevel === 'high');
        
        if (hasZinc && hasStrongAcid && glassware.type === 'test-tube') {
          // Simulate explosion after delay
          setTimeout(() => {
            setExplosionEffects(prev => ({ ...prev, [glasswaredId]: true }));
            setTimeout(() => {
              setExplosionEffects(prev => ({ ...prev, [glasswaredId]: false }));
            }, 1000);
          }, 2000);
        }
        
        // Check for precipitate reactions
        const precipitateReaction = chemicals.some(chem => 
          chem.reactions && Object.values(chem.reactions).some(r => r.precipitate)
        );
        
        if (precipitateReaction) {
          // Determine precipitate color from reactions
          let precipitateColor = 'white';
          
          for (const chem of chemicals) {
            if (chem.reactions) {
              for (const [reactantId, reaction] of Object.entries(chem.reactions)) {
                if (reaction.precipitate && chemicals.some(c => c.id === reactantId)) {
                  precipitateColor = reaction.precipitateColor || 'white';
                  break;
                }
              }
            }
          }
          
          setPrecipitateEffects(prev => ({ 
            ...prev, 
            [glasswaredId]: { active: true, color: precipitateColor }
          }));
          
          // Simulate precipitate settling
          setTimeout(() => {
            setPrecipitateEffects(prev => ({ 
              ...prev, 
              [glasswaredId]: { ...prev[glasswaredId], active: false }
            }));
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
    setHoveredGlassware(null);
  };
  
  // Clear all effects when experiment is reset
  useEffect(() => {
    setExplosionEffects({});
    setBubbleEffects({});
    setPrecipitateEffects({});
  }, [labState.procedureStep]);

  const getMixedColor = (contents: ChemicalMixture[]) => {
    if (contents.length === 0) return 'transparent';
    if (contents.length === 1) {
      const chemical = labState.chemicals.find(c => c.id === contents[0].chemicalId);
      return chemical?.color || 'transparent';
    }
    
    // Check for specific reactions first
    const ids = contents.map(c => c.chemicalId).sort();
    
    // Phenolphthalein in base turns pink
    if (ids.includes('phenolphthalein') && ids.includes('naoh')) {
      return 'rgba(255, 105, 180, 0.7)';
    }
    
    // Silver nitrate + sodium chloride makes white precipitate
    if (ids.includes('agno3') && ids.includes('nacl')) {
      return 'rgba(255, 255, 255, 0.9)';
    }
    
    // Lead nitrate + potassium iodide makes yellow precipitate
    if (ids.includes('pb_no3_2') && ids.includes('ki')) {
      return 'rgba(255, 255, 0, 0.7)';
    }
    
    // HCl + NaOH makes salt water
    if (ids.includes('hcl') && ids.includes('naoh')) {
      return 'rgba(255, 255, 255, 0.8)';
    }
    
    // Generic mixture color
    return 'rgba(180, 200, 210, 0.6)';
  };

  const renderGlassware = (glass: Glassware) => {
    const color = getMixedColor(glass.contents);
    const fillLevel = glass.contents.reduce((sum, c) => sum + c.volume, 0) / glass.capacity;
    const normalizedFillLevel = Math.min(fillLevel, 1);
    
    const isExploding = explosionEffects[glass.id];
    const isBubbling = bubbleEffects[glass.id];
    const hasPrecipitate = precipitateEffects[glass.id]?.active;
    const precipitateColor = precipitateEffects[glass.id]?.color || 'white';
    
    // If this glassware is exploding, render shattered glass pieces
    if (isExploding) {
      return (
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-amber-500 rounded-full opacity-50 animate-pulse"></div>
          </div>
          {/* Glass shards */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-gray-200 opacity-70"
              style={{
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}px`,
                top: `${Math.random() * 100}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: 'fly-away 1s forwards',
              }}
            ></div>
          ))}
        </div>
      );
    }
    
    switch(glass.type) {
      case 'beaker':
        return (
          <div 
            className={`relative ${hoveredGlassware === glass.id ? 'scale-105' : ''} transition-transform`}
            style={{ width: '80px', height: '100px' }}
          >
            <Beaker className="w-full h-full text-gray-300" />
            <div 
              className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-4/5 rounded-b-lg transition-all duration-500" 
              style={{ 
                height: `${Math.max(normalizedFillLevel * 70, 0)}%`, 
                backgroundColor: color 
              }} 
            >
              {isBubbling && (
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute bg-white rounded-full opacity-70"
                      style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 100}%`,
                        animation: `bubble-rise ${Math.random() * 2 + 2}s infinite linear`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            {hasPrecipitate && (
              <div 
                className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-4/5 rounded-b-lg transition-all duration-1000" 
                style={{ 
                  height: '10%', 
                  backgroundColor: precipitateColor
                }} 
              />
            )}
          </div>
        );
      case 'test-tube':
        return (
          <div 
            className={`relative ${hoveredGlassware === glass.id ? 'scale-105' : ''} transition-transform`}
            style={{ width: '40px', height: '120px' }}
          >
            <TestTube className="w-full h-full text-gray-300" />
            <div 
              className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-3/5 rounded-b-full transition-all duration-500" 
              style={{ 
                height: `${Math.max(normalizedFillLevel * 85, 0)}%`, 
                backgroundColor: color 
              }} 
            >
              {isBubbling && (
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute bg-white rounded-full opacity-70"
                      style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 100}%`,
                        animation: `bubble-rise ${Math.random() * 2 + 1}s infinite linear`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            {hasPrecipitate && (
              <div 
                className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-3/5 rounded-b-full transition-all duration-1000" 
                style={{ 
                  height: '10%', 
                  backgroundColor: precipitateColor
                }} 
              />
            )}
          </div>
        );
      case 'flask':
        return (
          <div 
            className={`relative ${hoveredGlassware === glass.id ? 'scale-105' : ''} transition-transform`}
            style={{ width: '80px', height: '100px' }}
          >
            <FlaskConical className="w-full h-full text-gray-300" />
            <div 
              className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-3/5 rounded-b-full transition-all duration-500" 
              style={{ 
                height: `${Math.max(normalizedFillLevel * 50, 0)}%`, 
                backgroundColor: color 
              }} 
            >
              {isBubbling && (
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute bg-white rounded-full opacity-70"
                      style={{
                        width: `${Math.random() * 5 + 2}px`,
                        height: `${Math.random() * 5 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 100}%`,
                        animation: `bubble-rise ${Math.random() * 3 + 2}s infinite linear`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            {hasPrecipitate && (
              <div 
                className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-3/5 rounded-b-full transition-all duration-1000" 
                style={{ 
                  height: '10%', 
                  backgroundColor: precipitateColor
                }} 
              />
            )}
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

  // Experiment instructions and visual guide
  const renderExperimentGuide = () => {
    if (labState.mode !== 'procedure') return null;
    
    const guides = {
      'acid-base': [
        "Add HCl to a beaker",
        "Add a few drops of phenolphthalein indicator",
        "Slowly add NaOH and observe the color change"
      ],
      'precipitation': [
        "Add silver nitrate solution to a test tube",
        "Add sodium chloride solution and observe white precipitate",
        "Try lead nitrate + potassium iodide for yellow precipitate"
      ],
      'catalyst': [
        "Add hydrogen peroxide to a flask",
        "Add manganese dioxide catalyst",
        "Observe the rapid decomposition and oxygen bubbles"
      ],
      'flame-test': [
        "Dip a wire loop in a metal salt solution",
        "Place the loop in the flame",
        "Observe the characteristic color"
      ]
    };
    
    const currentGuide = guides[labState.activeExperiment as keyof typeof guides];
    if (!currentGuide) return null;
    
    return (
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <PlayCircle className="h-4 w-4 text-green-500" />
          {labState.activeExperiment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Procedure
        </h4>
        <ol className="text-xs text-gray-700 mb-2 pl-5 list-decimal">
          {currentGuide.map((step, i) => (
            <li 
              key={i} 
              className={labState.procedureStep === i ? 'font-medium text-green-600' : ''}
            >
              {step}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div className="h-full relative flex items-center justify-center bg-gray-50 rounded-lg shadow-inner overflow-hidden">
      <style>
        {`
          @keyframes bubble-rise {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
          }
          @keyframes fly-away {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
            100% { transform: translate(var(--tx, 50px), var(--ty, 50px)) rotate(var(--tr, 180deg)); opacity: 0; }
          }
        `}
      </style>
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-200 to-transparent" />
      <div className="absolute top-6 right-6">
        {/* Temperature display */}
        <div className="bg-white p-2 rounded-md shadow flex items-center mb-4">
          <Thermometer className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="font-semibold">{labState.temperature.toFixed(1)}°C</div>
          </div>
        </div>
      </div>
      
      {/* Lab bench and equipment */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-end space-x-12 justify-center w-full">
        {renderBunsenBurner()}
        
        {labState.glassware.map(glass => (
          <div 
            key={glass.id}
            className="relative cursor-pointer"
            onDragOver={(e) => handleDragOver(e, glass.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, glass.id)}
          >
            {renderGlassware(glass)}
          </div>
        ))}
      </div>
      
      {renderExperimentGuide()}
      
      {/* pH strip if pH indicator is used */}
      {labState.glassware.some(g => 
        g.contents.some(c => 
          labState.chemicals.find(chem => 
            chem.id === c.chemicalId && chem.type === 'indicator'
          )
        )
      ) && (
        <div className="absolute bottom-28 right-8 bg-white p-2 rounded-md shadow">
          <div className="text-xs text-gray-500 mb-1">pH Level</div>
          <div className="h-4 w-32 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-purple-500 rounded-full relative">
            <div 
              className="absolute h-6 w-1 bg-black top-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${(labState.ph / 14) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>0</span>
            <span>7</span>
            <span>14</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabBench;
