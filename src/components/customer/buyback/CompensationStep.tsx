import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";

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
    valueBox: "border-2 border-dashed border-black",
    benefitCard: "border-2 border-dashed border-black bg-white"
  } : {
    label: "",
    valueBox: "bg-[#F8F2FF] border border-[#E9DDFF]",
    benefitCard: "bg-white border border-[#E9DDFF]"
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={`p-6 rounded-lg ${wireframeStyles.valueBox}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1A1F2C]">Store Credit Value</h3>
            <p className="text-sm text-[#555555]">Based on item condition assessment</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#1A1F2C]">$120</div>
            <div className="text-sm text-[#7E69AB]">+10% bonus included</div>
          </div>
        </div>
        <RadioGroup defaultValue="store-credit" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="store-credit" id="store-credit" />
            <Label htmlFor="store-credit" className={wireframeStyles.label}>
              Store Credit
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${wireframeStyles.benefitCard}`}>
          <Sparkles className="w-6 h-6 text-[#9b87f5] mb-2" />
          <h4 className="font-semibold mb-1">Bonus Value</h4>
          <p className="text-sm text-[#555555]">Get 10% extra on your credit value</p>
        </div>
        <div className={`p-4 rounded-lg ${wireframeStyles.benefitCard}`}>
          <Clock className="w-6 h-6 text-[#9b87f5] mb-2" />
          <h4 className="font-semibold mb-1">12 Month Validity</h4>
          <p className="text-sm text-[#555555]">Use your credit within one year</p>
        </div>
        <div className={`p-4 rounded-lg ${wireframeStyles.benefitCard}`}>
          <CheckCircle2 className="w-6 h-6 text-[#9b87f5] mb-2" />
          <h4 className="font-semibold mb-1">Instant Usage</h4>
          <p className="text-sm text-[#555555]">Shop immediately after approval</p>
        </div>
      </div>
    </form>
  );
};

export default CompensationStep;