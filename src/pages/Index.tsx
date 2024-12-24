import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, Package, CreditCard, ShoppingCart, AppWindow, Smartphone, Inbox, Users, BarChart2, Settings } from 'lucide-react';
import BuybackDashboard from '@/components/merchant/BuybackDashboard';

const Index = () => {
  const menuItems = [
    { title: "Home", icon: Home, url: "#" },
    { title: "Getting Paid", icon: CreditCard, url: "#" },
    { title: "Sales", icon: ShoppingCart, url: "#" },
    { title: "Catalog", icon: Package, url: "#" },
    { title: "Apps", icon: AppWindow, url: "#", active: true },
    { title: "Site & Mobile App", icon: Smartphone, url: "#" },
    { title: "Inbox", icon: Inbox, url: "#" },
    { title: "Customers & Leads", icon: Users, url: "#" },
    { title: "Analytics", icon: BarChart2, url: "#" },
    { title: "Settings", icon: Settings, url: "#" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-[#f8f9fb]">
        <Sidebar className="bg-[#1e1e1e] border-r border-[#2d2d2d]">
          <SidebarContent>
            <SidebarGroup>
              <div className="px-3 py-4">
                <img src="/lovable-uploads/5cf0a6b4-cfee-4fc0-9c72-a9ee158a5791.png" alt="Logo" className="h-6 w-auto" />
              </div>
              <div className="px-3 py-2 mb-4">
                <button className="w-full text-left px-3 py-2 rounded-md bg-[#2d2d2d] text-white text-sm hover:bg-[#3d3d3d] transition-colors">
                  Quick Actions
                </button>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
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
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <BuybackDashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;