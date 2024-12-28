import React from 'react';
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from '@tanstack/react-table';
import { BuybackRequest } from '@/types/buyback';
import BuybackTableRow from './BuybackTableRow';

interface BuybackTableBodyProps {
  table: any;
  columns: any[];
  isWireframe: boolean;
}

const BuybackTableBody: React.FC<BuybackTableBodyProps> = ({
  table,
  columns,
  isWireframe,
}) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row: any) => (
          <React.Fragment key={row.id}>
            <TableRow
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell: any) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
            {row.getIsExpanded() && (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <BuybackTableRow
                    request={row.original}
                    onApprove={(id: string) => console.log('Approving request:', id)}
                    onReject={(id: string) => console.log('Rejecting request:', id)}
                    getStatusColor={(status: string) => {
                      switch (status) {
                        case "Pending Review":
                          return "bg-yellow-100 text-yellow-800";
                        case "Approved":
                          return "bg-green-100 text-green-800";
                        case "Shipped":
                          return "bg-blue-100 text-blue-800";
                        case "Rejected":
                          return "bg-red-100 text-red-800";
                        case "Pending Customer Approval":
                          return "bg-purple-100 text-purple-800";
                        default:
                          return "bg-gray-100 text-gray-800";
                      }
                    }}
                    isWireframe={isWireframe}
                  />
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default BuybackTableBody;