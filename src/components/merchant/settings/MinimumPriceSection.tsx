import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MinimumPriceSectionProps {
  enableMinPrice: boolean;
  setEnableMinPrice: (value: boolean) => void;
  minItemPrice: string;
  setMinItemPrice: (value: string) => void;
  wireframeStyles: {
    label: string;
    input: string;
  };
}

const MinimumPriceSection: React.FC<MinimumPriceSectionProps> = ({
  enableMinPrice,
  setEnableMinPrice,
  minItemPrice,
  setMinItemPrice,
  wireframeStyles
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className={`${wireframeStyles.label} block mb-1`}>Minimum Item Value</Label>
          <span className="text-sm text-gray-500">Set a minimum price threshold for eligible items</span>
        </div>
        <Switch
          checked={enableMinPrice}
          onCheckedChange={setEnableMinPrice}
        />
      </div>
      
      {enableMinPrice && (
        <div className="relative w-32 ml-auto">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <Input
            type="text"
            value={minItemPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                setMinItemPrice(value);
              }
            }}
            className={`${wireframeStyles.input} pl-8`}
            placeholder="0.00"
          />
        </div>
      )}
    </div>
  );
};

export default MinimumPriceSection;