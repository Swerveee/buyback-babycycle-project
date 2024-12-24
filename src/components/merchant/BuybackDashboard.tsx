import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuybackRequests from './BuybackRequests';
import BuybackSettings from './BuybackSettings';
import BuybackMetrics from './BuybackMetrics';

const BuybackDashboard = () => {
  return (
    <div className="p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-[#2d2d2d]">Buyback Program Management</h1>
        <button className="px-4 py-2 bg-[#2261e9] text-white rounded-md hover:bg-[#1a4fc0] transition-colors text-sm">
          Design Site
        </button>
      </div>
      
      <div className="grid gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Setup</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#2261e9]">Free plan</span>
              <button className="text-[#2261e9] hover:underline">Compare Plans</button>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">No domain</span>
              <button className="text-[#2261e9] hover:underline">Connect</button>
            </div>
          </CardContent>
        </Card>
        
        <BuybackMetrics />
        
        <Tabs defaultValue="requests" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-transparent border rounded-lg p-1">
            <TabsTrigger 
              value="requests" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Buyback Requests
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Program Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests">
            <Card className="border-none shadow-sm mt-4">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Buyback Requests</CardTitle>
                <CardDescription>Manage customer buyback requests and process items</CardDescription>
              </CardHeader>
              <CardContent>
                <BuybackRequests />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="border-none shadow-sm mt-4">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Program Settings</CardTitle>
                <CardDescription>Configure your buyback program rules and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <BuybackSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuybackDashboard;