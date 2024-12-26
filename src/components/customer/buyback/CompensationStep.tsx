import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CompensationStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const CompensationStep: React.FC<CompensationStepProps> = ({ onSubmit, isWireframe }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    label: "font-mono",
    valueBox: "bg-gray-100 border-2 border-dashed border-gray-300"
  } : {
    label: "",
    valueBox: "bg-[#F1F1F1]"
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Compensation Method</Label>
        <RadioGroup defaultValue="store-credit">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="store-credit" id="store-credit" />
            <Label htmlFor="store-credit" className={wireframeStyles.label}>Store Credit (+10% bonus)</Label>
          </div>
        </RadioGroup>
      </div>
      <div className={`p-4 rounded-lg ${wireframeStyles.valueBox}`}>
        <p className="text-[#1A1F2C]">Estimated Value: $120</p>
        <p className="text-sm text-[#555555]">Final value subject to condition verification</p>
      </div>
    </form>
  );
};

export default CompensationStep;