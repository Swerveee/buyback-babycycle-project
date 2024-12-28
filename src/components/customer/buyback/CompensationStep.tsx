import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ItemDetails {
  id: string;
  productDetails: any;
  conditionDetails: any;
}

interface CompensationStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
  showEstimatedValue?: boolean;
  estimatedValue?: number;
  items?: ItemDetails[];
}

const CompensationStep: React.FC<CompensationStepProps> = ({ 
  onSubmit, 
  isWireframe,
  showEstimatedValue = true,
  estimatedValue = 120,
  items = []
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    label: "font-mono",
    valueBox: "border-2 border-dashed border-black",
    benefitCard: "border-2 border-dashed border-black bg-white",
    alert: "border-2 border-dashed border-black",
    itemPreview: "border-2 border-dashed border-black"
  } : {
    label: "",
    valueBox: "bg-[#F8F2FF] border border-[#E9DDFF]",
    benefitCard: "bg-white border border-[#E9DDFF]",
    alert: "",
    itemPreview: "bg-white border border-[#E9DDFF]"
  };

  const getPlaceholderImage = (index: number) => {
    const placeholders = [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=64&h=64&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=64&h=64&fit=crop&auto=format'
    ];
    return placeholders[index % placeholders.length];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-[#555555]">Redeem the value of your items as store credit.</p>
      </div>

      {items && items.length > 0 && (
        <div className={`p-4 rounded-lg mb-6 ${wireframeStyles.itemPreview}`}>
          <h3 className="text-lg font-semibold mb-4">Items for Trade-in</h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center gap-4">
                <img 
                  src={item.productDetails?.thumbnail || getPlaceholderImage(index)}
                  alt={item.productDetails?.name || `Item ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">
                    {item.productDetails?.name || `Item ${index + 1}`}
                  </p>
                  {item.productDetails?.category && (
                    <p className="text-sm text-gray-500">
                      {item.productDetails.category}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showEstimatedValue && (
        <div className={`p-6 rounded-lg ${wireframeStyles.valueBox}`}>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[#1A1F2C] mb-3">
              ${estimatedValue}
            </div>
            <p className="text-sm text-[#555555]">
              Estimated value - Final value will be determined after merchant review.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#9b87f5]" />
              <span className="text-[#1A1F2C]">Valid for 12 months.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#9b87f5]" />
              <span className="text-[#1A1F2C]">Available for immediate use after approval.</span>
            </div>
          </div>
        </div>
      )}

      <Alert className={`${wireframeStyles.alert}`}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your request will be reviewed by our team. We'll notify you once it's approved.
        </AlertDescription>
      </Alert>

      <div className="text-center mt-8 mb-6">
        <p className="text-lg font-semibold text-[#1A1F2C]">
          Submit your request to complete the process.
        </p>
      </div>

      <RadioGroup defaultValue="store-credit" className="hidden">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="store-credit" id="store-credit" />
          <Label htmlFor="store-credit" className={wireframeStyles.label}>
            Store Credit
          </Label>
        </div>
      </RadioGroup>
    </form>
  );
};

export default CompensationStep;