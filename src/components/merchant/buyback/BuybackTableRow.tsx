import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BuybackRequest } from '@/types/buyback';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import RejectNoteModal from './RejectNoteModal';
import PriceChangeConfirmModal from './PriceChangeConfirmModal';
import RequestInfoModal from './RequestInfoModal';
import { useToast } from "@/hooks/use-toast";
import CollapsibleDetails from './components/CollapsibleDetails';

interface BuybackTableRowProps {
  request: BuybackRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  getStatusColor: (status: string) => string;
  isWireframe: boolean;
}

const BuybackTableRow: React.FC<BuybackTableRowProps> = ({
  request,
  onApprove,
  onReject,
  getStatusColor,
  isWireframe
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRequestInfoModalOpen, setIsRequestInfoModalOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(request.value);
  const [isPriceChangeModalOpen, setIsPriceChangeModalOpen] = useState(false);
  const { toast } = useToast();

  const handleRequestInfo = (data: any) => {
    toast({
      title: "Information Requested",
      description: `Requested additional information from ${request.customer}`,
    });
    setIsRequestInfoModalOpen(false);
  };

  const wireframeStyles = isWireframe ? {
    row: "border-2 border-dashed border-black",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
    content: "border-2 border-dashed border-black bg-white",
  } : {
    row: "border-t border-gray-200",
    button: "",
    content: "bg-gray-50",
  };

  return (
    <>
      <div className={`${wireframeStyles.row}`}>
        <div className="p-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-5 gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0">
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <span className="text-center flex-1">{request.date}</span>
                </div>
                <div className="text-center">{request.customer}</div>
                <div className="text-center">{request.product}</div>
                <div className="text-center">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                <div className="text-center">{request.value}</div>
              </div>
            </div>

            <CollapsibleContent className={`mt-4 p-6 rounded-lg ${wireframeStyles.content}`}>
              <CollapsibleDetails
                request={request}
                estimatedValue={estimatedValue}
                setEstimatedValue={setEstimatedValue}
                onReject={() => setIsRejectModalOpen(true)}
                onApprove={() => onApprove(request.id)}
                onRequestInfo={() => setIsRequestInfoModalOpen(true)}
                getStatusColor={getStatusColor}
                isWireframe={isWireframe}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <RejectNoteModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={() => {
          onReject(request.id);
          setIsRejectModalOpen(false);
        }}
        note={rejectNote}
        onNoteChange={setRejectNote}
        isWireframe={isWireframe}
      />

      <PriceChangeConfirmModal
        isOpen={isPriceChangeModalOpen}
        onClose={() => setIsPriceChangeModalOpen(false)}
        onConfirm={() => setIsPriceChangeModalOpen(false)}
        newValue={estimatedValue}
        isWireframe={isWireframe}
      />

      <RequestInfoModal
        isOpen={isRequestInfoModalOpen}
        onClose={() => setIsRequestInfoModalOpen(false)}
        onConfirm={handleRequestInfo}
        isWireframe={isWireframe}
      />
    </>
  );
};

export default BuybackTableRow;