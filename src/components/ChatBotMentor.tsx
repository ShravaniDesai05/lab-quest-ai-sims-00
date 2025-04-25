
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Microscope, Plus, Send } from 'lucide-react';

const ChatBotMentor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI science mentor. How can I help with your experiments today?'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
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
        response = "Osmosis is the movement of water molecules from an area of high concentration to an area of low concentration. In our potato experiment, when placed in salt water, water moves out of the potato cells making them less turgid. Try adjusting the salt concentration in your experiment!";
      } else if (question.includes('titration') || question.includes('acid') || question.includes('base')) {
        response = "Acid-base titration determines the concentration of an acid or base by neutralizing it with a base or acid of known concentration. Watch for the color change of the indicator - that's your endpoint! In the simulation, you can control the flow rate for more precision.";
      } else if (question.includes('pendulum') || question.includes('newton')) {
        response = "A pendulum demonstrates Newton's laws of motion. The period of a pendulum depends on its length and gravity, not the mass! Try changing the length in the simulation to see how it affects the period.";
      } else if (question.includes('experiment') || question.includes('how')) {
        response = "To run an experiment, simply select the subject area you're interested in (Biology, Chemistry, or Physics), then choose an experiment. Follow the onscreen instructions and use the interactive controls to change variables. Don't forget to record your observations!";
      } else {
        response = "That's an interesting question about science! To explore this concept further, try one of our interactive experiments. You can adjust variables and see real-time results to deepen your understanding.";
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
  
  return (
    <Card className="w-full h-[400px] flex flex-col shadow-lg border-gray-200">
      <CardHeader className="bg-lab-blue text-white py-3 px-4">
        <div className="flex items-center gap-2">
          <Microscope className="h-5 w-5" />
          <div className="font-medium">AI Science Mentor</div>
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
                  ? 'bg-lab-blue text-white' 
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
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
            placeholder="Ask about an experiment..."
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
            className="rounded-full bg-lab-blue hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBotMentor;
