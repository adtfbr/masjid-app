'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import React from 'react';

type Column<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
};

export default function TailAdminTable<T>({
  columns,
  data,
  loading,
  emptyText = 'Data kosong',
}: Props<T>) {
  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <Table className="w-full text-sm">
        <TableHeader className="bg-slate-50">
          <TableRow>
            {columns.map((c, i) => (
              <TableCell
                key={i}
                isHeader
                className="px-4 py-3 font-semibold text-slate-600"
              >
                {c.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length as any}
                className="px-4 py-8 text-center text-slate-400"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          )}

          {data.map((row, idx) => (
            <TableRow
              key={idx}
              className="border-t hover:bg-slate-50 transition"
            >
              {columns.map((c, i) => (
                <TableCell key={i} className="px-4 py-3">
                  {c.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
