import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PercentageRangeSelectorProps {
  onRangeChange?: (range: [number, number]) => void;
  defaultRange?: [number, number];
  isWireframe?: boolean;
}

const PercentageRangeSelector: React.FC<PercentageRangeSelectorProps> = ({
  onRangeChange,
  defaultRange = [55, 70],
  isWireframe = false
}) => {
  const [range, setRange] = useState<[number, number]>(defaultRange);

  const handleRangeChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setRange(newRange);
    onRangeChange?.(newRange);
  };

  return (
    <Card className={`${isWireframe ? 'border-2 border-dashed' : ''} bg-[#F8F9FA]`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold leading-none tracking-tight">
          Percentage Range Selection
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Define the percentage range for buyback values
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="mb-4">
              <Label className="text-sm font-medium">Current Range: {range[0]}% - {range[1]}%</Label>
            </div>
            <Slider
              defaultValue={range}
              max={100}
              min={0}
              step={1}
              value={range}
              onValueChange={handleRangeChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PercentageRangeSelector;