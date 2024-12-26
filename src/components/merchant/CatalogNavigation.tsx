import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CatalogNavigationProps {
  isWireframe: boolean;
  onProductsClick: () => void;
}

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({ isWireframe, onProductsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storeProductsOpen, setStoreProductsOpen] = useState(false);

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
          {isOpen && (
            <NavigationMenuContent>
              <ul className="grid w-48 gap-1 p-2">
                <li>
                  <a
                    href="#"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    Restaurant Menus (New)
                  </a>
                </li>
                <li>
                  <Collapsible 
                    open={storeProductsOpen} 
                    onOpenChange={setStoreProductsOpen}
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-accent hover:text-accent-foreground rounded-md">
                      <span>Store Products</span>
                      {storeProductsOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="animate-accordion-down">
                      <ul className="ml-4 space-y-1">
                        <li>
                          <a
                            href="#"
                            onClick={handleProductsClick}
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            Products
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            Inventory
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            Categories
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            Back in Stock Requests
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            Find Products to Sell
                          </a>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CatalogNavigation;