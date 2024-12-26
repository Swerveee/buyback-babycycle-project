import React from 'react';
import Navigation from '../buyer/Navigation';
import AnnouncementBar from '../buyer/AnnouncementBar';
import ProgramIntro from '../buyer/ProgramIntro';
import ProgramFeatures from '../buyer/ProgramFeatures';
import BuybackProcess from '@/components/customer/BuybackProcess';

interface BuyerViewProps {
  isWireframe: boolean;
  setIsWireframe: (value: boolean) => void;
  view: 'buyer' | 'merchant';
  setView: (view: 'buyer' | 'merchant') => void;
  showControls: boolean;
  setShowControls: (show: boolean) => void;
  showBuyback: boolean;
  setShowBuyback: (show: boolean) => void;
  onLogoClick: () => void;
}

const BuyerView: React.FC<BuyerViewProps> = ({
  isWireframe,
  setIsWireframe,
  view,
  setView,
  showControls,
  setShowControls,
  showBuyback,
  setShowBuyback,
  onLogoClick
}) => {
  const navItems = [
    { title: "SHOP", url: "#" },
    { title: "OUR STORY", url: "#" },
    { title: "CONTACT", url: "#" },
    { title: "SUSTAINABILITY", url: "#" },
    { 
      title: "OUR BUYBACK PROGRAM", 
      url: "#",
      isHighlighted: true,
      onClick: () => setShowBuyback(false)
    }
  ];

  return (
    <div className="min-h-screen">
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
      )}

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

      <AnnouncementBar 
        isWireframe={isWireframe}
        message="Give your baby's outgrown treasures a new home! Get 15% off your first preloved purchase 🌱"
      />

      <Navigation 
        isWireframe={isWireframe}
        navItems={navItems}
        onLogoClick={onLogoClick}
      />

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
            <>
              <ProgramIntro 
                isWireframe={isWireframe}
                onStartBuyback={() => setShowBuyback(true)}
              />
              <ProgramFeatures isWireframe={isWireframe} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuyerView;