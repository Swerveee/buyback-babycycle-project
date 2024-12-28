import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ItemConditionRadioProps {
  isWireframe: boolean;
}

const ItemConditionRadio: React.FC<ItemConditionRadioProps> = ({ isWireframe }) => {
  const wireframeStyles = isWireframe ? {
    label: "font-mono text-black",
  } : {
    label: "",
  };

  return (
    <div className="space-y-2">
      <Label className={wireframeStyles.label}>Item Condition</Label>
      <RadioGroup defaultValue="good">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="excellent" id="excellent" />
          <Label htmlFor="excellent" className={wireframeStyles.label}>Excellent - Like New</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="good" id="good" />
          <Label htmlFor="good" className={wireframeStyles.label}>Good - Minor Wear</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fair" id="fair" />
          <Label htmlFor="fair" className={wireframeStyles.label}>Fair - Visible Wear</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ItemConditionRadio;