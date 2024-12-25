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
            <ul className="list-disc list-inside text-[#555555] space-y-2 mt-2">
              <li>Our team will review your submission within 24 hours</li>
              <li>You'll receive an email with your prepaid shipping label</li>
              <li>Pack your items and drop them off at any shipping location</li>
              <li>Once received, we'll verify the items and add store credit to your account</li>
            </ul>
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