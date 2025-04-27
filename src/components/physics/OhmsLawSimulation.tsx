
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Sliders, Gauge, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const MIN_VOLTAGE = 0;
const MAX_VOLTAGE = 20;
const MIN_RESISTANCE = 1;
const MAX_RESISTANCE = 100;

const OhmsLawSimulation: React.FC = () => {
  const [voltage, setVoltage] = useState(5); // Volts
  const [resistance, setResistance] = useState(10); // Ohms
  const [current, setCurrent] = useState(0); // Amperes
  const [showFormula, setShowFormula] = useState(true);
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [targetCurrent, setTargetCurrent] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [graphData, setGraphData] = useState<{voltage: number, current: number}[]>([]);
  
  const { toast } = useToast();

  // Calculate current using Ohm's Law: I = V / R
  useEffect(() => {
    const calculatedCurrent = voltage / resistance;
    setCurrent(Number(calculatedCurrent.toFixed(3)));
    
    if (isChallengeMode && !challengeCompleted) {
      const isCorrect = Math.abs(Number(userGuess) - calculatedCurrent) < 0.1;
      if (isCorrect) {
        toast({
          title: "Correct!",
          description: "You've successfully calculated the current!",
        });
        setChallengeCompleted(true);
      }
    }
  }, [voltage, resistance, isChallengeMode, userGuess, challengeCompleted]);

  // Generate graph data
  useEffect(() => {
    const newData = [];
    for (let v = 0; v <= MAX_VOLTAGE; v += 2) {
      newData.push({
        voltage: v,
        current: Number((v / resistance).toFixed(3))
      });
    }
    setGraphData(newData);
  }, [resistance]);

  const startChallenge = () => {
    const newVoltage = Math.floor(Math.random() * MAX_VOLTAGE) + 1;
    const newResistance = Math.floor(Math.random() * MAX_RESISTANCE) + 1;
    setVoltage(newVoltage);
    setResistance(newResistance);
    setUserGuess('');
    setChallengeCompleted(false);
    setIsChallengeMode(true);
    
    toast({
      title: "Challenge Started",
      description: `Calculate the current for ${newVoltage}V and ${newResistance}Ω using Ohm's Law!`,
    });
  };

  const checkAnswer = () => {
    const calculatedCurrent = voltage / resistance;
    const isCorrect = Math.abs(Number(userGuess) - calculatedCurrent) < 0.1;
    
    toast({
      title: isCorrect ? "Correct!" : "Try Again",
      description: isCorrect 
        ? "You've successfully calculated the current!"
        : `The correct current is ${calculatedCurrent.toFixed(3)}A. Remember: I = V/R`,
      variant: isCorrect ? "default" : "destructive",
    });

    if (isCorrect) {
      setChallengeCompleted(true);
    }
  };

  return (
    <div className="w-full space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-purple-800">Interactive Ohm's Law Simulation</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFormula(!showFormula)}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            {showFormula ? "Hide" : "Show"} Formula
          </Button>
          {isChallengeMode ? (
            <Button 
              variant="outline"
              onClick={() => setIsChallengeMode(false)}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Exit Challenge
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={startChallenge}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Challenge Mode
            </Button>
          )}
        </div>
      </div>
      
      {showFormula && (
        <div className="bg-purple-50 p-4 rounded-lg animate-fade-in">
          <h4 className="text-center font-bold text-xl mb-2 text-purple-800">Ohm's Law: V = I × R</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <p className="font-semibold text-purple-700">Voltage (V)</p>
              <p className="text-2xl font-bold text-purple-900">{voltage.toFixed(1)}V</p>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <p className="font-semibold text-purple-700">Current (I)</p>
              <p className="text-2xl font-bold text-purple-900">{current.toFixed(3)}A</p>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <p className="font-semibold text-purple-700">Resistance (R)</p>
              <p className="text-2xl font-bold text-purple-900">{resistance.toFixed(1)}Ω</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Circuit Diagram */}
        <div className="bg-purple-50 rounded-lg p-6 relative min-h-[300px] flex items-center justify-center">
          <div className="w-full max-w-md relative">
            {/* Battery */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
              <Battery className="h-16 w-16 text-purple-700" />
              <span className="text-sm mt-1 font-medium text-purple-900">{voltage.toFixed(1)}V</span>
            </div>
            
            {/* Resistor */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
              <div className="h-10 w-20 bg-purple-200 border-2 border-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-purple-900">
                  {resistance.toFixed(1)}Ω
                </span>
              </div>
              <span className="text-sm mt-1 text-purple-700">Resistor</span>
            </div>
            
            {/* Wire connections */}
            <div className="absolute top-0 left-[60px] right-[60px] h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute bottom-0 left-[60px] right-[60px] h-2 bg-purple-400 rounded-full"></div>
            
            {/* Ammeter */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <Gauge className="h-16 w-16 text-purple-700" />
              <span className="text-sm mt-1 font-medium text-purple-900">{current.toFixed(3)}A</span>
            </div>
            
            {/* Current flow indicators */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className="absolute top-1/4 transform -translate-y-1/2"
                style={{ 
                  left: `${25 + i * 25}%`,
                  animation: `slide-right ${1/current}s linear infinite`
                }}
              >
                <ArrowRight className="h-6 w-6 text-blue-500" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          {isChallengeMode ? (
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-4 text-purple-800">Challenge Mode</h4>
              <p className="mb-2">Given:</p>
              <ul className="list-disc list-inside mb-4 text-purple-700">
                <li>Voltage: {voltage.toFixed(1)}V</li>
                <li>Resistance: {resistance.toFixed(1)}Ω</li>
              </ul>
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-900">
                  Calculate the current (in Amperes):
                </label>
                <Input
                  type="number"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder="Enter current (A)"
                  className="w-full"
                  step="0.001"
                />
                <Button 
                  onClick={checkAnswer}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={challengeCompleted}
                >
                  Check Answer
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-purple-900 flex items-center gap-2">
                    <Battery className="h-4 w-4" />
                    Voltage: {voltage.toFixed(1)}V
                  </label>
                </div>
                <Slider
                  value={[voltage]}
                  min={MIN_VOLTAGE}
                  max={MAX_VOLTAGE}
                  step={0.1}
                  onValueChange={(values) => setVoltage(values[0])}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-purple-900 flex items-center gap-2">
                    <Sliders className="h-4 w-4" />
                    Resistance: {resistance.toFixed(1)}Ω
                  </label>
                </div>
                <Slider
                  value={[resistance]}
                  min={MIN_RESISTANCE}
                  max={MAX_RESISTANCE}
                  step={1}
                  onValueChange={(values) => setResistance(values[0])}
                  className="py-4"
                />
              </div>
            </>
          )}
          
          {/* Graph */}
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold mb-4 text-purple-800">Voltage vs. Current Graph</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={graphData}
                  margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0e6ff" />
                  <XAxis 
                    dataKey="voltage" 
                    stroke="#6b46c1"
                    label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    stroke="#6b46c1"
                    label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#9b87f5"
                    strokeWidth={2}
                    dot={false}
                  />
                  {/* Current point indicator */}
                  <Line 
                    data={[{ voltage, current }]}
                    type="monotone"
                    dataKey="current"
                    stroke="none"
                    dot={{ stroke: '#6b46c1', strokeWidth: 2, r: 6, fill: '#9b87f5' }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawSimulation;
