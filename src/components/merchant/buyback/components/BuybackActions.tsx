import React from 'react';
import { Button } from "@/components/ui/button";
import { InfoIcon } from 'lucide-react';

interface BuybackActionsProps {
  onReject: () => void;
  onApprove: () => void;
  onRequestInfo: () => void;
  isWireframe: boolean;
}

const BuybackActions: React.FC<BuybackActionsProps> = ({
  onReject,
  onApprove,
  onRequestInfo,
  isWireframe
}) => {
  const wireframeButton = isWireframe ? "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black" : "";

  return (
    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onRequestInfo}
        className={`${isWireframe ? wireframeButton : "border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"}`}
      >
        <InfoIcon className="w-4 h-4 mr-2" />
        Request More Information
      </Button>
      <Button
        variant="outline"
        onClick={onReject}
        className={wireframeButton}
      >
        Reject
      </Button>
      <Button
        onClick={onApprove}
        className={`${isWireframe ? wireframeButton : "bg-[#9b87f5] hover:bg-[#7E69AB] text-white"}`}
      >
        Approve
      </Button>
    </div>
  );
};

export default BuybackActions;