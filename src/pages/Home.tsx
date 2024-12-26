import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface HomeProps {
  isWireframe: boolean;
  setIsWireframe: (value: boolean) => void;
  view: 'buyer' | 'merchant';
  setView: (view: 'buyer' | 'merchant') => void;
  showControls: boolean;
  setShowControls: (show: boolean) => void;
}

const Home: React.FC<HomeProps> = ({
  isWireframe,
  setIsWireframe,
  view,
  setView,
  showControls,
  setShowControls
}) => {
  const wireframeStyles = isWireframe ? {
    container: "border-2 border-dashed border-gray-300",
    heading: "font-mono",
    text: "font-mono",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700"
  } : {
    container: "",
    heading: "",
    text: "",
    button: ""
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Controls Bar */}
      {showControls && (
        <div className="fixed top-4 right-4 flex items-center space-x-4 z-50 bg-white p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <Switch
              id="wireframe-mode"
              checked={isWireframe}
              onCheckedChange={setIsWireframe}
            />
            <Label htmlFor="wireframe-mode" className={isWireframe ? "font-mono" : ""}>
              Wireframe Mode
            </Label>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={view === 'buyer' ? 'default' : 'outline'}
              onClick={() => setView('buyer')}
              className={wireframeStyles.button}
            >
              Buyer View
            </Button>
            <Button 
              variant={view === 'merchant' ? 'default' : 'outline'}
              onClick={() => setView('merchant')}
              className={wireframeStyles.button}
            >
              Merchant View
            </Button>
          </div>
        </div>
      )}

      {/* Hide/Show Controls Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          onClick={() => setShowControls(!showControls)}
          className={`bg-white shadow-sm ${wireframeStyles.button}`}
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </Button>
      </div>

      <div className={`container mx-auto px-4 py-16 ${wireframeStyles.container}`}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className={`text-5xl font-bold text-gray-900 ${wireframeStyles.heading}`}>
            Welcome to BabyCycle
          </h1>
          <p className={`text-xl text-gray-600 ${wireframeStyles.text}`}>
            A sustainable solution for baby clothing. Buy, sell, and give back to create a circular economy for children's fashion.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              className={`${isWireframe ? wireframeStyles.button : 'bg-[#9b87f5] hover:bg-[#7E69AB]'}`}
              onClick={() => setView('buyer')}
            >
              Shop Now
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className={`${isWireframe ? wireframeStyles.button : 'border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white'}`}
              onClick={() => setView('merchant')}
            >
              Sell With Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;