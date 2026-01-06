'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

type Column<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
};

export default function AdminTable<T>({
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
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-sm text-slate-400"
              >
                {emptyText}
              </td>
            </tr>
          )}

          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-t align-middle transition hover:bg-slate-50"
            >
              {columns.map((c, i) => (
                <td key={i} className="px-4 py-3 align-middle">
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
