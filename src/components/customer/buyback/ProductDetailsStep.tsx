import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductDetailsStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const ProductDetailsStep: React.FC<ProductDetailsStepProps> = ({ onSubmit, isWireframe }) => {
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
        <Label className={wireframeStyles.label}>Order Number</Label>
        <Input 
          placeholder="Enter your original order number" 
          required 
          className={wireframeStyles.input}
        />
      </div>
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Purchase Date</Label>
        <Input 
          type="date" 
          required 
          className={wireframeStyles.input}
        />
      </div>
    </form>
  );
};

export default ProductDetailsStep;