import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface RequestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: RequestInfoData) => void;
  isWireframe: boolean;
}

export interface RequestInfoData {
  requestTypes: string[];
  additionalNotes: string;
}

const RequestInfoModal: React.FC<RequestInfoModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isWireframe
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const requestTypes = [
    { id: "images", label: "Additional Images" },
    { id: "condition", label: "Item Condition Details" },
    { id: "purchase", label: "Original Purchase Information" },
    { id: "measurements", label: "Item Measurements" },
  ];

  const handleSubmit = () => {
    if (selectedTypes.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one type of information to request.",
        variant: "destructive"
      });
      return;
    }

    onConfirm({
      requestTypes: selectedTypes,
      additionalNotes: notes
    });
    
    // Reset form
    setSelectedTypes([]);
    setNotes("");
  };

  const wireframeStyles = isWireframe ? {
    dialog: "border-2 border-dashed border-black",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5",
    input: "border-2 border-dashed border-black",
  } : {
    dialog: "",
    button: "",
    input: "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${wireframeStyles.dialog} max-w-md`}>
        <DialogHeader>
          <DialogTitle>Request Additional Information</DialogTitle>
          <DialogDescription>
            Select the type of information you need from the customer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            {requestTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={(checked) => {
                    setSelectedTypes(prev =>
                      checked
                        ? [...prev, type.id]
                        : prev.filter(t => t !== type.id)
                    );
                  }}
                  className={wireframeStyles.input}
                />
                <Label htmlFor={type.id}>{type.label}</Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any specific details about what you need..."
              className={wireframeStyles.input}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className={wireframeStyles.button}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className={`${isWireframe ? wireframeStyles.button : "bg-[#9b87f5] hover:bg-[#7E69AB] text-white"}`}
            >
              Send Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestInfoModal;