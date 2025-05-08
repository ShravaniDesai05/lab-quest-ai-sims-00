
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import SiteHeader from '@/components/layout/SiteHeader';
import { Mail, Linkedin, Info, Users, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Vigyaankosh – AI-Powered Virtual Science Lab
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your gateway to interactive scientific exploration and discovery
            </p>
          </div>
          
          {/* About the Project */}
          <section className="mb-16 scroll-mt-20" id="about">
            <div className="flex items-center gap-3 mb-6">
              <Info className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">About the Project</h2>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Vigyaankosh</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vigyaankosh is an AI-powered virtual science lab designed to make science accessible, interactive, and fun for students of all levels. It features simulations, 3D models, intelligent chat assistance, and engaging experiments across Biology, Chemistry, and Physics.
                </p>
              </CardContent>
            </Card>
          </section>
          
          {/* Meet the Creators */}
          <section className="mb-16 scroll-mt-20" id="creators">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Meet the Creators</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Creator 1 */}
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                <div className="h-3 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4 ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all">
                      <AvatarImage src="/placeholder.svg" alt="Sejal Chavan" />
                      <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">SC</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2">Sejal Chavan</h3>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <a 
                            href="mailto:sejalchavan0209@gmail.com" 
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </a>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto">
                          <p className="text-sm">sejalchavan0209@gmail.com</p>
                        </HoverCardContent>
                      </HoverCard>
                      
                      <a 
                        href="https://www.linkedin.com/in/sejalchavan" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Creator 2 */}
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4 ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all">
                      <AvatarImage src="/placeholder.svg" alt="Shravani Desai" />
                      <AvatarFallback className="bg-purple-100 text-purple-800 text-xl">SD</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2">Shravani Desai</h3>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <a 
                            href="mailto:shravanids09@gmail.com" 
                            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </a>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto">
                          <p className="text-sm">shravanids09@gmail.com</p>
                        </HoverCardContent>
                      </HoverCard>
                      
                      <a 
                        href="https://www.linkedin.com/in/shravanidesai" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Our Mission */}
          <section className="mb-16 scroll-mt-20" id="mission">
            <div className="flex items-center gap-3 mb-6">
              <FlaskConical className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="pt-8 px-8 pb-8">
                <p className="text-xl text-center font-medium text-gray-700 italic">
                  "To empower students with interactive, AI-enhanced scientific experiences anytime, anywhere."
                </p>
                <div className="flex justify-center mt-6">
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Need Help */}
          <section className="mb-16 scroll-mt-20" id="help">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Need Help?</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* FAQ Section */}
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800">How do I start an experiment?</h4>
                      <p className="text-gray-600 mt-1">Navigate to Biology, Chemistry, or Physics from the main menu, then select an experiment card to begin.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800">How do I get badges?</h4>
                      <p className="text-gray-600 mt-1">Complete experiments and follow the instructions. Badges are awarded automatically upon completion.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800">Why is my chatbot not responding?</h4>
                      <p className="text-gray-600 mt-1">Try refreshing the page. If issues persist, check your internet connection or contact our support team.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Form */}
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" type="email" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="How can we help?" className="min-h-[120px]" required />
                    </div>
                    
                    <div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      For direct contact or bug reports, please email:
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                      <a 
                        href="mailto:sejalchavan0209@gmail.com" 
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        sejalchavan0209@gmail.com
                      </a>
                      <a 
                        href="mailto:shravanids09@gmail.com" 
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        shravanids09@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Vigyaankosh – AI-Powered Virtual Science Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
