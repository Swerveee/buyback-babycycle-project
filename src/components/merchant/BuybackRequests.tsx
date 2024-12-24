import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const BuybackRequests = () => {
  const requests = [
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
                  <DialogContent className="max-w-2xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold text-[#333333]">
                        Buyback Request Details
                      </DialogTitle>
                      <DialogDescription className="text-[#8E9196]">
                        Request ID: {request.id}
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-[#333333] mb-2">Product Information</h3>
                          <div className="grid grid-cols-2 gap-4 text-[#555555]">
                            <div>
                              <p className="font-medium">Product Name</p>
                              <p>{request.product}</p>
                            </div>
                            <div>
                              <p className="font-medium">Condition</p>
                              <p>{request.condition}</p>
                            </div>
                            <div>
                              <p className="font-medium">Offered Value</p>
                              <p>{request.value}</p>
                            </div>
                            <div>
                              <p className="font-medium">Status</p>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="bg-[#F1F1F1]" />
                        
                        <div>
                          <h3 className="text-lg font-medium text-[#333333] mb-2">Product Condition</h3>
                          <p className="text-[#555555]">{request.description}</p>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            {request.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Product condition ${index + 1}`}
                                className="rounded-md border border-[#eee] object-cover w-full h-48"
                              />
                            ))}
                          </div>
                        </div>
                        
                        <Separator className="bg-[#F1F1F1]" />
                        
                        <div>
                          <h3 className="text-lg font-medium text-[#333333] mb-2">Customer Information</h3>
                          <div className="grid grid-cols-2 gap-4 text-[#555555]">
                            <div>
                              <p className="font-medium">Name</p>
                              <p>{request.customer}</p>
                            </div>
                            <div>
                              <p className="font-medium">Email</p>
                              <p>{request.email}</p>
                            </div>
                            <div>
                              <p className="font-medium">Phone</p>
                              <p>{request.phone}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="bg-[#F1F1F1]" />
                        
                        <div>
                          <h3 className="text-lg font-medium text-[#333333] mb-2">Shipping Information</h3>
                          <p className="text-[#555555]">{request.shippingAddress}</p>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
                      >
                        Reject
                      </Button>
                      <Button
                        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                      >
                        Approve
                      </Button>
                    </div>
                  </DialogContent>
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