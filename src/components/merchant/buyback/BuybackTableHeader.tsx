import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from '@tanstack/react-table';

interface BuybackTableHeaderProps {
  headerGroups: any[];
}

const BuybackTableHeader: React.FC<BuybackTableHeaderProps> = ({ headerGroups }) => {
  return (
    <TableHeader className="bg-gray-50">
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id} className="hover:bg-gray-50">
          {headerGroup.headers.map((header: any) => (
            <TableHead 
              key={header.id}
              className="py-4 px-4 text-left text-sm font-medium text-gray-900"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default BuybackTableHeader;