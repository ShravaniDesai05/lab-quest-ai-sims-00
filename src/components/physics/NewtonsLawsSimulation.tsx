
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Play,
  Pause, 
  Square, 
  Trophy, 
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Move,
  Scale
} from 'lucide-react';

// Surface types for the first law simulation
const SURFACES = [
  { name: "Ice", frictionCoefficient: 0.05, color: "#d3e4fd" },
  { name: "Wood", frictionCoefficient: 0.3, color: "#fde1d3" },
  { name: "Carpet", frictionCoefficient: 0.8, color: "#e5deff" }
];

// Environments for the third law
const ENVIRONMENTS = [
  { name: "Space", gravity: 0, color: "#1A1F2C" },
  { name: "Earth", gravity: 9.8, color: "#F2FCE2" },
  { name: "Moon", gravity: 1.62, color: "#F1F0FB" }
];

const NewtonsLawsSimulation: React.FC = () => {
  const { toast } = useToast();
  
  // First Law (Inertia) state
  const [firstLawActive, setFirstLawActive] = useState(false);
  const [puckPosition, setPuckPosition] = useState({ x: 100, y: 150 });
  const [puckVelocity, setPuckVelocity] = useState({ x: 0, y: 0 });
  const [selectedSurface, setSelectedSurface] = useState(SURFACES[0]);
  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
  const [badges, setBadges] = useState({
    firstLaw: false,
    secondLaw: false,
    thirdLaw: false
  });
  
  // Second Law (F=ma) state
  const [mass, setMass] = useState(10); // in kg
  const [force, setForce] = useState(50); // in N
  const [acceleration, setAcceleration] = useState(0); // in m/s²
  const [secondLawActive, setSecondLawActive] = useState(false);
  const [cartPosition, setCartPosition] = useState(50);
  const [chartData, setChartData] = useState<{time: number, acceleration: number}[]>([]);
  
  // Third Law (Action-Reaction) state
  const [thirdLawActive, setThirdLawActive] = useState(false);
  const [object1Position, setObject1Position] = useState(150); 
  const [object2Position, setObject2Position] = useState(250);
  const [pushForce, setPushForce] = useState(50);
  const [selectedEnvironment, setSelectedEnvironment] = useState(ENVIRONMENTS[0]);
  
  // Animation frame reference
  const animationRef = useRef<number | null>(null);
  
  // Canvas references
  const firstLawCanvasRef = useRef<HTMLCanvasElement>(null);
  const secondLawCanvasRef = useRef<HTMLCanvasElement>(null);
  const thirdLawCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // First Law Canvas Setup and Animation
  useEffect(() => {
    const canvas = firstLawCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw surface
      ctx.fillStyle = selectedSurface.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw puck
      ctx.fillStyle = '#9b87f5';
      ctx.beginPath();
      ctx.arc(puckPosition.x, puckPosition.y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw force direction indicator when dragging
      if (dragStart) {
        ctx.strokeStyle = '#7E69AB';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(puckPosition.x, puckPosition.y);
        ctx.lineTo(puckPosition.x - (dragStart.x - puckPosition.x) * 2, 
                  puckPosition.y - (dragStart.y - puckPosition.y) * 2);
        ctx.stroke();
      }
      
      // Draw surface label
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.fillText(`Surface: ${selectedSurface.name}`, 10, 30);
    };
    
    drawScene();
    
    if (firstLawActive) {
      const animate = () => {
        // Update position based on velocity
        setPuckPosition(prev => ({
          x: prev.x + puckVelocity.x,
          y: prev.y + puckVelocity.y
        }));
        
        // Apply friction to slow down the puck
        setPuckVelocity(prev => {
          const friction = selectedSurface.frictionCoefficient;
          const slowdown = 0.98 - friction * 0.1;
          return {
            x: prev.x * slowdown,
            y: prev.y * slowdown
          };
        });
        
        // Check if puck has stopped or left the canvas
        if (Math.abs(puckVelocity.x) < 0.1 && Math.abs(puckVelocity.y) < 0.1) {
          setFirstLawActive(false);
          
          // Award badge if puck moved significantly
          if (Math.hypot(puckPosition.x - 100, puckPosition.y - 150) > 100) {
            if (!badges.firstLaw) {
              setBadges(prev => ({ ...prev, firstLaw: true }));
              toast({
                title: "Badge Earned!",
                description: "First Law Master: You've demonstrated the Law of Inertia",
              });
            }
          }
          return;
        }
        
        // Bounce off walls
        if (puckPosition.x < 20 || puckPosition.x > canvas.width - 20) {
          setPuckVelocity(prev => ({ ...prev, x: -prev.x * 0.8 }));
        }
        if (puckPosition.y < 20 || puckPosition.y > canvas.height - 20) {
          setPuckVelocity(prev => ({ ...prev, y: -prev.y * 0.8 }));
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [firstLawActive, puckPosition, puckVelocity, selectedSurface, dragStart, badges.firstLaw, toast]);
  
  // Second Law Canvas Setup and Animation
  useEffect(() => {
    const canvas = secondLawCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Calculate acceleration (F=ma)
    const calculatedAcceleration = force / mass;
    setAcceleration(parseFloat(calculatedAcceleration.toFixed(2)));
    
    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw track
      ctx.fillStyle = '#f1f0fb';
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
      
      // Draw cart
      const cartWidth = 50 + (mass * 0.5); // Cart grows with mass
      const cartHeight = 30;
      ctx.fillStyle = '#9b87f5';
      ctx.fillRect(cartPosition, canvas.height - cartHeight - 40, cartWidth, cartHeight);
      
      // Draw force arrow
      ctx.strokeStyle = '#7E69AB';
      ctx.lineWidth = 3;
      const arrowLength = force * 0.5;
      ctx.beginPath();
      ctx.moveTo(cartPosition, canvas.height - 55);
      ctx.lineTo(cartPosition - arrowLength, canvas.height - 55);
      ctx.stroke();
      
      // Draw arrowhead
      ctx.beginPath();
      ctx.moveTo(cartPosition - arrowLength, canvas.height - 60);
      ctx.lineTo(cartPosition - arrowLength, canvas.height - 50);
      ctx.lineTo(cartPosition - arrowLength - 10, canvas.height - 55);
      ctx.closePath();
      ctx.fillStyle = '#7E69AB';
      ctx.fill();
      
      // Draw labels
      ctx.fillStyle = '#333';
      ctx.font = '14px Arial';
      ctx.fillText(`Mass: ${mass} kg`, 10, 30);
      ctx.fillText(`Force: ${force} N`, 10, 50);
      ctx.fillText(`Acceleration: ${acceleration} m/s²`, 10, 70);
    };
    
    drawScene();
    
    if (secondLawActive) {
      const startTime = Date.now();
      let lastTime = startTime;
      
      const animate = () => {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000; // in seconds
        lastTime = currentTime;
        
        // Move cart based on acceleration
        setCartPosition(prev => {
          const newPos = prev + acceleration * 10 * deltaTime;
          
          // If cart reaches end of track
          if (newPos > canvas.width - 80 || newPos < 0) {
            setSecondLawActive(false);
            
            // Award badge if acceleration is significant
            if (acceleration > 3) {
              if (!badges.secondLaw) {
                setBadges(prev => ({ ...prev, secondLaw: true }));
                toast({
                  title: "Badge Earned!",
                  description: "F=ma Master: You've demonstrated Newton's Second Law",
                });
              }
            }
            return prev;
          }
          
          return newPos;
        });
        
        // Update chart data
        const elapsedTime = (currentTime - startTime) / 1000;
        setChartData(prev => [...prev, { time: elapsedTime, acceleration }]);
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [secondLawActive, mass, force, acceleration, cartPosition, badges.secondLaw, toast]);
  
  // Third Law Canvas Setup and Animation
  useEffect(() => {
    const canvas = thirdLawCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background based on environment
      ctx.fillStyle = selectedEnvironment.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars if in space
      if (selectedEnvironment.name === "Space") {
        ctx.fillStyle = 'white';
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw astronauts/objects
      ctx.fillStyle = '#9b87f5';
      ctx.beginPath();
      ctx.arc(object1Position, canvas.height / 2, 25, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#6E59A5';
      ctx.beginPath();
      ctx.arc(object2Position, canvas.height / 2, 25, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw force arrows if active
      if (thirdLawActive) {
        // Force arrows
        ctx.strokeStyle = '#D946EF';
        ctx.lineWidth = 3;
        
        // Object 1 arrow (action)
        ctx.beginPath();
        ctx.moveTo(object1Position + 25, canvas.height / 2);
        ctx.lineTo(object1Position + 25 + (pushForce * 0.5), canvas.height / 2);
        ctx.stroke();
        
        // Object 2 arrow (reaction)
        ctx.beginPath();
        ctx.moveTo(object2Position - 25, canvas.height / 2);
        ctx.lineTo(object2Position - 25 - (pushForce * 0.5), canvas.height / 2);
        ctx.stroke();
      }
      
      // Draw environment label
      ctx.fillStyle = selectedEnvironment.name === "Space" ? 'white' : '#333';
      ctx.font = '16px Arial';
      ctx.fillText(`Environment: ${selectedEnvironment.name}`, 10, 30);
      ctx.fillText(`Gravity: ${selectedEnvironment.gravity} m/s²`, 10, 50);
    };
    
    drawScene();
    
    if (thirdLawActive) {
      const animate = () => {
        // Calculate velocities based on force and mass
        // Assuming both objects have same mass for simplicity
        const velocity = pushForce * 0.1;
        
        // Update positions
        setObject1Position(prev => {
          const newPos = prev - velocity;
          return newPos < 0 ? 0 : newPos;
        });
        
        setObject2Position(prev => {
          const newPos = prev + velocity;
          return newPos > canvas.width ? canvas.width : newPos;
        });
        
        // Check if objects have moved far enough apart
        if (object2Position - object1Position > 300) {
          setThirdLawActive(false);
          
          // Award badge
          if (!badges.thirdLaw) {
            setBadges(prev => ({ ...prev, thirdLaw: true }));
            toast({
              title: "Badge Earned!",
              description: "Action-Reaction Master: You've demonstrated Newton's Third Law",
            });
          }
          return;
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [thirdLawActive, object1Position, object2Position, selectedEnvironment, pushForce, badges.thirdLaw, toast]);
  
  // First Law handlers
  const handleFirstLawCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (firstLawActive) return;
    
    const canvas = firstLawCanvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if click is on puck
    const distance = Math.hypot(x - puckPosition.x, y - puckPosition.y);
    if (distance < 20) {
      setDragStart({ x, y });
    }
  };
  
  const handleFirstLawCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragStart) {
      const canvas = firstLawCanvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update drag position for drawing the force indicator
      setDragStart({ x, y });
    }
  };
  
  const handleFirstLawCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragStart) {
      const canvas = firstLawCanvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate velocity based on drag distance and direction
      const dx = puckPosition.x - x;
      const dy = puckPosition.y - y;
      const distance = Math.hypot(dx, dy);
      
      // Scale velocity based on drag distance
      const speed = Math.min(distance * 0.05, 10);
      const angle = Math.atan2(dy, dx);
      
      setPuckVelocity({
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      });
      
      setFirstLawActive(true);
      setDragStart(null);
    }
  };
  
  const resetFirstLaw = () => {
    setFirstLawActive(false);
    setPuckPosition({ x: 100, y: 150 });
    setPuckVelocity({ x: 0, y: 0 });
    setDragStart(null);
  };
  
  // Second Law handlers
  const startSecondLaw = () => {
    setSecondLawActive(true);
    setCartPosition(50);
    setChartData([]);
  };
  
  const resetSecondLaw = () => {
    setSecondLawActive(false);
    setCartPosition(50);
    setChartData([]);
  };
  
  // Third Law handlers
  const startThirdLaw = () => {
    setThirdLawActive(true);
    setObject1Position(150);
    setObject2Position(250);
  };
  
  const resetThirdLaw = () => {
    setThirdLawActive(false);
    setObject1Position(150);
    setObject2Position(250);
  };
  
  const allBadgesEarned = badges.firstLaw && badges.secondLaw && badges.thirdLaw;
  
  useEffect(() => {
    if (allBadgesEarned) {
      toast({
        title: "All Badges Earned!",
        description: "Physics Master: You've mastered all of Newton's Laws of Motion!",
        variant: "success",
      });
    }
  }, [allBadgesEarned, toast]);

  return (
    <div className="w-full space-y-6 p-4">
      {/* Success banner when all badges are earned */}
      {allBadgesEarned && (
        <div className="w-full p-4 bg-green-100 border border-green-500 rounded-lg flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-green-600 mr-2" />
            <span className="font-bold text-green-700">Motion Master: All Newton's Laws Badges Earned!</span>
          </div>
          <Badge className="bg-green-700">Physics Master</Badge>
        </div>
      )}
      
      <Tabs defaultValue="first-law" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="first-law" className="flex items-center gap-2">
            <Badge className={badges.firstLaw ? "bg-green-600" : "bg-gray-400"}>1</Badge>
            Law of Inertia
          </TabsTrigger>
          <TabsTrigger value="second-law" className="flex items-center gap-2">
            <Badge className={badges.secondLaw ? "bg-green-600" : "bg-gray-400"}>2</Badge>
            F = ma
          </TabsTrigger>
          <TabsTrigger value="third-law" className="flex items-center gap-2">
            <Badge className={badges.thirdLaw ? "bg-green-600" : "bg-gray-400"}>3</Badge>
            Action-Reaction
          </TabsTrigger>
        </TabsList>
        
        {/* First Law Tab */}
        <TabsContent value="first-law">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Newton's First Law: Law of Inertia</h3>
              <p className="text-gray-600 mb-4">
                An object at rest stays at rest, and an object in motion stays in motion 
                unless acted upon by an external force.
              </p>
              
              <div className="flex mb-4">
                <div className="mr-4">
                  <h4 className="font-medium mb-2">Surface Type</h4>
                  <div className="flex space-x-2">
                    {SURFACES.map(surface => (
                      <Button
                        key={surface.name}
                        onClick={() => setSelectedSurface(surface)}
                        variant={selectedSurface.name === surface.name ? "default" : "outline"}
                        style={{ backgroundColor: selectedSurface.name === surface.name ? "#9b87f5" : surface.color }}
                        className="relative"
                      >
                        {surface.name}
                        {selectedSurface.name === surface.name && (
                          <span className="text-xs absolute -top-1 -right-1 bg-white text-black rounded-full px-1 border">
                            {surface.frictionCoefficient}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Controls</h4>
                  <div className="flex space-x-2">
                    <Button onClick={resetFirstLaw} variant="outline" className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      Reset
                    </Button>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Instructions",
                          description: "Click and drag the puck to apply a force. Release to let it move!"
                        });
                      }}
                      variant="outline"
                    >
                      Help
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative mb-2">
                <canvas
                  ref={firstLawCanvasRef}
                  width={600}
                  height={300}
                  className="w-full border border-gray-300 rounded-lg bg-white"
                  onMouseDown={handleFirstLawCanvasMouseDown}
                  onMouseMove={handleFirstLawCanvasMouseMove}
                  onMouseUp={handleFirstLawCanvasMouseUp}
                  onMouseLeave={() => setDragStart(null)}
                />
                
                {!dragStart && !firstLawActive && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-3 bg-white bg-opacity-80 rounded-lg">
                    <p className="text-gray-800">Click and drag the puck to apply a force</p>
                    <Move className="h-8 w-8 mx-auto mt-2 text-lab-purple animate-bounce" />
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Observation:</strong> On surfaces with lower friction (like ice), objects stay in motion 
                  longer after a force is applied. On high-friction surfaces, they stop more quickly.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Second Law Tab */}
        <TabsContent value="second-law">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Newton's Second Law: F = ma</h3>
              <p className="text-gray-600 mb-4">
                The acceleration of an object depends on the force applied and the object's mass.
                Force equals mass times acceleration (F = ma).
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">Mass</h4>
                      <span className="text-sm text-gray-600">{mass} kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        onClick={() => setMass(prev => Math.max(1, prev - 5))}
                        disabled={mass <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Slider 
                        value={[mass]} 
                        min={1} 
                        max={50} 
                        step={1}
                        onValueChange={(values) => setMass(values[0])}
                        className="flex-1"
                      />
                      <Button 
                        size="icon" 
                        variant="outline" 
                        onClick={() => setMass(prev => Math.min(50, prev + 5))}
                        disabled={mass >= 50}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">Force</h4>
                      <span className="text-sm text-gray-600">{force} N</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        onClick={() => setForce(prev => Math.max(0, prev - 10))}
                        disabled={force <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Slider 
                        value={[force]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(values) => setForce(values[0])}
                        className="flex-1"
                      />
                      <Button 
                        size="icon" 
                        variant="outline" 
                        onClick={() => setForce(prev => Math.min(100, prev + 10))}
                        disabled={force >= 100}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <h4 className="font-medium mb-2">Acceleration Result</h4>
                    <div className="flex items-center justify-center">
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-300 w-full">
                        <span className="text-xl font-bold text-lab-purple">{acceleration} m/s²</span>
                        <div className="text-xs text-gray-500 mt-1">F = ma → a = F/m</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={startSecondLaw} 
                      disabled={secondLawActive || force === 0}
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-1" /> Start
                    </Button>
                    <Button onClick={resetSecondLaw} variant="outline" className="flex-1">
                      <Square className="h-4 w-4 mr-1" /> Reset
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-700 flex items-center">
                      <Trophy className="h-4 w-4 mr-1" /> Challenge
                    </h4>
                    <p className="text-sm text-yellow-700">
                      Can you set mass and force values to achieve exactly 5.0 m/s² acceleration?
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <canvas
                    ref={secondLawCanvasRef}
                    width={300}
                    height={200}
                    className="border border-gray-300 rounded-lg bg-white w-full h-48"
                  />
                  
                  <div className="border border-gray-300 rounded-lg p-3 bg-white">
                    <h4 className="font-medium mb-2 text-center">Force & Acceleration Graph</h4>
                    <div className="h-32 bg-gray-50 rounded border border-gray-200 p-2 flex items-end space-x-1">
                      {chartData.slice(-20).map((point, i) => (
                        <div
                          key={i}
                          className="bg-lab-purple w-3 rounded-t"
                          style={{ 
                            height: `${Math.min(point.acceleration * 5, 100)}%`,
                            opacity: (i + 1) / 20 
                          }}
                          title={`Time: ${point.time.toFixed(1)}s, Acc: ${point.acceleration} m/s²`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Observation:</strong> For a fixed force, a smaller mass results in greater acceleration. 
                  For a fixed mass, a larger force results in greater acceleration.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Third Law Tab */}
        <TabsContent value="third-law">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Newton's Third Law: Action & Reaction</h3>
              <p className="text-gray-600 mb-4">
                For every action, there is an equal and opposite reaction. When one object exerts a force 
                on a second object, the second object exerts an equal and opposite force on the first.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Select Environment</h4>
                    <div className="flex flex-wrap gap-2">
                      {ENVIRONMENTS.map(env => (
                        <Button
                          key={env.name}
                          onClick={() => {
                            setSelectedEnvironment(env);
                            // Reset positions when changing environment
                            setObject1Position(150);
                            setObject2Position(250);
                          }}
                          variant={selectedEnvironment.name === env.name ? "default" : "outline"}
                          style={{ 
                            backgroundColor: selectedEnvironment.name === env.name 
                              ? "#9b87f5" 
                              : env.color === "#1A1F2C" ? "#333" : env.color
                          }}
                          className={selectedEnvironment.name === env.name ? "" : 
                            env.name === "Space" ? "text-white" : ""}
                        >
                          {env.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">Push Force</h4>
                      <span className="text-sm text-gray-600">{pushForce} N</span>
                    </div>
                    <Slider 
                      value={[pushForce]} 
                      min={10} 
                      max={100} 
                      step={5}
                      onValueChange={(values) => setPushForce(values[0])}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={startThirdLaw} 
                      disabled={thirdLawActive}
                      className="flex-1"
                    >
                      <ArrowRight className="h-4 w-4 mr-1" /> Push
                    </Button>
                    <Button onClick={resetThirdLaw} variant="outline" className="flex-1">
                      <Square className="h-4 w-4 mr-1" /> Reset
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-700">Conceptual Note</h4>
                    <p className="text-sm text-blue-700">
                      In space (zero gravity), the action-reaction principle is most clearly visible 
                      as there's no friction or gravity to mask the effect.
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-3">
                    <canvas
                      ref={thirdLawCanvasRef}
                      width={400}
                      height={200}
                      className="border border-gray-300 rounded-lg bg-white w-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-center">
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex-1">
                      <div className="w-6 h-6 rounded-full bg-[#9b87f5] mx-auto mb-1"></div>
                      <p className="text-xs text-gray-700">Force applied: {pushForce} N</p>
                      <ArrowRight className="h-4 w-4 mx-auto text-[#9b87f5]" />
                    </div>
                    <Scale className="h-5 w-5 text-gray-400" />
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex-1">
                      <div className="w-6 h-6 rounded-full bg-[#6E59A5] mx-auto mb-1"></div>
                      <p className="text-xs text-gray-700">Reaction force: {pushForce} N</p>
                      <ArrowLeft className="h-4 w-4 mx-auto text-[#6E59A5]" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Observation:</strong> When the purple object pushes against the dark purple object, 
                both objects move away from each other with forces of equal magnitude but opposite direction.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Achievement badges */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Physics Achievement Badges</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border text-center ${badges.firstLaw 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200 opacity-50'}`}>
            <Badge className={badges.firstLaw ? "bg-green-600" : "bg-gray-400"}>
              1
            </Badge>
            <h4 className="font-medium mt-2">Law of Inertia Master</h4>
            <p className="text-sm mt-1 text-gray-600">
              {badges.firstLaw 
                ? '🎉 Unlocked! You mastered Newton\'s First Law' 
                : 'Apply force to the puck to unlock'}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg border text-center ${badges.secondLaw 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200 opacity-50'}`}>
            <Badge className={badges.secondLaw ? "bg-green-600" : "bg-gray-400"}>
              2
            </Badge>
            <h4 className="font-medium mt-2">F=ma Master</h4>
            <p className="text-sm mt-1 text-gray-600">
              {badges.secondLaw 
                ? '🎉 Unlocked! You mastered Newton\'s Second Law' 
                : 'Create significant acceleration to unlock'}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg border text-center ${badges.thirdLaw 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200 opacity-50'}`}>
            <Badge className={badges.thirdLaw ? "bg-green-600" : "bg-gray-400"}>
              3
            </Badge>
            <h4 className="font-medium mt-2">Action-Reaction Master</h4>
            <p className="text-sm mt-1 text-gray-600">
              {badges.thirdLaw 
                ? '🎉 Unlocked! You mastered Newton\'s Third Law' 
                : 'Demonstrate the push effect to unlock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewtonsLawsSimulation;
