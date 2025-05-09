
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Beaker, BookOpen, LogIn, Home } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const SiteHeader = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Beaker className="h-8 w-8 text-lab-blue animate-pulse-subtle" />
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground hover:text-lab-blue transition-colors duration-200">
            VigyaanKosh
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground/80 hover:text-lab-blue transition-colors flex items-center gap-1 hover-button"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link 
            to="/biology" 
            className="text-sm font-medium text-foreground/80 hover:text-lab-green transition-colors hover-button"
          >
            Biology
          </Link>
          <Link 
            to="/chemistry" 
            className="text-sm font-medium text-foreground/80 hover:text-lab-blue transition-colors hover-button"
          >
            Chemistry
          </Link>
          <Link 
            to="/physics" 
            className="text-sm font-medium text-foreground/80 hover:text-lab-purple transition-colors hover-button"
          >
            Physics
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center gap-2 hover-button"
            asChild
          >
            <Link to="/about">
              <BookOpen className="h-4 w-4" />
              <span>About</span>
            </Link>
          </Button>
          {!isLoginPage && (
            <Button 
              className="bg-lab-blue hover:bg-lab-blue/90 hover-button" 
              asChild
            >
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
