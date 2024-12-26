import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AutoApproveSectionProps {
  autoApprove: boolean;
  setAutoApprove: (value: boolean) => void;
  rates: {
    excellent: string;
    good: string;
    fair: string;
  };
  handleRateChange: (condition: 'excellent' | 'good' | 'fair') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  wireframeStyles: {
    label: string;
    input: string;
  };
}

const AutoApproveSection: React.FC<AutoApproveSectionProps> = ({
  autoApprove,
  setAutoApprove,
  rates,
  handleRateChange,
  wireframeStyles
}) => {
  return (
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
  );
};

export default AutoApproveSection;