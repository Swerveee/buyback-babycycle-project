import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface BuybackSettingsProps {
  isWireframe: boolean;
}

const BuybackSettings: React.FC<BuybackSettingsProps> = ({ isWireframe }) => {
  const wireframeStyles = isWireframe ? {
    label: "font-mono text-gray-600",
    input: "border-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700",
  } : {
    label: "text-gray-700",
    input: "border-gray-200",
    button: "bg-[#2261e9] text-white hover:bg-[#1a4fc0]",
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className={wireframeStyles.label}>Program Name</Label>
          <Input 
            placeholder="Enter program name"
            className={wireframeStyles.input}
          />
        </div>
        
        <div>
          <Label className={wireframeStyles.label}>Program Description</Label>
          <Textarea 
            placeholder="Describe your buyback program"
            className={wireframeStyles.input}
          />
        </div>

        <div className="space-y-4">
          <Label className={wireframeStyles.label}>Eligibility Requirements</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${wireframeStyles.label}`}>Minimum item value</span>
              <Input 
                type="number" 
                placeholder="$0.00"
                className={`w-32 ${wireframeStyles.input}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${wireframeStyles.label}`}>Maximum item age (months)</span>
              <Input 
                type="number"
                placeholder="0"
                className={`w-32 ${wireframeStyles.input}`}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className={wireframeStyles.label}>Program Settings</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${wireframeStyles.label}`}>Auto-approve requests</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${wireframeStyles.label}`}>Email notifications</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${wireframeStyles.label}`}>Allow partial returns</span>
              <Switch />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" className={wireframeStyles.button}>
          Cancel
        </Button>
        <Button className={wireframeStyles.button}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BuybackSettings;