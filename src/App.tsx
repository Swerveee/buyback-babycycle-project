import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Success from "./pages/Success";

const queryClient = new QueryClient();

const App = () => {
  const [isWireframe, setIsWireframe] = useState(false);
  const [view, setView] = useState<'buyer' | 'merchant'>('buyer');
  const [showControls, setShowControls] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  isWireframe={isWireframe}
                  setIsWireframe={setIsWireframe}
                  view={view}
                  setView={setView}
                  showControls={showControls}
                  setShowControls={setShowControls}
                />
              } 
            />
            <Route path="/buyback" element={<Index />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;