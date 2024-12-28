import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdditionalNotesProps {
  isWireframe: boolean;
}

const AdditionalNotes: React.FC<AdditionalNotesProps> = ({ isWireframe }) => {
  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-black bg-white",
    label: "font-mono text-black",
  } : {
    input: "",
    label: "",
  };

  return (
    <div className="space-y-2">
      <Label className={wireframeStyles.label}>Additional Notes</Label>
      <Input 
        placeholder="Describe any specific wear or damage" 
        className={wireframeStyles.input}
      />
    </div>
  );
};

export default AdditionalNotes;