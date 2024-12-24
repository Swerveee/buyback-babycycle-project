import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuybackDashboard from '@/components/merchant/BuybackDashboard';
import BuybackProcess from '@/components/customer/BuybackProcess';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs defaultValue="merchant" className="w-full">
        <div className="border-b bg-white">
          <div className="container mx-auto">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="merchant">Merchant View</TabsTrigger>
              <TabsTrigger value="customer">Customer View</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="merchant">
          <BuybackDashboard />
        </TabsContent>
        
        <TabsContent value="customer">
          <BuybackProcess />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;