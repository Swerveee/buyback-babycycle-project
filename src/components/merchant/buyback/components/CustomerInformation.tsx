import React from 'react';

interface CustomerInformationProps {
  email: string;
  phone: string;
  shippingAddress: string;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({
  email,
  phone,
  shippingAddress
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="font-medium">Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="font-medium">Phone</p>
          <p>{phone}</p>
        </div>
        <div>
          <p className="font-medium">Shipping Address</p>
          <p>{shippingAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation;