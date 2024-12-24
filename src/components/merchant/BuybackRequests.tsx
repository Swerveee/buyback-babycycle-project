import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import BuybackRequestDetails from './BuybackRequestDetails';
import { BuybackRequest } from '@/types/buyback';

const BuybackRequests = () => {
  const requests: BuybackRequest[] = [
    {
      id: "REQ001",
      product: "Vintage Leather Jacket",
      customer: "John Doe",
      date: "2024-02-20",
      status: "pending",
      value: "$120",
      description: "Light wear on sleeves, original zipper intact",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      images: ["placeholder.svg"],
      condition: "Good",
      shippingAddress: "123 Main St, Anytown, USA 12345"
    },
    {
      id: "REQ002",
      product: "Designer Handbag",
      customer: "Jane Smith",
      date: "2024-02-19",
      status: "approved",
      value: "$250",
      description: "Minor scratches on bottom, all hardware functional",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      images: ["placeholder.svg"],
      condition: "Excellent",
      shippingAddress: "456 Oak Ave, Somewhere, USA 67890"
    },
    {
      id: "REQ003",
      product: "Premium Sneakers",
      customer: "Mike Johnson",
      date: "2024-02-18",
      status: "completed",
      value: "$80",
      description: "Slight discoloration, original laces",
      email: "mike.j@example.com",
      phone: "+1 (555) 246-8135",
      images: ["placeholder.svg"],
      condition: "Fair",
      shippingAddress: "789 Pine Rd, Elsewhere, USA 13579"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (id: string) => {
    console.log('Approving request:', id);
    // Add your approve logic here
  };

  const handleReject = (id: string) => {
    console.log('Rejecting request:', id);
    // Add your reject logic here
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.product}</TableCell>
              <TableCell>{request.customer}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{request.value}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <BuybackRequestDetails
                    request={request}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    getStatusColor={getStatusColor}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuybackRequests;
