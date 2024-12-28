import React from 'react';
import { CheckCircle2, Mail, Package, CreditCard, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

interface SuccessProps {
  isWireframe?: boolean;
  onWireframeChange?: (value: boolean) => void;
}

const Success = ({ isWireframe = false, onWireframeChange }: SuccessProps) => {
  const navigate = useNavigate();
  const orderNumber = "TI-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="container mx-auto p-4 max-w-2xl h-screen flex items-center">
      {onWireframeChange && (
        <div className="fixed top-4 right-4">
          <Toggle
            pressed={isWireframe}
            onPressedChange={onWireframeChange}
            className="border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Wireframe
          </Toggle>
        </div>
      )}
      <Card className={`${isWireframe ? 'border-2 border-dashed border-black shadow-none bg-white' : 'border-[#eee]'} shadow-sm w-full`}>
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className={`w-16 h-16 ${isWireframe ? 'text-gray-900' : 'text-green-500'}`} />
          </div>
          <CardTitle className={`text-2xl ${isWireframe ? 'text-gray-900' : 'text-[#1A1F2C]'}`}>
            Thank You for Your Trade-In Request!
          </CardTitle>
          <CardDescription className={isWireframe ? 'text-gray-600' : 'text-[#555555]'}>
            Activate your buyback program now and start offering your customers an easy way to return and exchange products while earning store points for their next purchase!
          </CardDescription>
          <div className={`mt-2 text-sm ${isWireframe ? 'text-gray-600' : 'text-[#555555]'}`}>
            Order Number: <span className="font-medium">{orderNumber}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`${isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-[#F8F2FF]'} p-3 rounded-lg`}>
            <p className={`font-medium mb-2 ${isWireframe ? 'text-gray-900' : 'text-[#1A1F2C]'}`}>
              What happens next?
            </p>
            <ol className="list-none space-y-2">
              <li className={`flex items-center gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'} text-sm`}>
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-green-500'}`} />
                Our team will review your submission and confirm your store credit value
              </li>
              <li className={`flex items-center gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'} text-sm`}>
                <Mail className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-blue-500'}`} />
                You'll receive an email with your prepaid shipping label
              </li>
              <li className={`flex items-center gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'} text-sm whitespace-nowrap`}>
                <Package className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-orange-500'}`} />
                Pack your items securely and drop them off at the nearest shipping location
              </li>
              <li className={`flex items-center gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'} text-sm`}>
                <CreditCard className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-purple-500'}`} />
                Once reviewed, your store credit will be added to your account
              </li>
            </ol>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
            <Button 
              onClick={() => navigate('/buyback')}
              className={`w-full ${
                isWireframe 
                  ? 'border-2 border-dashed border-gray-400 bg-white text-gray-900 hover:bg-gray-50' 
                  : 'bg-[#9b87f5] hover:bg-[#7E69AB] text-white'
              } flex items-center justify-center gap-2`}
            >
              <Plus className="w-4 h-4" />
              Trade In Another Item
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className={`w-full ${
                isWireframe 
                  ? 'border-2 border-dashed border-gray-400 bg-white text-gray-900 hover:bg-gray-50' 
                  : 'border-[#9b87f5] text-[#9b87f5] hover:bg-[#F8F2FF]'
              }`}
            >
              Return to Shop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;