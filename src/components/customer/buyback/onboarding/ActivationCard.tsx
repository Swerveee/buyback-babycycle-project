import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PackageSearch } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    <div className="space-y-4">
      <Alert className={`${wireframeStyles.alert} bg-blue-50/50`}>
        <PackageSearch className={`h-4 w-4 ${isWireframe ? 'text-black' : 'text-blue-500'}`} />
        <AlertDescription className={wireframeStyles.text}>
          Before activating the buyback program, make sure to{' '}
          <button 
            onClick={() => navigate('/merchant/products')}
            className="text-blue-500 hover:text-blue-600 underline font-medium"
          >
            select which products
          </button>
          {' '}are eligible for buyback.
        </AlertDescription>
      </Alert>

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
    </div>
  );
};

export default ActivationCard;