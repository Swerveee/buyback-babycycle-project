import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PriceChangeConfirmModal from './PriceChangeConfirmModal';

interface ValueEditorProps {
  initialValue: string;
  onValueChange: (newValue: string) => void;
  isWireframe: boolean;
}

const ValueEditor = ({ initialValue, onValueChange, isWireframe }: ValueEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { toast } = useToast();

  const wireframeStyles = isWireframe ? {
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
    input: "border-2 border-dashed border-black",
  } : {
    button: "",
    input: "",
  };

  const handleSave = () => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    const formattedValue = `₪${numericValue}`;
    setValue(formattedValue);
    setShowConfirmModal(true);
  };

  const handleConfirmPriceChange = () => {
    onValueChange(value);
    setIsEditing(false);
    setShowConfirmModal(false);
    toast({
      title: "Price change submitted",
      description: "An email has been sent to the customer for review.",
    });
  };

  if (isEditing) {
    return (
      <>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={value.replace('₪', '')}
            onChange={(e) => setValue(e.target.value)}
            className={`w-24 ${wireframeStyles.input}`}
          />
          <Button 
            onClick={handleSave} 
            size="sm" 
            className={wireframeStyles.button}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => {
              setValue(initialValue);
              setIsEditing(false);
            }} 
            size="sm" 
            variant="outline"
            className={wireframeStyles.button}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <PriceChangeConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmPriceChange}
          newValue={value}
          isWireframe={isWireframe}
        />
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-[#2563eb]">{value}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditing(true)}
        className={`p-1 h-auto ${wireframeStyles.button}`}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ValueEditor;