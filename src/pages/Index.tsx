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
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild data-active={item.active}>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
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