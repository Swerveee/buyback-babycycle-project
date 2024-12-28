import React from 'react';
import { steps } from '../config/steps';

interface StepProgressProps {
  currentStep: number;
  wireframeStyles: {
    stepIcon: string;
    activeStep: string;
    description: string;
  };
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, wireframeStyles }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((s, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
            currentStep > index + 1 ? 'bg-[#7E69AB] text-white' :
            currentStep === index + 1 ? wireframeStyles.activeStep :
            'bg-[#F1F1F1] text-[#8E9196]'
          } ${wireframeStyles.stepIcon}`}>
            <s.icon className="w-5 h-5" />
          </div>
          <span className={`text-sm text-center ${wireframeStyles.description}`}>{s.title}</span>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;