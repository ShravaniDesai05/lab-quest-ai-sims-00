
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Microscope, 
  Flask, 
  Lightbulb, 
  Award, 
  Timer, 
  Book
} from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import ChatBotMentor from '@/components/ChatBotMentor';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                AI-Powered Science Lab Simulations
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Perform virtual science experiments in biology, chemistry, and physics. 
                Learn through interactive simulations guided by our AI science mentor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-lab-blue hover:bg-blue-700">
                  Start Experimenting
                </Button>
                <Button size="lg" variant="outline">
                  View Experiments
                </Button>
              </div>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-lab-blue/10 rounded-full blur-xl animate-pulse-subtle"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-lab-green/10 rounded-full blur-xl animate-pulse-subtle"></div>
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gray-50 flex items-center justify-center animate-float">
                  <Flask className="w-32 h-32 text-lab-blue" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Categories */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Explore Science Subjects
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Biology Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-green-100">
                <div className="h-3 bg-lab-green"></div>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                      <Microscope className="w-8 h-8 text-lab-green" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Biology</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Explore cells, organs, and living systems through interactive simulations
                  </p>
                  <Button asChild className="w-full bg-lab-green hover:bg-green-600">
                    <Link to="/biology">Explore Biology</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Chemistry Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-blue-100">
                <div className="h-3 bg-lab-blue"></div>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                      <Flask className="w-8 h-8 text-lab-blue" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Chemistry</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Conduct chemical reactions and understand molecular behaviors
                  </p>
                  <Button asChild className="w-full bg-lab-blue hover:bg-blue-700">
                    <Link to="/chemistry">Explore Chemistry</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Physics Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-purple-100">
                <div className="h-3 bg-lab-purple"></div>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center">
                      <Lightbulb className="w-8 h-8 text-lab-purple" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Physics</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Visualize and interact with forces, energy, and physical laws
                  </p>
                  <Button asChild className="w-full bg-lab-purple hover:bg-violet-700">
                    <Link to="/physics">Explore Physics</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Interactive Learning Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <Award className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Achievement Badges</h3>
                <p className="text-gray-600">
                  Earn badges and rewards by completing experiments and challenges
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <Timer className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Experiment Challenges</h3>
                <p className="text-gray-600">
                  Test your skills with timed versions of experiments
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <Book className="w-10 h-10 text-lab-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Science Mentor</h3>
                <p className="text-gray-600">
                  Get personalized guidance from our virtual AI science mentor
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Mentor Section */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Meet Your Virtual Science Mentor
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Our AI mentor provides hints, explains experiments, and answers your science questions in real-time.
            </p>
            <div className="max-w-3xl mx-auto">
              <ChatBotMentor />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Flask className="h-6 w-6 text-lab-blue" />
                <span className="text-xl font-bold">Science Lab AI</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Interactive science experiments and simulations for students and educators.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Subjects</h3>
                <ul className="space-y-2">
                  <li><Link to="/biology" className="text-gray-400 hover:text-white">Biology</Link></li>
                  <li><Link to="/chemistry" className="text-gray-400 hover:text-white">Chemistry</Link></li>
                  <li><Link to="/physics" className="text-gray-400 hover:text-white">Physics</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><Link to="/achievements" className="text-gray-400 hover:text-white">Achievements</Link></li>
                  <li><Link to="/challenges" className="text-gray-400 hover:text-white">Challenges</Link></li>
                  <li><Link to="/mentor" className="text-gray-400 hover:text-white">AI Mentor</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><Link to="/help" className="text-gray-400 hover:text-white">Help</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Science Lab AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
