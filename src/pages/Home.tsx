import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Home = () => {
  const navigate = useNavigate();
  const [isWireframe, setIsWireframe] = useState(false);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Controls Bar */}
      {showControls ? (
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
        </div>
      ) : null}

      {/* Hide/Show Controls Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          onClick={() => setShowControls(!showControls)}
          className="bg-white shadow-sm"
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </Button>
      </div>

      {/* Announcement Bar */}
      <div className={`w-full py-3 text-center text-white ${isWireframe ? 'bg-gray-300' : 'bg-[#7E69AB]'}`}>
        <p className="text-sm font-medium">
          Give your baby's outgrown treasures a new home! Get 15% off your first preloved purchase 🌱
        </p>
      </div>

      {/* Navigation */}
      <nav className={`${isWireframe ? 'bg-gray-100 border-2 border-dashed border-gray-300' : 'bg-white shadow-sm'} py-6 px-6`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className={`text-2xl font-bold ${isWireframe ? 'font-mono' : ''} text-[#9b87f5]`}>
            BabyCycle
          </div>

          <div className="flex items-center space-x-8">
            {[
              { title: "SHOP", url: "#" },
              { title: "OUR STORY", url: "#" },
              { title: "CONTACT", url: "#" },
              { title: "SUSTAINABILITY", url: "#" },
              { 
                title: "OUR BUYBACK PROGRAM", 
                url: "/buyback",
                isHighlighted: true,
                onClick: () => navigate('/buyback')
              }
            ].map((item) => (
              <button
                key={item.title}
                onClick={item.onClick}
                className={`${isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 
                  item.isHighlighted ? 'text-[#9b87f5] font-medium hover:text-[#7E69AB]' : 
                  'text-gray-700 hover:text-[#9b87f5]'} 
                  text-sm tracking-wide transition-colors`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`container mx-auto py-16 px-4 ${isWireframe ? 'bg-gray-50' : ''}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className={`text-4xl font-bold mb-6 ${isWireframe ? 'font-mono' : ''} text-[#403E43]`}>
            Sustainable Fashion for Growing Families
          </h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Join our circular fashion movement. Shop preloved baby clothes or give your gently used items a second life through our buyback program.
          </p>
          <Button
            onClick={() => navigate('/buyback')}
            className={`${isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-[#9b87f5] hover:bg-[#7E69AB] text-white'} px-8 py-6 text-lg font-medium transition-colors`}
          >
            Learn About Our Buyback Program
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;