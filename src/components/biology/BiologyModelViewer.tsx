
import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Html } from '@react-three/drei';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

// This is a placeholder component since we don't have the actual models
const ModelPlaceholder = ({ name, parts }: { name: string, parts: any[] }) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  
  // Generate simple geometric shapes to represent a model
  const shapes = [
    { position: [0, 0, 0], scale: [1.5, 1.5, 1.5], color: '#f3f4f6', name: 'base' },
    { position: [0, 0, 0], scale: [1, 1, 1], color: '#6366f1', name: parts[0]?.id || 'part1' },
    { position: [1.2, 0, 0], scale: [0.6, 0.6, 0.6], color: '#10b981', name: parts[1]?.id || 'part2' },
    { position: [-1, 0.7, 0], scale: [0.5, 0.5, 0.5], color: '#ef4444', name: parts[2]?.id || 'part3' },
    { position: [0, -1, 0], scale: [0.7, 0.7, 0.7], color: '#f59e0b', name: parts[3]?.id || 'part4' },
    { position: [0, 0.8, 0], scale: [0.4, 0.4, 0.4], color: '#3b82f6', name: parts[4]?.id || 'part5' },
    { position: [-1, -0.5, 0], scale: [0.3, 0.3, 0.3], color: '#8b5cf6', name: parts[5]?.id || 'part6' }
  ];
  
  return (
    <group>
      {shapes.map((shape, i) => {
        if (i === 0) {
          return (
            <mesh key={shape.name} position={shape.position as any} scale={shape.scale as any}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color={shape.color} transparent opacity={0.2} />
            </mesh>
          );
        }
        
        if (i > parts.length) return null;
        
        const part = parts[i-1];
        const isHovered = hoveredPart === shape.name;
        
        return (
          <group key={shape.name}>
            <mesh 
              position={shape.position as any} 
              scale={isHovered ? [shape.scale[0] * 1.2, shape.scale[1] * 1.2, shape.scale[2] * 1.2] : shape.scale as any}
              onPointerOver={() => setHoveredPart(shape.name)}
              onPointerOut={() => setHoveredPart(null)}
            >
              {i % 3 === 0 ? (
                <boxGeometry args={[1, 1, 1]} />
              ) : i % 3 === 1 ? (
                <sphereGeometry args={[0.5, 16, 16]} />
              ) : (
                <torusGeometry args={[0.5, 0.2, 16, 32]} />
              )}
              <meshStandardMaterial 
                color={isHovered ? '#ffffff' : shape.color} 
                emissive={isHovered ? shape.color : '#000000'}
                emissiveIntensity={isHovered ? 0.5 : 0}
              />
            </mesh>
            
            {isHovered && (
              <Html position={shape.position as any} distanceFactor={10}>
                <div className="bg-white/90 backdrop-blur-sm p-2 rounded shadow-lg pointer-events-none">
                  <p className="font-bold text-sm">{part.name}</p>
                </div>
              </Html>
            )}
          </group>
        );
      })}
      
      <Html position={[0, 2.5, 0]} center>
        <div className="px-4 py-1 rounded-full bg-white/80 backdrop-blur-sm shadow text-center">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500">Placeholder Model</p>
        </div>
      </Html>
    </group>
  );
};

// This would be used with real GLTF models when available
const ModelWithLabels = ({ url, parts }: { url: string, parts: any[] }) => {
  return null; // This would be replaced with actual model loading code
};

type Part = {
  id: string;
  name: string;
  description: string;
};

type BiologyModelViewerProps = {
  model: {
    id: string;
    name: string;
    description: string;
    modelPath: string;
    parts: Part[];
  };
};

const BiologyModelViewer = ({ model }: BiologyModelViewerProps) => {
  const [autoRotate, setAutoRotate] = useState(true);
  
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white/80 backdrop-blur-sm"
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? 'Stop' : 'Rotate'}
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">How to interact:</h4>
              <ul className="text-sm space-y-1">
                <li>• Click and drag to rotate the model</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Hover over parts to see labels</li>
                <li>• Click on parts for more information</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        <Suspense fallback={null}>
          {/* Ideally, this would load the actual GLTF model when available */}
          {/* <ModelWithLabels url={model.modelPath} parts={model.parts} /> */}
          
          {/* For now, we use a placeholder with simple 3D shapes */}
          <ModelPlaceholder name={model.name} parts={model.parts} />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          autoRotate={autoRotate} 
          autoRotateSpeed={1} 
          minDistance={3} 
          maxDistance={10} 
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        Note: This is a placeholder. Actual 3D models would replace these simple shapes.
      </div>
    </div>
  );
};

export default BiologyModelViewer;
