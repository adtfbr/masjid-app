'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

import TailAdminTable from '@/components/tailadmin/TailAdminTable';
import { confirmAction } from '@/components/admin/ConfirmDialog';

import { Pencil, Power } from 'lucide-react';

type Event = {
  id: number;
  title: string;
  lecturer: string | null;
  start_time: string;
  is_active: boolean;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/admin/events');
      setEvents(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil agenda:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleStatus = async (id: number) => {
    if (!confirmAction('Ubah status agenda ini?')) return;

    try {
      const res = await api.patch(`/admin/events/${id}/toggle`);
      const updatedEvent = res.data.data;

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? updatedEvent : event
        )
      );
    } catch {
      alert('Gagal mengubah status agenda');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header ala TailAdmin */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Agenda Kegiatan
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola agenda dan kegiatan masjid
          </p>
        </div>

        <Link
          href="/admin/events/create"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Tambah Agenda
        </Link>
      </div>

      {/* Card wrapper ala TailAdmin */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <TailAdminTable<Event>
          loading={loading}
          data={events}
          emptyText="Belum ada agenda kegiatan"
          columns={[
            {
              header: 'Judul',
              render: (e) => (
                <span className="font-medium text-slate-800">
                  {e.title}
                </span>
              ),
            },
            {
              header: 'Ustadz',
              render: (e) => e.lecturer || '-',
            },
            {
              header: 'Waktu',
              render: (e) =>
                new Date(e.start_time).toLocaleString('id-ID'),
            },
            {
              header: 'Status',
              render: (e) => (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      e.is_active
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }
                  `}
                >
                  {e.is_active ? 'Aktif' : 'Nonaktif'}
                </span>
              ),
            },
            {
              header: 'Aksi',
              render: (e) => (
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/events/${e.id}/edit`}
                    className="rounded p-1 text-blue-600 hover:bg-blue-50"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => toggleStatus(e.id)}
                    className="rounded p-1 text-slate-600 hover:bg-slate-100"
                    title="Aktif / Nonaktif"
                  >
                    <Power className="h-4 w-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
