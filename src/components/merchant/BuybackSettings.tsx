import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import AutoApproveSection from './settings/AutoApproveSection';
import CreditExpirationSection from './settings/CreditExpirationSection';
import FundPayoutsSection from './settings/FundPayoutsSection';
import MinimumPriceSection from './settings/MinimumPriceSection';

interface BuybackSettingsProps {
  isWireframe: boolean;
}

const BuybackSettings: React.FC<BuybackSettingsProps> = ({ isWireframe }) => {
  const [enableMinPrice, setEnableMinPrice] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [allowFundPayouts, setAllowFundPayouts] = useState(false);
  const [creditExpiration, setCreditExpiration] = useState('12');
  const [minItemPrice, setMinItemPrice] = useState<string>('');
  const [rates, setRates] = useState({
    excellent: '70',
    good: '50',
    fair: '30'
  });

  const wireframeStyles = isWireframe ? {
    label: "font-mono text-black",
    input: "border-2 border-dashed border-gray-300 bg-white",
    button: "border-2 border-dashed border-gray-300 bg-white hover:bg-gray-200 text-gray-700",
  } : {
    label: "text-gray-700",
    input: "border-gray-200",
    button: "bg-[#2261e9] text-white hover:bg-[#1a4fc0]",
  };

  const handleRateChange = (condition: keyof typeof rates) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{0,3}$/.test(value) && parseInt(value) <= 100)) {
      setRates(prev => ({ ...prev, [condition]: value }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <AutoApproveSection
          autoApprove={autoApprove}
          setAutoApprove={setAutoApprove}
          rates={rates}
          handleRateChange={handleRateChange}
          wireframeStyles={wireframeStyles}
        />

        <CreditExpirationSection
          creditExpiration={creditExpiration}
          setCreditExpiration={setCreditExpiration}
          wireframeStyles={wireframeStyles}
        />

        <FundPayoutsSection
          allowFundPayouts={allowFundPayouts}
          setAllowFundPayouts={setAllowFundPayouts}
        />

        <MinimumPriceSection
          enableMinPrice={enableMinPrice}
          setEnableMinPrice={setEnableMinPrice}
          minItemPrice={minItemPrice}
          setMinItemPrice={setMinItemPrice}
          wireframeStyles={wireframeStyles}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" className={wireframeStyles.button}>
            Cancel
          </Button>
          <Button className={wireframeStyles.button}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuybackSettings;