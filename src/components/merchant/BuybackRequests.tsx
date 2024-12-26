import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import BuybackRequestDetails from './BuybackRequestDetails';
import { BuybackRequest } from '@/types/buyback';
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Product {
  id: string;
  name: string;
  type: string;
  sku: string;
  price: string;
  inventory: string;
  inBuybackProgram: boolean;
  image: string;
}

interface BuybackRequestsProps {
  isWireframe: boolean;
}

const BuybackRequests: React.FC<BuybackRequestsProps> = ({ isWireframe }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Zucchini Squash",
      type: "Physical",
      sku: "ZUCH001",
      price: "₪6.00",
      inventory: "In stock",
      inBuybackProgram: false,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: "2",
      name: "Beets Bunch",
      type: "Physical",
      sku: "BEET001",
      price: "₪5.00",
      inventory: "In stock",
      inBuybackProgram: false,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: "3",
      name: "Organic Carrots",
      type: "Physical",
      sku: "CARR001",
      price: "₪6.00",
      inventory: "In stock",
      inBuybackProgram: false,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: "4",
      name: "Sweet Potatoes",
      type: "Physical",
      sku: "SWPO001",
      price: "₪7.00",
      inventory: "In stock",
      inBuybackProgram: false,
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    {
      id: "5",
      name: "Tomato Medley",
      type: "Physical",
      sku: "TOMA001",
      price: "₪8.00",
      inventory: "In stock",
      inBuybackProgram: false,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: "6",
      name: "Cucumber Pack",
      type: "Physical",
      sku: "CUCU001",
      price: "₪5.00",
      inventory: "In stock",
      inBuybackProgram: false,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ]);

  const [selectedAll, setSelectedAll] = useState(false);

  const toggleBuyback = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inBuybackProgram: !product.inBuybackProgram }
        : product
    ));
  };

  const toggleAllBuyback = () => {
    const newSelectedAll = !selectedAll;
    setSelectedAll(newSelectedAll);
    setProducts(products.map(product => ({
      ...product,
      inBuybackProgram: newSelectedAll
    })));
  };

  const wireframeStyles = isWireframe ? {
    table: "border-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700"
  } : {
    table: "border",
    button: "border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product Catalog</h2>
        <Button
          variant="outline"
          onClick={toggleAllBuyback}
          className={`${wireframeStyles.button} flex items-center gap-2`}
        >
          {selectedAll ? 'Remove All from Buyback' : 'Add All to Buyback'}
        </Button>
      </div>
      
      <div className={wireframeStyles.table}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead className="flex items-center gap-2">
                Buyback Program
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle to add or remove products from the buyback program</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.inventory}</TableCell>
                <TableCell>
                  <Switch
                    checked={product.inBuybackProgram}
                    onCheckedChange={() => toggleBuyback(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={wireframeStyles.button}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BuybackRequests;