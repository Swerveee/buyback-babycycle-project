import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuybackRequests from './BuybackRequests';
import BuybackSettings from './BuybackSettings';
import BuybackMetrics from './BuybackMetrics';

const BuybackDashboard = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Buyback Program Management</h1>
      
      <BuybackMetrics />
      
      <Tabs defaultValue="requests" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">Buyback Requests</TabsTrigger>
          <TabsTrigger value="settings">Program Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Buyback Requests</CardTitle>
              <CardDescription>Manage customer buyback requests and process items</CardDescription>
            </CardHeader>
            <CardContent>
              <BuybackRequests />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Program Settings</CardTitle>
              <CardDescription>Configure your buyback program rules and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <BuybackSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuybackDashboard;