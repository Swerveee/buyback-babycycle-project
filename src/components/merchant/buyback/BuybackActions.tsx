import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreVertical, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleProcessAllPending}>
          <Check className="mr-2 h-4 w-4" />
          Approve All Pending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BuybackActions;