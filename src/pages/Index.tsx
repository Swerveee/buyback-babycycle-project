import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyerView from '@/components/views/BuyerView';
import MerchantView from '@/components/views/MerchantView';

type ViewType = 'buyer' | 'merchant';

const Index = () => {
  const [view, setView] = useState<ViewType>('buyer');
  const [isWireframe, setIsWireframe] = useState(false);
  const [showBuyback, setShowBuyback] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const navigate = useNavigate();

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

export default Index;