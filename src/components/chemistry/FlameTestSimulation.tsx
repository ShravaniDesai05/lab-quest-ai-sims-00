
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Flame, TestTube } from "lucide-react";
import { MetalIon } from '@/types/experiments';
import { useToast } from "@/hooks/use-toast";

interface FlameTestSimulationProps {
  metalIons: MetalIon[];
}

const FlameTestSimulation: React.FC<FlameTestSimulationProps> = ({ metalIons }) => {
  const [selectedIon, setSelectedIon] = useState<MetalIon | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showingFlame, setShowingFlame] = useState(false);
  const [quizIon, setQuizIon] = useState<MetalIon | null>(null);
  const [showReference, setShowReference] = useState(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const { toast } = useToast();

  const startQuiz = () => {
    setIsQuizMode(true);
    setShowingFlame(false);
    const randomIon = metalIons[Math.floor(Math.random() * metalIons.length)];
    setQuizIon(randomIon);
    setUserGuess(null);
    setShowingFlame(true);
  };

  const handleIonSelect = (ionName: string) => {
    const ion = metalIons.find(i => i.name === ionName);
    if (ion) {
      setSelectedIon(ion);
      setShowingFlame(true);
      toast({
        title: "Flame Test",
        description: `Observing ${ion.name} in the flame.`,
      });
    }
  };

  const handleGuess = (ionName: string) => {
    if (!quizIon) return;
    setUserGuess(ionName);
    
    // Check if the guess is correct
    if (ionName === quizIon.name) {
      toast({
        title: "Correct!",
        description: `You correctly identified ${quizIon.name}!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The flame color was actually from ${quizIon.name}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Quiz Mode</span>
          <Switch
            checked={isQuizMode}
            onCheckedChange={(checked) => {
              setIsQuizMode(checked);
              if (checked) startQuiz();
              else {
                setShowingFlame(false);
                setSelectedIon(null);
              }
            }}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowReference(!showReference)}
        >
          {showReference ? "Hide" : "Show"} Reference Chart
        </Button>
      </div>

      {showReference && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Flame Color Reference</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {metalIons.map((ion) => (
                <div
                  key={ion.symbol}
                  className="p-3 rounded-lg border"
                  style={{ backgroundColor: `${ion.color}20` }}
                >
                  <div className="font-semibold">{ion.name} ({ion.symbol})</div>
                  <div
                    className="w-full h-6 rounded mt-2"
                    style={{ backgroundColor: ion.flameColor }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {isQuizMode ? "Make your guess:" : "Select a metal ion:"}
            </label>
            <Select
              onValueChange={isQuizMode ? handleGuess : handleIonSelect}
              value={isQuizMode ? userGuess ?? undefined : selectedIon?.name}
            >
              <SelectTrigger>
                <SelectValue placeholder={isQuizMode ? "What metal ion is this?" : "Choose a metal ion"} />
              </SelectTrigger>
              <SelectContent>
                {metalIons.map((ion) => (
                  <SelectItem key={ion.symbol} value={ion.name}>
                    {ion.name} ({ion.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isQuizMode && userGuess && quizIon && (
            <div className={`p-4 rounded-lg ${
              userGuess === quizIon.name ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <p className="font-medium mb-2">
                {userGuess === quizIon.name ? 'Correct!' : 'Incorrect!'}
              </p>
              <p>The flame color was produced by {quizIon.name} ({quizIon.symbol})</p>
              <p className="text-sm mt-2">{quizIon.description}</p>
              <Button 
                className="mt-4"
                onClick={startQuiz}
              >
                Try Another
              </Button>
            </div>
          )}
        </div>

        <div className="relative min-h-[300px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="w-20 h-40 bg-gray-700 rounded-t-lg relative">
            {/* Bunsen burner neck */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gray-600 rounded" />
            
            {/* Flame */}
            {showingFlame && (
              <div className="absolute -top-32 left-1/2 transform -translate-x-1/2">
                <div 
                  className="w-16 h-32 rounded-t-full animate-pulse"
                  style={{
                    backgroundColor: isQuizMode && quizIon 
                      ? quizIon.flameColor 
                      : selectedIon?.flameColor ?? '#FF7F00',
                    boxShadow: `0 0 20px ${
                      isQuizMode && quizIon 
                        ? quizIon.flameColor 
                        : selectedIon?.flameColor ?? '#FF7F00'
                    }`
                  }}
                />
              </div>
            )}
            
            {/* Test tube element for visual interest */}
            {!isQuizMode && !showingFlame && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-50">
                <TestTube className="w-10 h-10 text-gray-400" />
                <div className="mt-2 text-center text-xs text-gray-400">Select an ion</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isQuizMode && selectedIon && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">{selectedIon.name} ({selectedIon.symbol})</h3>
            <p>{selectedIon.description}</p>
          </CardContent>
        </Card>
      )}

      {isQuizMode && !userGuess && (
        <div className="text-center p-4">
          <p className="text-sm text-gray-600 mb-2">Observe the flame color and make your guess!</p>
          <p className="text-xs text-gray-500">Different metal ions produce distinctive colors when heated in a flame</p>
        </div>
      )}
    </div>
  );
};

export default FlameTestSimulation;
