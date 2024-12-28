import React from 'react';
import { BuybackRequest } from '@/types/buyback';
import BuybackTableRow from './BuybackTableRow';

interface BuybackTableBodyProps {
  requests: BuybackRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  getStatusColor: (status: string) => string;
  isWireframe: boolean;
}

const BuybackTableBody: React.FC<BuybackTableBodyProps> = ({
  requests,
  onApprove,
  onReject,
  getStatusColor,
  isWireframe
}) => {
  return (
    <div className="divide-y divide-gray-200">
      {requests.map((request) => (
        <BuybackTableRow
          key={request.id}
          request={request}
          onApprove={onApprove}
          onReject={onReject}
          getStatusColor={getStatusColor}
          isWireframe={isWireframe}
        />
      ))}
    </div>
  );
};

export default BuybackTableBody;