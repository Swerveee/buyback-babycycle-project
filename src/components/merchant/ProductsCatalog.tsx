import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Package, Plus, HelpCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  type: 'Physical';
}

const mockProducts: Product[] = [
  { id: '1', name: 'Zucchini Squash', sku: 'ZUC001', price: 6.00, stock: 150, status: 'active', type: 'Physical' },
  { id: '2', name: 'Beets Bunch', sku: 'BET002', price: 5.00, stock: 75, status: 'active', type: 'Physical' },
  { id: '3', name: 'Organic Carrots', sku: 'CAR003', price: 6.00, stock: 45, status: 'active', type: 'Physical' },
  { id: '4', name: 'Sweet Potatoes', sku: 'POT004', price: 7.00, stock: 30, status: 'active', type: 'Physical' },
  { id: '5', name: 'Tomato Medley', sku: 'TOM005', price: 8.00, stock: 200, status: 'active', type: 'Physical' },
  { id: '6', name: 'Cucumber Pack', sku: 'CUC006', price: 5.00, stock: 100, status: 'active', type: 'Physical' },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS',
    currencyDisplay: 'symbol'
  }).format(price);
};

const ProductsCatalog: React.FC<{ isWireframe: boolean }> = ({ isWireframe }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSelectAll = () => {
    if (selectedProducts.length === mockProducts.length) {
      setSelectedProducts([]);
      toast({
        title: "All products removed from buyback program",
        description: "Products have been removed from the buyback program.",
      });
    } else {
      setSelectedProducts(mockProducts.map(p => p.id));
      toast({
        title: "All products added to buyback program",
        description: "All products have been added to the buyback program.",
      });
    }
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => {
      const isSelected = prev.includes(productId);
      const newSelection = isSelected
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      toast({
        title: isSelected ? "Product removed" : "Product added",
        description: `Product has been ${isSelected ? 'removed from' : 'added to'} the buyback program.`,
      });
      
      return newSelection;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Products ({mockProducts.length})</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            onClick={handleSelectAll}
            className="flex items-center gap-2"
          >
            {selectedProducts.length === mockProducts.length ? 'Remove All from Buyback' : 'Add All to Buyback'}
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Product
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead className="text-right">Actions</TableHead>
              <TableHead className="flex items-center gap-2">
                Buyback Program
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle to add or remove products from the buyback program</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                    <img 
                      src={`/placeholder.svg`} 
                      alt={product.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  {product.name}
                </TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                    In stock
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    •••
                  </Button>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleProductSelect(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProductsCatalog;