import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CompensationStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
  showEstimatedValue?: boolean;
  estimatedValue?: number;
}

const CompensationStep: React.FC<CompensationStepProps> = ({ 
  onSubmit, 
  isWireframe,
  showEstimatedValue = true,
  estimatedValue = 120
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    label: "font-mono",
    valueBox: "border-2 border-dashed border-black",
    benefitCard: "border-2 border-dashed border-black bg-white",
    alert: "border-2 border-dashed border-black"
  } : {
    label: "",
    valueBox: "bg-[#F8F2FF] border border-[#E9DDFF]",
    benefitCard: "bg-white border border-[#E9DDFF]",
    alert: ""
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-[#555555]">Redeem the value of your items as store credit.</p>
      </div>

      {showEstimatedValue && (
        <div className={`p-6 rounded-lg ${wireframeStyles.valueBox}`}>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[#1A1F2C] mb-3">
              ${estimatedValue}
            </div>
            <p className="text-sm text-[#555555]">
              Estimated value - Final value will be determined after merchant review.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#9b87f5]" />
              <span className="text-[#1A1F2C]">Valid for 12 months.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#9b87f5]" />
              <span className="text-[#1A1F2C]">Available for immediate use after approval.</span>
            </div>
          </div>
        </div>
      )}

      <Alert variant="default" className={`${wireframeStyles.alert} bg-blue-50 border-blue-200`}>
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          Your request will be carefully reviewed by our merchant team before approval. We'll notify you once the review is complete.
        </AlertDescription>
      </Alert>

      <div className="text-center mt-8 mb-6">
        <p className="text-lg font-semibold text-[#1A1F2C]">
          Submit your request to complete the process.
        </p>
      </div>

      <RadioGroup defaultValue="store-credit" className="hidden">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="store-credit" id="store-credit" />
          <Label htmlFor="store-credit" className={wireframeStyles.label}>
            Store Credit
          </Label>
        </div>
      </RadioGroup>
    </form>
  );
};

export default CompensationStep;