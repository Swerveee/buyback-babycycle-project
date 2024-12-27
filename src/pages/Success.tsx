import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="border-[#eee] shadow-sm">
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
          <div className="bg-[#F8F2FF] p-4 rounded-lg">
            <p className="text-[#1A1F2C] font-medium">What happens next?</p>
            <ol className="list-decimal list-inside text-[#555555] space-y-2 mt-2">
              <li>Our team will review your submission and confirm your store credit value</li>
              <li>You'll receive an email with your prepaid shipping label</li>
              <li>Pack your items securely and drop them off at the nearest shipping location</li>
              <li>Once reviewed, your store credit will be added to your account</li>
            </ol>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
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