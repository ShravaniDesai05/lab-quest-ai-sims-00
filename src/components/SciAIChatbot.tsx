
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Brain, Atom, Dna, Send, X, Zap, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import geminiAPI from '@/utils/geminiAPI';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SciAIChatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm Sci AI Mentor! Ready to explore science together? Ask me anything about biology, chemistry, or physics!"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Check for API key on component mount
  useEffect(() => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (geminiApiKey) {
      console.log('Gemini API key loaded from environment');
      setApiKey(geminiApiKey);
    } else {
      // Try to get API key from localStorage as fallback
      const storedApiKey = localStorage.getItem('GEMINI_API_KEY');
      if (storedApiKey) {
        setApiKey(storedApiKey);
        console.log('Gemini API key loaded from localStorage');
      } else {
        console.log('No Gemini API key found');
      }
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setInput('');
    
    // Check if API key exists
    if (!apiKey) {
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            role: 'assistant', 
            content: "I need an API key to function properly. Please click the key icon and enter your Gemini API key." 
          }
        ]);
        setIsLoading(false);
        setShowApiKeyInput(true);
      }, 400);
      return;
    }
    
    try {
      // Call Gemini API with user's message
      const assistantResponse = await geminiAPI(input);
      
      // Add assistant response to messages
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: assistantResponse }
      ]);
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          role: 'assistant', 
          content: "I'm sorry, I encountered an error processing your request. Please try again later." 
        }
      ]);
      
      toast({
        title: "API Error",
        description: "Failed to get response from Gemini API",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
        
        // Access the Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast({
            title: "Voice Input Error",
            description: `Error: ${event.error}`,
            variant: "destructive"
          });
        };
        
        recognition.start();
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
      localStorage.setItem('GEMINI_API_KEY', newApiKey);
      setApiKey(newApiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved for this session.",
      });
      
      setMessages(prevMessages => [...prevMessages, { 
        role: 'assistant', 
        content: "Great! I'm now fully functional. How can I help you learn about science today?" 
      }]);
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={toggleExpand} 
          className="h-16 w-16 rounded-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 shadow-lg flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            <Brain className="h-7 w-7 text-white absolute animate-pulse" />
            <Atom className="h-7 w-7 text-white opacity-70" />
          </div>
          <span className="sr-only">Open Science Assistant</span>
        </Button>
        {showNotification && (
          <div className="absolute -top-16 right-0 bg-white rounded-xl px-5 py-3 shadow-lg animate-bounce text-sm whitespace-nowrap flex items-center gap-2 dark:bg-gray-800 dark:text-white">
            <Brain className="h-4 w-4 text-blue-500" />
            <span>Need help with science concepts?</span>
            <Button variant="ghost" size="sm" className="ml-1 h-6 w-6 p-0" onClick={(e) => {
              e.stopPropagation();
              setShowNotification(false);
            }}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Card className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[500px] flex flex-col shadow-lg z-50 border-blue-200 dark:border-gray-700">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-800 text-white py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <Brain className="h-5 w-5 text-white animate-pulse" />
              <Atom className="h-5 w-5 text-white opacity-70 absolute" />
            </div>
            <div className="font-medium">Sci AI Mentor</div>
            <div className={`text-xs px-1.5 rounded ${apiKey ? "bg-green-500/30 text-green-300" : "bg-amber-500/30 text-amber-300"}`}>
              {apiKey ? "Online" : "API Key Required"}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!apiKey && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              >
                <Zap className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10" 
              onClick={toggleExpand}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        {showApiKeyInput ? (
          <form onSubmit={handleApiKeySubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-gray-700">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              Gemini API Key Required
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Please enter your Gemini API key to enable the AI assistant functionality.
              You can get a key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google AI Studio</a>.
            </p>
            <Input 
              name="apiKey"
              type="password"
              placeholder="Enter your Gemini API key"
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
                  className={`max-w-[85%] rounded-lg px-4 py-2.5 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-800 dark:text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg px-4 py-2 bg-gray-100 rounded-tl-none dark:bg-gray-800">
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
                <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 rounded-lg px-4 py-3 text-xs max-w-[90%] text-center">
                  <p className="font-medium mb-1">Gemini API Key Missing</p>
                  <p>Click the ⚡ icon in the header to add your API key</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </CardContent>
      <CardFooter className="p-3 border-t bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="flex w-full items-center space-x-2">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            className={`rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 ${isListening ? 'bg-red-100 text-red-600 animate-pulse dark:bg-red-900/30' : ''}`}
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
          <Textarea
            placeholder="Ask about science topics..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-h-[40px] max-h-[120px] py-2 px-3 resize-none"
            disabled={!apiKey}
          />
          <Button 
            type="button"
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading || !apiKey}
            className="rounded-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SciAIChatbot;
