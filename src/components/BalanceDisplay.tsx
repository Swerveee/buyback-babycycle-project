import { Wallet } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BalanceDisplayProps {
  isWireframe?: boolean;
}

const BalanceDisplay = ({ isWireframe }: BalanceDisplayProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`flex items-center space-x-2 ${
          isWireframe 
            ? 'bg-gray-200 border-2 border-dashed border-gray-400' 
            : 'bg-[#F8F2FF]'
        } px-4 py-2 rounded-full`}>
          <Wallet className="h-4 w-4 text-[#9b87f5]" />
          <span className="text-sm font-medium text-[#1A1F2C]">Store Credit: $120</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Available store credit</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default BalanceDisplay;