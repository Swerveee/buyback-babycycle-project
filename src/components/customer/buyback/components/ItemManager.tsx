import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetailsStep from '../ProductDetailsStep';
import ConditionAssessmentStep from '../ConditionAssessmentStep';
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';

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
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="condition">Condition Assessment</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ProductDetailsStep
                onSubmit={(data) => {
                  updateItemDetails(item.id, data, 'productDetails');
                  onSubmit(new Event('submit') as any);
                }}
                isWireframe={isWireframe}
                initialData={item.productDetails}
              />
            </TabsContent>
            <TabsContent value="condition">
              <ConditionAssessmentStep
                onSubmit={(data) => {
                  updateItemDetails(item.id, data, 'conditionDetails');
                  onSubmit(new Event('submit') as any);
                }}
                isWireframe={isWireframe}
                initialData={item.conditionDetails}
              />
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  );
};

export default ItemManager;