import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BuybackRequest } from '@/types/buyback';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { HelpCircle, ZoomIn } from "lucide-react";
import ImagePreview from './buyback/ImagePreview';
import ValueEditor from './buyback/ValueEditor';
import RejectNoteModal from './buyback/RejectNoteModal';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface BuybackRequestDetailsProps {
  request: BuybackRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  getStatusColor: (status: string) => string;
}

const BuybackRequestDetails = ({ 
  request, 
  onApprove, 
  onReject,
  getStatusColor 
}: BuybackRequestDetailsProps) => {
  const [note, setNote] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(request.value);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => Math.min(request.images.length - 1, prev + 1));
  };

  const handleReject = () => {
    if (note.trim()) {
      onReject(request.id);
      setIsRejectModalOpen(false);
      setNote('');
    } else {
      setIsRejectModalOpen(true);
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-[#333333]">
          Buyback Request Details
        </DialogTitle>
        <DialogDescription className="text-[#8E9196]">
          Request ID: {request.id}
        </DialogDescription>
      </DialogHeader>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-3">Product Information</h3>
            <div className="grid grid-cols-2 gap-4 text-[#555555]">
              <div>
                <p className="font-medium">Product Name</p>
                <p>{request.product}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Condition</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The current condition of the product as assessed by the customer</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p>{request.condition}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Status</p>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <p className="font-medium">Estimated Value</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The estimated value offered to the customer in store credit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ValueEditor initialValue={estimatedValue} onValueChange={setEstimatedValue} />
            </div>
          </div>
          
          <Separator className="bg-[#F1F1F1]" />
          
          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-3">Customer Note</h3>
            <p className="text-[#555555]">{request.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {request.images.map((image, index) => (
                <Dialog key={index} open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      {image ? (
                        <img
                          src={image}
                          alt={`Product condition ${index + 1}`}
                          className="rounded-md border border-[#eee] object-cover w-full h-64 group-hover:opacity-90 transition-opacity"
                        />
                      ) : (
                        <div className="rounded-md border border-[#eee] bg-gray-100 w-full h-64 flex items-center justify-center">
                          <img
                            src="/placeholder.svg"
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
                  <DialogContent className="max-w-4xl">
                    <ImagePreview
                      images={request.images}
                      currentIndex={index}
                      onPrevious={handlePreviousImage}
                      onNext={handleNextImage}
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
          
          <Separator className="bg-[#F1F1F1]" />
          
          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4 text-[#555555]">
              <div>
                <p className="font-medium">Name</p>
                <p>{request.customer}</p>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p>{request.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p>{request.phone}</p>
              </div>
            </div>
          </div>
          
          <Separator className="bg-[#F1F1F1]" />
          
          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-3">Shipping Information</h3>
            <p className="text-[#555555]">{request.shippingAddress}</p>
          </div>

          <Separator className="bg-[#F1F1F1]" />

          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold text-[#333333]">
              <ChevronDown className="h-4 w-4" />
              Request History
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="space-y-2 text-sm text-[#555555]">
                <p>Created: {request.date}</p>
                <p>Last Updated: {request.date}</p>
                <p>Status: {request.status}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
      
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#F1F1F1]">
        <Button
          variant="outline"
          className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
          onClick={() => setIsRejectModalOpen(true)}
        >
          Reject
        </Button>
        <Button
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          onClick={() => onApprove(request.id)}
        >
          Approve
        </Button>
      </div>

      <RejectNoteModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        note={note}
        onNoteChange={setNote}
      />
    </DialogContent>
  );
};

export default BuybackRequestDetails;
