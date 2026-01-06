'use client';

import Link from 'next/link';

type Props = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function AdminPageHeader({
  title,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
