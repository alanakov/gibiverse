import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DashboardTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  className?: string;
}

export function DashboardTable<T>({
  data,
  columns,
  className,
}: DashboardTableProps<T>) {
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <Table className={className}>
        <TableHeader>
          <TableRow className="hover:bg-[#242426]">
            {columns.map((column) => (
              <TableHead key={column.key} className="text-[#9E9EA7]">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="hover:bg-[#242426]">
              {columns.map((column) => (
                <TableCell key={column.key} className="py-4">
                  {column.render
                    ? column.render(item)
                    : String(item[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
