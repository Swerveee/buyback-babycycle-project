import React from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImagePreviewProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  isWireframe: boolean;
}

const ImagePreview = ({ 
  images, 
  currentIndex, 
  onPrevious, 
  onNext, 
  isWireframe 
}: ImagePreviewProps) => {
  const wireframeStyles = isWireframe ? {
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5",
    image: "border-2 border-dashed border-black",
  } : {
    button: "bg-white/80 hover:bg-white",
    image: "",
  };

  const placeholderImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
  const currentImage = images[currentIndex] || placeholderImage;

  return (
    <div className="relative group">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[80vh]">
          <div className="relative w-full h-full">
            <img
              src={currentImage}
              alt={`Product preview ${currentIndex + 1} zoomed`}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <img
        src={currentImage}
        alt={`Product preview ${currentIndex + 1}`}
        className={`w-full h-32 object-cover rounded-lg ${wireframeStyles.image}`}
      />
      
      <div className="absolute top-1/2 -translate-y-1/2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`rounded-full ${wireframeStyles.button}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentIndex === images.length - 1}
          className={`rounded-full ${wireframeStyles.button}`}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;