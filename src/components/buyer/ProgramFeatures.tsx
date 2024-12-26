import React from 'react';
import { Package, DollarSign, RefreshCw } from 'lucide-react';

interface ProgramFeaturesProps {
  isWireframe: boolean;
}

const ProgramFeatures = ({ isWireframe }: ProgramFeaturesProps) => {
  const features = [
    {
      icon: Package,
      title: "Easy Returns",
      description: "Returning baby items is easy with free shipping included"
    },
    {
      icon: DollarSign,
      title: "Get Rewards",
      description: "Earn up to 70% back in store credit for your baby's outgrown items"
    },
    {
      icon: RefreshCw,
      title: "Growing Impact",
      description: "Every gently used piece helps reduce waste and makes a difference for the next generation"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-8 mb-12">
      {features.map((feature) => (
        <div
          key={feature.title}
          className={`p-6 rounded-lg ${
            isWireframe ? 'border-2 border-dashed border-gray-300' : 'bg-white shadow-sm hover:shadow-md transition-shadow'
          }`}
        >
          <feature.icon className="w-8 h-8 mb-4 mx-auto text-[#9b87f5]" />
          <h3 className="font-semibold mb-2 text-[#403E43]">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgramFeatures;