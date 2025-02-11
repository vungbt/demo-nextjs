import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import React from 'react';

type TableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  className?: string;
  customClass?: {
    wrap?: string;
    table?: string;
  };
};
export function Table<TData>({ columns, data, className, customClass }: TableProps<TData>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={clsx('overflow-x-auto', className, customClass?.wrap)}>
      <table className={clsx('table table-pin-rows table-pin-cols', customClass?.table)}>
        {/* header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* footer */}
        {table.getFooterGroups() && table.getFooterGroups().length > 0 ? (
          <tfoot>
            {table.getFooterGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
