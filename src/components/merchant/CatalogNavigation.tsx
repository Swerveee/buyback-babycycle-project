import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CatalogNavigationProps {
  isWireframe: boolean;
  onProductsClick: () => void;
}

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({ isWireframe, onProductsClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onProductsClick();
  };

  const wireframeStyles = isWireframe ? {
    button: "border-2 border-dashed border-gray-300 bg-gray-50",
    menu: "border-2 border-dashed border-gray-300 bg-gray-50 font-mono"
  } : {
    button: "",
    menu: ""
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="w-full">
          <Button 
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full justify-start gap-2 hover:bg-gray-100 ${wireframeStyles.button}`}
          >
            <span className="flex items-center gap-2">
              Catalog
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          </Button>
          {isOpen && (
            <div className="ml-4 mt-1 space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Restaurant Menus (New)
              </Button>
              <Button
                variant="ghost"
                onClick={handleProductsClick}
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Products
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Inventory
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Categories
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Collections
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Gift Cards
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Price Lists
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Back in Stock Requests
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm ${wireframeStyles.menu}`}
              >
                Find Products to Sell
              </Button>
            </div>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CatalogNavigation;