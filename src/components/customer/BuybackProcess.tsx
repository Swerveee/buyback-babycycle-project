import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Package, DollarSign, Truck, Plus } from 'lucide-react';
import ProductDetailsStep from './buyback/ProductDetailsStep';
import ShippingDetailsStep from './buyback/ShippingDetailsStep';
import CompensationStep from './buyback/CompensationStep';
import ItemManager from './buyback/components/ItemManager';

interface BuybackProcessProps {
  isWireframe: boolean;
}

interface ItemDetails {
  id: string;
  productDetails: any;
  conditionDetails: any;
}

const BuybackProcess: React.FC<BuybackProcessProps> = ({ isWireframe }) => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState<ItemDetails[]>([{ 
    id: '1', 
    productDetails: null, 
    conditionDetails: null 
  }]);
  const [activeItemId, setActiveItemId] = useState('1');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      toast({
        title: "Progress Saved",
        description: "Your information has been saved successfully.",
      });
    } else {
      toast({
        title: "Request Submitted",
        description: "Your buyback request has been submitted successfully. We'll review it shortly!",
      });
      navigate('/success');
    }
  };

  const addNewItem = () => {
    const newId = (items.length + 1).toString();
    setItems([...items, { 
      id: newId, 
      productDetails: null, 
      conditionDetails: null 
    }]);
    setActiveItemId(newId);
    toast({
      title: "New Item Added",
      description: "You can now add details for another item.",
    });
  };

  const updateItemDetails = (itemId: string, details: any, type: 'productDetails' | 'conditionDetails') => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, [type]: details }
        : item
    ));
  };

  const steps = [
    {
      title: "Item Details",
      icon: Package,
      description: "Add your items and their condition details",
      component: ItemManager
    },
    {
      title: "Shipping Details",
      icon: Truck,
      description: "Get your prepaid shipping label",
      component: ShippingDetailsStep
    },
    {
      title: "Earn Store Credit",
      icon: DollarSign,
      description: "Trade in your baby's outgrown clothes and receive up to 70% of their value as store credit to use on your next purchase.",
      component: CompensationStep
    }
  ];

  const renderStepComponent = () => {
    const CurrentStepComponent = steps[step - 1].component;
    
    if (step === 1) {
      return (
        <CurrentStepComponent
          items={items}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
          updateItemDetails={updateItemDetails}
          onSubmit={handleSubmit}
          isWireframe={isWireframe}
        />
      );
    }
    
    return <CurrentStepComponent onSubmit={handleSubmit} isWireframe={isWireframe} />;
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">BabyCycle Buyback Program</h1>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step > index + 1 ? 'bg-[#7E69AB] text-white' :
                step === index + 1 ? wireframeStyles.activeStep :
                'bg-[#F1F1F1] text-[#8E9196]'
              } ${wireframeStyles.stepIcon}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-sm text-center ${wireframeStyles.description}`}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <Card className={wireframeStyles.card}>
        <CardHeader className={wireframeStyles.header}>
          <CardTitle className={wireframeStyles.title}>{steps[step - 1].title}</CardTitle>
          <CardDescription className={wireframeStyles.description}>
            {steps[step - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepComponent()}
          
          {step === 1 && (
            <Button
              onClick={addNewItem}
              variant="outline"
              className="w-full mt-4 border-dashed border-2 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Item
            </Button>
          )}
          
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className={`border-[#9b87f5] text-[#9b87f5] hover:bg-[#D6BCFA]/10 ${isWireframe ? wireframeStyles.button : ''}`}
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              className={`ml-auto ${wireframeStyles.button}`}
            >
              {step === 3 ? 'Submit Request' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuybackProcess;