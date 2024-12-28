import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from 'date-fns';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table";
import { BuybackRequest } from '@/types/buyback';

export const createBuybackColumns = (
  handleApprove: (id: string) => void,
  handleReject: (id: string) => void,
  getStatusBadgeColor: (status: string) => string,
  wireframeStyles: { button: string },
  isWireframe: boolean
): ColumnDef<BuybackRequest>[] => [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => row.toggleExpanded()}
          className="p-0 hover:bg-transparent"
        >
          {row.getIsExpanded() ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
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
    cell: ({ row }) => {
      const date = parseISO(row.getValue('date'));
      return (
        <div className="text-center">
          {format(date, 'dd/MM/yyyy')}
        </div>
      );
    },
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
];