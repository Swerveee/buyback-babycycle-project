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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BuybackRequest } from '@/types/buyback';

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
  const [payoutType, setPayoutType] = useState<'store-credit' | 'funds'>('store-credit');

  const handleApprove = () => {
    onApprove(request.id);
    // The email content will be automatically updated based on the payout type
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
            <h3 className="text-lg font-medium text-[#333333] mb-2">Product Information</h3>
            <div className="grid grid-cols-2 gap-4 text-[#555555]">
              <div>
                <p className="font-medium">Product Name</p>
                <p>{request.product}</p>
              </div>
              <div>
                <p className="font-medium">Condition</p>
                <p>{request.condition}</p>
              </div>
              <div>
                <p className="font-medium">Offered Value</p>
                <p>{request.value}</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <Separator className="bg-[#F1F1F1]" />
          
          <div>
            <h3 className="text-lg font-medium text-[#333333] mb-2">Product Condition</h3>
            <p className="text-[#555555]">{request.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {request.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product condition ${index + 1}`}
                  className="rounded-md border border-[#eee] object-cover w-full h-48"
                />
              ))}
            </div>
          </div>
          
          <Separator className="bg-[#F1F1F1]" />
          
          <div>
            <h3 className="text-lg font-medium text-[#333333] mb-2">Customer Information</h3>
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
            <h3 className="text-lg font-medium text-[#333333] mb-2">Shipping Information</h3>
            <p className="text-[#555555]">{request.shippingAddress}</p>
          </div>

          <Separator className="bg-[#F1F1F1]" />

          <div>
            <h3 className="text-lg font-medium text-[#333333] mb-2">Payout Options</h3>
            <RadioGroup value={payoutType} onValueChange={(value: 'store-credit' | 'funds') => setPayoutType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="store-credit" id="store-credit" />
                <Label htmlFor="store-credit">Store Credit (+10% bonus)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="funds" id="funds" />
                <Label htmlFor="funds">Funds</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </ScrollArea>
      
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#F1F1F1]">
        <Button
          variant="outline"
          className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
          onClick={() => onReject(request.id)}
        >
          Reject
        </Button>
        <Button
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          onClick={handleApprove}
        >
          Approve
        </Button>
      </div>
    </DialogContent>
  );
};

export default BuybackRequestDetails;