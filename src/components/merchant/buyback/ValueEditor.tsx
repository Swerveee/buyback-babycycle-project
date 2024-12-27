import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

interface ValueEditorProps {
  initialValue: string;
  onValueChange: (newValue: string) => void;
}

const ValueEditor = ({ initialValue, onValueChange }: ValueEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    const formattedValue = `₪${numericValue}`;
    onValueChange(formattedValue);
    setIsEditing(false);
    toast.success("Value updated successfully");
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={value.replace('₪', '')}
          onChange={(e) => setValue(e.target.value)}
          className="w-24"
        />
        <Button onClick={handleSave} size="sm">Save</Button>
        <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">Cancel</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-[#2563eb]">{value}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditing(true)}
        className="p-1 h-auto"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ValueEditor;