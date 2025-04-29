
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Biology from "./pages/Biology";
import Chemistry from "./pages/Chemistry";
import Physics from "./pages/Physics";
import BiologyExperiment from "./pages/BiologyExperiment";
import BiologyBloodGroups from "./pages/BiologyBloodGroups";
import BiologyCatalaseExperiment from "./pages/BiologyCatalaseExperiment";
import ChemistryExperiment from "./pages/ChemistryExperiment";
import PhysicsExperiment from "./pages/PhysicsExperiment";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";
import IntroScreen from "./components/intro/IntroScreen";
import "./App.css";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Check if the intro has been shown before
  useEffect(() => {
    const introShown = sessionStorage.getItem('introShown');
    if (introShown === 'true') {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  // Mark intro as seen when route changes
  useEffect(() => {
    if (location.pathname !== '/' || hasSeenIntro) {
      setShowIntro(false);
      sessionStorage.setItem('introShown', 'true');
    }
  }, [location.pathname, hasSeenIntro]);
  
  // This handles the case where a user lands directly on a non-home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowIntro(false);
      sessionStorage.setItem('introShown', 'true');
    }
  }, [location.pathname]);

  return (
    <>
      {showIntro && location.pathname === '/' ? (
        <IntroScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/biology" element={<Biology />} />
          <Route path="/chemistry" element={<Chemistry />} />
          <Route path="/physics" element={<Physics />} />
          <Route path="/biology/:experimentId" element={<BiologyExperiment />} />
          <Route path="/biology/blood-groups" element={<BiologyBloodGroups />} />
          <Route path="/biology/catalase" element={<BiologyCatalaseExperiment />} />
          <Route path="/chemistry/:experimentId" element={<ChemistryExperiment />} />
          <Route path="/physics/:experimentId" element={<PhysicsExperiment />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
