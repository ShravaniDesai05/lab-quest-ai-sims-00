
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Microscope, Plus, Send, X, Dna } from 'lucide-react';

const ChatBotMentor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, I\'m BioBot! Need help with any experiment?'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: input }]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response;
      const question = input.toLowerCase();
      
      if (question.includes('osmosis') || question.includes('potato')) {
        response = "Osmosis is the movement of water molecules from an area of high concentration to an area of low concentration. In our potato experiment, water moves out of the potato cells making them less turgid. Try adjusting the salt concentration!";
      } else if (question.includes('blood') || question.includes('group')) {
        response = "Blood group identification relies on antigen-antibody reactions. Different blood groups (A, B, AB, O) have different antigens on red blood cells. In our virtual lab, you can see how these antigens interact with antibodies!";
      } else if (question.includes('cell') || question.includes('onion')) {
        response = "Onion cells are perfect for microscope observation because they form a thin, transparent layer. Look for the cell wall, nucleus, and cytoplasm. Try adjusting the microscope focus to see different cell layers!";
      } else if (question.includes('experiment') || question.includes('how')) {
        response = "To run an experiment, simply select one from the Biology Lab homepage and follow the step-by-step instructions. You can adjust variables and observe the results in real-time. Don't forget to record your observations!";
      } else {
        response = "That's an interesting biology question! To explore this concept further, try one of our interactive experiments. You can adjust variables and see real-time results to deepen your understanding.";
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

  if (!isExpanded) {
    return (
      <div className="relative">
        <Button 
          onClick={() => setIsExpanded(true)} 
          className="h-16 w-16 rounded-full bg-lab-green hover:bg-green-600 shadow-lg flex items-center justify-center"
        >
          <Dna className="h-8 w-8 text-white" />
          <span className="sr-only">Open Biology Assistant</span>
        </Button>
        <div className="absolute -top-12 right-0 bg-white rounded-lg px-4 py-2 shadow-md animate-bounce text-sm whitespace-nowrap">
          Need help with biology?
        </div>
      </div>
    );
  }
  
  return (
    <Card className="w-full h-[400px] flex flex-col shadow-lg border-gray-200">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dna className="h-5 w-5 animate-pulse" />
            <div className="font-medium">BioBot Assistant</div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-green-700" onClick={() => setIsExpanded(false)}>
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
            className="rounded-full"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Ask about biology experiments..."
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
