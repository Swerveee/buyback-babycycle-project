import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info, Eye } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from 'react-router-dom';

interface BuybackSettingsProps {
  isWireframe: boolean;
}

const BuybackSettings: React.FC<BuybackSettingsProps> = ({ isWireframe }) => {
  const [minItemPrice, setMinItemPrice] = useState<string>('');
  const [enableMinPrice, setEnableMinPrice] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [rates, setRates] = useState({
    excellent: '70',
    good: '50',
    fair: '30'
  });
  
  const navigate = useNavigate();

  const wireframeStyles = isWireframe ? {
    label: "font-mono text-black",
    input: "border-2 border-dashed border-black bg-white",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
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

  const handlePreviewClick = () => {
    navigate('/buyback', { 
      state: { 
        preview: true,
        settings: {
          autoApprove,
          rates,
          enableMinPrice,
          minItemPrice
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Buyback Program Settings</h2>
          <p className="text-gray-600">Configure your store's buyback program</p>
        </div>
        <Button 
          onClick={handlePreviewClick}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Eye className="w-4 h-4" />
          Preview Program
        </Button>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
            <div className="space-y-1">
              <span className="text-lg font-semibold flex items-center gap-2">
                Auto-approve Requests
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Enable to automatically approve buyback requests based on fixed compensation rates</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              <p className="text-sm text-gray-600">When enabled, requests will be automatically processed using the rates below</p>
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

        <Separator className="my-6" />

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

        <div className="space-y-4">
          <Label className={wireframeStyles.label}>Additional Settings</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${wireframeStyles.label}`}>Email notifications</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${wireframeStyles.label}`}>Allow partial returns</span>
              <Switch />
            </div>
          </div>
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