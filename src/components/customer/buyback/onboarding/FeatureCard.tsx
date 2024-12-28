import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isWireframe: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, isWireframe }) => {
  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-gray-300",
    text: "font-mono"
  } : {
    card: "border-none shadow-sm",
    text: ""
  };

  return (
    <Card className={wireframeStyles.card}>
      <CardHeader className="p-4">
        <Icon className="h-8 w-8 mb-1 text-purple-600" />
        <CardTitle className={`text-lg ${wireframeStyles.text}`}>{title}</CardTitle>
        <CardDescription className={`text-sm ${wireframeStyles.text}`}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;