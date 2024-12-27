import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';

interface BuybackFiltersProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  wireframeStyles: {
    input: string;
  };
}

const BuybackFilters = ({
  globalFilter,
  setGlobalFilter,
  statusFilter,
  setStatusFilter,
  wireframeStyles
}: BuybackFiltersProps) => {
  return (
    <div className="flex flex-1 gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search requests..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={`pl-8 ${wireframeStyles.input}`}
        />
      </div>
      <Select
        value={statusFilter}
        onValueChange={setStatusFilter}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Pending Review">Pending Review</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BuybackFilters;