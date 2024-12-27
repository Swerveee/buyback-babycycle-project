import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    input: "border-2 border-dashed border-gray-300 bg-white",
    label: "font-mono",
    select: "border-2 border-dashed border-gray-300 bg-white"
  } : {
    input: "",
    label: "",
    select: ""
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Product Category</Label>
        <Select defaultValue="clothing">
          <SelectTrigger className={wireframeStyles.select}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clothing">Baby Clothing</SelectItem>
            <SelectItem value="toys">Toys</SelectItem>
            <SelectItem value="gear">Baby Gear</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Item Name</Label>
        <Input 
          placeholder="Enter item name" 
          required 
          className={wireframeStyles.input}
        />
      </div>
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Age Range</Label>
        <Select defaultValue="0-6m">
          <SelectTrigger className={wireframeStyles.select}>
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-6m">0-6 months</SelectItem>
            <SelectItem value="6-12m">6-12 months</SelectItem>
            <SelectItem value="1-2y">1-2 years</SelectItem>
            <SelectItem value="2-3y">2-3 years</SelectItem>
            <SelectItem value="3-4y">3-4 years</SelectItem>
            <SelectItem value="4-5y">4-5 years</SelectItem>
            <SelectItem value="5+">5+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Original Purchase Date</Label>
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