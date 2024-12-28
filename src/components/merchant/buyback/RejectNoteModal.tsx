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
import { Textarea } from "@/components/ui/textarea";

interface RejectNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  note: string;
  onNoteChange: (value: string) => void;
  isWireframe: boolean;
}

const RejectNoteModal = ({
  isOpen,
  onClose,
  onConfirm,
  note,
  onNoteChange,
  isWireframe,
}: RejectNoteModalProps) => {
  const wireframeStyles = isWireframe ? {
    dialog: "border-2 border-dashed border-black",
    content: "bg-white",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
    input: "border-2 border-dashed border-black",
    title: "font-mono",
    description: "font-mono",
  } : {
    dialog: "",
    content: "",
    button: "",
    input: "",
    title: "",
    description: "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${wireframeStyles.dialog} ${wireframeStyles.content}`}>
        <DialogHeader>
          <DialogTitle className={wireframeStyles.title}>Reject Request</DialogTitle>
          <DialogDescription className={wireframeStyles.description}>
            Please provide a reason for rejecting this buyback request. This feedback will be shared with the customer to help them understand the decision.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Enter rejection reason..."
          className={wireframeStyles.input}
        />
        <DialogFooter>
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
            Confirm Rejection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectNoteModal;