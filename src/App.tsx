
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Biology from "./pages/Biology";
import Chemistry from "./pages/Chemistry";
import Physics from "./pages/Physics";
import BiologyExperiment from "./pages/BiologyExperiment";
import ChemistryExperiment from "./pages/ChemistryExperiment";
import PhysicsExperiment from "./pages/PhysicsExperiment";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/biology" element={<Biology />} />
          <Route path="/chemistry" element={<Chemistry />} />
          <Route path="/physics" element={<Physics />} />
          <Route path="/biology/:experimentId" element={<BiologyExperiment />} />
          <Route path="/chemistry/:experimentId" element={<ChemistryExperiment />} />
          <Route path="/physics/:experimentId" element={<PhysicsExperiment />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
