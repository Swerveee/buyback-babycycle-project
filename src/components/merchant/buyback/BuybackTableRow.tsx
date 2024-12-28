import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BuybackRequest } from '@/types/buyback';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ValueEditor from './ValueEditor';
import ImagePreview from './ImagePreview';
import RejectNoteModal from './RejectNoteModal';
import PriceChangeConfirmModal from './PriceChangeConfirmModal';

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
  const [rejectNote, setRejectNote] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(request.value);
  const [isPriceChangeModalOpen, setIsPriceChangeModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePriceChange = (newValue: string) => {
    setEstimatedValue(newValue);
    setIsPriceChangeModalOpen(true);
  };

  const confirmPriceChange = () => {
    // Handle price change confirmation
    setIsPriceChangeModalOpen(false);
  };

  const handleReject = () => {
    onReject(request.id);
    setIsRejectModalOpen(false);
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
        <div className="flex items-center p-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-5 gap-4 flex-1">
                <div>{request.date}</div>
                <div>{request.customer}</div>
                <div>{request.product}</div>
                <div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                <div>{request.value}</div>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className={`mt-4 p-6 rounded-lg ${wireframeStyles.content}`}>
              <div className="space-y-6">
                {/* Product Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Condition</p>
                      <p>{request.condition}</p>
                    </div>
                    <div>
                      <p className="font-medium">Description</p>
                      <p>{request.description}</p>
                    </div>
                  </div>
                </div>

                {/* Value Editor */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Estimated Value</h3>
                  <ValueEditor
                    initialValue={estimatedValue}
                    onValueChange={handlePriceChange}
                    isWireframe={isWireframe}
                  />
                </div>

                {/* Images */}
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

                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium">Email</p>
                      <p>{request.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>{request.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Shipping Address</p>
                      <p>{request.shippingAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setIsRejectModalOpen(true)}
                    className={wireframeStyles.button}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => onApprove(request.id)}
                    className={`${isWireframe ? wireframeStyles.button : "bg-[#9b87f5] hover:bg-[#7E69AB] text-white"}`}
                  >
                    Approve
                  </Button>
                </div>
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
    </>
  );
};

export default BuybackTableRow;