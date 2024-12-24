import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, Package, DollarSign, Truck } from 'lucide-react';

const BuybackProcess = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      toast({
        title: "Progress Saved",
        description: "Your information has been saved successfully.",
      });
    }
  };

  const steps = [
    {
      title: "Product Details",
      icon: Package,
      description: "Enter your product information"
    },
    {
      title: "Condition Assessment",
      icon: CheckCircle2,
      description: "Describe the condition of your item"
    },
    {
      title: "Shipping Details",
      icon: Truck,
      description: "Get your shipping label"
    },
    {
      title: "Compensation",
      icon: DollarSign,
      description: "Choose how you want to be paid"
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-2xl animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step > index + 1 ? 'bg-secondary text-white' :
                step === index + 1 ? 'bg-primary text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-center">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step - 1].title}</CardTitle>
          <CardDescription>{steps[step - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Order Number</Label>
                  <Input placeholder="Enter your original order number" required />
                </div>
                <div className="space-y-2">
                  <Label>Purchase Date</Label>
                  <Input type="date" required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Item Condition</Label>
                  <RadioGroup defaultValue="good">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excellent" id="excellent" />
                      <Label htmlFor="excellent">Excellent - Like New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="good" />
                      <Label htmlFor="good">Good - Minor Wear</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fair" id="fair" />
                      <Label htmlFor="fair">Fair - Visible Wear</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Input placeholder="Describe any specific wear or damage" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Shipping Address</Label>
                  <Input placeholder="Street Address" required />
                  <Input placeholder="City" required />
                  <Input placeholder="ZIP Code" required />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose Compensation Method</Label>
                  <RadioGroup defaultValue="store-credit">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="store-credit" id="store-credit" />
                      <Label htmlFor="store-credit">Store Credit (+10% bonus)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash Payment</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-accent-foreground">Estimated Value: $120</p>
                  <p className="text-sm text-accent-foreground/80">Final value subject to condition verification</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              <Button type="submit">
                {step === 4 ? 'Submit Request' : 'Continue'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuybackProcess;