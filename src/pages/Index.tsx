import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Home, CreditCard, ShoppingBag, Package, AppWindow, Smartphone, Inbox, Users, BarChart2, Settings, Receipt, DollarSign, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BuybackDashboard from '@/components/merchant/BuybackDashboard';
import BuybackProcess from '@/components/customer/BuybackProcess';

const Index = () => {
  const [view, setView] = useState<'buyer' | 'merchant'>('buyer');
  const [isWireframe, setIsWireframe] = useState(false);
  const [showBuyback, setShowBuyback] = useState(false);

  const navItems = [
    { title: "SHOP", url: "#" },
    { title: "ABOUT US", url: "#" },
    { title: "CONTACT", url: "#" },
    { title: "BONDING BLOG", url: "#" },
    { 
      title: "BUYBACK PROGRAM", 
      url: "#",
      isHighlighted: true,
      onClick: () => setShowBuyback(false)
    }
  ];

  const wireframeStyles = isWireframe ? {
    nav: "border-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700",
    menuItem: "text-gray-600 hover:bg-gray-200",
    main: "bg-gray-50"
  } : {
    nav: "bg-white shadow-sm",
    button: "bg-primary hover:bg-primary/90",
    menuItem: "text-gray-700 hover:text-primary",
    main: "bg-[#f8f9fb]"
  };

  if (view === 'buyer') {
    return (
      <div className="min-h-screen">
        {/* Announcement Bar */}
        <div className={`w-full py-2 text-center text-white ${isWireframe ? 'bg-gray-300' : 'bg-[#96B6A3]'}`}>
          <p className="text-sm">Save up to 30% instantly on all bundles until December 25th 🎁</p>
        </div>

        {/* Navigation */}
        <nav className={`${wireframeStyles.nav} py-4 px-6`}>
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className={`text-2xl font-bold ${isWireframe ? 'font-mono' : ''}`}>
              Bonsie
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className={`${wireframeStyles.menuItem} ${
                    item.isHighlighted ? 'font-semibold' : ''
                  } text-sm`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className={wireframeStyles.menuItem}>
                <Users className="h-5 w-5" />
              </button>
              <button className={wireframeStyles.menuItem}>
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className={`${wireframeStyles.main} min-h-screen`}>
          <div className="container mx-auto py-8">
            {!showBuyback ? (
              <div className="text-center max-w-2xl mx-auto">
                <h1 className={`text-4xl font-bold mb-6 ${isWireframe ? 'font-mono' : ''}`}>
                  Buyback Program
                </h1>
                <p className="text-gray-600 mb-8">
                  Give your gently used Bonsie clothes a second life and earn rewards! Our buyback program helps reduce waste while putting money back in your pocket.
                </p>
                <div className="grid grid-cols-3 gap-8 mb-12">
                  {[
                    {
                      icon: Package,
                      title: "Easy Returns",
                      description: "Free shipping label provided"
                    },
                    {
                      icon: DollarSign,
                      title: "Quick Payment",
                      description: "Get paid within 48 hours"
                    },
                    {
                      icon: RefreshCw,
                      title: "Sustainable Choice",
                      description: "Help reduce textile waste"
                    }
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className={`p-6 rounded-lg ${
                        isWireframe ? 'border-2 border-dashed border-gray-300' : 'bg-white shadow-sm'
                      }`}
                    >
                      <feature.icon className="w-8 h-8 mb-4 mx-auto" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setShowBuyback(true)}
                  className={`${wireframeStyles.button} text-white px-8 py-3`}
                >
                  Start Buyback Process
                </Button>
              </div>
            ) : (
              <div className="mb-6">
                <button
                  onClick={() => setShowBuyback(false)}
                  className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
                >
                  ← Back to Program Details
                </button>
                <BuybackProcess isWireframe={isWireframe} />
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-[#1e1e1e] border-r border-[#2d2d2d]">
          <SidebarContent>
            <SidebarGroup>
              <div className="px-3 py-2 mb-4">
                <button className={`w-full text-left px-3 py-2 rounded-md bg-[#2d2d2d] text-white hover:bg-[#3d3d3d] transition-colors text-sm`}>
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
        
        <main className={`flex-1 overflow-auto p-6 bg-[#f8f9fb]`}>
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
