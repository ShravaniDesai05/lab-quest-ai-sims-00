
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Atom, Plus, Send, X, Zap, Lightbulb } from 'lucide-react';

const PhysicsChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, I\'m PhysixBot! Need help with velocity or voltage?'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isExpanded) {
        setShowNotification(true);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [isExpanded]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: input }]);
    setIsLoading(true);
    
    // Simulate AI response
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
      } else {
        response = "That's an interesting physics question! To explore this concept further, try one of our interactive experiments. You can adjust variables and see real-time results to deepen your understanding of physical laws.";
      }
      
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: response }]);
      setIsLoading(false);
      setInput('');
    }, 1000);
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

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={toggleExpand} 
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 shadow-glow flex items-center justify-center"
        >
          <Atom className="h-8 w-8 text-white animate-pulse" />
          <span className="sr-only">Open Physics Assistant</span>
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
            <Zap className="h-5 w-5 text-cyan-300" />
            <div className="font-medium">PhysixBot</div>
            <div className="text-xs bg-green-500/30 text-green-300 px-1.5 rounded">Online</div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800/50" onClick={toggleExpand}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50 to-white">
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
      </CardContent>
      <CardFooter className="p-3 border-t bg-white">
        <div className="flex w-full items-center space-x-2">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            className="rounded-full hover:bg-blue-50"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Ask about physics concepts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 focus-visible:ring-blue-500"
          />
          <Button 
            type="submit" 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
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
