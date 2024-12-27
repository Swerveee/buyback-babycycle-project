import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table";
import { BuybackRequest } from '@/types/buyback';
import BuybackRequestDetails from '../BuybackRequestDetails';
import { useState } from 'react';

export const createBuybackColumns = (
  handleApprove: (id: string) => void,
  handleReject: (id: string) => void,
  getStatusBadgeColor: (status: string) => string,
  wireframeStyles: { button: string },
  isWireframe: boolean
): ColumnDef<BuybackRequest>[] => [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue('date')}
      </div>
    ),
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue('customer')}
      </div>
    ),
  },
  {
    accessorKey: 'product',
    header: 'Product Name',
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue('product')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="text-center">
        <Badge className={getStatusBadgeColor(row.getValue('status'))}>
          {row.getValue('status')}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Estimated Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue('value')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      
      return (
        <div className="text-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant={isWireframe ? "outline" : "default"}
                size="sm"
                className={`${isWireframe ? wireframeStyles.button : ""}`}
              >
                View Details
              </Button>
            </DialogTrigger>
            <BuybackRequestDetails 
              request={row.original}
              onApprove={handleApprove}
              onReject={handleReject}
              getStatusColor={getStatusBadgeColor}
              isWireframe={isWireframe}
              isOpen={isOpen}
              onOpenChange={setIsOpen}
            />
          </Dialog>
        </div>
      );
    },
  },
];