import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CatalogNavigationProps {
  onProductsClick: () => void;
}

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({ onProductsClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onProductsClick();
    setIsOpen(false);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-transparent hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              Catalog
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-2">
              <li>
                <a
                  href="#"
                  onClick={handleProductsClick}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Inventory
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Back in Stock Requests
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Find Products to Sell
                </a>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CatalogNavigation;