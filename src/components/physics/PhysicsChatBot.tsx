
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Brain, Atom, Plus, Send, X, Zap, Lightbulb, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PhysicsChatBot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm Sci AI Mentor! Ready to explore science together?"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  // Check for API key on component mount
  useEffect(() => {
    const envApiKey = import.meta.env.VITE_VIGYAANKOSH_API_KEY;
    
    if (envApiKey) {
      console.log('API key loaded from environment');
      setApiKey(envApiKey);
    } else {
      // Try to get API key from localStorage as fallback
      const storedApiKey = localStorage.getItem('VIGYAANKOSH_API_KEY');
      if (storedApiKey) {
        setApiKey(storedApiKey);
      } else {
        // No API key found, show input form when user expands the chatbot
        console.log('No API key found for chatbot');
      }
    }
  }, []);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: input }]);
    setIsLoading(true);
    
    // Check if API key exists
    if (!apiKey) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages, 
          { 
            role: 'assistant', 
            content: "I need an API key to function properly. Please click the key icon and enter your API key." 
          }
        ]);
        setIsLoading(false);
        setInput('');
        setShowApiKeyInput(true);
      }, 400);
      return;
    }
    
    // Simulate AI response with faster response time
    setTimeout(() => {
      let response;
      const question = input.toLowerCase();
      
      if (question.includes('force') || question.includes('newton')) {
        response = "Newton's Second Law states that force equals mass times acceleration (F=ma). In our virtual lab, you can adjust mass and applied force to see this relationship in action!";
      } else if (question.includes('ohm') || question.includes('circuit')) {
        response = "Ohm's Law defines the relationship between voltage, current, and resistance (V=IR). Try our interactive circuit simulator to see how changing one parameter affects the others!";
      } else if (question.includes('wave') || question.includes('interference')) {
        response = "Wave interference occurs when two waves overlap, creating areas of constructive and destructive interference. Our wave simulator lets you control frequency and amplitude to observe these fascinating patterns.";
      } else if (question.includes('experiment') || question.includes('how')) {
        response = "To run an experiment in the Physics Lab, simply select one from the homepage and follow the step-by-step instructions. You can adjust variables and observe the results in real-time. Don't forget to record your observations!";
      } else if (question.includes('pendulum')) {
        response = "A pendulum is a weight suspended from a pivot that can swing freely. The period of a pendulum depends on its length and gravity, not its mass! Try our pendulum simulator to see how changing these variables affects the swing.";
      } else if (question.includes('aim') || question.includes('purpose')) {
        response = "This physics experiment aims to demonstrate fundamental physical laws and principles in action. By interacting with variables, you'll see how theoretical concepts apply to real-world systems and develop a deeper understanding of physics.";
      } else if (question.includes('result') || question.includes('outcome')) {
        response = "Your results are displayed in real-time on the graph panel. The relationship between variables follows the expected physical laws. You can export this data for further analysis or try different parameter combinations.";
      } else if (question.includes('explain') || question.includes('concept')) {
        response = "This concept is based on fundamental physics principles that describe how energy and forces interact in our universe. The mathematical relationships we observe allow us to predict how systems behave under different conditions.";
      } else {
        response = "That's an interesting physics question! To explore this concept further, try one of our interactive experiments. You can adjust variables and see real-time results to deepen your understanding of physical laws.";
      }
      
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: response }]);
      setIsLoading(false);
      setInput('');
    }, 400); // Faster response time
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setShowNotification(false);
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
        toast({
          title: "Voice Input Not Supported",
          description: "Voice input is not supported in your browser. Please use Chrome or Edge for this feature.",
          variant: "destructive"
        });
      }
    } else {
      setIsListening(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newApiKey = formData.get('apiKey') as string;
    
    if (newApiKey && newApiKey.trim()) {
      // Save API key to localStorage for development purposes
      localStorage.setItem('VIGYAANKOSH_API_KEY', newApiKey);
      setApiKey(newApiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your API key has been saved for this session.",
      });
      
      setMessages((prevMessages) => [...prevMessages, { 
        role: 'assistant', 
        content: "Great! I'm now fully functional. How can I help you learn about physics today?" 
      }]);
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={toggleExpand} 
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 shadow-glow flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            <Brain className="h-7 w-7 text-white absolute animate-pulse" />
            <Atom className="h-7 w-7 text-white opacity-70" />
          </div>
          <span className="sr-only">Open Science Assistant</span>
        </Button>
        {showNotification && (
          <div className="absolute -top-16 right-0 bg-white rounded-xl px-5 py-3 shadow-lg animate-bounce text-sm whitespace-nowrap flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span>Need help with physics concepts?</span>
            <Button variant="ghost" size="sm" className="ml-1 h-6 w-6 p-0" onClick={() => setShowNotification(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Card className="fixed bottom-6 right-6 w-[350px] h-[450px] flex flex-col shadow-glow z-50 border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <Brain className="h-5 w-5 text-cyan-300 animate-pulse" />
              <Atom className="h-5 w-5 text-cyan-300 opacity-70 absolute" />
            </div>
            <div className="font-medium">Sci AI Mentor</div>
            <div className="text-xs bg-green-500/30 text-green-300 px-1.5 rounded">
              {apiKey ? "Online" : "API Key Required"}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!apiKey && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-blue-800/50"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              >
                <Zap className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-blue-800/50" 
              onClick={toggleExpand}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50 to-white">
        {showApiKeyInput ? (
          <form onSubmit={handleApiKeySubmit} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              API Key Required
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Please enter your API key to enable the AI assistant functionality.
            </p>
            <Input 
              name="apiKey"
              type="password"
              placeholder="Enter your API key"
              className="mb-3 text-sm"
              required
            />
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setShowApiKeyInput(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">Save Key</Button>
            </div>
          </form>
        ) : (
          <>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 rounded-tl-none">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {!apiKey && !showApiKeyInput && (
              <div className="flex justify-center">
                <div className="bg-amber-50 text-amber-800 rounded-lg px-4 py-3 text-xs max-w-[90%] text-center">
                  <p className="font-medium mb-1">API Key Missing</p>
                  <p>Click the ⚡ icon in the header to add your API key</p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="p-3 border-t bg-white">
        <div className="flex w-full items-center space-x-2">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            className={`rounded-full hover:bg-blue-50 ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : ''}`}
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
            placeholder="Ask about physics concepts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 focus-visible:ring-blue-500"
            disabled={!apiKey}
          />
          <Button 
            type="submit" 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading || !apiKey}
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PhysicsChatBot;
