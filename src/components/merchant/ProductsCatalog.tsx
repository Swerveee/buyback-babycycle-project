import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
}

// Mock data for demonstration
const mockProducts: Product[] = [
  { id: '1', name: 'Classic T-Shirt', sku: 'TSH001', price: 29.99, stock: 150, status: 'active' },
  { id: '2', name: 'Denim Jeans', sku: 'DNJ002', price: 89.99, stock: 75, status: 'active' },
  { id: '3', name: 'Running Shoes', sku: 'SHO003', price: 129.99, stock: 45, status: 'active' },
  { id: '4', name: 'Winter Jacket', sku: 'JKT004', price: 199.99, stock: 30, status: 'draft' },
  { id: '5', name: 'Baseball Cap', sku: 'CAP005', price: 24.99, stock: 200, status: 'active' },
];

const getStatusColor = (status: Product['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'draft':
      return 'bg-yellow-500';
    case 'archived':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const ProductsCatalog: React.FC<{ isWireframe: boolean }> = ({ isWireframe }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Products</h2>
        </div>
        <Badge variant="outline" className="px-2 py-1">
          {mockProducts.length} products
        </Badge>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={`${getStatusColor(product.status)} text-white`}
                  >
                    {product.status}
                  </Badge>
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