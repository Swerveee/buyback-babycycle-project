import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BuybackRequest } from '@/types/buyback';
import BuybackFilters from './buyback/BuybackFilters';
import BuybackTableHeader from './buyback/BuybackTableHeader';
import BuybackTableBody from './buyback/BuybackTableBody';

interface BuybackRequestsProps {
  isWireframe: boolean;
}

const BuybackRequests: React.FC<BuybackRequestsProps> = ({ isWireframe }) => {
  const [sorting, setSorting] = useState<{ column: string; direction: 'asc' | 'desc' }>({
    column: 'date',
    direction: 'desc'
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const mockRequests: BuybackRequest[] = [
    {
      id: "1",
      product: "Baby T-shirt",
      customer: "Sarah Johnson",
      date: "2024-02-20",
      status: "Pending Review",
      value: "₪75.50",
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
      value: "₪92.00",
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
      value: "₪68.75",
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
      status: "Resold",
      value: "₪85.25",
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
      value: "₪95.50",
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
      case "Resold":
        return "bg-teal-100 text-teal-800";
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

  const handleSort = (column: string) => {
    setSorting(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const wireframeStyles = isWireframe ? {
    card: "border-2 border-dashed border-gray-300",
    input: "border-2 border-dashed border-gray-300",
  } : {
    card: "border rounded-lg shadow-sm bg-white",
    input: "border-input",
  };

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
            <SelectItem value="Resold">Resold</SelectItem>
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

      <div className={wireframeStyles.card}>
        <BuybackTableHeader
          onSort={handleSort}
          isWireframe={isWireframe}
        />
        <BuybackTableBody
          requests={mockRequests}
          onApprove={handleApprove}
          onReject={handleReject}
          getStatusColor={getStatusBadgeColor}
          isWireframe={isWireframe}
        />
      </div>
    </div>
  );
};

export default BuybackRequests;