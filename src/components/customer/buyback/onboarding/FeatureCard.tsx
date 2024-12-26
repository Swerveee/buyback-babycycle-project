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
      <CardHeader>
        <Icon className="h-10 w-10 mb-2 text-purple-600" />
        <CardTitle className={wireframeStyles.text}>{title}</CardTitle>
        <CardDescription className={wireframeStyles.text}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;