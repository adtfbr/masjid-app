'use client';

export default function AdminForm({
  title,
  children,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      {children}
    </form>
  );
}
