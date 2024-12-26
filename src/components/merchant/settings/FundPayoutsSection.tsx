import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface FundPayoutsSectionProps {
  allowFundPayouts: boolean;
  setAllowFundPayouts: (value: boolean) => void;
}

const FundPayoutsSection: React.FC<FundPayoutsSectionProps> = ({
  allowFundPayouts,
  setAllowFundPayouts
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Allow Fund Payouts</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Funds can be issued as an alternative to store credit during request approval</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-gray-600">Enable cash payments as an alternative to store credit</p>
      </div>
      <Switch 
        checked={allowFundPayouts}
        onCheckedChange={setAllowFundPayouts}
      />
    </div>
  );
};

export default FundPayoutsSection;