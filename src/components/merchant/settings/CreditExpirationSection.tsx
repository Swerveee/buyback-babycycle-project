import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CreditExpirationSectionProps {
  creditExpiration: string;
  setCreditExpiration: (value: string) => void;
  wireframeStyles: {
    input: string;
  };
}

const CreditExpirationSection: React.FC<CreditExpirationSectionProps> = ({
  creditExpiration,
  setCreditExpiration,
  wireframeStyles
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Store Credit Expiration</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Sets how long store credits remain valid after issuance.</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-sm text-gray-600">Set when store credits expire to manage liability and encourage timely usage</p>
      </div>
      <div className="w-32">
        <Select 
          value={creditExpiration} 
          onValueChange={setCreditExpiration}
        >
          <SelectTrigger className={wireframeStyles.input}>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 months</SelectItem>
            <SelectItem value="6">6 months</SelectItem>
            <SelectItem value="12">12 months</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CreditExpirationSection;