import React from 'react';
import { TableBody } from "@/components/ui/table";
import { Collapsible } from "@/components/ui/collapsible";
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
          <Collapsible key={row.id}>
            <BuybackTableRow
              row={row}
              getStatusBadgeColor={getStatusBadgeColor}
              isWireframe={isWireframe}
            />
          </Collapsible>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="h-24 text-center">
            No results.
          </td>
        </tr>
      )}
    </TableBody>
  );
};

export default BuybackTableBody;