import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown, RefreshCcw } from 'lucide-react';
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

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your report is being generated and will be ready shortly.",
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className={wireframeStyles.button}
        onClick={handleProcessAllPending}
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        Process All Pending
      </Button>
      <Button
        variant="outline"
        className={wireframeStyles.button}
        onClick={handleGenerateReport}
      >
        <FileDown className="mr-2 h-4 w-4" />
        Generate Report
      </Button>
    </div>
  );
};

export default BuybackActions;