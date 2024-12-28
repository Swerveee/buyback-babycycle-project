import React from 'react';
import { CheckCircle2, Mail, Package, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import MainNavigation from '@/components/navigation/MainNavigation';

interface SuccessProps {
  isWireframe?: boolean;
  onWireframeChange?: (value: boolean) => void;
}

const Success = ({ isWireframe = false, onWireframeChange }: SuccessProps) => {
  const navigate = useNavigate();
  const orderNumber = "TI-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div>
      <MainNavigation 
        isWireframe={isWireframe} 
        onLogoClick={() => navigate('/')} 
        setShowBuyback={() => navigate('/buyback')} 
      />
      
      <div className="container mx-auto p-6 max-w-2xl">
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
        <Card className={`${isWireframe ? 'border-2 border-dashed border-black shadow-none bg-white' : 'border-[#eee]'} shadow-sm`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className={`w-16 h-16 ${isWireframe ? 'text-gray-900' : 'text-green-500'}`} />
            </div>
            <CardTitle className={`text-2xl ${isWireframe ? 'text-gray-900' : 'text-[#1A1F2C]'}`}>
              Thank You for Your Trade-In Request!
            </CardTitle>
            <CardDescription className={isWireframe ? 'text-gray-600' : 'text-[#555555]'}>
              We're excited to help you trade in your gently used kids' items.
            </CardDescription>
            <div className={`mt-4 text-sm ${isWireframe ? 'text-gray-600' : 'text-[#555555]'}`}>
              Order Number: <span className="font-medium">{orderNumber}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`${isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-[#F8F2FF]'} p-4 rounded-lg`}>
              <p className={`font-medium ${isWireframe ? 'text-gray-900' : 'text-[#1A1F2C]'}`}>
                What happens next?
              </p>
              <ol className="list-none space-y-3 mt-2">
                <li className={`flex items-start gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'}`}>
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-green-500'}`} />
                  Our team will review your submission and confirm your store credit value
                </li>
                <li className={`flex items-start gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'}`}>
                  <Mail className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-blue-500'}`} />
                  You'll receive an email with your prepaid shipping label
                </li>
                <li className={`flex items-start gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'}`}>
                  <Package className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-orange-500'}`} />
                  Pack your items securely and drop them off at the nearest shipping location
                </li>
                <li className={`flex items-start gap-3 ${isWireframe ? 'text-gray-600' : 'text-[#555555]'}`}>
                  <CreditCard className={`w-5 h-5 flex-shrink-0 ${isWireframe ? 'text-gray-900' : 'text-purple-500'}`} />
                  Once reviewed, your store credit will be added to your account
                </li>
              </ol>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className={`${
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
    </div>
  );
};

export default Success;