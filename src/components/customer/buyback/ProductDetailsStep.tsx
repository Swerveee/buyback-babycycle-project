import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductDetailsStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const ProductDetailsStep: React.FC<ProductDetailsStepProps> = ({ onSubmit, isWireframe }) => {
  const [dontRememberDate, setDontRememberDate] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-gray-300 bg-white",
    label: "font-mono",
    select: "border-2 border-dashed border-gray-300 bg-white",
    checkbox: "border-2 border-dashed border-gray-300"
  } : {
    input: "",
    label: "",
    select: "",
    checkbox: ""
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
        <Label className={wireframeStyles.label}>When Was the Item Purchased?</Label>
        <p className={`text-sm text-gray-500 mb-2 ${isWireframe ? "font-mono" : ""}`}>
          Select the date the item was bought. If you're unsure, check "I don't remember," and provide an approximate age range instead.
        </p>
        <Input 
          type="date" 
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          disabled={dontRememberDate}
          className={`${wireframeStyles.input} ${dontRememberDate ? 'opacity-50' : ''}`}
        />
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="dontRemember"
            checked={dontRememberDate}
            onCheckedChange={(checked) => {
              setDontRememberDate(checked as boolean);
              if (checked) {
                setPurchaseDate('');
              }
            }}
            className={wireframeStyles.checkbox}
          />
          <label
            htmlFor="dontRemember"
            className="text-sm text-gray-700 cursor-pointer"
          >
            I don't remember the exact date
          </label>
        </div>
        
        {dontRememberDate && (
          <div className="mt-4">
            <Label className={wireframeStyles.label}>Age Range</Label>
            <Select value={ageRange} onValueChange={setAgeRange}>
              <SelectTrigger className={wireframeStyles.select}>
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-6m">0-6 months</SelectItem>
                <SelectItem value="6-12m">6-12 months</SelectItem>
                <SelectItem value="1-2y">1-2 years</SelectItem>
                <SelectItem value="over-2y">Over 2 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProductDetailsStep;