import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Package, DollarSign, Truck } from 'lucide-react';
import ProductDetailsStep from './buyback/ProductDetailsStep';
import ConditionAssessmentStep from './buyback/ConditionAssessmentStep';
import ShippingDetailsStep from './buyback/ShippingDetailsStep';
import CompensationStep from './buyback/CompensationStep';

interface BuybackProcessProps {
  isWireframe: boolean;
}

const BuybackProcess: React.FC<BuybackProcessProps> = ({ isWireframe }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
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

  const steps = [
    {
      title: "Product Details",
      icon: Package,
      description: "Tell us about your kids' item",
      component: ProductDetailsStep
    },
    {
      title: "Condition Assessment",
      icon: CheckCircle2,
      description: "Describe the condition of your item",
      component: ConditionAssessmentStep
    },
    {
      title: "Shipping Details",
      icon: Truck,
      description: "Get your prepaid shipping label",
      component: ShippingDetailsStep
    },
    {
      title: "Store Credit",
      icon: DollarSign,
      description: "Choose how you want to be rewarded",
      component: CompensationStep
    }
  ];

  const CurrentStepComponent = steps[step - 1].component;

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

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">BabyCycle Buyback Program</h1>
        <p className="text-lg text-gray-600 mb-4">Give your gently used baby clothes a second life!</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-sm">
            Get up to <span className="font-bold">30% more value</span> when you choose store credit
          </p>
        </div>
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
          <CurrentStepComponent onSubmit={handleSubmit} isWireframe={isWireframe} />
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
              {step === 4 ? 'Submit Request' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {step === 1 && (
        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          <div className={`p-4 rounded-lg ${isWireframe ? 'border-2 border-dashed border-black' : 'bg-gray-50'}`}>
            <Package className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-600">We cover shipping costs</p>
          </div>
          <div className={`p-4 rounded-lg ${isWireframe ? 'border-2 border-dashed border-black' : 'bg-gray-50'}`}>
            <DollarSign className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Store Credit</h3>
            <p className="text-sm text-gray-600">Get instant store credit</p>
          </div>
          <div className={`p-4 rounded-lg ${isWireframe ? 'border-2 border-dashed border-black' : 'bg-gray-50'}`}>
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Eco-Friendly</h3>
            <p className="text-sm text-gray-600">Support sustainability</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuybackProcess;