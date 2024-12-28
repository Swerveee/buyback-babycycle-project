import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PriceEstimationSectionProps {
  showPriceEstimation: boolean;
  setShowPriceEstimation: (value: boolean) => void;
  rates: {
    excellent: string;
    good: string;
    fair: string;
  };
  handleRateChange: (condition: 'excellent' | 'good' | 'fair') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  wireframeStyles: {
    label: string;
    input: string;
    button: string;
  };
}

const PriceEstimationSection: React.FC<PriceEstimationSectionProps> = ({
  showPriceEstimation,
  setShowPriceEstimation,
  rates,
  handleRateChange,
  wireframeStyles
}) => {
  return (
    <Card className="bg-[#F8F9FA]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold leading-none tracking-tight">
              Show Price Estimations
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Show estimated buyback value to customers during the submission process
            </CardDescription>
          </div>
          <Switch
            checked={showPriceEstimation}
            onCheckedChange={setShowPriceEstimation}
          />
        </div>
      </CardHeader>
      {showPriceEstimation && (
        <CardContent>
          <div className="space-y-4">
            <Alert variant="default" className="bg-blue-50/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Customers will still need manual approval for their buyback requests if Auto-approve Requests is turned off.
              </AlertDescription>
            </Alert>
            <div>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Percentage of Original Price by Condition
              </Label>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Set the percentage of the original price that will be offered based on item condition
              </p>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {[
                    { condition: 'excellent', label: 'Excellent Condition', description: 'Items in almost new condition' },
                    { condition: 'good', label: 'Good Condition', description: 'Items with slight signs of use' },
                    { condition: 'fair', label: 'Fair Condition', description: 'Items with noticeable wear' }
                  ].map(({ condition, label, description }) => (
                    <div key={condition} className="flex items-center justify-center gap-4">
                      <div className="flex-1">
                        <Label className="text-sm">{label}</Label>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={rates[condition as keyof typeof rates]}
                          onChange={handleRateChange(condition as keyof typeof rates)}
                          className={`${wireframeStyles.input} w-20 text-right`}
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PriceEstimationSection;