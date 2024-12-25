import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ConditionAssessmentStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const ConditionAssessmentStep: React.FC<ConditionAssessmentStepProps> = ({ onSubmit, isWireframe }) => {
  const [images, setImages] = useState<File[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) added successfully.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-black bg-white",
    label: "font-mono text-black",
    uploadArea: "border-2 border-dashed border-black bg-white"
  } : {
    input: "",
    label: "",
    uploadArea: "border-2 border-dashed border-[#9b87f5]"
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className={wireframeStyles.label}>Item Condition</Label>
          <RadioGroup defaultValue="good">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="excellent" id="excellent" />
              <Label htmlFor="excellent" className={wireframeStyles.label}>Excellent - Like New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="good" id="good" />
              <Label htmlFor="good" className={wireframeStyles.label}>Good - Minor Wear</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fair" id="fair" />
              <Label htmlFor="fair" className={wireframeStyles.label}>Fair - Visible Wear</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className={wireframeStyles.label}>Product Images</Label>
          <div className={`rounded-lg p-6 text-center ${wireframeStyles.uploadArea}`}>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <Label
              htmlFor="image-upload"
              className={`cursor-pointer flex flex-col items-center gap-2 ${wireframeStyles.label}`}
            >
              <Upload className="w-8 h-8 text-[#9b87f5]" />
              <span className="text-sm text-[#1A1F2C]">Click to upload or drag and drop</span>
              <span className="text-xs text-[#8E9196]">PNG, JPG up to 10MB</span>
            </Label>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-[#F1F1F1]">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className={wireframeStyles.label}>Additional Notes</Label>
          <Input 
            placeholder="Describe any specific wear or damage" 
            className={wireframeStyles.input}
          />
        </div>
      </div>
    </form>
  );
};

export default ConditionAssessmentStep;