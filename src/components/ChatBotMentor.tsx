
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Brain, Dna, Plus, Send, X, Microscope } from 'lucide-react';

const ChatBotMentor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm Sci AI Mentor! Ready to explore science together?"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: input }]);
    setIsLoading(true);
    
    // Simulate AI response - improved for quicker, more contextual responses
    setTimeout(() => {
      let response;
      const question = input.toLowerCase();
      
      // Biology responses
      if (question.includes('osmosis') || question.includes('potato')) {
        response = "Osmosis is the movement of water molecules from an area of high concentration to an area of low concentration. In our potato experiment, water moves out of the potato cells making them less turgid. Try adjusting the salt concentration!";
      } else if (question.includes('blood') || question.includes('group')) {
        response = "Blood group identification relies on antigen-antibody reactions. Different blood groups (A, B, AB, O) have different antigens on red blood cells. In our virtual lab, you can see how these antigens interact with antibodies!";
      } else if (question.includes('cell') || question.includes('onion')) {
        response = "Onion cells are perfect for microscope observation because they form a thin, transparent layer. Look for the cell wall, nucleus, and cytoplasm. Try adjusting the microscope focus to see different cell layers!";
      } 
      // Chemistry responses
      else if (question.includes('electrolysis') || question.includes('water')) {
        response = "In the electrolysis of water experiment, we use electricity to split water into hydrogen and oxygen. The steps are: 1) Set up the apparatus with electrodes in water, 2) Add a small amount of electrolyte, 3) Connect to power supply, 4) Observe gas collection at each electrode. Hydrogen forms at the cathode (negative) and oxygen at the anode (positive).";
      } else if (question.includes('flame test') || question.includes('metal')) {
        response = "The flame test identifies metal ions based on the characteristic colors they emit when heated. Calcium produces a brick red color, while copper gives a green-blue flame. In our simulator, you can compare different metal salt solutions.";
      }
      // Physics responses
      else if (question.includes('ohm') || question.includes('circuit')) {
        response = "Ohm's Law states that voltage (V) equals current (I) multiplied by resistance (R): V = I × R. In our virtual circuit, you can adjust any two variables to see how the third responds. Try increasing resistance to see current decrease while voltage remains constant.";
      } else if (question.includes('pendulum') || question.includes('swing')) {
        response = "A pendulum's period depends on its length and gravity, not its mass! You can verify this in our simulation by changing the pendulum length and observing the change in period. The formula is T = 2π√(L/g).";
      }
      // Generic experiment questions
      else if (question.includes('aim') || question.includes('purpose')) {
        response = "The aim of this experiment is to demonstrate the scientific principle in action and allow you to observe relationships between variables. You'll collect data, analyze results, and draw conclusions based on scientific theory.";
      } else if (question.includes('result') || question.includes('outcome')) {
        response = "Your experiment results are displayed in the data panel. You can see both the raw measurements and the graphed relationships between variables. Try changing parameters to see how the results are affected!";
      } else if (question.includes('explain') || question.includes('concept')) {
        response = "This concept involves the fundamental relationship between the variables you're adjusting. The underlying scientific principle explains why we observe these specific outcomes when conditions change. Would you like me to elaborate on any specific aspect?";
      } else if (question.includes('step') || question.includes('how to')) {
        response = "Here are the steps for this experiment: 1) Select your variables, 2) Set initial conditions, 3) Run the simulation, 4) Record observations, 5) Analyze data patterns, 6) Draw conclusions based on scientific principles. Let me know if you need clarification on any specific step!";
      } else {
        response = "That's an interesting science question! To explore this concept further, try adjusting the parameters in our interactive simulation. You can observe how variables relate to each other and see real-time results to deepen your understanding.";
      }
      
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: response }]);
      setIsLoading(false);
      setInput('');
    }, 400); // Reduced response time for better user experience
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      // Check if browser supports SpeechRecognition
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // This is just the interface - in a real implementation, we'd process voice input
        setIsListening(true);
        // Simulate voice recognition after a short delay
        setTimeout(() => {
          setIsListening(false);
          setInput("What is the aim of this experiment?");
        }, 2000);
      } else {
        alert("Voice input is not supported in your browser. Please use Chrome or Edge for this feature.");
      }
    } else {
      setIsListening(false);
    }
  };

  if (!isExpanded) {
    return (
      <div className="relative">
        <Button 
          onClick={() => setIsExpanded(true)} 
          className="h-16 w-16 rounded-full bg-lab-green hover:bg-green-600 shadow-lg flex items-center justify-center relative"
        >
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-30"></div>
          <div className="relative flex items-center justify-center">
            <Brain className="h-7 w-7 text-white absolute animate-pulse" />
            <Dna className="h-7 w-7 text-white opacity-70" />
          </div>
          <span className="sr-only">Open Science Assistant</span>
        </Button>
        <div className="absolute -top-12 right-0 bg-white rounded-lg px-4 py-2 shadow-md animate-bounce text-sm whitespace-nowrap">
          Need help with science experiments?
        </div>
      </div>
    );
  }
  
  return (
    <Card className="w-full h-[400px] flex flex-col shadow-lg border-gray-200">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <Brain className="h-5 w-5 animate-pulse text-white" />
              <Dna className="h-5 w-5 text-white opacity-70 absolute" />
            </div>
            <div className="font-medium">Sci AI Mentor</div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-green-700/50" onClick={() => setIsExpanded(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user' 
                  ? 'bg-lab-green text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
              <div className="flex space-x-1 items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-2 border-t bg-white">
        <div className="flex w-full items-center space-x-2">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            className={`rounded-full ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : ''}`}
            onClick={toggleVoiceInput}
            title="Voice input"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </Button>
          <Input
            placeholder="Ask about science experiments..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            className="rounded-full bg-lab-green hover:bg-green-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBotMentor;
