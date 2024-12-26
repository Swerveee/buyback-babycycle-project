import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BuyerView from '@/components/views/BuyerView';
import MerchantView from '@/components/views/MerchantView';

interface IndexProps {
  isWireframe: boolean;
  setIsWireframe: (value: boolean) => void;
  view: 'buyer' | 'merchant';
  setView: (view: 'buyer' | 'merchant') => void;
  showControls: boolean;
  setShowControls: (show: boolean) => void;
}

const Index: React.FC<IndexProps> = ({
  isWireframe,
  setIsWireframe,
  view,
  setView,
  showControls,
  setShowControls
}) => {
  const navigate = useNavigate();
  const [showBuyback, setShowBuyback] = useState(false);

  const renderView = () => {
    if (view === 'buyer') {
      return (
        <BuyerView
          isWireframe={isWireframe}
          setIsWireframe={setIsWireframe}
          view={view}
          setView={setView}
          showControls={showControls}
          setShowControls={setShowControls}
          showBuyback={showBuyback}
          setShowBuyback={setShowBuyback}
          onLogoClick={() => navigate('/')}
        />
      );
    }

    return (
      <MerchantView
        isWireframe={isWireframe}
        setIsWireframe={setIsWireframe}
        view={view}
        setView={setView}
        showControls={showControls}
        setShowControls={setShowControls}
        onLogoClick={() => navigate('/')}
      />
    );
  };

  return (
    <>
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

      {renderView()}
    </>
  );
};

export default Index;