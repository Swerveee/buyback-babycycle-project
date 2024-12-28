export interface ItemDetails {
  id: string;
  productDetails: {
    name?: string;
    category?: string;
    thumbnail?: string;
  } | null;
  conditionDetails: any;
}

export interface StepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
  items: ItemDetails[];
}

export interface ItemManagerProps extends StepProps {
  activeItemId: string;
  setActiveItemId: (id: string) => void;
  updateItemDetails: (itemId: string, details: any, type: 'productDetails' | 'conditionDetails') => void;
}