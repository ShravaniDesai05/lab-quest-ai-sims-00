
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Gauge, Sliders, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const MIN_VOLTAGE = 1;
const MAX_VOLTAGE = 12;
const MIN_RESISTANCE = 100;
const MAX_RESISTANCE = 1000;

const OhmsLawSimulation: React.FC = () => {
  const [voltage, setVoltage] = useState(5); // Volts
  const [resistance, setResistance] = useState(500); // Ohms
  const [current, setCurrent] = useState(0); // Amperes
  const [showFormula, setShowFormula] = useState(false);
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [targetCurrent, setTargetCurrent] = useState(0);
  const [targetTolerance, setTargetTolerance] = useState(0.05); // 5% tolerance
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [graphData, setGraphData] = useState<{voltage: number, current: number}[]>([]);
  
  const { toast } = useToast();

  // Calculate current using Ohm's Law: I = V / R
  useEffect(() => {
    const calculatedCurrent = voltage / (resistance / 1000); // Convert resistance to kOhms for better display
    setCurrent(Number(calculatedCurrent.toFixed(3)));
    
    // Check if challenge is completed
    if (isChallengeMode && !challengeCompleted) {
      const currentDifference = Math.abs(calculatedCurrent - targetCurrent);
      const isWithinTolerance = currentDifference <= targetCurrent * targetTolerance;
      
      if (isWithinTolerance) {
        toast({
          title: "Challenge Completed!",
          description: `You successfully achieved the target current of ${targetCurrent.toFixed(3)} A.`,
        });
        setChallengeCompleted(true);
      }
    }
  }, [voltage, resistance, isChallengeMode, targetCurrent, targetTolerance, challengeCompleted, toast]);

  // Generate graph data
  useEffect(() => {
    const newData = [];
    for (let v = 0; v <= MAX_VOLTAGE; v += 1) {
      newData.push({
        voltage: v,
        current: Number((v / (resistance / 1000)).toFixed(3))
      });
    }
    setGraphData(newData);
  }, [resistance]);

  const startChallenge = () => {
    // Generate random target current between 0.01 and 0.05
    const newTargetCurrent = Number((Math.random() * 0.04 + 0.01).toFixed(3));
    setTargetCurrent(newTargetCurrent);
    
    // Reset challenge state
    setChallengeCompleted(false);
    setIsChallengeMode(true);
    
    toast({
      title: "Challenge Started",
      description: `Adjust the voltage or resistance to achieve a current of ${newTargetCurrent.toFixed(3)} A.`,
    });
  };

  const resetSimulation = () => {
    setVoltage(5);
    setResistance(500);
    setIsChallengeMode(false);
    setChallengeCompleted(false);
    setShowFormula(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Ohm's Law Interactive Simulation</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFormula(!showFormula)}
          >
            {showFormula ? "Hide" : "Show"} Formula
          </Button>
          {isChallengeMode ? (
            <Button 
              variant="outline" 
              onClick={() => setIsChallengeMode(false)}
            >
              Exit Challenge
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={startChallenge}
            >
              Challenge Mode
            </Button>
          )}
          <Button variant="outline" onClick={resetSimulation}>Reset</Button>
        </div>
      </div>
      
      {showFormula && (
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-center font-bold text-lg mb-2">Ohm's Law: V = I × R</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-semibold">Voltage (V)</p>
              <p>Measured in Volts (V)</p>
            </div>
            <div>
              <p className="font-semibold">Current (I)</p>
              <p>Measured in Amperes (A)</p>
            </div>
            <div>
              <p className="font-semibold">Resistance (R)</p>
              <p>Measured in Ohms (Ω)</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-center">Rearranging: I = V/R and R = V/I</p>
        </div>
      )}
      
      {isChallengeMode && (
        <div className={`p-4 rounded-lg ${challengeCompleted ? 'bg-green-100' : 'bg-blue-100'}`}>
          <h4 className="font-semibold mb-2">
            {challengeCompleted ? "Challenge Completed!" : "Current Challenge"}
          </h4>
          <p>
            Target current: <span className="font-bold">{targetCurrent.toFixed(3)} A</span>
          </p>
          <p className="text-sm mt-1">
            {challengeCompleted 
              ? "Great job! You can start a new challenge or continue exploring." 
              : "Adjust the voltage or resistance to achieve the target current."}
          </p>
          {challengeCompleted && (
            <Button 
              className="mt-2" 
              size="sm" 
              onClick={startChallenge}
            >
              New Challenge
            </Button>
          )}
        </div>
      )}
      
      <div className="bg-white border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Circuit Diagram */}
          <div className="flex-1 min-h-[300px] bg-gray-50 rounded-lg p-4 relative flex items-center justify-center">
            {/* Simple circuit diagram */}
            <div className="w-full max-w-md relative">
              {/* Battery */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                <Battery className="h-12 w-12 text-gray-700" />
                <span className="text-xs mt-1 font-medium">{voltage.toFixed(1)}V</span>
              </div>
              
              {/* Resistor */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                <div className="h-8 w-16 bg-purple-200 border-2 border-purple-400 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {(resistance / 1000).toFixed(1)}kΩ
                  </span>
                </div>
                <span className="text-xs mt-1">Resistor</span>
              </div>
              
              {/* Wire top */}
              <div className="absolute top-0 left-[60px] right-[60px] h-1 bg-gray-700"></div>
              
              {/* Wire bottom */}
              <div className="absolute bottom-0 left-[60px] right-[60px] h-1 bg-gray-700"></div>
              
              {/* Ammeter */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <Gauge className="h-12 w-12 text-gray-700" />
                <span className="text-xs mt-1 font-medium">{current.toFixed(3)}A</span>
              </div>
              
              {/* Current flow indicators */}
              <div className="absolute top-1/4 left-1/4 transform -translate-y-1/2">
                <ArrowRight className="h-5 w-5 text-blue-500 animate-pulse" />
              </div>
              <div className="absolute bottom-1/4 right-1/4 transform translate-y-1/2 rotate-180">
                <ArrowRight className="h-5 w-5 text-blue-500 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  Voltage: {voltage.toFixed(1)} V
                </label>
                <Input
                  type="number"
                  value={voltage}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && val >= MIN_VOLTAGE && val <= MAX_VOLTAGE) {
                      setVoltage(val);
                    }
                  }}
                  className="w-20 text-right"
                  min={MIN_VOLTAGE}
                  max={MAX_VOLTAGE}
                  step={0.1}
                />
              </div>
              <Slider
                value={[voltage]}
                min={MIN_VOLTAGE}
                max={MAX_VOLTAGE}
                step={0.1}
                onValueChange={(values) => setVoltage(values[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sliders className="h-4 w-4" />
                  Resistance: {(resistance / 1000).toFixed(1)} kΩ
                </label>
                <Input
                  type="number"
                  value={resistance}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= MIN_RESISTANCE && val <= MAX_RESISTANCE) {
                      setResistance(val);
                    }
                  }}
                  className="w-20 text-right"
                  min={MIN_RESISTANCE}
                  max={MAX_RESISTANCE}
                  step={10}
                />
              </div>
              <Slider
                value={[resistance]}
                min={MIN_RESISTANCE}
                max={MAX_RESISTANCE}
                step={10}
                onValueChange={(values) => setResistance(values[0])}
              />
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <h4 className="font-semibold mb-2">Measurements:</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Voltage</p>
                  <p className="font-medium">{voltage.toFixed(2)} V</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Current</p>
                  <p className="font-medium">{current.toFixed(3)} A</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Resistance</p>
                  <p className="font-medium">{(resistance / 1000).toFixed(2)} kΩ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold mb-4">Voltage vs. Current Graph</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="voltage" 
                  label={{ value: 'Voltage (V)', position: 'insideBottomRight', offset: -10 }}
                  domain={[0, MAX_VOLTAGE]}
                />
                <YAxis 
                  label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 'auto']}
                />
                <Tooltip formatter={(value) => [`${value} A`, 'Current']} />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#8884d8" 
                  dot={false} 
                  strokeWidth={2}
                />
                {/* Plot the current point on the graph */}
                <Line 
                  data={[{ voltage, current }]} 
                  type="monotone" 
                  dataKey="current" 
                  stroke="none"
                  dot={{ stroke: '#ff6b6b', strokeWidth: 2, r: 6, fill: '#ff6b6b' }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawSimulation;
