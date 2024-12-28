import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductDetailsStep from '../ProductDetailsStep';
import ConditionAssessmentStep from '../ConditionAssessmentStep';
import { Pencil } from 'lucide-react';

interface ItemDetails {
  id: string;
  productDetails: any;
  conditionDetails: any;
}

interface ItemManagerProps {
  items: ItemDetails[];
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
      <div className="flex gap-2 overflow-x-auto pb-2 pt-6">
        {items.map((item, index) => (
          <Button
            key={item.id}
            variant={activeItemId === item.id ? "default" : "outline"}
            onClick={() => setActiveItemId(item.id)}
            className={`flex-shrink-0 ${
              isWireframe
                ? activeItemId === item.id
                  ? 'border-2 border-dashed border-black bg-white text-black hover:bg-black/5'
                  : 'border-2 border-dashed border-black bg-white text-black hover:bg-black/5'
                : activeItemId === item.id 
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
          <Card className="p-6 space-y-8 mt-6">
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
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ItemManager;