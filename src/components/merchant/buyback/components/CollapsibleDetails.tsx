import React from 'react';
import { Badge } from "@/components/ui/badge";
import ValueEditor from '../ValueEditor';
import ImagePreview from '../ImagePreview';
import CustomerInformation from './CustomerInformation';
import BuybackActions from './BuybackActions';
import { BuybackRequest } from '@/types/buyback';

interface CollapsibleDetailsProps {
  request: BuybackRequest;
  estimatedValue: string;
  setEstimatedValue: (value: string) => void;
  onReject: () => void;
  onApprove: () => void;
  onRequestInfo: () => void;
  getStatusColor: (status: string) => string;
  isWireframe: boolean;
}

const CollapsibleDetails: React.FC<CollapsibleDetailsProps> = ({
  request,
  estimatedValue,
  setEstimatedValue,
  onReject,
  onApprove,
  onRequestInfo,
  getStatusColor,
  isWireframe
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">Product Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Condition</p>
            <p>{request.condition}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <Badge className={getStatusColor(request.status)}>
              {request.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">Estimated Value</p>
          </div>
          <ValueEditor
            initialValue={estimatedValue}
            onValueChange={setEstimatedValue}
            isWireframe={isWireframe}
          />
        </div>
        <div>
          <p className="font-medium">Purchase Date</p>
          <p>10/10/23</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Product Images</h3>
        <div className="grid grid-cols-2 gap-4">
          {request.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <ImagePreview
                images={request.images}
                currentIndex={index}
                onPrevious={() => {}}
                onNext={() => {}}
                isWireframe={isWireframe}
              />
            </div>
          ))}
        </div>
      </div>

      <CustomerInformation
        email={request.email}
        phone={request.phone}
        shippingAddress={request.shippingAddress}
      />

      <BuybackActions
        onReject={onReject}
        onApprove={onApprove}
        onRequestInfo={onRequestInfo}
        isWireframe={isWireframe}
      />
    </div>
  );
};

export default CollapsibleDetails;