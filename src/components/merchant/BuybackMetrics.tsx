import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Package, DollarSign, Recycle, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BuybackMetricsProps {
  isWireframe: boolean;
}

const BuybackMetrics: React.FC<BuybackMetricsProps> = ({ isWireframe }) => {
  const metrics = [
    {
      title: "Total Requests",
      value: "24",
      change: "+12%",
      icon: Package,
      tooltip: "Total number of buyback requests received from customers in the current period"
    },
    {
      title: "Value Returned",
      value: "$2,400",
      change: "+8%",
      icon: DollarSign,
      tooltip: "Total monetary value provided to customers through store credit, refunds, or other compensation methods"
    },
    {
      title: "Acceptance Rate",
      value: "92%",
      change: "+3%",
      icon: Recycle,
      tooltip: "Percentage of buyback requests that were approved and processed successfully"
    }
  ];

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-gray-300",
    title: "font-mono",
    value: "font-mono"
  } : {
    card: "",
    title: "",
    value: ""
  };

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
};

export default BuybackMetrics;