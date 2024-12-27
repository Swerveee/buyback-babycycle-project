import React from 'react';
import { CheckCircle2, Mail, Package, CreditCard } from 'lucide-react';
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

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      {onWireframeChange && (
        <div className="flex justify-end mb-4">
          <Toggle
            pressed={isWireframe}
            onPressedChange={onWireframeChange}
            className="mb-4"
          >
            Wireframe
          </Toggle>
        </div>
      )}
      <Card className={`${isWireframe ? 'border-2 border-dashed' : 'border-[#eee]'} shadow-sm`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-[#1A1F2C]">Thank You for Your Trade-In Request!</CardTitle>
          <CardDescription className="text-[#555555]">
            We're excited to help you trade in your gently used kids' items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`${isWireframe ? 'border-2 border-dashed bg-gray-50' : 'bg-[#F8F2FF]'} p-4 rounded-lg`}>
            <p className="text-[#1A1F2C] font-medium">What happens next?</p>
            <ol className="list-none space-y-3 mt-2">
              <li className="flex items-center gap-3 text-[#555555]">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                Our team will review your submission and confirm your store credit value
              </li>
              <li className="flex items-center gap-3 text-[#555555]">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                You'll receive an email with your prepaid shipping label
              </li>
              <li className="flex items-center gap-3 text-[#555555] whitespace-nowrap">
                <Package className="w-5 h-5 text-orange-500 flex-shrink-0" />
                Pack your items securely and drop them off at the nearest shipping location
              </li>
              <li className="flex items-center gap-3 text-[#555555]">
                <CreditCard className="w-5 h-5 text-purple-500 flex-shrink-0" />
                Once reviewed, your store credit will be added to your account
              </li>
            </ol>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/')}
              className={`${isWireframe ? 'border-2 border-dashed bg-gray-50 hover:bg-gray-100' : 'bg-[#9b87f5] hover:bg-[#7E69AB]'} text-white`}
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