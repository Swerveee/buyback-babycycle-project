import React from 'react';
import { BuybackRequest } from '@/types/buyback';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import ValueEditor from './ValueEditor';
import RejectNoteModal from './RejectNoteModal';

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
  const [estimatedValue, setEstimatedValue] = React.useState(request.value);
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [note, setNote] = React.useState('');

  const wireframeStyles = isWireframe ? {
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
    separator: "border-2 border-dashed border-black",
  } : {
    button: "",
    separator: "",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-6">
          {/* Product Information Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
              Product Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-[#555555]">
              <div>
                <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Product Name</p>
                <p className={isWireframe ? "font-mono" : ""}>{request.product}</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Condition</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className={`h-4 w-4 ${isWireframe ? "text-black" : "text-muted-foreground"}`} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className={isWireframe ? "font-mono" : ""}>
                          The current condition of the product as assessed by the customer
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className={isWireframe ? "font-mono" : ""}>{request.condition}</p>
              </div>
            </div>

            {/* Value Editor Section */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Estimated Value</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className={`h-4 w-4 ${isWireframe ? "text-black" : "text-muted-foreground"}`} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={isWireframe ? "font-mono" : ""}>
                        The estimated value offered to the customer in store credit
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ValueEditor 
                initialValue={estimatedValue} 
                onValueChange={setEstimatedValue}
                isWireframe={isWireframe}
              />
            </div>
          </div>

          <Separator className={`${wireframeStyles.separator} bg-[#F1F1F1]`} />

          {/* Customer Note Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
              Customer Note
            </h3>
            <p className={`${isWireframe ? "font-mono" : "text-[#555555]"}`}>{request.description}</p>
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
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#F1F1F1]">
        <Button
          variant="outline"
          className={`${isWireframe ? wireframeStyles.button : "border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"}`}
          onClick={() => setIsRejectModalOpen(true)}
        >
          Reject
        </Button>
        <Button
          className={`${isWireframe ? wireframeStyles.button : "bg-[#9b87f5] hover:bg-[#7E69AB] text-white"}`}
          onClick={() => onApprove(request.id)}
        >
          Approve
        </Button>
      </div>

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
    </div>
  );
};

export default BuybackTableRow;