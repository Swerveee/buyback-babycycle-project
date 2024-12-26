import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Product {
  id: string;
  name: string;
  type: string;
  sku: string;
  price: string;
  inBuybackProgram: boolean;
}

interface BuybackRequestsProps {
  isWireframe: boolean;
}

const BuybackRequests: React.FC<BuybackRequestsProps> = ({ isWireframe }) => {
  // Mock products data - in a real app this would come from an API
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Zucchini Squash', type: 'Physical', sku: 'ZS001', price: '₪6.00', inBuybackProgram: false },
    { id: '2', name: 'Beets Bunch', type: 'Physical', sku: 'BB001', price: '₪5.00', inBuybackProgram: false },
    { id: '3', name: 'Organic Carrots', type: 'Physical', sku: 'OC001', price: '₪6.00', inBuybackProgram: false },
    { id: '4', name: 'Sweet Potatoes', type: 'Physical', sku: 'SP001', price: '₪7.00', inBuybackProgram: false },
    { id: '5', name: 'Tomato Medley', type: 'Physical', sku: 'TM001', price: '₪8.00', inBuybackProgram: false },
    { id: '6', name: 'Cucumber Pack', type: 'Physical', sku: 'CP001', price: '₪5.00', inBuybackProgram: false },
  ]);

  const toggleProductBuyback = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inBuybackProgram: !product.inBuybackProgram }
        : product
    ));
  };

  const toggleAllProducts = (value: boolean) => {
    setProducts(products.map(product => ({
      ...product,
      inBuybackProgram: value
    })));
  };

  const wireframeStyles = isWireframe ? {
    table: "border-2 border-dashed border-black",
    row: "border-b-2 border-dashed border-black hover:bg-black/5",
    cell: "border-r-2 border-dashed border-black",
    checkbox: "border-2 border-dashed border-black data-[state=checked]:bg-black",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
  } : {
    table: "border rounded-lg",
    row: "border-b hover:bg-gray-50",
    cell: "",
    checkbox: "",
    button: "bg-white border shadow-sm hover:bg-gray-50",
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => toggleAllProducts(true)}
            className={wireframeStyles.button}
          >
            Select All for Buyback
          </Button>
          <Button
            variant="outline"
            onClick={() => toggleAllProducts(false)}
            className={wireframeStyles.button}
          >
            Deselect All
          </Button>
        </div>
      </div>

      <div className={`rounded-md border ${wireframeStyles.table}`}>
        <Table>
          <TableHeader>
            <TableRow className={wireframeStyles.row}>
              <TableHead className={wireframeStyles.cell}>Name</TableHead>
              <TableHead className={wireframeStyles.cell}>Type</TableHead>
              <TableHead className={wireframeStyles.cell}>SKU</TableHead>
              <TableHead className={wireframeStyles.cell}>Price</TableHead>
              <TableHead className={wireframeStyles.cell}>Buyback Program</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className={wireframeStyles.row}>
                <TableCell className={wireframeStyles.cell}>{product.name}</TableCell>
                <TableCell className={wireframeStyles.cell}>{product.type}</TableCell>
                <TableCell className={wireframeStyles.cell}>{product.sku}</TableCell>
                <TableCell className={wireframeStyles.cell}>{product.price}</TableCell>
                <TableCell className={wireframeStyles.cell}>
                  <Switch
                    checked={product.inBuybackProgram}
                    onCheckedChange={() => toggleProductBuyback(product.id)}
                    className={`${isWireframe ? 'border-2 border-dashed border-black' : ''}`}
                  />
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