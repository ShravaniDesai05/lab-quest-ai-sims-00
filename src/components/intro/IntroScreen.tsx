
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, FlaskConical, Microscope, TestTube, Atom, XCircle } from 'lucide-react';

const IntroScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showSkip, setShowSkip] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [typingText, setTypingText] = useState("");
  const fullText = "Welcome to Your Virtual Science Lab";
  
  // Skip intro animation
  const handleSkip = () => {
    navigate('/', { replace: true });
  };

  // Enter the lab after animation completes
  const handleEnter = () => {
    navigate('/', { replace: true });
  };

  // Show the skip button after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle animation staging
  useEffect(() => {
    // Stage 0: Initial state - dark screen with particles
    // Stage 1: Lab elements start appearing (after 1.5s)
    // Stage 2: Text starts typing (after 3s)
    // Stage 3: Enter button appears (after text completes)
    
    const stageTimers = [
      setTimeout(() => setAnimationStage(1), 1500),
      setTimeout(() => setAnimationStage(2), 3000),
    ];
    
    return () => stageTimers.forEach(timer => clearTimeout(timer));
  }, []);

  // Typewriter effect for the welcome text
  useEffect(() => {
    if (animationStage < 2) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowEnterButton(true), 500);
      }
    }, 60);
    
    return () => clearInterval(typingInterval);
  }, [animationStage]);

  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center overflow-hidden z-50">
      {/* Skip button */}
      {showSkip && (
        <button 
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-white flex items-center gap-1 z-50 transition-opacity duration-300 opacity-70 hover:opacity-100"
        >
          <span>Skip</span>
          <XCircle className="h-4 w-4" />
        </button>
      )}
      
      {/* Particle background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-lab-blue opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
      
      {/* Lab environment container - appears in stage 1 */}
      <div 
        className={`relative w-full max-w-4xl aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-all duration-1000 ease-out 
          ${animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Lab visuals */}
        <div className="absolute inset-0">
          {/* Glowing tubes and beakers */}
          <div className={`absolute left-[15%] bottom-[20%] transition-all duration-1000 delay-500 
            ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative w-16 h-32 bg-gradient-to-t from-lab-green/70 to-lab-green/30 rounded-b-lg animate-pulse-subtle">
              <div className="absolute top-0 left-0 w-full h-3 bg-gray-700"></div>
              <div className="absolute top-3 left-3 right-3 bottom-5">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-lab-green animate-bubble-rise"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: '0',
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            <FlaskConical className="absolute -top-4 -left-4 h-8 w-8 text-gray-400" />
          </div>

          {/* Purple bubbling tube */}
          <div className={`absolute right-[25%] bottom-[25%] transition-all duration-1000 delay-700 
            ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative w-10 h-24 bg-gradient-to-t from-lab-purple/70 to-lab-purple/30 rounded-b-full animate-pulse-subtle">
              <div className="absolute top-0 left-0 w-full h-2 bg-gray-700"></div>
              <div className="absolute top-2 left-1 right-1 bottom-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-lab-purple animate-bubble-rise"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: '0',
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            <TestTube className="absolute -top-4 -right-4 h-7 w-7 text-gray-400" />
          </div>
          
          {/* Microscope */}
          <div className={`absolute left-[60%] bottom-[20%] transition-all duration-1000 delay-900 
            ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              <Microscope className="h-16 w-16 text-gray-300" />
              <div className="absolute bottom-4 left-5 w-6 h-6 rounded-full bg-blue-400/30 animate-pulse"></div>
            </div>
          </div>
          
          {/* Rotating atom */}
          <div className={`absolute left-[35%] top-[25%] transition-all duration-1000 delay-1000 
            ${animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 rounded-full border-2 border-lab-blue/30 animate-rotate-slow"></div>
              <div className="absolute inset-0 rounded-full border-2 border-lab-blue/30 animate-rotate-slow" style={{ transform: 'rotate(60deg)' }}></div>
              <div className="absolute inset-0 rounded-full border-2 border-lab-blue/30 animate-rotate-slow" style={{ transform: 'rotate(120deg)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-lab-blue rounded-full animate-pulse-subtle"></div>
              </div>
              <Atom className="absolute -top-6 -left-6 h-6 w-6 text-lab-blue/70" />
            </div>
          </div>
          
          {/* Brain AI */}
          <div className={`absolute right-[15%] top-[30%] transition-all duration-1000 delay-800 
            ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative h-14 w-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lab-blue/20 to-lab-purple/20 animate-pulse-subtle"></div>
              <Brain className="h-10 w-10 text-white/70" />
            </div>
          </div>
        </div>
        
        {/* Welcome text */}
        <div className="absolute inset-x-0 top-[15%] flex flex-col items-center">
          <h1 
            className={`text-2xl md:text-3xl text-white font-bold overflow-hidden border-r-2 border-lab-blue transition-opacity duration-500
              ${animationStage >= 2 ? 'opacity-100' : 'opacity-0'}`}
          >
            {typingText}
            <span className="animate-pulse">|</span>
          </h1>
        </div>
        
        {/* Enter button */}
        <div className="absolute inset-x-0 bottom-[15%] flex justify-center">
          <Button
            onClick={handleEnter}
            className={`bg-gradient-to-r from-lab-blue to-lab-purple text-white px-8 py-6 text-lg font-medium shadow-lg transition-all duration-500 
              ${showEnterButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            Enter the Lab
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
