import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { BuybackRequest } from '@/types/buyback';
import BuybackFilters from './buyback/BuybackFilters';
import BuybackActions from './buyback/BuybackActions';
import { createBuybackColumns } from './buyback/buybackTableColumns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuybackRequestsProps {
  isWireframe: boolean;
}

const BuybackRequests: React.FC<BuybackRequestsProps> = ({ isWireframe }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const mockRequests: BuybackRequest[] = [
    {
      id: "1",
      product: "Baby T-shirt",
      customer: "Sarah Johnson",
      date: "2024-02-20",
      status: "Pending Review",
      value: "₪15.00",
      description: "Gently used, no stains",
      email: "sarah@example.com",
      phone: "123-456-7890",
      images: ["image1.jpg", "image2.jpg"],
      condition: "Like New",
      shippingAddress: "123 Main St, City, Country"
    },
    {
      id: "2",
      product: "Infant Sleepsuit Set",
      customer: "Michael Brown",
      date: "2024-02-19",
      status: "Approved",
      value: "₪25.00",
      description: "Worn once, excellent condition",
      email: "michael@example.com",
      phone: "234-567-8901",
      images: ["image3.jpg"],
      condition: "Excellent",
      shippingAddress: "456 Oak St, City, Country"
    },
    {
      id: "3",
      product: "Baby Knit Cardigan",
      customer: "Emma Wilson",
      date: "2024-02-18",
      status: "Shipped",
      value: "₪20.00",
      description: "Minor wear on sleeves",
      email: "emma@example.com",
      phone: "345-678-9012",
      images: ["image4.jpg", "image5.jpg"],
      condition: "Good",
      shippingAddress: "789 Pine St, City, Country"
    },
    {
      id: "4",
      product: "Baby Winter Jacket",
      customer: "David Lee",
      date: "2024-02-17",
      status: "Rejected",
      value: "₪30.00",
      description: "Significant wear, torn pocket",
      email: "david@example.com",
      phone: "456-789-0123",
      images: ["image6.jpg"],
      condition: "Poor",
      shippingAddress: "321 Elm St, City, Country"
    },
    {
      id: "5",
      product: "Baby Dress",
      customer: "Lisa Anderson",
      date: "2024-02-21",
      status: "Pending Customer Approval",
      value: "₪22.00",
      description: "Slight discoloration on hem",
      email: "lisa@example.com",
      phone: "567-890-1234",
      images: ["image7.jpg"],
      condition: "Good",
      shippingAddress: "567 Maple St, City, Country"
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending Customer Approval":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = (id: string) => {
    console.log('Approving request:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejecting request:', id);
  };

  const wireframeStyles = isWireframe ? {
    table: "border-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700",
    input: "border-2 border-dashed border-gray-300",
  } : {
    table: "border",
    button: "border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white",
    input: "border-input",
  };

  const columns = useMemo(
    () => createBuybackColumns(
      handleApprove, 
      handleReject, 
      getStatusBadgeColor, 
      wireframeStyles,
      isWireframe
    ),
    [wireframeStyles, isWireframe]
  );

  const table = useReactTable({
    data: mockRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending Review">Pending Review</SelectItem>
            <SelectItem value="Pending Customer Approval">Pending Customer Approval</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
          </SelectContent>
        </Select>
        
        <BuybackFilters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          wireframeStyles={wireframeStyles}
        />
      </div>

      <div className={wireframeStyles.table}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BuybackRequests;