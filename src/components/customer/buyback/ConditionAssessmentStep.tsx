import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import ItemConditionRadio from './components/ItemConditionRadio';
import ImageUploader from './components/ImageUploader';
import ItemSelector from './components/ItemSelector';
import AdditionalNotes from './components/AdditionalNotes';

interface ConditionAssessmentStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const MAX_IMAGES = 3;

const items = [
  { value: "onesie", label: "Organic Cotton Onesie", image: "/placeholder.svg" },
  { value: "blanket", label: "Baby Soft Blanket", image: "/placeholder.svg" },
  { value: "sleepsack", label: "Sleep Sack", image: "/placeholder.svg" },
  { value: "romper", label: "Baby Romper Set", image: "/placeholder.svg" },
  { value: "hat", label: "Newborn Hat Pack", image: "/placeholder.svg" },
  { value: "socks", label: "Baby Socks Bundle", image: "/placeholder.svg" },
];

const ConditionAssessmentStep: React.FC<ConditionAssessmentStepProps> = ({ onSubmit, isWireframe }) => {
  const [images, setImages] = useState<File[]>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);
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
      if (images.length === 0 && !selectedItem) {
        setSelectedItem(items[0].value);
        toast({
          title: "Item detected",
          description: `We detected a ${items[0].label}. Please confirm if this is correct.`,
        });
      }
      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) added successfully.`,
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (images.length <= 1) {
      setSelectedItem("");
    }
    toast({
      title: "Image removed",
      description: "The image has been removed successfully.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length > 0 && !selectedItem) {
      toast({
        title: "Item selection required",
        description: "Please confirm or select the correct item type.",
        variant: "destructive"
      });
      return;
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <ItemConditionRadio isWireframe={isWireframe} />
        
        <ImageUploader
          images={images}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          isWireframe={isWireframe}
          maxImages={MAX_IMAGES}
        />

        {images.length > 0 && (
          <ItemSelector
            items={items}
            selectedItem={selectedItem}
            onItemSelect={setSelectedItem}
            isWireframe={isWireframe}
            open={open}
            setOpen={setOpen}
          />
        )}

        <AdditionalNotes isWireframe={isWireframe} />
      </div>
    </form>
  );
};

export default ConditionAssessmentStep;