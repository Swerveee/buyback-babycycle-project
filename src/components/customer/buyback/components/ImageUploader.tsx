import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  images: File[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  isWireframe: boolean;
  maxImages: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  images, 
  onImageUpload, 
  onRemoveImage, 
  isWireframe,
  maxImages 
}) => {
  const wireframeStyles = isWireframe ? {
    label: "font-mono text-black",
    uploadArea: "border-2 border-dashed border-black bg-white"
  } : {
    label: "",
    uploadArea: "border-2 border-dashed border-[#9b87f5]"
  };

  return (
    <div className="space-y-2">
      <Label className={wireframeStyles.label}>Product Images</Label>
      <div className={`rounded-lg p-6 text-center ${wireframeStyles.uploadArea}`}>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={onImageUpload}
          className="hidden"
          id="image-upload"
          disabled={images.length >= maxImages}
        />
        <Label
          htmlFor="image-upload"
          className={`cursor-pointer flex flex-col items-center gap-2 ${wireframeStyles.label} ${images.length >= maxImages ? 'opacity-50' : ''}`}
        >
          <Upload className="w-8 h-8 text-[#9b87f5]" />
          <span className="text-sm text-[#1A1F2C]">
            {images.length >= maxImages 
              ? 'Maximum images reached'
              : 'Click to upload or drag and drop'}
          </span>
          <span className="text-xs text-[#8E9196]">
            Add up to {maxImages} images to help us assess your item
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
                onClick={() => onRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;