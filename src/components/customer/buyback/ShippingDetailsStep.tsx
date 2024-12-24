import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShippingDetailsStepProps {
  onSubmit: (data: any) => void;
}

const ShippingDetailsStep: React.FC<ShippingDetailsStepProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Shipping Address</Label>
        <Input placeholder="Street Address" required />
        <Input placeholder="City" required />
        <Input placeholder="ZIP Code" required />
      </div>
    </form>
  );
};

export default ShippingDetailsStep;