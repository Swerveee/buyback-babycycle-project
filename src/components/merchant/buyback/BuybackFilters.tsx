import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, MoreVertical } from 'lucide-react';

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
    <div className="flex items-center gap-2 w-full">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search requests..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={`pl-8 h-9 ${wireframeStyles.input}`}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-3 flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-3"
        >
          <Download className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-2"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <Select
        value={statusFilter}
        onValueChange={setStatusFilter}
      >
        <SelectTrigger className="w-[180px] h-9">
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