
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Microscope, 
  FlaskConical, 
  Lightbulb, 
  Brain,
  LogIn,
  Beaker,
  BookOpen
} from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import ChatBotMentor from '@/components/ChatBotMentor';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section with Futuristic Design */}
        <section className="py-12 md:py-20 container relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-lab-blue/10 rounded-full blur-xl animate-pulse-subtle"></div>
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-lab-green/10 rounded-full blur-xl animate-pulse-subtle"></div>
          <div className="absolute left-1/2 top-1/3 w-40 h-40 bg-lab-purple/10 rounded-full blur-xl animate-pulse-subtle"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="mb-4 inline-block py-1 px-3 bg-lab-blue/10 text-lab-blue rounded-full">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="text-sm font-medium">AI-Powered Learning</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lab-blue via-lab-purple to-lab-green">
                  VigyaanKosh: AI-Powered Virtual Science Labs
                </span>
                <span className="absolute -top-3 -right-3 animate-pulse text-amber-500">✦</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Conduct interactive experiments in biology, chemistry, and physics with our 
                AI-powered simulations. Learn through hands-on discovery guided by our virtual science mentor.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-lab-blue to-lab-purple hover:opacity-90 text-white font-medium shadow-lg transform transition-transform duration-200 hover:scale-105" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Login to Start Learning
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-lab-blue/10 rounded-full blur-xl animate-pulse-subtle"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-lab-green/10 rounded-full blur-xl animate-pulse-subtle"></div>
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center animate-float relative group-hover:animate-bounce">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-lab-blue/30 animate-rotate-slow"></div>
                  <div className="absolute w-10 h-10 bg-lab-green/20 rounded-full -top-5 right-10 animate-float"></div>
                  <div className="absolute w-8 h-8 bg-lab-purple/20 rounded-full bottom-10 -left-3 animate-float"></div>
                  <Beaker className="w-32 h-32 text-lab-blue transform transition-transform group-hover:rotate-12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Categories with Enhanced Visuals */}
        <section className="py-12 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent"></div>
          <div className="container relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Explore Science Subjects
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Choose from our interactive simulations across multiple scientific disciplines. Each experiment 
              is designed to help you understand complex concepts through hands-on learning.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Biology Card - Enhanced */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-green-100 group">
                <div className="h-3 bg-lab-green"></div>
                <div className="h-32 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-40 h-40 bg-green-100 rounded-full opacity-70 -top-10 -right-10"></div>
                  <div className="absolute w-20 h-20 bg-green-200 rounded-full opacity-70 bottom-5 left-5"></div>
                  <Microscope className="w-16 h-16 text-lab-green relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-center mb-2">Biology</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Explore cells, enzymes, and living systems through interactive simulations
                  </p>
                  <Button className="w-full bg-lab-green hover:bg-green-600 shadow-sm group-hover:shadow-md transition-all" asChild>
                    <Link to="/login" className="flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      <span>Login to Access</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Chemistry Card - Enhanced */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-blue-100 group">
                <div className="h-3 bg-lab-blue"></div>
                <div className="h-32 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-40 h-40 bg-blue-100 rounded-full opacity-70 -top-10 -right-10"></div>
                  <div className="absolute w-20 h-20 bg-blue-200 rounded-full opacity-70 bottom-5 left-5"></div>
                  <FlaskConical className="w-16 h-16 text-lab-blue relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-center mb-2">Chemistry</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Conduct chemical reactions and understand molecular behaviors
                  </p>
                  <Button className="w-full bg-lab-blue hover:bg-blue-700 shadow-sm group-hover:shadow-md transition-all" asChild>
                    <Link to="/login" className="flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      <span>Login to Access</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Physics Card - Enhanced */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-purple-100 group">
                <div className="h-3 bg-lab-purple"></div>
                <div className="h-32 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-40 h-40 bg-purple-100 rounded-full opacity-70 -top-10 -right-10"></div>
                  <div className="absolute w-20 h-20 bg-purple-200 rounded-full opacity-70 bottom-5 left-5"></div>
                  <Lightbulb className="w-16 h-16 text-lab-purple relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-center mb-2">Physics</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Visualize and interact with forces, energy, and physical laws
                  </p>
                  <Button className="w-full bg-lab-purple hover:bg-violet-700 shadow-sm group-hover:shadow-md transition-all" asChild>
                    <Link to="/login" className="flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      <span>Login to Access</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features with Better Visual Design - Modified to highlight AI features */}
        <section className="py-12 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-white transform -skew-y-3 origin-top-left -translate-y-12"></div>
          <div className="container relative z-10 mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              AI-Powered Learning Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-amber-500 relative z-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2 relative z-10">AI Curriculum</h3>
                <p className="text-gray-600 relative z-10">
                  Personalized learning paths adapt to your understanding and pace
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Beaker className="w-8 h-8 text-red-500 relative z-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2 relative z-10">Virtual Experiments</h3>
                <p className="text-gray-600 relative z-10">
                  Realistic simulations with real-time feedback and guidance
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-lab-blue relative z-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2 relative z-10">V-Bot Assistant</h3>
                <p className="text-gray-600 relative z-10">
                  Your personal AI science mentor available 24/7 to answer questions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Mentor Section with Login CTA */}
        <section className="py-12 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-lab-blue to-lab-purple flex items-center justify-center shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Meet V-Bot, Your Virtual Science Mentor
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Our AI mentor provides hints, explains experiments, and answers your science questions in real-time.
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Ready to explore the world of science?</h3>
                <p className="text-gray-600 mb-6">
                  Login now to access all our interactive experiments and start your scientific journey with V-Bot!
                </p>
                <Button size="lg" className="bg-gradient-to-r from-lab-blue to-lab-purple hover:opacity-90 text-white font-medium shadow-lg transform transition-transform duration-200 hover:scale-105" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Login to Start
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with upgraded styling */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-lab-blue/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-lab-green/30 rounded-full blur-xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Beaker className="h-6 w-6 text-lab-blue" />
                <span className="text-xl font-bold">VigyaanKosh: AI-Powered Virtual Science Labs</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Interactive science experiments and simulations for students and educators.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Subjects</h3>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Biology</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Chemistry</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Physics</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Achievements</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Challenges</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">AI Mentor</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Help</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} VigyaanKosh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
