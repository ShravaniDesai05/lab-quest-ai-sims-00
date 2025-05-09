
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, Brain, Beaker, Lightbulb, HelpCircle, Send, ArrowLeft } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import { toast } from '@/hooks/use-toast';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for your feedback. We'll get back to you soon!",
      duration: 5000,
    });
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SiteHeader />
      
      <main className="container py-8 px-4 md:px-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2 p-0" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Lab</span>
            </Link>
          </Button>
        </div>
      
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lab-blue via-lab-purple to-lab-green">
              About VigyaanKosh: AI-Powered Virtual Science Labs
            </span>
          </h1>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Advancing science education through AI-powered simulations
          </p>
          
          <Tabs defaultValue="about" className="mb-10">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
              <TabsTrigger value="mission">Mission</TabsTrigger>
            </TabsList>
            
            {/* About Section */}
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-lab-blue" />
                    About the Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">VigyaanKosh: AI-Powered Virtual Science Labs</h3>
                    <p className="text-gray-600">
                      VigyaanKosh is an AI-powered virtual science lab designed to make science accessible, 
                      interactive, and fun for students of all levels. It features simulations, 3D models, 
                      intelligent chat assistance, and engaging experiments across Biology, Chemistry, and Physics.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                        <Beaker className="h-6 w-6 text-lab-green" />
                      </div>
                      <h3 className="font-medium mb-2">Interactive Experiments</h3>
                      <p className="text-sm text-gray-600">
                        Hands-on simulations that bring scientific concepts to life
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <Brain className="h-6 w-6 text-lab-blue" />
                      </div>
                      <h3 className="font-medium mb-2">AI Assistance</h3>
                      <p className="text-sm text-gray-600">
                        Intelligent chat support to guide your scientific exploration
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                        <Lightbulb className="h-6 w-6 text-lab-purple" />
                      </div>
                      <h3 className="font-medium mb-2">Learning Tools</h3>
                      <p className="text-sm text-gray-600">
                        Comprehensive educational resources and 3D models
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Team Section */}
            <TabsContent value="team" className="mt-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Meet the Creators</CardTitle>
                  <CardDescription>The team behind VigyaanKosh Virtual Science Lab</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Team Member 1 */}
                    <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <img 
                          src="https://api.dicebear.com/7.x/personas/svg?seed=sejal&backgroundColor=b6e3f4" 
                          alt="Sejal Chavan" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-1">Sejal Chavan</h3>
                        <p className="text-gray-600 mb-3">Lead Developer</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <a href="mailto:sejalchavan0209@gmail.com" className="text-sm text-lab-blue hover:underline">
                              sejalchavan0209@gmail.com
                            </a>
                          </div>
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <Linkedin className="h-4 w-4 text-gray-500" />
                            <a 
                              href="https://www.linkedin.com/in/sejalchavan" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-lab-blue hover:underline"
                            >
                              linkedin.com/in/sejalchavan
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Team Member 2 */}
                    <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        <img 
                          src="https://api.dicebear.com/7.x/personas/svg?seed=shravani&backgroundColor=ffdfbf" 
                          alt="Shravani Desai" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-1">Shravani Desai</h3>
                        <p className="text-gray-600 mb-3">UX Designer & Developer</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <a href="mailto:shravanids09@gmail.com" className="text-sm text-lab-blue hover:underline">
                              shravanids09@gmail.com
                            </a>
                          </div>
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <Linkedin className="h-4 w-4 text-gray-500" />
                            <a 
                              href="https://www.linkedin.com/in/shravanidesai" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-lab-blue hover:underline"
                            >
                              linkedin.com/in/shravanidesai
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Help Section */}
            <TabsContent value="help" className="mt-6">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-lab-purple" />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-medium mb-2">How do I start an experiment?</h3>
                        <p className="text-sm text-gray-600">
                          Navigate to the subject area (Biology, Chemistry, or Physics) and select
                          an experiment card. Follow the on-screen instructions to begin your interactive 
                          learning experience.
                        </p>
                      </div>
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-medium mb-2">How do I get badges?</h3>
                        <p className="text-sm text-gray-600">
                          Complete experiments and challenges to earn badges. Each subject has its own 
                          set of achievements that track your progress and mastery of concepts.
                        </p>
                      </div>
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-medium mb-2">Why is my chatbot not responding?</h3>
                        <p className="text-sm text-gray-600">
                          Ensure you have a stable internet connection. If the issue persists, 
                          try refreshing the page or clearing your browser cache. For continued problems, 
                          please contact our support team.
                        </p>
                      </div>
                      <div className="pb-2">
                        <h3 className="font-medium mb-2">Can I use VigyaanKosh on mobile devices?</h3>
                        <p className="text-sm text-gray-600">
                          Yes! VigyaanKosh is fully responsive and works on desktops, tablets, and mobile phones.
                          Some complex simulations may perform better on larger screens.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>
                      Have questions or feedback? We'd love to hear from you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Input
                            placeholder="Your Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Your Message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-lab-blue hover:bg-blue-700">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Mission Section */}
            <TabsContent value="mission" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl mb-8 relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
                    <div className="absolute -left-4 -top-4 w-24 h-24 bg-purple-100 rounded-full opacity-30"></div>
                    <blockquote className="relative z-10 text-xl md:text-2xl text-gray-800 italic font-light text-center">
                      "To empower students with interactive, AI-enhanced scientific experiences anytime, anywhere."
                    </blockquote>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-semibold mb-3">Our Vision</h3>
                      <p className="text-gray-600">
                        We envision a world where high-quality science education is accessible to all students, 
                        regardless of location or resources. VigyaanKosh aims to bridge the gap between theoretical 
                        knowledge and practical understanding through immersive digital experiences.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-semibold mb-3">Our Values</h3>
                      <div className="space-y-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                          Accessibility
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 ml-2">
                          Innovation
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 ml-2">
                          Education
                        </Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 ml-2">
                          Inclusivity
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200 ml-2">
                          Engagement
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-gray-500 border-t pt-4">
                  VigyaanKosh was founded in 2023 as a project to revolutionize science education through technology.
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container px-4">
          <div className="text-center">
            <p className="mb-4">© {new Date().getFullYear()} VigyaanKosh: AI-Powered Virtual Science Labs. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <a href="mailto:support@vigyaankosh.edu" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
