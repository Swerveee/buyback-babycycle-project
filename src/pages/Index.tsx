import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Home, CreditCard, ShoppingBag, Package, AppWindow, Smartphone, Inbox, Users, BarChart2, Settings, Receipt, DollarSign, RefreshCw, Baby, Gift, Heart, ShoppingCart, Star, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BuybackDashboard from '@/components/merchant/BuybackDashboard';
import BuybackProcess from '@/components/customer/BuybackProcess';

const Index = () => {
  const [view, setView] = useState<'buyer' | 'merchant'>('buyer');
  const [isWireframe, setIsWireframe] = useState(false);

  const buyerMenuItems = [
    { title: "Home", icon: Home, url: "#" },
    { title: "Baby Essentials", icon: Baby, url: "#" },
    { title: "Kids' Gifts", icon: Gift, url: "#" },
    { title: "Wishlist", icon: Heart, url: "#" },
    { 
      title: "My Account", 
      icon: ShoppingCart, 
      url: "#",
      active: true,
      subItems: [
        { title: "Orders", icon: Package, url: "#" },
        { title: "Buyback Program", icon: RefreshCw, url: "#", active: true, bold: true },
        { title: "Rewards", icon: Star, url: "#" }
      ]
    },
    { title: "Help Center", icon: HelpCircle, url: "#" },
  ];

  const merchantMenuItems = [
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
  ];

  const wireframeStyles = isWireframe ? {
    sidebar: "bg-gray-100 border-r-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700",
    menuItem: "text-gray-600 hover:bg-gray-200 data-[active=true]:bg-gray-200 data-[active=true]:text-gray-700",
    subItem: "text-gray-500 hover:text-gray-700",
    main: "bg-gray-50"
  } : {
    sidebar: "bg-[#1e1e1e] border-r border-[#2d2d2d]",
    button: "",
    menuItem: "text-[#a3a3a3] hover:text-white hover:bg-[#2d2d2d] data-[active=true]:bg-[#2d2d2d] data-[active=true]:text-white",
    subItem: "text-[#a3a3a3] hover:text-white",
    main: "bg-[#f8f9fb]"
  };

  const currentMenuItems = view === 'buyer' ? buyerMenuItems : merchantMenuItems;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className={wireframeStyles.sidebar}>
          <SidebarContent>
            <SidebarGroup>
              <div className="px-3 py-2 mb-4">
                <button className={`w-full text-left px-3 py-2 rounded-md ${isWireframe ? 'border-2 border-dashed border-gray-300 bg-gray-200' : 'bg-[#2d2d2d] text-white hover:bg-[#3d3d3d]'} transition-colors text-sm`}>
                  Quick Actions
                </button>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {currentMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        data-active={item.active}
                        className={wireframeStyles.menuItem}
                      >
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span className={`text-sm ${isWireframe ? 'font-mono' : ''}`}>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.subItems && item.active && (
                        <SidebarMenu>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton
                                asChild
                                isActive={subItem.active}
                                className={wireframeStyles.subItem}
                              >
                                <a href={subItem.url} className="flex items-center gap-2">
                                  <subItem.icon className="h-3.5 w-3.5" />
                                  <span className={subItem.bold ? "font-bold" : ""}>{subItem.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className={`flex-1 overflow-auto p-6 ${wireframeStyles.main}`}>
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="wireframe-mode"
                checked={isWireframe}
                onCheckedChange={setIsWireframe}
              />
              <Label htmlFor="wireframe-mode" className={isWireframe ? "font-mono" : ""}>Wireframe Mode</Label>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant={view === 'buyer' ? 'default' : 'outline'}
                onClick={() => setView('buyer')}
                className={isWireframe ? wireframeStyles.button : ""}
              >
                Buyer View
              </Button>
              <Button 
                variant={view === 'merchant' ? 'default' : 'outline'}
                onClick={() => setView('merchant')}
                className={isWireframe ? wireframeStyles.button : ""}
              >
                Merchant View
              </Button>
            </div>
          </div>
          
          {view === 'buyer' ? (
            <BuybackProcess isWireframe={isWireframe} />
          ) : (
            <BuybackDashboard isWireframe={isWireframe} />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;