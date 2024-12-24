export interface BuybackRequest {
  id: string;
  product: string;
  customer: string;
  date: string;
  status: string;
  value: string;
  description: string;
  email: string;
  phone: string;
  images: string[];
  condition: string;
  shippingAddress: string;
}