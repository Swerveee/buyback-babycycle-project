import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';
import { BuybackRequest } from '@/types/buyback';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BuybackTableRowProps {
  row: any;
  getStatusBadgeColor: (status: string) => string;
  isWireframe: boolean;
}

const BuybackTableRow: React.FC<BuybackTableRowProps> = ({
  row,
  getStatusBadgeColor,
  isWireframe
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow 
        className="cursor-pointer hover:bg-gray-50"
        data-state={row.getIsSelected() && "selected"}
      >
        <TableCell className="w-4">
          <CollapsibleTrigger asChild onClick={() => setIsOpen(!isOpen)}>
            <Button variant="ghost" size="icon" className="h-4 w-4">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </TableCell>
        {row.getVisibleCells().map((cell: any) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={row.getVisibleCells().length + 1} className="p-0">
          <CollapsibleContent>
            <div className="p-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Details</h4>
                  <p>Email: {row.original.email}</p>
                  <p>Phone: {row.original.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Product Details</h4>
                  <p>Description: {row.original.description}</p>
                  <p>Condition: {row.original.condition}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <p>{row.original.shippingAddress}</p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BuybackTableRow;