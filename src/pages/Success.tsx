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
          <CardTitle className="text-2xl text-[#1A1F2C]">Request Submitted Successfully!</CardTitle>
          <CardDescription className="text-[#555555]">
            We've received your buyback request and will process it shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-[#F1F1F1] p-4 rounded-lg">
            <p className="text-[#1A1F2C] font-medium">What happens next?</p>
            <ul className="list-disc list-inside text-[#555555] space-y-2 mt-2">
              <li>Our team will review your submission</li>
              <li>You'll receive an email confirmation within 24 hours</li>
              <li>Once approved, we'll send you shipping instructions</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;