import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CompensationStepProps {
  onSubmit: (data: any) => void;
}

const CompensationStep: React.FC<CompensationStepProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Choose Compensation Method</Label>
        <RadioGroup defaultValue="store-credit">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="store-credit" id="store-credit" />
            <Label htmlFor="store-credit">Store Credit (+10% bonus)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash">Cash Payment</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="p-4 bg-[#F1F1F1] rounded-lg">
        <p className="text-[#1A1F2C]">Estimated Value: $120</p>
        <p className="text-sm text-[#555555]">Final value subject to condition verification</p>
      </div>
    </form>
  );
};

export default CompensationStep;