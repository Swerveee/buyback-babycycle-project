import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  isWireframe: boolean;
}

const ImagePreview = ({ images, currentIndex, onPrevious, onNext, isWireframe }: ImagePreviewProps) => {
  const wireframeStyles = isWireframe ? {
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5",
    image: "border-2 border-dashed border-black",
  } : {
    button: "bg-white/80 hover:bg-white",
    image: "",
  };

  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`Product preview ${currentIndex + 1}`}
        className={`w-full h-auto max-h-[80vh] object-contain ${wireframeStyles.image}`}
      />
      
      <div className="absolute top-1/2 -translate-y-1/2 left-4">
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
      
      <div className="absolute top-1/2 -translate-y-1/2 right-4">
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