import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, PackageOpen } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShippingDetailsStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const ShippingDetailsStep: React.FC<ShippingDetailsStepProps> = ({ onSubmit, isWireframe }) => {
  const [shippingMethod, setShippingMethod] = useState('self');
  const [isPackagingOpen, setIsPackagingOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-gray-300 bg-gray-50",
    label: "font-mono",
    radio: "border-2 border-dashed border-gray-300",
    select: "border-2 border-dashed border-gray-300"
  } : {
    input: "",
    label: "",
    radio: "",
    select: ""
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Shipping Details</h2>
        <p className="text-gray-600">Choose how you'd like to return your item to us.</p>
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
                    <p>Drop your package off at the nearest post office.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {shippingMethod === 'self' && (
              <div className="space-y-4 mt-4">
                <p className="text-sm text-gray-600">
                  We'll email you the necessary shipping details.
                </p>
                <div className="space-y-2">
                  <Label className={wireframeStyles.label}>Email Address</Label>
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={wireframeStyles.input}
                  />
                  <p className="text-xs text-gray-500">
                    Provide your email to receive instructions or a prepaid label (if required).
                  </p>
                </div>
              </div>
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
              <div className="space-y-4 mt-4">
                <p className="text-sm text-gray-600">
                  A courier will pick up your package within 2 business days.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className={wireframeStyles.label}>Street Address</Label>
                    <Input 
                      placeholder="Enter your street address"
                      required 
                      className={wireframeStyles.input}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className={wireframeStyles.label}>City</Label>
                      <Input 
                        placeholder="Enter your city"
                        required 
                        className={wireframeStyles.input}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className={wireframeStyles.label}>ZIP Code</Label>
                      <Input 
                        placeholder="Enter ZIP code"
                        required 
                        className={wireframeStyles.input}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className={wireframeStyles.label}>Preferred Pickup Time</Label>
                    <Select>
                      <SelectTrigger className={wireframeStyles.select}>
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9:00 - 12:00)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12:00 - 17:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </RadioGroup>

      <Collapsible open={isPackagingOpen} onOpenChange={setIsPackagingOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <PackageOpen className="h-4 w-4" />
          <span className="text-sm font-medium">How to package your item?</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-600 pl-6">
          <p>• Use a sturdy box that's appropriate for your item's size</p>
          <p>• Wrap items carefully with bubble wrap or paper</p>
          <p>• Seal all box openings securely with packing tape</p>
          <p>• Remove or cover any old shipping labels</p>
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
};

export default ShippingDetailsStep;