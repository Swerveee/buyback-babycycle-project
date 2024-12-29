import React from 'react';
import PercentageRangeSelector from './settings/PercentageRangeSelector';

interface BuybackSettingsProps {
  isWireframe: boolean;
}

const BuybackSettings: React.FC<BuybackSettingsProps> = ({ isWireframe }) => {
  const handleRangeChange = (range: [number, number]) => {
    console.log('Range changed:', range);
  };

  return (
    <div className="space-y-6">
      <PercentageRangeSelector
        onRangeChange={handleRangeChange}
        defaultRange={[55, 70]}
        isWireframe={isWireframe}
      />
    </div>
  );
};

export default BuybackSettings;