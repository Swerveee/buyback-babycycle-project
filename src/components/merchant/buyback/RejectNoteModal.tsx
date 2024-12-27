import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RejectNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  note: string;
  onNoteChange: (note: string) => void;
}

const RejectNoteModal = ({
  isOpen,
  onClose,
  onConfirm,
  note,
  onNoteChange,
}: RejectNoteModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Buyback Request</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide a reason for rejecting this request.
            <p className="mt-2 text-sm text-muted-foreground">
              If provided, the rejection reason will be shared with the Customer.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Textarea
          placeholder="Add a note about why you're rejecting this request..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="min-h-[120px] my-4"
        />
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            Confirm Reject
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RejectNoteModal;