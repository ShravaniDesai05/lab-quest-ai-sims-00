
import React, { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { RefractionMedium } from '@/types/experiments';

const mediaOptions: RefractionMedium[] = [
  { name: 'Air', refractiveIndex: 1.0003, color: '#f3f3f3' },
  { name: 'Water', refractiveIndex: 1.333, color: '#33C3F0' },
  { name: 'Glass', refractiveIndex: 1.5, color: '#aaadb0' },
  { name: 'Diamond', refractiveIndex: 2.417, color: '#e2f2f8' },
  { name: 'Oil', refractiveIndex: 1.47, color: '#d4b76e' }
];

const RefractionSimulation: React.FC = () => {
  // Canvas references
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simulation state
  const [incidentAngle, setIncidentAngle] = useState<number>(30); // degrees
  const [medium1, setMedium1] = useState<RefractionMedium>(mediaOptions[0]);
  const [medium2, setMedium2] = useState<RefractionMedium>(mediaOptions[1]);
  const [showFormula, setShowFormula] = useState<boolean>(false);
  const [showReflection, setShowReflection] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationProgress, setAnimationProgress] = useState<number>(100); // 0-100%
  
  // Calculated values
  const refractionAngle = calculateRefractionAngle(
    incidentAngle, 
    medium1.refractiveIndex, 
    medium2.refractiveIndex
  );
  
  const speedRatio = medium1.refractiveIndex / medium2.refractiveIndex;
  const isTotalInternalReflection = isNaN(refractionAngle);
  
  // Animation frame reference
  const animationRef = useRef<number | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);

  // Calculate refraction angle using Snell's Law
  function calculateRefractionAngle(incidentAngleDeg: number, n1: number, n2: number): number {
    const incidentAngleRad = (incidentAngleDeg * Math.PI) / 180;
    const sinRefraction = (n1 * Math.sin(incidentAngleRad)) / n2;
    
    // Check for total internal reflection
    if (Math.abs(sinRefraction) > 1) {
      return NaN; // Total internal reflection
    }
    
    const refractionAngleRad = Math.asin(sinRefraction);
    return (refractionAngleRad * 180) / Math.PI;
  }

  // Calculate critical angle (if applicable)
  const criticalAngle = medium1.refractiveIndex < medium2.refractiveIndex
    ? 'N/A'
    : Math.round((Math.asin(medium2.refractiveIndex / medium1.refractiveIndex) * 180) / Math.PI);

  // Draw the simulation on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set line style
    ctx.lineWidth = 2;
    
    // Draw the two mediums
    ctx.fillStyle = medium1.color;
    ctx.fillRect(0, 0, width, height / 2);
    
    ctx.fillStyle = medium2.color;
    ctx.fillRect(0, height / 2, width, height / 2);
    
    // Draw the interface line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    
    // Draw the normal line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Calculate ray positions
    const centerX = width / 2;
    const centerY = height / 2;
    const rayLength = Math.min(width, height) * 0.4;
    
    // Convert angles to radians
    const incidentAngleRad = (incidentAngle * Math.PI) / 180;
    
    // Draw incident ray (partial based on animation progress)
    const drawLength = rayLength * (animationProgress / 100);
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const incidentEndX = centerX - drawLength * Math.sin(incidentAngleRad);
    const incidentEndY = centerY - drawLength * Math.cos(incidentAngleRad);
    ctx.lineTo(incidentEndX, incidentEndY);
    ctx.strokeStyle = '#FF5722';
    ctx.stroke();
    
    // Only draw refracted and reflected rays if animation has reached the interface
    if (animationProgress >= 100) {
      // Draw refracted ray
      if (!isTotalInternalReflection) {
        const refractionAngleRad = (refractionAngle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + rayLength * Math.sin(refractionAngleRad),
          centerY + rayLength * Math.cos(refractionAngleRad)
        );
        ctx.strokeStyle = '#4CAF50';
        ctx.stroke();
      }
      
      // Draw reflected ray
      if (showReflection || isTotalInternalReflection) {
        const reflectionAngleRad = (incidentAngle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + rayLength * Math.sin(reflectionAngleRad),
          centerY - rayLength * Math.cos(reflectionAngleRad)
        );
        ctx.strokeStyle = '#2196F3';
        ctx.stroke();
      }
    }
    
    // Draw angle markings
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    
    // Incident angle marking
    ctx.fillText(
      `θ₁ = ${Math.round(incidentAngle)}°`,
      centerX - rayLength * 0.3 * Math.sin(incidentAngleRad),
      centerY - rayLength * 0.3 * Math.cos(incidentAngleRad)
    );
    
    if (!isTotalInternalReflection) {
      // Refraction angle marking
      const refractionAngleRad = (refractionAngle * Math.PI) / 180;
      ctx.fillText(
        `θ₂ = ${Math.round(refractionAngle)}°`,
        centerX + rayLength * 0.3 * Math.sin(refractionAngleRad),
        centerY + rayLength * 0.3 * Math.cos(refractionAngleRad)
      );
    } else {
      // Total internal reflection marking
      ctx.fillText(
        'Total Internal Reflection',
        centerX,
        centerY + 30
      );
    }
    
  }, [incidentAngle, medium1, medium2, showReflection, animationProgress, isTotalInternalReflection, refractionAngle]);

  // Animation control
  useEffect(() => {
    if (isPlaying) {
      if (animationProgress >= 100) {
        setAnimationProgress(0);
      }
      
      const animate = () => {
        setAnimationProgress(prev => {
          const increment = 0.5 * (animationSpeed / 50);
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return newProgress;
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animationProgress, animationSpeed]);

  const handleMedium1Change = (value: string) => {
    const medium = mediaOptions.find(m => m.name === value);
    if (medium) setMedium1(medium);
  };
  
  const handleMedium2Change = (value: string) => {
    const medium = mediaOptions.find(m => m.name === value);
    if (medium) setMedium2(medium);
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative h-[300px] w-full bg-white border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Incident Angle (θ₁)</label>
            <div className="flex items-center gap-4">
              <Slider 
                value={[incidentAngle]} 
                onValueChange={(values) => setIncidentAngle(values[0])} 
                min={0} 
                max={90} 
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-right">{Math.round(incidentAngle)}°</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Medium 1</label>
              <Select value={medium1.name} onValueChange={handleMedium1Change}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select medium" />
                </SelectTrigger>
                <SelectContent>
                  {mediaOptions.map((option) => (
                    <SelectItem key={option.name} value={option.name}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Medium 2</label>
              <Select value={medium2.name} onValueChange={handleMedium2Change}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select medium" />
                </SelectTrigger>
                <SelectContent>
                  {mediaOptions.map((option) => (
                    <SelectItem key={option.name} value={option.name}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="show-reflection"
              checked={showReflection}
              onCheckedChange={setShowReflection}
            />
            <label htmlFor="show-reflection" className="text-sm">
              Show Reflection Ray
            </label>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Measurements</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Refractive Index (n₁):</span>
              <span className="font-mono">{medium1.refractiveIndex.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Refractive Index (n₂):</span>
              <span className="font-mono">{medium2.refractiveIndex.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Angle of Incidence (θ₁):</span>
              <span className="font-mono">{Math.round(incidentAngle)}°</span>
            </div>
            <div className="flex justify-between">
              <span>Angle of Refraction (θ₂):</span>
              <span className="font-mono">
                {isTotalInternalReflection ? 'TIR' : `${Math.round(refractionAngle)}°`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Critical Angle:</span>
              <span className="font-mono">{criticalAngle}</span>
            </div>
            <div className="flex justify-between">
              <span>Speed Ratio (v₁/v₂):</span>
              <span className="font-mono">{speedRatio.toFixed(3)}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-2">
            <Switch
              id="show-formula"
              checked={showFormula}
              onCheckedChange={setShowFormula}
            />
            <label htmlFor="show-formula" className="text-sm">
              Show Snell's Law Formula
            </label>
          </div>
          
          {showFormula && (
            <div className="mt-2 p-2 bg-white rounded border text-center">
              <p className="font-mono">n₁·sin(θ₁) = n₂·sin(θ₂)</p>
              <p className="text-xs mt-1">
                {medium1.refractiveIndex.toFixed(3)}·sin({Math.round(incidentAngle)}°) = 
                {medium2.refractiveIndex.toFixed(3)}·sin({isTotalInternalReflection ? 'TIR' : Math.round(refractionAngle) + '°'})
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          disabled={isPlaying || animationProgress < 100}
        >
          {isPlaying ? "Pause" : "Play Animation"}
        </button>
        
        <div className="flex-1 flex items-center gap-2">
          <span className="text-sm">Slow</span>
          <Slider 
            value={[animationSpeed]}
            onValueChange={(values) => setAnimationSpeed(values[0])}
            min={10}
            max={100}
            step={10}
            className="flex-1"
          />
          <span className="text-sm">Fast</span>
        </div>
        
        {animationProgress < 100 && !isPlaying && (
          <button
            onClick={() => setAnimationProgress(100)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default RefractionSimulation;
