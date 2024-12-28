import React from 'react';
import ProductDetailsStep from '../ProductDetailsStep';
import ConditionAssessmentStep from '../ConditionAssessmentStep';
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface ItemManagerProps {
  items: Array<{
    id: string;
    productDetails: any;
    conditionDetails: any;
  }>;
  activeItemId: string;
  setActiveItemId: (id: string) => void;
  updateItemDetails: (itemId: string, details: any, type: 'productDetails' | 'conditionDetails') => void;
  onSubmit: (e: React.FormEvent) => void;
  isWireframe: boolean;
}

const ItemManager: React.FC<ItemManagerProps> = ({
  items,
  activeItemId,
  setActiveItemId,
  updateItemDetails,
  onSubmit,
  isWireframe
}) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {items.map((item, index) => (
          <Button
            key={item.id}
            variant={activeItemId === item.id ? "default" : "outline"}
            onClick={() => setActiveItemId(item.id)}
            className={`flex-shrink-0 ${
              activeItemId === item.id 
                ? 'bg-[#9b87f5] hover:bg-[#7E69AB]' 
                : 'border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10'
            }`}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Item {index + 1}
          </Button>
        ))}
      </div>

      {items.map((item) => (
        <div key={item.id} className={activeItemId === item.id ? 'block' : 'hidden'}>
          <Card className="p-6 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ProductDetailsStep
                onSubmit={(data) => {
                  updateItemDetails(item.id, data, 'productDetails');
                }}
                isWireframe={isWireframe}
                initialData={item.productDetails}
              />
            </div>
            
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Condition Assessment</h3>
              <ConditionAssessmentStep
                onSubmit={(data) => {
                  updateItemDetails(item.id, data, 'conditionDetails');
                }}
                isWireframe={isWireframe}
                initialData={item.conditionDetails}
              />
            </div>

            <Button
              onClick={(e) => onSubmit(e)}
              className={`w-full ${isWireframe ? 'border-2 border-dashed border-black bg-white hover:bg-black/5 text-black' : 'bg-[#9b87f5] hover:bg-[#7E69AB] text-white'}`}
            >
              Save Item Details
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ItemManager;