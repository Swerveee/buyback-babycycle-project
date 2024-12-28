export interface ItemDetails {
  id: string;
  productDetails: {
    name?: string;
    category?: string;
    thumbnail?: string;
  } | null;
  conditionDetails: any;
}

export interface BaseStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
  items: ItemDetails[];
}

export interface ItemManagerProps extends BaseStepProps {
  activeItemId: string;
  setActiveItemId: (id: string) => void;
  updateItemDetails: (itemId: string, details: any, type: 'productDetails' | 'conditionDetails') => void;
}

export interface ShippingDetailsStepProps extends BaseStepProps {}

export interface CompensationStepProps extends BaseStepProps {}