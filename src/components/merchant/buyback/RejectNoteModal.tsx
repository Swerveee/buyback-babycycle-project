import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const REJECTION_REASONS = [
  { value: "condition", label: "Item condition does not meet requirements" },
  { value: "incomplete", label: "Incomplete or missing information" },
  { value: "pricing", label: "Price expectations cannot be met" },
  { value: "category", label: "Item category not accepted" },
  { value: "other", label: "Other reason" }
];

const RejectNoteModal = ({
  isOpen,
  onClose,
  onConfirm,
  note,
  onNoteChange,
  isWireframe,
}: RejectNoteModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    const selectedReasonObj = REJECTION_REASONS.find(reason => reason.value === value);
    if (selectedReasonObj) {
      onNoteChange(selectedReasonObj.label);
    }
  };

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
            Please select a reason for rejecting this buyback request and provide any additional details if needed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Select value={selectedReason} onValueChange={handleReasonChange}>
            <SelectTrigger className={`w-full ${wireframeStyles.input}`}>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {REJECTION_REASONS.map((reason) => (
                <SelectItem key={reason.value} value={reason.value}>
                  {reason.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Additional notes (optional)..."
            className={wireframeStyles.input}
          />
        </div>

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