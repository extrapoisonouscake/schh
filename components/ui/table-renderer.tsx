import {
  AccessorKeyColumnDefBase,
  DisplayColumnDef,
  flexRender,
  IdIdentifier,
  Row,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends unknown> {
    getRowStyles?: (row: Row<TData>) => React.CSSProperties;
    getRowClassName?: (row: Row<TData>) => string;
  }
}

export function TableRenderer<T>({
  table,
  columns,
}: {
  table: TableType<T>;
  columns: ((AccessorKeyColumnDefBase<any, any> | DisplayColumnDef<any, any>) &
    Partial<IdIdentifier<any, any>>)[];
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                style={table.options.meta?.getRowStyles?.(row)}
                className={table.options.meta?.getRowClassName?.(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No subjects.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}