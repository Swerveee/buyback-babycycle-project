import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar";
import BuybackDashboard from '@/components/merchant/BuybackDashboard';
import { Home, CreditCard, ShoppingBag, Package, AppWindow, Smartphone, Inbox, Users, BarChart2, Settings, Receipt, DollarSign, RefreshCw } from 'lucide-react';

interface MerchantViewProps {
  isWireframe: boolean;
  setIsWireframe: (value: boolean) => void;
  view: 'buyer' | 'merchant';
  setView: (view: 'buyer' | 'merchant') => void;
  showControls: boolean;
  setShowControls: (show: boolean) => void;
}

const MerchantView: React.FC<MerchantViewProps> = ({
  isWireframe,
  setIsWireframe,
  view,
  setView,
  showControls,
  setShowControls
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-[#1e1e1e] border-r border-[#2d2d2d]">
          <SidebarContent>
            <SidebarGroup>
              <div className="px-3 py-2 mb-4">
                <button className="w-full text-left px-3 py-2 rounded-md bg-[#2d2d2d] text-white hover:bg-[#3d3d3d] transition-colors text-sm">
                  Quick Actions
                </button>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    { title: "Home", icon: Home, url: "#" },
                    { title: "Getting Paid", icon: DollarSign, url: "#" },
                    { 
                      title: "Sales", 
                      icon: ShoppingBag, 
                      url: "#",
                      active: true,
                      subItems: [
                        { title: "All Payments", icon: CreditCard, url: "#" },
                        { title: "Orders", icon: Receipt, url: "#" },
                        { title: "Buyback Program", icon: RefreshCw, url: "#", active: true, bold: true },
                        { title: "Gift Card Sales", icon: CreditCard, url: "#" }
                      ]
                    },
                    { title: "Catalog", icon: Package, url: "#" },
                    { title: "Apps", icon: AppWindow, url: "#" },
                    { title: "Site & Mobile App", icon: Smartphone, url: "#" },
                    { title: "Inbox", icon: Inbox, url: "#" },
                    { title: "Customers & Leads", icon: Users, url: "#" },
                    { title: "Analytics", icon: BarChart2, url: "#" },
                    { title: "Settings", icon: Settings, url: "#" },
                  ].map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        data-active={item.active}
                        className="text-[#a3a3a3] hover:text-white hover:bg-[#2d2d2d] data-[active=true]:bg-[#2d2d2d] data-[active=true]:text-white"
                      >
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.subItems && item.active && (
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton
                                asChild
                                isActive={subItem.active}
                                className="text-[#a3a3a3] hover:text-white"
                              >
                                <a href={subItem.url} className="flex items-center gap-2">
                                  <subItem.icon className="h-3.5 w-3.5" />
                                  <span className={subItem.bold ? "font-bold" : ""}>{subItem.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto p-6 bg-[#f8f9fb]">
          {/* Controls Bar */}
          {showControls ? (
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="wireframe-mode"
                  checked={isWireframe}
                  onCheckedChange={setIsWireframe}
                />
                <Label htmlFor="wireframe-mode" className={isWireframe ? "font-mono" : ""}>
                  Wireframe Mode
                </Label>
              </div>
              <div className="flex space-x-4">
                <Button 
                  variant={view === 'buyer' ? 'default' : 'outline'}
                  onClick={() => setView('buyer')}
                  className={isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : ""}
                >
                  Buyer View
                </Button>
                <Button 
                  variant={view === 'merchant' ? 'default' : 'outline'}
                  onClick={() => setView('merchant')}
                  className={isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700' : ""}
                >
                  Merchant View
                </Button>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setShowControls(!showControls)}
                className="bg-white shadow-sm"
              >
                {showControls ? 'Hide Controls' : 'Show Controls'}
              </Button>
            </div>
          )}
          
          <BuybackDashboard isWireframe={isWireframe} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MerchantView;
