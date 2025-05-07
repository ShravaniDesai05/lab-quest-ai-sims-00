import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Lock, TestTube, Key } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Animation states
  const [bubbleActive, setBubbleActive] = useState(false);

  // Trigger bubbling animation when typing in password
  useEffect(() => {
    if (password.length > 0) {
      setBubbleActive(true);
    } else {
      setBubbleActive(false);
    }
  }, [password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        setShowSuccess(true);
        toast({
          title: "Access Granted",
          description: "Welcome Scientist",
          duration: 3000,
        });
        
        // Redirect after door animation completes
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#1A1F2C]">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating molecules animation */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-blue-500/20 animate-float"></div>
        <div className="absolute top-3/4 left-1/3 w-12 h-12 rounded-full bg-purple-500/20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-green-500/20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* DNA helix animation */}
        <div className="absolute right-[10%] top-0 bottom-0 w-20 flex flex-col items-center justify-center opacity-30">
          <div className="dna-spiral">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="dna-step">
                <div className="dna-pair" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="left-node bg-blue-400"></div>
                  <div className="connection bg-gray-200"></div>
                  <div className="right-node bg-red-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Glowing test tubes */}
        <div className="absolute left-[10%] top-[30%] w-8 h-32 rounded-b-full bg-gradient-to-t from-[#1EAEDB] to-transparent opacity-40 animate-pulse-subtle"></div>
        <div className="absolute left-[15%] top-[35%] w-8 h-24 rounded-b-full bg-gradient-to-t from-[#33C3F0] to-transparent opacity-40 animate-pulse-subtle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute left-[5%] top-[40%] w-8 h-28 rounded-b-full bg-gradient-to-t from-purple-400 to-transparent opacity-40 animate-pulse-subtle" style={{ animationDelay: '0.8s' }}></div>
      </div>
      
      {/* Login content */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent mb-2">
              🔬 Welcome to AI-Powered Virtual Science Lab
            </h1>
            <p className="text-gray-300 text-lg">
              Where curiosity meets AI to ignite discovery.
            </p>
          </div>
          
          {/* Login form */}
          <div className="mt-10 bg-[#0000001a] backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-xl">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white focus:border-blue-500"
                    placeholder="scientist@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white focus:border-blue-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  {/* Test tube animation */}
                  <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 pointer-events-none">
                    <div className="relative w-8 h-20">
                      <div className="absolute bottom-0 w-8 h-16 rounded-b-full border-2 border-gray-500 overflow-hidden">
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-green-400 to-blue-400 transition-all duration-500"
                          style={{ 
                            height: bubbleActive ? '80%' : '30%',
                          }}
                        >
                          {bubbleActive && (
                            <>
                              <div className="bubble"></div>
                              <div className="bubble" style={{ animationDelay: '0.8s' }}></div>
                              <div className="bubble" style={{ animationDelay: '1.3s' }}></div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-2 rounded-t-lg bg-gray-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative overflow-hidden transition-all hover:shadow-glow"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Key className="mr-2 h-4 w-4" /> Log In to Lab
                    </span>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success animation overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
          <div className="lab-doors-container">
            <div className="lab-door left"></div>
            <div className="lab-door right"></div>
          </div>
          <div className="lab-mist"></div>
          <div className="welcome-message text-4xl text-blue-400 font-bold mt-4">Access Granted: Welcome Scientist</div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }

        /* DNA Helix Animation */
        .dna-spiral {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 15px;
        }
        
        .dna-step {
          height: 20px;
          display: flex;
          justify-content: center;
        }
        
        .dna-pair {
          display: flex;
          align-items: center;
          animation: rotate 3s linear infinite;
          width: 100%;
        }
        
        .left-node, .right-node {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .connection {
          height: 2px;
          flex-grow: 1;
        }
        
        @keyframes rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        /* Bubbling Animation */
        .bubble {
          position: absolute;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          width: 6px;
          height: 6px;
          bottom: 0;
          left: 30%;
          animation: bubbling 2s ease-in infinite;
        }
        
        @keyframes bubbling {
          0% { 
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% { 
            transform: translateY(-40px) scale(1.5); 
            opacity: 0;
          }
        }
        
        /* Door opening animation */
        .lab-doors-container {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          display: flex;
        }
        
        .lab-door {
          width: 50%;
          height: 100%;
          background: linear-gradient(180deg, #1A1F2C, #2C3E50);
          position: relative;
          transition: transform 1.5s cubic-bezier(0.86, 0, 0.07, 1);
        }
        
        .lab-door::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 10px;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .lab-door.left {
          transform: translateX(-100%);
          border-right: 2px solid rgba(52, 152, 219, 0.8);
        }
        
        .lab-door.left::after {
          right: 0;
        }
        
        .lab-door.right {
          transform: translateX(100%);
          border-left: 2px solid rgba(52, 152, 219, 0.8);
        }
        
        .lab-door.right::after {
          left: 0;
        }

        .lab-mist {
          position: absolute;
          width: 100%;
          height: 150px;
          background: linear-gradient(to top, rgba(52, 152, 219, 0.2), transparent);
          bottom: 150px;
          opacity: 0;
          animation: mist-appear 2s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        @keyframes mist-appear {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .welcome-message {
          opacity: 0;
          transform: translateY(20px);
          animation: message-appear 1s ease-out forwards;
          animation-delay: 1s;
        }
        
        @keyframes message-appear {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* Glowing button */
        .hover\\:shadow-glow:hover {
          box-shadow: 0 0 15px rgba(79, 70, 229, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Login;
