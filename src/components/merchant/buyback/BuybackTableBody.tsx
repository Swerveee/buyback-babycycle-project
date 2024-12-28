import React from 'react';
import { TableBody } from "@/components/ui/table";
import BuybackTableRow from './BuybackTableRow';

interface BuybackTableBodyProps {
  table: any;
  columns: any[];
  isWireframe: boolean;
  getStatusBadgeColor: (status: string) => string;
}

const BuybackTableBody: React.FC<BuybackTableBodyProps> = ({
  table,
  columns,
  isWireframe,
  getStatusBadgeColor,
}) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row: any) => (
          <BuybackTableRow
            key={row.id}
            row={row}
            getStatusBadgeColor={getStatusBadgeColor}
            isWireframe={isWireframe}
          />
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="h-24 text-center text-sm text-gray-500">
            No results found.
          </td>
        </tr>
      )}
    </TableBody>
  );
};

export default BuybackTableBody;