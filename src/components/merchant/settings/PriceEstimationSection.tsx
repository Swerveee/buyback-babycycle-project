import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Estimation</CardTitle>
          <Switch
            checked={showPriceEstimation}
            onCheckedChange={setShowPriceEstimation}
          />
        </div>
        <CardDescription className="flex items-center gap-2">
          Show estimated buyback value to customers during the submission process
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>When enabled, customers will see an estimated value for their items based on the condition they select</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      {showPriceEstimation && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className={wireframeStyles.label}>
                Percentage of Original Price by Condition
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Set the percentage of the original price that will be offered based on item condition
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={wireframeStyles.label}>Excellent Condition (%)</Label>
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
                    <Label className={wireframeStyles.label}>Good Condition (%)</Label>
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
                  <Label className={wireframeStyles.label}>Fair Condition (%)</Label>
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