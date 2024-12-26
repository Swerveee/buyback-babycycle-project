import React from 'react';
import { Button } from "@/components/ui/button";

interface ProgramIntroProps {
  isWireframe: boolean;
  onStartBuyback: () => void;
}

const ProgramIntro = ({ isWireframe, onStartBuyback }: ProgramIntroProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h1 className={`text-4xl font-bold mb-6 ${isWireframe ? 'font-mono' : ''} text-[#403E43]`}>
        Give Baby Clothes a Second Story
      </h1>
      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
        Turn your baby's outgrown BabyCycle clothes into store credit! Our buyback program is simple: send us the clothes your little one has outgrown, and we'll credit your account within 48 hours. Plus, we'll cover the shipping costs! Get up to 70% back in store credit to use on your next purchase.
      </p>
      <Button
        onClick={onStartBuyback}
        className={`${isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-[#9b87f5] hover:bg-[#7E69AB] text-white'} px-8 py-6 text-lg font-medium transition-colors`}
      >
        Sell Back My Baby Items
      </Button>
    </div>
  );
};

export default ProgramIntro;