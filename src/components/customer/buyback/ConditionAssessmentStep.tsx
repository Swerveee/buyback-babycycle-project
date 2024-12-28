import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X, Check, ChevronsUpDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
      // Pre-select an item (for demo purposes, selecting the first item)
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

        {images.length > 0 && (
          <div className="space-y-2">
            <Label className={wireframeStyles.label}>Confirm Item Type</Label>
            <p className="text-sm text-gray-500 mb-2">
              Please confirm that the detected item is correct or select a different item from the list.
            </p>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`w-full justify-between ${wireframeStyles.input}`}
                >
                  {selectedItem
                    ? items.find((item) => item.value === selectedItem)?.label
                    : "Select an item..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search items..." />
                  <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup heading="Suggested items">
                      {items.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={(currentValue) => {
                            setSelectedItem(currentValue === selectedItem ? "" : currentValue);
                            setOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2"
                        >
                          <div className={`w-10 h-10 ${isWireframe ? "border-2 border-dashed border-gray-300" : "bg-gray-100"} rounded-md flex items-center justify-center`}>
                            <img 
                              src={item.image}
                              alt={item.label}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Check
                              className={cn(
                                "h-4 w-4",
                                selectedItem === item.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {item.label}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}

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