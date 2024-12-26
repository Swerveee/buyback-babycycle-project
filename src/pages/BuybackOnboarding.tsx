import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Package, DollarSign, ArrowRight } from 'lucide-react';

interface BuybackOnboardingProps {
  isWireframe: boolean;
}

const BuybackOnboarding: React.FC<BuybackOnboardingProps> = ({ isWireframe }) => {
  const navigate = useNavigate();

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-50",
    text: "font-mono"
  } : {
    card: "border-none shadow-sm",
    button: "",
    text: ""
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${wireframeStyles.text}`}>
            Buyback Program
          </h1>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${wireframeStyles.text}`}>
            Turn returns into opportunities. Our buyback program helps you manage returns efficiently while building customer loyalty.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className={wireframeStyles.card}>
            <CardHeader>
              <RefreshCw className="h-10 w-10 mb-2 text-purple-600" />
              <CardTitle className={wireframeStyles.text}>Sustainable Returns</CardTitle>
              <CardDescription className={wireframeStyles.text}>
                Reduce waste and increase customer satisfaction with our buyback program
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className={wireframeStyles.card}>
            <CardHeader>
              <Package className="h-10 w-10 mb-2 text-purple-600" />
              <CardTitle className={wireframeStyles.text}>Easy Management</CardTitle>
              <CardDescription className={wireframeStyles.text}>
                Streamlined process for handling returns and buyback requests
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className={wireframeStyles.card}>
            <CardHeader>
              <DollarSign className="h-10 w-10 mb-2 text-purple-600" />
              <CardTitle className={wireframeStyles.text}>Increase Revenue</CardTitle>
              <CardDescription className={wireframeStyles.text}>
                Turn returns into new sales opportunities
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

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
                  className={`${wireframeStyles.button} gap-2`}
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
    </div>
  );
};

export default BuybackOnboarding;