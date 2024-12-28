import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { RefreshCw, Package, DollarSign, Info } from 'lucide-react';
import FeatureCard from '@/components/customer/buyback/onboarding/FeatureCard';
import ActivationCard from '@/components/customer/buyback/onboarding/ActivationCard';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar";
import { Home, CreditCard, ShoppingBag, Package as PackageIcon, AppWindow, Smartphone, Inbox, Users, BarChart2, Settings, Receipt, DollarSign as DollarSignIcon, RefreshCw as RefreshCwIcon } from 'lucide-react';

interface BuybackOnboardingProps {
  isWireframe: boolean;
  onWireframeChange: (value: boolean) => void;
}

const BuybackOnboarding: React.FC<BuybackOnboardingProps> = ({ isWireframe, onWireframeChange }) => {
  const wireframeStyles = isWireframe ? {
    button: "border-2 border-dashed border-gray-300 bg-gray-50",
    text: "font-mono"
  } : {
    button: "",
    text: ""
  };

  const features = [
    {
      icon: RefreshCw,
      title: "Sustainable Returns",
      description: "Reduce waste and increase customer satisfaction with our buyback program"
    },
    {
      icon: Package,
      title: "Easy Management",
      description: "Streamlined process for handling returns and buyback requests"
    },
    {
      icon: DollarSign,
      title: "Increase Revenue",
      description: "Turn returns into new sales opportunities"
    }
  ];

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
                    { title: "Home", icon: Home, url: "/" },
                    { title: "Getting Paid", icon: DollarSignIcon, url: "#" },
                    { 
                      title: "Sales", 
                      icon: ShoppingBag, 
                      url: "#",
                      active: true,
                      subItems: [
                        { title: "All Payments", icon: CreditCard, url: "#" },
                        { title: "Orders", icon: Receipt, url: "#" },
                        { title: "Buyback Program", icon: RefreshCwIcon, url: "#", active: true, bold: true },
                        { title: "Gift Card Sales", icon: CreditCard, url: "#" }
                      ]
                    },
                    { title: "Catalog", icon: PackageIcon, url: "#" },
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

        <main className="flex-1 bg-[#f8f9fb] p-6 w-full">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-end">
              <Toggle
                pressed={isWireframe}
                onPressedChange={onWireframeChange}
                className={`${wireframeStyles.button} px-4`}
              >
                Wireframe Mode
              </Toggle>
            </div>

            <div className="text-center space-y-3">
              <h1 className={`text-4xl font-bold ${wireframeStyles.text}`}>
                Buyback Program
              </h1>
              <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${wireframeStyles.text}`}>
                Activate your buyback program now and start offering your customers an easy way to return and exchange products while earning store points for their next purchase!
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-primary hover:text-primary/80"
                onClick={() => window.open('#', '_blank')}
              >
                <Info className="w-4 h-4 mr-1" />
                More Details
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  isWireframe={isWireframe}
                />
              ))}
            </div>

            <ActivationCard isWireframe={isWireframe} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BuybackOnboarding;