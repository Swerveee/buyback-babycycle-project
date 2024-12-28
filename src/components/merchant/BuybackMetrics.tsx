import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Package, DollarSign, Recycle, HelpCircle, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface BuybackMetricsProps {
  isWireframe: boolean;
}

const BuybackMetrics: React.FC<BuybackMetricsProps> = ({ isWireframe }) => {
  const { toast } = useToast();
  
  const metrics = [
    {
      title: "Requests Received This Month",
      value: "24",
      change: "+12%",
      icon: Package,
      tooltip: "Number of buyback requests submitted since the beginning of the current month"
    },
    {
      title: "Total Value Returned This Month",
      value: "$2,400",
      change: "+8%",
      icon: DollarSign,
      tooltip: "Monetary value of items accepted and processed for buyback since the start of the current month"
    },
    {
      title: "Acceptance Rate",
      value: "92%",
      change: "+3%",
      icon: Recycle,
      tooltip: "Percentage of buyback requests accepted compared to total requests submitted this month"
    }
  ];

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-gray-300",
    title: "font-mono",
    value: "font-mono",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black"
  } : {
    card: "",
    title: "",
    value: "",
    button: ""
  };

  const handleGenerateReport = () => {
    // This is a placeholder for the actual report generation functionality
    toast({
      title: "Generating Report",
      description: "Your report will be ready for download shortly.",
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={`text-lg font-semibold ${isWireframe ? "font-mono" : ""}`}>Program Metrics</h2>
          <Button
            onClick={handleGenerateReport}
            variant="outline"
            className={`${wireframeStyles.button} gap-2`}
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.title} className={wireframeStyles.card}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className={`text-sm font-medium ${wireframeStyles.title}`}>
                    {metric.title}
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{metric.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${wireframeStyles.value}`}>{metric.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-secondary" />
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BuybackMetrics;