import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AutoApproveSectionProps {
  autoApprove: boolean;
  setAutoApprove: (value: boolean) => void;
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

const AutoApproveSection: React.FC<AutoApproveSectionProps> = ({
  autoApprove,
  setAutoApprove,
  rates,
  handleRateChange,
  wireframeStyles
}) => {
  const conditions = [
    { key: 'excellent', label: 'Excellent - Almost New', description: 'Items in almost new condition' },
    { key: 'good', label: 'Good - Minor Wear', description: 'Items with slight signs of use' },
    { key: 'fair', label: 'Fair - Visible Wear', description: 'Items with noticeable wear' }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold leading-none tracking-tight">
              Auto-approve Requests
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Automatically approve buyback requests based on item condition
            </CardDescription>
          </div>
          <Switch
            checked={autoApprove}
            onCheckedChange={setAutoApprove}
          />
        </div>
      </CardHeader>
      {autoApprove && (
        <CardContent>
          <div className="space-y-4">
            <Alert variant="default" className="bg-blue-50/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Requests will be automatically approved if they meet the condition criteria
              </AlertDescription>
            </Alert>
            <div>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Auto-approve by Condition
              </Label>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Set the maximum value for automatic approval based on item condition
              </p>
              <div className="space-y-4">
                {conditions.map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm">{label}</Label>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={rates[key as keyof typeof rates]}
                        onChange={handleRateChange(key as keyof typeof rates)}
                        className={`${wireframeStyles.input} w-20 text-right ${!autoApprove ? 'bg-gray-100' : ''}`}
                        placeholder="0"
                        disabled={!autoApprove}
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AutoApproveSection;