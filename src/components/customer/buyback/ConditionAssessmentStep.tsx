import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X, ImagePlus } from 'lucide-react';
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
          <div className="flex items-center justify-between">
            <Label className={wireframeStyles.label}>Product Images</Label>
            <span className={`text-sm ${images.length >= MAX_IMAGES ? 'text-orange-500' : 'text-[#9b87f5]'}`}>
              {images.length}/{MAX_IMAGES} images uploaded
            </span>
          </div>
          
          <div className={`rounded-lg p-6 text-center ${wireframeStyles.uploadArea} relative`}>
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
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-8 h-8 text-[#9b87f5]" />
                <div className="flex -space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center ${
                        i === 0 ? 'bg-[#9b87f5]/10' :
                        i === 1 ? 'bg-[#9b87f5]/5' :
                        'bg-[#9b87f5]/2'
                      } border-[#9b87f5]`}
                    >
                      <ImagePlus className="w-4 h-4 text-[#9b87f5]" />
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-sm text-[#1A1F2C] font-medium">
                {images.length >= MAX_IMAGES 
                  ? 'Maximum images reached'
                  : 'Upload multiple images at once'}
              </span>
              <span className="text-xs text-[#8E9196]">
                PNG, JPG up to 10MB (max {MAX_IMAGES} images)
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
