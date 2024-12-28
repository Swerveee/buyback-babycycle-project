import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
              Price Estimation
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Excellent Condition (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={rates.excellent}
                      onChange={handleRateChange('excellent')}
                      className={wireframeStyles.input}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Good Condition (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={rates.good}
                      onChange={handleRateChange('good')}
                      className={wireframeStyles.input}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Fair Condition (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={rates.fair}
                    onChange={handleRateChange('fair')}
                    className={wireframeStyles.input}
                  />
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