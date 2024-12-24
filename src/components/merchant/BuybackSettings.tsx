import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const BuybackSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Program Status</h3>
            <p className="text-sm text-muted-foreground">Enable or disable the buyback program</p>
          </div>
          <Switch />
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Pricing Rules</h3>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Minimum Item Value ($)</Label>
              <Input type="number" placeholder="50" />
            </div>
            
            <div className="grid gap-2">
              <Label>Maximum Item Value ($)</Label>
              <Input type="number" placeholder="1000" />
            </div>
            
            <div className="grid gap-2">
              <Label>Default Value Percentage (%)</Label>
              <Input type="number" placeholder="40" />
              <p className="text-sm text-muted-foreground">
                Percentage of original price offered for items in good condition
              </p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Compensation Options</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="store-credit" />
              <Label htmlFor="store-credit">Store Credit</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="cash-payment" />
              <Label htmlFor="cash-payment">Cash Payment</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default BuybackSettings;