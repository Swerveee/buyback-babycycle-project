import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowRight, Leaf, Heart, RefreshCw, Users, ShoppingBag } from 'lucide-react';
import BalanceDisplay from '@/components/BalanceDisplay';

interface HomeProps {
  isWireframe?: boolean;
  onWireframeChange?: (value: boolean) => void;
}

const Home = ({ isWireframe = false, onWireframeChange }: HomeProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { title: "SHOP", url: "#" },
    { title: "OUR STORY", url: "#" },
    { title: "CONTACT", url: "#" },
    { title: "SUSTAINABILITY", url: "#" },
    { 
      title: "OUR BUYBACK PROGRAM", 
      url: "/buyback",
      isHighlighted: location.pathname !== '/',
      onClick: () => navigate('/buyback')
    }
  ];

  const wireframeClass = isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100' : '';

  return (
    <div className="min-h-screen">
      {/* Wireframe Controls */}
      {onWireframeChange && (
        <div className="fixed top-4 right-4 flex items-center space-x-2 z-50 bg-white p-2 rounded-lg shadow-sm">
          <Switch
            id="wireframe-mode"
            checked={isWireframe}
            onCheckedChange={onWireframeChange}
          />
          <Label htmlFor="wireframe-mode" className={isWireframe ? "font-mono" : ""}>
            Wireframe Mode
          </Label>
        </div>
      )}

      {/* Announcement Bar */}
      <div className={`w-full py-3 text-center text-white bg-[#7E69AB] ${wireframeClass}`}>
        <p className="text-sm font-medium">Give your baby's outgrown treasures a new home! Get 15% off your first preloved purchase 🌱</p>
      </div>

      {/* Navigation */}
      <nav className={`bg-white shadow-sm py-6 px-6 ${wireframeClass}`}>
        <div className="container mx-auto flex items-center justify-between">
          <div 
            className={`text-2xl font-bold text-[#9b87f5] cursor-pointer ${isWireframe ? 'text-gray-700' : ''}`}
            onClick={() => navigate('/')}
          >
            BabyCycle
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.title}
                onClick={item.onClick}
                className={`${
                  item.isHighlighted ? 
                    isWireframe ? 'text-gray-700' : 'text-[#9b87f5] font-medium hover:text-[#7E69AB]' : 
                    isWireframe ? 'text-gray-700' : 'text-gray-700 hover:text-[#9b87f5]'
                } text-sm tracking-wide transition-colors`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <BalanceDisplay isWireframe={isWireframe} />

            <button className={`${isWireframe ? 'text-gray-700' : 'text-gray-700 hover:text-[#9b87f5]'} transition-colors`}>
              <Users className="h-5 w-5" />
            </button>
            <button className={`${isWireframe ? 'text-gray-700' : 'text-gray-700 hover:text-[#9b87f5]'} transition-colors`}>
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`bg-gradient-to-b from-[#F1F0FB] to-white ${wireframeClass}`}>
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-5xl font-bold ${isWireframe ? 'text-gray-700' : 'text-[#403E43]'} mb-6`}>
              Sustainable Fashion for Growing Little Ones
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our circular fashion movement. Shop quality baby clothes, return them when outgrown, 
              and earn rewards while making eco-conscious choices for their future.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/shop')}
                className={`${isWireframe ? 'bg-gray-100 border-2 border-dashed border-gray-300 text-gray-700 hover:bg-gray-200' : 'bg-[#9b87f5] hover:bg-[#7E69AB] text-white'} px-8 py-6 text-lg`}
              >
                Shop Collection
                <ArrowRight className="ml-2" />
              </Button>
              <Button 
                onClick={() => navigate('/buyback')}
                variant="outline"
                className={`${isWireframe ? 'bg-gray-100 border-2 border-dashed border-gray-300 text-gray-700 hover:bg-gray-200' : 'border-[#9b87f5] text-[#9b87f5] hover:bg-[#D6BCFA]/10'} px-8 py-6 text-lg`}
              >
                Learn About Buyback
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`bg-white py-20 ${wireframeClass}`}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`text-center p-6 ${wireframeClass}`}>
                <div className={`w-16 h-16 ${isWireframe ? 'bg-gray-100' : 'bg-[#F2FCE2]'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Leaf className={`w-8 h-8 ${isWireframe ? 'text-gray-700' : 'text-[#9b87f5]'}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Choice</h3>
                <p className="text-gray-600">
                  High-quality, eco-friendly materials that are gentle on your baby and the planet
                </p>
              </div>
              <div className={`text-center p-6 ${wireframeClass}`}>
                <div className={`w-16 h-16 ${isWireframe ? 'bg-gray-100' : 'bg-[#FEF7CD]'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Heart className={`w-8 h-8 ${isWireframe ? 'text-gray-700' : 'text-[#9b87f5]'}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Comfort First</h3>
                <p className="text-gray-600">
                  Designed for maximum comfort and durability through multiple wears
                </p>
              </div>
              <div className={`text-center p-6 ${wireframeClass}`}>
                <div className={`w-16 h-16 ${isWireframe ? 'bg-gray-100' : 'bg-[#E5DEFF]'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <RefreshCw className={`w-8 h-8 ${isWireframe ? 'text-gray-700' : 'text-[#9b87f5]'}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Circular Fashion</h3>
                <p className="text-gray-600">
                  Return outgrown items for store credit and shop for the next size up
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
