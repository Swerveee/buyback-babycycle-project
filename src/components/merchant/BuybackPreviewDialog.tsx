import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Package, CheckCircle2, DollarSign, Truck } from 'lucide-react';

interface BuybackPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rates: {
    excellent: string;
    good: string;
    fair: string;
  };
  autoApprove: boolean;
  minItemPrice?: string;
}

const BuybackPreviewDialog: React.FC<BuybackPreviewDialogProps> = ({
  open,
  onOpenChange,
  rates,
  autoApprove,
  minItemPrice,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buyback Program Preview</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Bonsie Buyback Program</h1>
            <p className="text-lg text-gray-600 mb-4">Give your gently used baby clothes a second life!</p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm">
                Get up to <span className="font-bold">{rates.excellent}% back</span> when you choose store credit
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Package, title: "Product Details", desc: "Tell us about your kids' item" },
              { icon: CheckCircle2, title: "Condition Assessment", desc: "Describe the condition of your item" },
              { icon: Truck, title: "Shipping Details", desc: "Get your prepaid shipping label" },
              { icon: DollarSign, title: "Store Credit", desc: "Choose how you want to be rewarded" }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 bg-[#F1F1F1] rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-[#8E9196]" />
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Compensation Rates */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Compensation Rates</h2>
            <div className="grid gap-4">
              {[
                { condition: "Excellent", rate: rates.excellent, desc: "Almost new condition" },
                { condition: "Good", rate: rates.good, desc: "Minor wear" },
                { condition: "Fair", rate: rates.fair, desc: "Visible wear" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.condition}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <span className="text-lg font-semibold">{item.rate}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Package className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-600">Free shipping label provided</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Quick Payment</h3>
              <p className="text-sm text-gray-600">
                {autoApprove ? "Instant approval available" : "Get paid within 48 hours"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Sustainable Choice</h3>
              <p className="text-sm text-gray-600">Help reduce textile waste</p>
            </div>
          </div>

          {minItemPrice && (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">
                Minimum item value: ${minItemPrice}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuybackPreviewDialog;