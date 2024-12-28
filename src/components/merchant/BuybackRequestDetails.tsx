import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BuybackRequest } from '@/types/buyback';
import ImagePreview from './buyback/ImagePreview';
import RejectNoteModal from './buyback/RejectNoteModal';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ZoomIn } from "lucide-react";
import BuybackActions from './buyback/BuybackActions';
import RequestInfoModal, { RequestInfoData } from './buyback/RequestInfoModal';
import { useToast } from "@/hooks/use-toast";
import ProductDetails from './buyback/components/ProductDetails';

interface BuybackRequestDetailsProps {
  request: BuybackRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  getStatusColor: (status: string) => string;
  isWireframe: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const BuybackRequestDetails = ({ 
  request, 
  onApprove, 
  onReject,
  getStatusColor,
  isWireframe,
  isOpen,
  onOpenChange
}: BuybackRequestDetailsProps) => {
  const [note, setNote] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(request.value);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRequestInfoModalOpen, setIsRequestInfoModalOpen] = useState(false);
  const { toast } = useToast();

  const handleRequestInfo = (data: RequestInfoData) => {
    toast({
      title: "Information Requested",
      description: `Requested additional information from ${request.customer}`,
    });
    console.log("Requesting info:", data, "for request:", request.id);
  };

  const wireframeStyles = isWireframe ? {
    dialog: "border-2 border-dashed border-black",
    content: "bg-white",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
    input: "border-2 border-dashed border-black",
    imagePreview: "border-2 border-dashed border-black",
    separator: "border-2 border-dashed border-black",
  } : {
    dialog: "",
    content: "",
    button: "",
    input: "",
    imagePreview: "",
    separator: "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-2xl max-h-[80vh] overflow-hidden flex flex-col ${wireframeStyles.dialog} ${wireframeStyles.content}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-semibold ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
            Buyback Request Details
          </DialogTitle>
          <DialogDescription className={isWireframe ? "font-mono" : "text-[#8E9196]"}>
            Request ID: {request.id}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <ProductDetails
              product={request.product}
              condition={request.condition}
              status={request.status}
              estimatedValue={estimatedValue}
              purchaseDate="10/10/23"
              getStatusColor={getStatusColor}
              onValueChange={setEstimatedValue}
              isWireframe={isWireframe}
            />
            
            <Separator className={`${wireframeStyles.separator} bg-[#F1F1F1]`} />
            
            {/* Customer Note and Images Section */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
                Customer Note
              </h3>
              <p className={`${isWireframe ? "font-mono" : "text-[#555555]"}`}>{request.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {request.images.map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className={`relative group cursor-pointer ${wireframeStyles.imagePreview}`}>
                        {image ? (
                          <img
                            src={image}
                            alt={`Product condition ${index + 1}`}
                            className="rounded-md border border-[#eee] object-cover w-full h-64 group-hover:opacity-90 transition-opacity"
                          />
                        ) : (
                          <div className="rounded-md border border-[#eee] bg-gray-100 w-full h-64 flex items-center justify-center">
                            <img
                              src="/lovable-uploads/77a57d2d-2ef7-4400-86f3-14fc659c7e67.png"
                              alt="Placeholder"
                              className="w-16 h-16 opacity-50"
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                          <ZoomIn className="w-6 h-6 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className={`max-w-4xl ${wireframeStyles.dialog}`}>
                      <ImagePreview
                        images={request.images}
                        currentIndex={index}
                        onPrevious={() => setCurrentImageIndex((prev) => Math.max(0, prev - 1))}
                        onNext={() => setCurrentImageIndex((prev) => Math.min(request.images.length - 1, prev + 1))}
                        isWireframe={isWireframe}
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
            
            <Separator className={`${wireframeStyles.separator} bg-[#F1F1F1]`} />
            
            {/* Customer Information Section */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-[#555555]">
                <div>
                  <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Name</p>
                  <p className={isWireframe ? "font-mono" : ""}>{request.customer}</p>
                </div>
                <div>
                  <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Email</p>
                  <p className={isWireframe ? "font-mono" : ""}>{request.email}</p>
                </div>
                <div>
                  <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Phone</p>
                  <p className={isWireframe ? "font-mono" : ""}>{request.phone}</p>
                </div>
              </div>
            </div>
            
            <Separator className={`${wireframeStyles.separator} bg-[#F1F1F1]`} />
            
            {/* Shipping Information Section */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
                Shipping Information
              </h3>
              <p className={`${isWireframe ? "font-mono" : "text-[#555555]"}`}>{request.shippingAddress}</p>
            </div>

            <Separator className={`${wireframeStyles.separator} bg-[#F1F1F1]`} />

            {/* Request History Section */}
            <Collapsible>
              <CollapsibleTrigger className={`flex items-center gap-2 text-lg font-semibold ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
                <ChevronDown className="h-4 w-4" />
                Request History
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className={`space-y-2 text-sm ${isWireframe ? "font-mono" : "text-[#555555]"}`}>
                  <p>Created: {request.date}</p>
                  <p>Last Updated: {request.date}</p>
                  <p>Status: {request.status}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
        
        {/* Footer Actions */}
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#F1F1F1]">
          <BuybackActions
            onAccept={() => onApprove(request.id)}
            onReject={(note) => onReject(request.id)}
            onPriceChange={(newPrice) => {
              setEstimatedValue(`₪${newPrice.toFixed(2)}`);
              toast({
                title: "Price Updated",
                description: "The buyback price has been updated successfully.",
              });
            }}
            onRequestInfo={handleRequestInfo}
            isWireframe={isWireframe}
          />
        </div>
      </DialogContent>

      <RejectNoteModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={() => {
          onReject(request.id);
          setIsRejectModalOpen(false);
        }}
        note={note}
        onNoteChange={setNote}
        isWireframe={isWireframe}
      />

      <RequestInfoModal
        isOpen={isRequestInfoModalOpen}
        onClose={() => setIsRequestInfoModalOpen(false)}
        onConfirm={handleRequestInfo}
        isWireframe={isWireframe}
      />
    </Dialog>
  );
};

export default BuybackRequestDetails;
