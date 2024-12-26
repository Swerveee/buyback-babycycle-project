import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BuybackProcess from '@/components/customer/BuybackProcess';
import { Users, ShoppingBag, Package, DollarSign, RefreshCw } from 'lucide-react';

interface BuyerViewProps {
  isWireframe: boolean;
  setIsWireframe: (value: boolean) => void;
  view: 'buyer' | 'merchant';
  setView: (view: 'buyer' | 'merchant') => void;
  showControls: boolean;
  setShowControls: (show: boolean) => void;
  showBuyback: boolean;
  setShowBuyback: (show: boolean) => void;
}

const BuyerView: React.FC<BuyerViewProps> = ({
  isWireframe,
  setIsWireframe,
  view,
  setView,
  showControls,
  setShowControls,
  showBuyback,
  setShowBuyback
}) => {
  const navItems = [
    { title: "SHOP", url: "#" },
    { title: "ABOUT US", url: "#" },
    { title: "CONTACT", url: "#" },
    { title: "BONDING BLOG", url: "#" },
    { 
      title: "BUYBACK PROGRAM", 
      url: "#",
      isHighlighted: true,
      onClick: () => setShowBuyback(false)
    }
  ];

  return (
    <div className="min-h-screen">
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
          <div className="flex space-x-2">
            <Button 
              variant={view === 'buyer' ? 'default' : 'outline'}
              onClick={() => setView('buyer')}
              className={isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : ""}
            >
              Buyer View
            </Button>
            <Button 
              variant={view === 'merchant' ? 'default' : 'outline'}
              onClick={() => setView('merchant')}
              className={isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : ""}
            >
              Merchant View
            </Button>
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
      <div className={`w-full py-2 text-center text-white ${isWireframe ? 'bg-gray-300' : 'bg-[#96B6A3]'}`}>
        <p className="text-sm">Save up to 30% instantly on all bundles until December 25th 🎁</p>
      </div>

      {/* Navigation */}
      <nav className={`${isWireframe ? 'bg-gray-100 border-2 border-dashed border-gray-300' : 'bg-white shadow-sm'} py-4 px-6`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className={`text-2xl font-bold ${isWireframe ? 'font-mono' : ''}`}>
            Bonsie
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.title}
                onClick={item.onClick}
                className={`${isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 'text-gray-700 hover:text-primary'} ${
                  item.isHighlighted ? 'font-semibold' : ''
                } text-sm`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className={isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 'text-gray-700 hover:text-primary'}>
              <Users className="h-5 w-5" />
            </button>
            <button className={isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 'text-gray-700 hover:text-primary'}>
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`${isWireframe ? 'bg-gray-50' : 'bg-[#f8f9fb]'} min-h-screen`}>
        <div className="container mx-auto py-8">
          {showBuyback ? (
            <div className="mb-6">
              <button
                onClick={() => setShowBuyback(false)}
                className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
              >
                ← Back to Program Details
              </button>
              <BuybackProcess isWireframe={isWireframe} />
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isWireframe ? 'font-mono' : ''}`}>
                Buyback Program
              </h1>
              <p className="text-gray-600 mb-8">
                Give your gently used Bonsie clothes a second life and earn rewards! Our buyback program helps reduce waste while putting money back in your pocket.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: Package,
                    title: "Easy Returns",
                    description: "Free shipping label provided"
                  },
                  {
                    icon: DollarSign,
                    title: "Quick Payment",
                    description: "Get paid within 48 hours"
                  },
                  {
                    icon: RefreshCw,
                    title: "Sustainable Choice",
                    description: "Help reduce textile waste"
                  }
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className={`p-6 rounded-lg ${
                      isWireframe ? 'border-2 border-dashed border-gray-300' : 'bg-white shadow-sm'
                    }`}
                  >
                    <feature.icon className="w-8 h-8 mb-4 mx-auto" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setShowBuyback(true)}
                className={`${isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-primary text-white'} text-white px-8 py-3`}
              >
                Start Buyback Process
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuyerView;
