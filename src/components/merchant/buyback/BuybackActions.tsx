import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface BuybackActionsProps {
  wireframeStyles: {
    button: string;
  };
}

const BuybackActions = ({ wireframeStyles }: BuybackActionsProps) => {
  const { toast } = useToast();

  const handleProcessAllPending = () => {
    toast({
      title: "Processing Requests",
      description: "Processing pending requests...",
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3 flex items-center gap-2"
        onClick={handleProcessAllPending}
      >
        <Check className="h-4 w-4" />
        Approve All Pending
      </Button>
    </div>
  );
};

export default BuybackActions;