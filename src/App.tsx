import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Success from "./pages/Success";
import BuybackOnboarding from "./pages/BuybackOnboarding";

const queryClient = new QueryClient();

const App = () => {
  const [isWireframe, setIsWireframe] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buyback-onboarding" element={<BuybackOnboarding isWireframe={isWireframe} />} />
            <Route path="/buyback" element={<Index />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;