import React from 'react';

interface ProductInformationProps {
  condition: string;
  description: string;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  condition,
  description
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Product Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Condition</p>
          <p>{condition}</p>
        </div>
        <div>
          <p className="font-medium">Description</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;