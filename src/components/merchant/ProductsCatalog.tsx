import React from 'react';
import BuybackRequests from './BuybackRequests';

const ProductsCatalog: React.FC<{ isWireframe: boolean }> = ({ isWireframe }) => {
  return (
    <div className="p-6">
      <BuybackRequests isWireframe={isWireframe} />
    </div>
  );
};

export default ProductsCatalog;