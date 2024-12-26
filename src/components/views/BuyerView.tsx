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
    { title: "OUR STORY", url: "#" },
    { title: "CONTACT", url: "#" },
    { title: "SUSTAINABILITY", url: "#" },
    { 
      title: "PRELOVED", 
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
      <div className={`w-full py-3 text-center text-white ${isWireframe ? 'bg-gray-300' : 'bg-[#7E69AB]'}`}>
        <p className="text-sm font-medium">Give your baby's outgrown treasures a new home! Get 15% off your first preloved purchase 🌱</p>
      </div>

      {/* Navigation */}
      <nav className={`${isWireframe ? 'bg-gray-100 border-2 border-dashed border-gray-300' : 'bg-white shadow-sm'} py-6 px-6`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className={`text-2xl font-bold ${isWireframe ? 'font-mono' : ''} text-[#9b87f5]`}>
            Circlet
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
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

          <div className="flex items-center space-x-4">
            <button className={`${isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 'text-gray-700 hover:text-[#9b87f5]'} transition-colors`}>
              <Users className="h-5 w-5" />
            </button>
            <button className={`${isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 'text-gray-700 hover:text-[#9b87f5]'} transition-colors`}>
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`${isWireframe ? 'bg-gray-50' : 'bg-[#F1F0FB]'} min-h-screen`}>
        <div className="container mx-auto py-12">
          {showBuyback ? (
            <div className="mb-6">
              <button
                onClick={() => setShowBuyback(false)}
                className="text-[#7E69AB] hover:text-[#9b87f5] mb-4 flex items-center transition-colors"
              >
                ← Back to Program Details
              </button>
              <BuybackProcess isWireframe={isWireframe} />
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isWireframe ? 'font-mono' : ''} text-[#403E43]`}>
                Give Baby Clothes a Second Story
              </h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Join our sustainable parenting community. Give your little one's gently worn clothes and toys a new home while earning rewards and making eco-conscious choices for their future.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: Package,
                    title: "Easy Returns",
                    description: "Free shipping label & eco-friendly packaging for baby items"
                  },
                  {
                    icon: DollarSign,
                    title: "Parent Rewards",
                    description: "Earn up to 70% back in store credit for your baby's outgrown items"
                  },
                  {
                    icon: RefreshCw,
                    title: "Growing Impact",
                    description: "Each preloved item helps reduce fashion waste for future generations"
                  }
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className={`p-6 rounded-lg ${
                      isWireframe ? 'border-2 border-dashed border-gray-300' : 'bg-white shadow-sm hover:shadow-md transition-shadow'
                    }`}
                  >
                    <feature.icon className="w-8 h-8 mb-4 mx-auto text-[#9b87f5]" />
                    <h3 className="font-semibold mb-2 text-[#403E43]">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setShowBuyback(true)}
                className={`${isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-[#9b87f5] hover:bg-[#7E69AB] text-white'} px-8 py-6 text-lg font-medium transition-colors`}
              >
                Start Your Sustainable Parenting Journey
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuyerView;