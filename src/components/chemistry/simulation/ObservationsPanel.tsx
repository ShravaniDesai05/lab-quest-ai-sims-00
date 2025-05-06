
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ObservationsPanelProps {
  observations: string[];
  reactionLog: {
    time: string;
    equation: string;
    observation: string;
  }[];
  activeExperiment: string;
}

const ObservationsPanel: React.FC<ObservationsPanelProps> = ({
  observations,
  reactionLog,
  activeExperiment
}) => {
  const getReactionTitle = () => {
    switch (activeExperiment) {
      case 'acid-base':
        return 'Acid-Base Neutralization';
      case 'precipitation':
        return 'Precipitation Reactions';
      case 'catalyst':
        return 'Catalyst-Induced Decomposition';
      case 'flame-test':
        return 'Metal Flame Tests';
      default:
        return 'Reaction Information';
    }
  };
  
  const getReactionFormula = () => {
    switch (activeExperiment) {
      case 'acid-base':
        return 'HCl + NaOH → NaCl + H₂O';
      case 'precipitation':
        return 'AgNO₃ + NaCl → AgCl↓ + NaNO₃';
      case 'catalyst':
        return '2H₂O₂ → 2H₂O + O₂↑ (with MnO₂)';
      case 'flame-test':
        return 'Metal ions + heat → excited electrons → colored light';
      default:
        return '';
    }
  };

  const exportData = () => {
    const observationsText = observations.join('\n');
    const reactionEquations = reactionLog.map(r => r.equation).join('\n');
    
    const dataStr = `
Chemistry Lab Results
Date: ${new Date().toLocaleDateString()}

Experiment: ${activeExperiment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

OBSERVATIONS:
${observationsText}

CHEMICAL REACTIONS:
${reactionEquations}
    `.trim();
    
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `chemistry-lab-${activeExperiment}-${new Date().toISOString().split('T')[0]}.txt`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[160px]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-semibold">Observations</h4>
          <Button size="sm" variant="outline" className="h-7 gap-1" onClick={exportData}>
            <Download className="h-3 w-3" /> Export
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {observations.slice().reverse().map((obs, i) => (
              <p key={i} className="text-xs text-gray-700 pb-1 border-b border-gray-100 last:border-0">
                {obs}
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex flex-col">
        <Tabs defaultValue="reactions">
          <div className="flex justify-between items-center mb-1">
            <TabsList className="h-7">
              <TabsTrigger value="reactions" className="text-xs">Reactions</TabsTrigger>
              <TabsTrigger value="theory" className="text-xs">Theory</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="reactions" className="mt-0 flex-1">
            <ScrollArea className="h-[128px]">
              <div className="space-y-2">
                {reactionLog.length > 0 ? (
                  reactionLog.slice().reverse().map((log, i) => (
                    <div key={i} className="text-xs border-b border-gray-100 pb-2">
                      <div className="font-medium">{log.equation}</div>
                      <div className="text-gray-600 text-[10px]">{log.observation}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500 italic">
                    No chemical reactions observed yet.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="theory" className="mt-0">
            <ScrollArea className="h-[128px]">
              <div className="space-y-2">
                <div className="text-xs">
                  <h5 className="font-semibold">{getReactionTitle()}</h5>
                  {getReactionFormula() && (
                    <div className="bg-gray-50 font-mono p-1 rounded my-1 text-center">
                      {getReactionFormula()}
                    </div>
                  )}
                  <p className="text-gray-600">
                    {activeExperiment === 'acid-base' && 
                      "When an acid and base react, they neutralize each other to form a salt and water. The H+ ions from the acid combine with OH- ions from the base."}
                    {activeExperiment === 'precipitation' && 
                      "Precipitation occurs when two soluble compounds react to form an insoluble solid. The solid precipitate visibly appears in the solution."}
                    {activeExperiment === 'catalyst' && 
                      "Catalysts increase reaction rates without being consumed. MnO₂ causes H₂O₂ to decompose rapidly, releasing oxygen gas."}
                    {activeExperiment === 'flame-test' && 
                      "Metal ions emit characteristic colors when heated in a flame. The heat excites electrons which emit specific wavelengths of light when returning to ground state."}
                    {activeExperiment === 'free-mix' && 
                      "Mix chemicals to observe various reactions. Look for color changes, gas evolution, precipitation formation, and temperature changes."}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ObservationsPanel;
