
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  FlaskConical, 
  ThermometerSun, 
  Clock, 
  Trash2,
  Flame,
  Pipette,
  PlayCircle
} from "lucide-react";
import { LabSimulationState } from '@/types/experiments';

interface ControlPanelProps {
  labState: LabSimulationState;
  onExperimentChange: (experimentId: string) => void;
  onModeChange: (mode: 'explore' | 'procedure') => void;
  onHeaterToggle: (checked: boolean) => void;
  onTimerToggle: () => void;
  onReset: () => void;
  formatTime: (seconds: number) => string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  labState,
  onExperimentChange,
  onModeChange,
  onHeaterToggle,
  onTimerToggle,
  onReset,
  formatTime
}) => {
  const experiments = [
    { id: 'free-mix', name: 'Free Exploration', icon: <FlaskConical className="h-5 w-5" /> },
    { id: 'acid-base', name: 'Acid-Base Neutralization', icon: <Pipette className="h-5 w-5" /> },
    { id: 'precipitation', name: 'Precipitation Reactions', icon: <FlaskConical className="h-5 w-5" /> },
    { id: 'catalyst', name: 'Catalyst Reactions', icon: <FlaskConical className="h-5 w-5" /> },
    { id: 'flame-test', name: 'Metal Flame Tests', icon: <Flame className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <FlaskConical className="h-5 w-5" />
        Control Panel
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Experiment:</label>
          <Select
            value={labState.activeExperiment}
            onValueChange={onExperimentChange}
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
            <span className="text-sm">Bunsen Burner</span>
          </div>
          <Switch checked={labState.heaterOn} onCheckedChange={onHeaterToggle} />
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThermometerSun className="h-5 w-5 text-red-500" />
              <span className="text-sm">Temperature</span>
            </div>
            <span className="text-sm font-semibold">{labState.temperature.toFixed(1)}°C</span>
          </div>
          <div className={`h-2 rounded-full relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-green-300 to-red-500"></div>
            <div 
              className="absolute top-0 h-full bg-white opacity-70"
              style={{ 
                width: `${100 - ((labState.temperature - 20) / 80) * 100}%`,
                right: 0
              }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-sm">Timer</span>
            <span className="font-mono">{formatTime(labState.timer)}</span>
          </div>
          <Button size="sm" onClick={onTimerToggle}>
            {labState.timerRunning ? <span>Stop</span> : <span>Start</span>}
          </Button>
        </div>
        
        <div>
          <label className="text-sm font-medium">Mode:</label>
          <div className="flex mt-1 space-x-2">
            <Button 
              size="sm" 
              variant={labState.mode === 'explore' ? "default" : "outline"}
              onClick={() => onModeChange('explore')}
              className="flex-1"
            >
              <FlaskConical className="h-4 w-4 mr-1" /> Explore
            </Button>
            <Button 
              size="sm" 
              variant={labState.mode === 'procedure' ? "default" : "outline"}
              onClick={() => onModeChange('procedure')}
              className="flex-1"
            >
              <PlayCircle className="h-4 w-4 mr-1" /> Guided
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Lab Tips</h4>
          <ul className="text-xs text-blue-600 space-y-1 list-disc pl-4">
            <li>Drag chemicals from the shelf to containers</li>
            <li>Use the Bunsen burner to heat your mixtures</li>
            <li>Watch for reactions: color changes, bubbles, precipitates</li>
            <li>In guided mode, follow step-by-step procedures</li>
          </ul>
        </div>
        
        <div className="pt-2">
          <Button 
            variant="destructive" 
            className="w-full flex items-center justify-center gap-2"
            onClick={onReset}
          >
            <Trash2 className="h-4 w-4" /> Reset Experiment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
