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
          className="text-left"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'product',
    header: 'Product Name',
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue('product')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="text-left">
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
          className="text-left"
        >
          Estimated Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-left">
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
      );
    },
  },
];