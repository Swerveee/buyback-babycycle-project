import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewControls from "./components/shared/ViewControls";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Success from "./pages/Success";
import BuybackOnboarding from "./pages/BuybackOnboarding";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const [isWireframe, setIsWireframe] = useState(false);
  const [view, setView] = useState<'buyer' | 'merchant'>('buyer');
  const [showControls, setShowControls] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { isWireframe?: boolean };
    if (state?.isWireframe !== undefined) {
      setIsWireframe(state.isWireframe);
    }
  }, [location]);

  const handleWireframeToggle = (newValue: boolean) => {
    setIsWireframe(newValue);
    navigate(location.pathname, { state: { isWireframe: newValue } });
  };

  return (
    <>
      <ViewControls
        isWireframe={isWireframe}
        setIsWireframe={handleWireframeToggle}
        view={view}
        setView={setView}
        showControls={showControls}
        setShowControls={setShowControls}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              isWireframe={isWireframe}
              onWireframeChange={handleWireframeToggle}
            />
          } 
        />
        <Route 
          path="/buyback-onboarding" 
          element={
            <BuybackOnboarding 
              isWireframe={isWireframe}
              onWireframeChange={handleWireframeToggle}
            />
          } 
        />
        <Route path="/buyback" element={<Index />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;