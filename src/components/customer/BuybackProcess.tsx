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
      // Final submission
      toast({
        title: "Request Submitted",
        description: "Your buyback request has been submitted successfully.",
      });
      navigate('/success');
    }
  };

  const steps = [
    {
      title: "Product Details",
      icon: Package,
      description: "Enter your product information",
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
      description: "Get your shipping label",
      component: ShippingDetailsStep
    },
    {
      title: "Compensation",
      icon: DollarSign,
      description: "Choose how you want to be paid",
      component: CompensationStep
    }
  ];

  const CurrentStepComponent = steps[step - 1].component;

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-gray-300 shadow-none",
    header: "bg-gray-100 border-b-2 border-dashed border-gray-300",
    title: "font-mono",
    description: "font-mono text-gray-500",
    stepIcon: "border-2 border-dashed",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700",
    activeStep: "border-2 border-dashed border-gray-500 bg-gray-200",
  } : {
    card: "border-[#eee] shadow-sm",
    header: "bg-[#F1F1F1]",
    title: "text-[#1A1F2C]",
    description: "text-[#555555]",
    stepIcon: "",
    button: "bg-[#9b87f5] hover:bg-[#7E69AB] text-white",
    activeStep: "bg-[#9b87f5] text-white",
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl animate-fade-in">
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
    </div>
  );
};

export default BuybackProcess;
