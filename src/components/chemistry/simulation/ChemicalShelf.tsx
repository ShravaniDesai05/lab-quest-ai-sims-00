
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestTube, AlertTriangle } from "lucide-react";
import { Chemical } from '@/types/experiments';

interface ChemicalShelfProps {
  chemicals: Chemical[];
}

const ChemicalShelf: React.FC<ChemicalShelfProps> = ({ chemicals }) => {
  const [chemicalFilter, setChemicalFilter] = useState<string>('all');

  const getFilteredChemicals = () => {
    if (chemicalFilter === 'all') return chemicals;
    return chemicals.filter(chem => chem.type === chemicalFilter);
  };

  return (
    <div className="space-y-4 h-full">
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
          className={`cursor-pointer ${chemicalFilter === 'metal' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          onClick={() => setChemicalFilter('metal')}
        >
          Metals
        </Badge>
        <Badge
          className={`cursor-pointer ${chemicalFilter === 'indicator' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          onClick={() => setChemicalFilter('indicator')}
        >
          Indicators
        </Badge>
        <Badge
          className={`cursor-pointer ${chemicalFilter === 'catalyst' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          onClick={() => setChemicalFilter('catalyst')}
        >
          Catalysts
        </Badge>
      </div>
      
      <ScrollArea className="h-[480px] pr-3">
        <div className="grid grid-cols-1 gap-2">
          {getFilteredChemicals().map(chemical => (
            <div
              key={chemical.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-grab transition-colors"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('chemical', JSON.stringify(chemical));
              }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex-shrink-0 border" 
                  style={{ backgroundColor: chemical.color }}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{chemical.name}</h4>
                  <p className="text-xs text-gray-500 font-mono">{chemical.formula}</p>
                  <div className="flex items-center mt-1 flex-wrap gap-1">
                    {chemical.hazardLevel === 'high' && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1 border-red-400 text-red-700">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        {chemical.hazardLabel || 'High Hazard'}
                      </Badge>
                    )}
                    {chemical.hazardLevel === 'medium' && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1 border-amber-400 text-amber-700">
                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                        {chemical.hazardLabel || 'Caution'}
                      </Badge>
                    )}
                    {chemical.concentration && (
                      <Badge variant="secondary" className="text-xs">
                        {chemical.concentration * 100}%
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs capitalize">
                      {chemical.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChemicalShelf;
