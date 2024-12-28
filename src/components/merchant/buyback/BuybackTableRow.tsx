import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <TableRow 
        className={cn(
          "cursor-pointer transition-colors",
          isOpen ? "bg-gray-50" : "hover:bg-gray-50",
          isWireframe ? "border-2 border-dashed" : ""
        )}
      >
        <TableCell className="w-4 p-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </CollapsibleTrigger>
        </TableCell>
        {row.getVisibleCells().map((cell: any) => (
          <TableCell 
            key={cell.id}
            className="py-4 px-4 text-sm text-gray-900"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      <CollapsibleContent>
        <TableRow className={cn(
          "bg-gray-50",
          isWireframe ? "border-2 border-dashed" : ""
        )}>
          <TableCell colSpan={row.getVisibleCells().length + 1} className="p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Customer Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Email:</span> {row.original.email}</p>
                  <p><span className="text-gray-500">Phone:</span> {row.original.phone}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Product Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Description:</span> {row.original.description}</p>
                  <p><span className="text-gray-500">Condition:</span> {row.original.condition}</p>
                </div>
              </div>
              <div className="col-span-2">
                <h4 className="font-semibold mb-2 text-gray-900">Shipping Address</h4>
                <p className="text-sm text-gray-700">{row.original.shippingAddress}</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BuybackTableRow;