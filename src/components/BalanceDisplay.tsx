import { Wallet } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BalanceDisplayProps {
  isWireframe?: boolean;
}

const BalanceDisplay = ({ isWireframe }: BalanceDisplayProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isWireframe 
            ? 'bg-gray-100 border-2 border-dashed border-gray-300' 
            : 'bg-[#F1F0FB]'
        }`}>
          <Wallet className={`h-4 w-4 ${
            isWireframe 
              ? 'text-gray-700' 
              : 'text-[#9b87f5]'
          }`} />
          <span className={`text-sm font-medium ${
            isWireframe 
              ? 'text-gray-700' 
              : 'text-[#7E69AB]'
          }`}>$50.00</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Available store credit</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default BalanceDisplay;