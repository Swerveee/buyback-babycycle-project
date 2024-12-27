import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface ActivationCardProps {
  isWireframe: boolean;
}

const ActivationCard: React.FC<ActivationCardProps> = ({ isWireframe }) => {
  const navigate = useNavigate();

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-50",
    text: "font-mono",
    alert: "border-2 border-dashed border-gray-300"
  } : {
    card: "border-none shadow-sm",
    button: "",
    text: "",
    alert: ""
  };

  return (
    <Card className={`${wireframeStyles.card} bg-purple-50`}>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${wireframeStyles.text}`}>
              Ready to get started?
            </h2>
            <p className={`text-gray-600 mb-6 ${wireframeStyles.text}`}>
              Activate your buyback program now and start offering your customers an easy way to return and exchange products.
            </p>
            <Button 
              onClick={() => navigate('/buyback')}
              className={`${wireframeStyles.button} gap-2 ${isWireframe ? 'text-black' : ''}`}
              size="lg"
            >
              Activate Buyback Program
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden md:block">
            <img 
              src="/placeholder.svg" 
              alt="Buyback Program" 
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivationCard;