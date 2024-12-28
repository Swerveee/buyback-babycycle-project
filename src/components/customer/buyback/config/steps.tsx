import { Package, Truck, DollarSign } from 'lucide-react';
import ItemManager from '../components/ItemManager';
import ShippingDetailsStep from '../ShippingDetailsStep';
import CompensationStep from '../CompensationStep';
import { ItemManagerProps, ShippingDetailsStepProps, CompensationStepProps } from '@/types/buyback-types';

type Step = {
  title: string;
  icon: any;
  description: string;
  component: React.ComponentType<ItemManagerProps | ShippingDetailsStepProps | CompensationStepProps>;
};

export const steps: Step[] = [
  {
    title: "Item Details",
    icon: Package,
    description: "Add your items and their condition details",
    component: ItemManager
  },
  {
    title: "Shipping Details",
    icon: Truck,
    description: "Get your prepaid shipping label",
    component: ShippingDetailsStep
  },
  {
    title: "Earn Store Credit",
    icon: DollarSign,
    description: "Trade in your baby's outgrown clothes and receive up to 70% of their value as store credit to use on your next purchase.",
    component: CompensationStep
  }
];