import React, { useState } from 'react';
import BuyerView from '@/components/views/BuyerView';
import MerchantView from '@/components/views/MerchantView';

type ViewType = 'buyer' | 'merchant';

const Index = () => {
  const [view, setView] = useState<ViewType>('buyer');
  const [isWireframe, setIsWireframe] = useState(false);
  const [showBuyback, setShowBuyback] = useState(false);
  const [showControls, setShowControls] = useState(true);

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
    />
  );
};

export default Index;