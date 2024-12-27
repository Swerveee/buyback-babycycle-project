import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyerView from '@/components/views/BuyerView';
import MerchantView from '@/components/views/MerchantView';

const Index = () => {
  const [view, setView] = useState<'buyer' | 'merchant'>('buyer');
  const [isWireframe, setIsWireframe] = useState(false);
  const [showBuyback, setShowBuyback] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const navigate = useNavigate();

  const handleWireframeChange = (newValue: boolean) => {
    // Prevent any state updates while the transition is happening
    requestAnimationFrame(() => {
      setIsWireframe(newValue);
    });
  };

  const handleControlsToggle = () => {
    setShowControls(prev => !prev);
  };

  const renderView = () => {
    if (view === 'buyer') {
      return (
        <BuyerView
          isWireframe={isWireframe}
          setIsWireframe={handleWireframeChange}
          view={view}
          setView={setView}
          showControls={showControls}
          setShowControls={handleControlsToggle}
          showBuyback={showBuyback}
          setShowBuyback={setShowBuyback}
          onLogoClick={() => navigate('/')}
        />
      );
    }

    return (
      <MerchantView
        isWireframe={isWireframe}
        setIsWireframe={handleWireframeChange}
        view={view}
        setView={setView}
        showControls={showControls}
        setShowControls={handleControlsToggle}
        onLogoClick={() => navigate('/')}
      />
    );
  };

  return renderView();
};

export default Index;