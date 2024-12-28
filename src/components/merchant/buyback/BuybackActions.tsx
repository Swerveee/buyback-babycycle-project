import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import RejectNoteModal from "./RejectNoteModal";
import PriceChangeConfirmModal from "./PriceChangeConfirmModal";
import RequestInfoModal, { RequestInfoData } from "./RequestInfoModal";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon } from 'lucide-react';

interface BuybackActionsProps {
  onAccept: () => void;
  onReject: (note: string) => void;
  onPriceChange: (newPrice: number) => void;
  onRequestInfo?: (data: RequestInfoData) => void;
  isWireframe?: boolean;
}

const BuybackActions: React.FC<BuybackActionsProps> = ({
  onAccept,
  onReject,
  onPriceChange,
  onRequestInfo,
  isWireframe = false
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isPriceChangeModalOpen, setIsPriceChangeModalOpen] = useState(false);
  const [isRequestInfoModalOpen, setIsRequestInfoModalOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const { toast } = useToast();

  const handleReject = () => {
    onReject(rejectionNote);
    setIsRejectModalOpen(false);
    setRejectionNote("");
  };

  const handlePriceChangeConfirm = (newPrice: number) => {
    onPriceChange(newPrice);
    setIsPriceChangeModalOpen(false);
  };

  const handleRequestInfo = (data: RequestInfoData) => {
    if (onRequestInfo) {
      onRequestInfo(data);
      setIsRequestInfoModalOpen(false);
      toast({
        title: "Information Requested",
        description: "The customer will be notified of your request.",
      });
    }
  };

  const wireframeStyles = isWireframe
    ? "border-2 border-dashed border-black bg-white hover:bg-gray-50"
    : "";

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setIsPriceChangeModalOpen(true)}
        variant="outline"
        className={wireframeStyles}
      >
        Change Price
      </Button>
      
      <Button
        onClick={onAccept}
        className={isWireframe ? wireframeStyles : "bg-[#10b981] hover:bg-[#059669] text-white"}
      >
        Accept
      </Button>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setIsRejectModalOpen(true)}
          className={isWireframe ? wireframeStyles : "border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"}
        >
          Reject
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsRequestInfoModalOpen(true)}
          className={isWireframe ? wireframeStyles : "border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"}
        >
          <InfoIcon className="w-4 h-4 mr-2" />
          Request Info
        </Button>
      </div>

      <RejectNoteModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        note={rejectionNote}
        onNoteChange={setRejectionNote}
        isWireframe={isWireframe}
      />

      <PriceChangeConfirmModal
        isOpen={isPriceChangeModalOpen}
        onClose={() => setIsPriceChangeModalOpen(false)}
        onConfirm={handlePriceChangeConfirm}
        isWireframe={isWireframe}
      />

      <RequestInfoModal
        isOpen={isRequestInfoModalOpen}
        onClose={() => setIsRequestInfoModalOpen(false)}
        onConfirm={handleRequestInfo}
        isWireframe={isWireframe}
      />
    </div>
  );
};

export default BuybackActions;