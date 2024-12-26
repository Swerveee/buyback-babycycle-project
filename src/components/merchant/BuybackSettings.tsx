import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuybackSettingsProps {
  isWireframe: boolean;
}

const BuybackSettings: React.FC<BuybackSettingsProps> = ({ isWireframe }) => {
  const [minItemPrice, setMinItemPrice] = useState<string>('');
  const [enableMinPrice, setEnableMinPrice] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [creditExpiration, setCreditExpiration] = useState('12');
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
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
            <div className="space-y-1">
              <span className="text-lg font-semibold">Auto-approve Requests</span>
              <p className="text-sm text-gray-600">Automatically process buyback requests using fixed rates</p>
            </div>
            <Switch 
              checked={autoApprove}
              onCheckedChange={setAutoApprove}
            />
          </div>

          <div className="grid gap-4">
            {[
              { condition: 'excellent', label: 'Excellent - Almost New', description: 'Items in almost new condition' },
              { condition: 'good', label: 'Good - Minor Wear', description: 'Items with slight signs of use' },
              { condition: 'fair', label: 'Fair - Visible Wear', description: 'Items with noticeable wear' }
            ].map(({ condition, label, description }) => (
              <div key={condition} className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <Label className={`${wireframeStyles.label} block mb-1`}>{label}</Label>
                  <span className="text-sm text-gray-500">{description}</span>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value={rates[condition as keyof typeof rates]}
                    onChange={handleRateChange(condition as keyof typeof rates)}
                    className={`${wireframeStyles.input} pr-8 ${!autoApprove ? 'bg-gray-100' : ''}`}
                    placeholder="0"
                    disabled={!autoApprove}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="space-y-1">
              <span className="text-lg font-semibold">Store Credit Expiration</span>
              <p className="text-sm text-gray-600">Set when store credits expire to manage liability and encourage timely usage</p>
            </div>
            <div className="w-32">
              <Select 
                value={creditExpiration} 
                onValueChange={setCreditExpiration}
              >
                <SelectTrigger className={wireframeStyles.input}>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

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