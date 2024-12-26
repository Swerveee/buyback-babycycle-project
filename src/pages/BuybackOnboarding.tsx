import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { RefreshCw, Package, DollarSign } from 'lucide-react';
import FeatureCard from '@/components/customer/buyback/onboarding/FeatureCard';
import ActivationCard from '@/components/customer/buyback/onboarding/ActivationCard';

interface BuybackOnboardingProps {
  isWireframe: boolean;
  onWireframeChange: (value: boolean) => void;
}

const BuybackOnboarding: React.FC<BuybackOnboardingProps> = ({ isWireframe, onWireframeChange }) => {
  const wireframeStyles = isWireframe ? {
    button: "border-2 border-dashed border-gray-300 bg-gray-50",
    text: "font-mono"
  } : {
    button: "",
    text: ""
  };

  const features = [
    {
      icon: RefreshCw,
      title: "Sustainable Returns",
      description: "Reduce waste and increase customer satisfaction with our buyback program"
    },
    {
      icon: Package,
      title: "Easy Management",
      description: "Streamlined process for handling returns and buyback requests"
    },
    {
      icon: DollarSign,
      title: "Increase Revenue",
      description: "Turn returns into new sales opportunities"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-end mb-4">
          <Toggle
            pressed={isWireframe}
            onPressedChange={onWireframeChange}
            className={`${wireframeStyles.button} px-4`}
          >
            Wireframe Mode
          </Toggle>
        </div>

        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${wireframeStyles.text}`}>
            Buyback Program
          </h1>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${wireframeStyles.text}`}>
            Turn returns into opportunities. Our buyback program helps you manage returns efficiently while building customer loyalty.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isWireframe={isWireframe}
            />
          ))}
        </div>

        <ActivationCard isWireframe={isWireframe} />
      </div>
    </div>
  );
};

export default BuybackOnboarding;