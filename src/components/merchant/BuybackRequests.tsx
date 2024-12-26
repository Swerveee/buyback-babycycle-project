import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import BuybackRequestDetails from './BuybackRequestDetails';
import { BuybackRequest } from '@/types/buyback';

interface BuybackRequestsProps {
  isWireframe: boolean;
}

const BuybackRequests: React.FC<BuybackRequestsProps> = ({ isWireframe }) => {
  const mockRequests: BuybackRequest[] = [
    {
      id: "1",
      product: "Baby Onesie - 0-3 months",
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
    }
  ];

  const wireframeStyles = isWireframe ? {
    table: "border-2 border-dashed border-gray-300",
    button: "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700"
  } : {
    table: "border",
    button: "border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
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

  return (
    <div className="space-y-4">
      <div className={wireframeStyles.table}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.date}</TableCell>
                <TableCell>{request.customer}</TableCell>
                <TableCell>{request.product}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>{request.value}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={wireframeStyles.button}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <BuybackRequestDetails 
                      request={request} 
                      onApprove={handleApprove}
                      onReject={handleReject}
                      getStatusColor={getStatusBadgeColor}
                    />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BuybackRequests;