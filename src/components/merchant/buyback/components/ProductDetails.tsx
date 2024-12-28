import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import ValueEditor from '../ValueEditor';

interface ProductDetailsProps {
  product: string;
  condition: string;
  status: string;
  estimatedValue: string;
  purchaseDate?: string;
  getStatusColor: (status: string) => string;
  onValueChange: (value: string) => void;
  isWireframe: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  condition,
  status,
  estimatedValue,
  purchaseDate,
  getStatusColor,
  onValueChange,
  isWireframe
}) => {
  return (
    <div>
      <h3 className={`text-lg font-semibold mb-3 ${isWireframe ? "font-mono" : "text-[#333333]"}`}>
        Product Information
      </h3>
      <div className="grid grid-cols-2 gap-4 text-[#555555]">
        <div>
          <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Product Name</p>
          <p className={isWireframe ? "font-mono" : ""}>{product}</p>
        </div>
        <div className="space-y-4">
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
            <p className={isWireframe ? "font-mono" : ""}>{condition}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Status</p>
              <Badge className={`${getStatusColor(status)} ${isWireframe ? "border-2 border-dashed border-black" : ""}`}>
                {status}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-start gap-8">
        <div className="flex-1">
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
            onValueChange={onValueChange}
            isWireframe={isWireframe}
          />
        </div>
        {purchaseDate && (
          <div>
            <p className={`font-medium ${isWireframe ? "font-mono" : ""}`}>Purchase Date</p>
            <p className={isWireframe ? "font-mono" : ""}>{purchaseDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;