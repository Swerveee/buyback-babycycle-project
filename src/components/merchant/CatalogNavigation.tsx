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
    onProductsClick();
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="w-full">
          <Button 
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full justify-start gap-2 hover:bg-gray-100"
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
                className="w-full justify-start text-sm"
              >
                Restaurant Menus (New)
              </Button>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={handleProductsClick}
                  className="w-full justify-start text-sm"
                >
                  Products
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Inventory
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Categories
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Collections
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Gift Cards
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Price Lists
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Back in Stock Requests
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Find Products to Sell
                </Button>
              </div>
            </div>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CatalogNavigation;