import React, { useState } from 'react';
import { ChevronDown, ChevronUp, InfoIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BuybackRequest } from '@/types/buyback';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ValueEditor from './ValueEditor';
import ImagePreview from './ImagePreview';
import RejectNoteModal from './RejectNoteModal';
import PriceChangeConfirmModal from './PriceChangeConfirmModal';
import RequestInfoModal, { RequestInfoData } from './RequestInfoModal';
import { useToast } from "@/hooks/use-toast";
import ProductInformation from './components/ProductInformation';
import CustomerInformation from './components/CustomerInformation';
import BuybackActions from './components/BuybackActions';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  const handlePriceChange = (newValue: string) => {
    setEstimatedValue(newValue);
    setIsPriceChangeModalOpen(true);
  };

  const confirmPriceChange = () => {
    setIsPriceChangeModalOpen(false);
  };

  const handleReject = () => {
    onReject(request.id);
    setIsRejectModalOpen(false);
  };

  const handleRequestInfo = (data: RequestInfoData) => {
    toast({
      title: "Information Requested",
      description: `Requested additional information from ${request.customer}`,
    });
    setIsRequestInfoModalOpen(false);
    console.log("Requesting info:", data, "for request:", request.id);
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
              <div className="space-y-6">
                <ProductInformation
                  condition={request.condition}
                  description={request.description}
                />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Estimated Value</h3>
                  <ValueEditor
                    initialValue={estimatedValue}
                    onValueChange={handlePriceChange}
                    isWireframe={isWireframe}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {request.images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <ImagePreview
                          images={request.images}
                          currentIndex={index}
                          onPrevious={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                          onNext={() => setCurrentImageIndex(Math.min(request.images.length - 1, currentImageIndex + 1))}
                          isWireframe={isWireframe}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <CustomerInformation
                  email={request.email}
                  phone={request.phone}
                  shippingAddress={request.shippingAddress}
                />

                <BuybackActions
                  onReject={() => setIsRejectModalOpen(true)}
                  onApprove={() => onApprove(request.id)}
                  onRequestInfo={() => setIsRequestInfoModalOpen(true)}
                  isWireframe={isWireframe}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <RejectNoteModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        note={rejectNote}
        onNoteChange={setRejectNote}
        isWireframe={isWireframe}
      />

      <PriceChangeConfirmModal
        isOpen={isPriceChangeModalOpen}
        onClose={() => setIsPriceChangeModalOpen(false)}
        onConfirm={confirmPriceChange}
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