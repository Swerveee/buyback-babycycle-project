import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from 'lucide-react';
import { steps } from './buyback/config/steps';
import StepProgress from './buyback/components/StepProgress';
import { ItemDetails, ItemManagerProps, ShippingDetailsStepProps, CompensationStepProps } from '@/types/buyback-types';

interface BuybackProcessProps {
  isWireframe: boolean;
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

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-black",
    header: "bg-white border-b-2 border-dashed border-black",
    title: "font-mono text-black",
    description: "font-mono text-black/60",
    stepIcon: "border-2 border-dashed border-black",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
    activeStep: "border-2 border-dashed border-black bg-black text-white",
  } : {
    card: "border-[#eee] shadow-sm",
    header: "bg-[#F8F2FF]",
    title: "text-[#1A1F2C]",
    description: "text-[#555555]",
    stepIcon: "",
    button: "bg-[#9b87f5] hover:bg-[#7E69AB] text-white",
    activeStep: "bg-[#9b87f5] text-white",
  };

  const renderStepComponent = () => {
    const CurrentStepComponent = steps[step - 1].component;
    
    const commonProps = {
      onSubmit: handleSubmit,
      isWireframe: isWireframe,
      items: items
    };
    
    switch (step) {
      case 1:
        return (
          <CurrentStepComponent
            {...commonProps}
            activeItemId={activeItemId}
            setActiveItemId={setActiveItemId}
            updateItemDetails={updateItemDetails}
          /> as React.ReactElement<ItemManagerProps>
        );
      case 2:
        return <CurrentStepComponent {...commonProps} /> as React.ReactElement<ShippingDetailsStepProps>;
      case 3:
        return <CurrentStepComponent {...commonProps} /> as React.ReactElement<CompensationStepProps>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">BabyCycle Buyback Program</h1>
      </div>
      
      <div className="mb-8">
        <StepProgress currentStep={step} wireframeStyles={wireframeStyles} />
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
