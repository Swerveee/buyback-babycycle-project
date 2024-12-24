import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShippingDetailsStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const ShippingDetailsStep: React.FC<ShippingDetailsStepProps> = ({ onSubmit, isWireframe }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-gray-300 bg-gray-50",
    label: "font-mono"
  } : {
    input: "",
    label: ""
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Shipping Address</Label>
        <Input placeholder="Street Address" required className={wireframeStyles.input} />
        <Input placeholder="City" required className={wireframeStyles.input} />
        <Input placeholder="ZIP Code" required className={wireframeStyles.input} />
      </div>
    </form>
  );
};

export default ShippingDetailsStep;