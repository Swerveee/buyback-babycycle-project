import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ConditionAssessmentStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const MAX_IMAGES = 3;

const ConditionAssessmentStep: React.FC<ConditionAssessmentStepProps> = ({ onSubmit, isWireframe }) => {
  const [images, setImages] = useState<File[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const totalImages = images.length + newImages.length;

      if (totalImages > MAX_IMAGES) {
        toast({
          title: "Upload limit reached",
          description: `You can only upload up to ${MAX_IMAGES} images. Please remove some images first.`,
          variant: "destructive"
        });
        return;
      }

      setImages([...images, ...newImages]);
      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) added successfully.`,
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    toast({
      title: "Image removed",
      description: "The image has been removed successfully.",
    });
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
          <Label className={wireframeStyles.label}>
            Product Images ({images.length}/{MAX_IMAGES})
          </Label>
          <div className={`rounded-lg p-6 text-center ${wireframeStyles.uploadArea}`}>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={images.length >= MAX_IMAGES}
            />
            <Label
              htmlFor="image-upload"
              className={`cursor-pointer flex flex-col items-center gap-2 ${wireframeStyles.label} ${images.length >= MAX_IMAGES ? 'opacity-50' : ''}`}
            >
              <Upload className="w-8 h-8 text-[#9b87f5]" />
              <span className="text-sm text-[#1A1F2C]">
                {images.length >= MAX_IMAGES 
                  ? 'Maximum images reached'
                  : 'Click to upload or drag and drop'}
              </span>
              <span className="text-xs text-[#8E9196]">
                Add up to {MAX_IMAGES} images to help us assess your item
              </span>
              <span className="text-xs text-[#8E9196] italic">
                One clear photo is enough, but you can add more if needed
              </span>
            </Label>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-[#F1F1F1] group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
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