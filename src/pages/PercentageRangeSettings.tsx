import React from 'react';
import PercentageRangeSelector from '@/components/merchant/settings/PercentageRangeSelector';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PercentageRangeSettingsProps {
  isWireframe?: boolean;
}

const PercentageRangeSettings: React.FC<PercentageRangeSettingsProps> = ({ isWireframe = false }) => {
  const handleRangeChange = (range: [number, number]) => {
    console.log('New range selected:', range);
  };

  const handleSave = () => {
    toast.success('Range settings saved successfully');
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Percentage Range Settings</h1>
      <div className="space-y-6">
        <PercentageRangeSelector
          onRangeChange={handleRangeChange}
          defaultRange={[55, 70]}
          isWireframe={isWireframe}
        />
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            className={isWireframe ? 'border-2 border-dashed' : ''}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className={isWireframe ? 'border-2 border-dashed' : ''}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PercentageRangeSettings;