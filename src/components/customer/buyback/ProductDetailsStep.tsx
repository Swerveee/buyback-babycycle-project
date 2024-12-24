import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductDetailsStepProps {
  onSubmit: (data: any) => void;
}

const ProductDetailsStep: React.FC<ProductDetailsStepProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Order Number</Label>
        <Input placeholder="Enter your original order number" required />
      </div>
      <div className="space-y-2">
        <Label>Purchase Date</Label>
        <Input type="date" required />
      </div>
    </form>
  );
};

export default ProductDetailsStep;