import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react';

interface BuybackTableHeaderProps {
  onSort: (column: string) => void;
  isWireframe: boolean;
}

const BuybackTableHeader: React.FC<BuybackTableHeaderProps> = ({ onSort, isWireframe }) => {
  const wireframeStyles = isWireframe ? {
    header: "border-2 border-dashed border-black bg-white",
    button: "border-2 border-dashed border-black bg-white hover:bg-black/5 text-black",
  } : {
    header: "bg-gray-50 border-b border-gray-200",
    button: "",
  };

  return (
    <div className={`grid grid-cols-5 gap-4 p-4 ${wireframeStyles.header}`}>
      <Button
        variant="ghost"
        onClick={() => onSort('date')}
        className="text-left font-medium"
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onSort('customer')}
        className="text-left font-medium"
      >
        Customer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onSort('product')}
        className="text-left font-medium"
      >
        Product
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onSort('status')}
        className="text-left font-medium"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onSort('value')}
        className="text-left font-medium"
      >
        Value
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default BuybackTableHeader;