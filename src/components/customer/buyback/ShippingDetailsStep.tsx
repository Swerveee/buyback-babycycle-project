import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from 'lucide-react';

interface ShippingDetailsStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const ShippingDetailsStep: React.FC<ShippingDetailsStepProps> = ({ onSubmit, isWireframe }) => {
  const [shippingMethod, setShippingMethod] = useState('self');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-gray-300 bg-gray-50",
    label: "font-mono",
    radio: "border-2 border-dashed border-gray-300"
  } : {
    input: "",
    label: "",
    radio: ""
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Shipping Details</h2>
        <p className="text-gray-600">Select how you'd like to return your item to us.</p>
      </div>

      <RadioGroup
        defaultValue="self"
        className="space-y-4"
        onValueChange={setShippingMethod}
      >
        <div className={`flex items-start space-x-3 p-4 rounded-lg border ${
          shippingMethod === 'self' ? 'border-primary bg-accent/10' : 'border-gray-200'
        } cursor-pointer hover:border-primary/50 transition-colors`}>
          <RadioGroupItem value="self" id="self" className={wireframeStyles.radio} />
          <div className="space-y-1 flex-grow">
            <div className="flex items-center gap-2">
              <Label htmlFor="self" className="font-medium">I'll ship it myself (Free)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>We'll send you the label by email.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {shippingMethod === 'self' && (
              <p className="text-sm text-gray-600 mt-2">
                Drop off at a post office within 5 business days.
              </p>
            )}
          </div>
        </div>

        <div className={`flex items-start space-x-3 p-4 rounded-lg border ${
          shippingMethod === 'pickup' ? 'border-primary bg-accent/10' : 'border-gray-200'
        } cursor-pointer hover:border-primary/50 transition-colors`}>
          <RadioGroupItem value="pickup" id="pickup" className={wireframeStyles.radio} />
          <div className="space-y-1 flex-grow">
            <div className="flex items-center gap-2">
              <Label htmlFor="pickup" className="font-medium">I'd like a courier to pick it up (₪20)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fee deducted from refund.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {shippingMethod === 'pickup' && (
              <p className="text-sm text-gray-600 mt-2">
                Pickup scheduled within 2 business days.
              </p>
            )}
          </div>
        </div>
      </RadioGroup>

      {shippingMethod === 'pickup' && (
        <div className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label className={wireframeStyles.label}>Shipping Address</Label>
            <Input 
              placeholder="Street Address" 
              required 
              className={wireframeStyles.input} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input 
                placeholder="City" 
                required 
                className={wireframeStyles.input} 
              />
            </div>
            <div className="space-y-2">
              <Input 
                placeholder="ZIP Code" 
                required 
                className={wireframeStyles.input} 
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ShippingDetailsStep;