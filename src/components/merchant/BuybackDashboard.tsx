import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PackageSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BuybackRequests from './BuybackRequests';
import BuybackSettings from './BuybackSettings';
import BuybackMetrics from './BuybackMetrics';

interface BuybackDashboardProps {
  isWireframe: boolean;
}

const BuybackDashboard: React.FC<BuybackDashboardProps> = ({ isWireframe }) => {
  const navigate = useNavigate();

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-black shadow-none",
    header: "bg-white border-b-2 border-dashed border-black",
    title: "font-mono text-black",
    description: "font-mono text-black/60",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
    tabs: "border-2 border-dashed border-black",
    tabsTrigger: "data-[state=active]:border-2 data-[state=active]:border-dashed data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white",
    alert: "border-2 border-dashed border-gray-300"
  } : {
    card: "border-none shadow-sm",
    header: "",
    title: "text-xl font-medium",
    description: "",
    button: "bg-[#2261e9] text-white hover:bg-[#1a4fc0]",
    tabs: "bg-transparent border rounded-lg",
    tabsTrigger: "data-[state=active]:bg-white data-[state=active]:shadow-sm",
    alert: ""
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-3xl font-bold ${isWireframe ? "font-mono text-gray-700" : "text-[#2d2d2d]"}`}>
          Buyback Program Management
        </h1>
      </div>

      <Alert className={`${wireframeStyles.alert} bg-blue-50/50 mb-6`}>
        <PackageSearch className={`h-4 w-4 ${isWireframe ? 'text-black' : 'text-blue-500'}`} />
        <AlertDescription className={isWireframe ? "font-mono" : ""}>
          Mark eligible products on the{' '}
          <button 
            onClick={() => navigate('/merchant/products')}
            className="text-blue-500 hover:text-blue-600 underline font-medium"
          >
            Products page
          </button>
          {' '}to make them available for buyers in the buyback program.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-4">
        <BuybackMetrics isWireframe={isWireframe} />
        
        <Tabs defaultValue="requests" className="mt-4">
          <TabsList className={`grid w-full grid-cols-2 p-1 ${wireframeStyles.tabs}`}>
            <TabsTrigger 
              value="requests" 
              className={`text-base ${wireframeStyles.tabsTrigger}`}
            >
              Buyback Requests
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className={`text-base ${wireframeStyles.tabsTrigger}`}
            >
              Program Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests">
            <Card className={wireframeStyles.card}>
              <CardHeader className="py-4">
                <CardTitle className={`${wireframeStyles.title} text-xl`}>Buyback Requests</CardTitle>
                <CardDescription className={`${wireframeStyles.description} text-base`}>
                  Manage customer buyback requests and process items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BuybackRequests isWireframe={isWireframe} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className={wireframeStyles.card}>
              <CardHeader className="py-4">
                <CardTitle className={`${wireframeStyles.title} text-xl`}>Program Settings</CardTitle>
                <CardDescription className={`${wireframeStyles.description} text-base`}>
                  Configure your buyback program rules and pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BuybackSettings isWireframe={isWireframe} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuybackDashboard;