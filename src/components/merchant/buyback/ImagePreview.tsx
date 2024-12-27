import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const ImagePreview = ({ images, currentIndex, onPrevious, onNext }: ImagePreviewProps) => {
  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`Product preview ${currentIndex + 1}`}
        className="w-full h-auto max-h-[80vh] object-contain"
      />
      
      <div className="absolute top-1/2 -translate-y-1/2 left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="rounded-full bg-white/80 hover:bg-white"
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
          className="rounded-full bg-white/80 hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;