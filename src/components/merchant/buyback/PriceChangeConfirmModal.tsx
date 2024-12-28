import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PriceChangeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  newValue: string;
  isWireframe: boolean;
}

const PriceChangeConfirmModal: React.FC<PriceChangeConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  newValue,
  isWireframe
}) => {
  const wireframeStyles = isWireframe ? {
    dialog: "border-2 border-dashed border-black",
    title: "font-mono",
    description: "font-mono",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
  } : {
    dialog: "",
    title: "",
    description: "",
    button: "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={wireframeStyles.dialog}>
        <DialogHeader>
          <DialogTitle className={wireframeStyles.title}>Confirm Price Change</DialogTitle>
          <DialogDescription className={wireframeStyles.description}>
            You are about to change the buyback value to {newValue}. The customer will receive an email to review and approve this new price. They can either accept or reject this offer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className={wireframeStyles.button}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className={`${isWireframe ? wireframeStyles.button : "bg-[#9b87f5] hover:bg-[#7E69AB] text-white"}`}
          >
            Approve Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PriceChangeConfirmModal;