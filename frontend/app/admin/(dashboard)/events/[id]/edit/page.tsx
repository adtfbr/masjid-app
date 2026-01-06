'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';

import InputField from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import FileInput from '@/components/form/input/FileInput';
import DatePicker from '@/components/form/date-picker';

type EventForm = {
  title: string;
  lecturer: string;
  location: string;
  description: string;
  start_time: string;
};

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<EventForm>({
    title: '',
    lecturer: '',
    location: '',
    description: '',
    start_time: '',
  });

  /** Ambil data event */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/admin/events/${id}`);
        const event = res.data.data;

        setForm({
          title: event.title ?? '',
          lecturer: event.lecturer ?? '',
          location: event.location ?? '',
          description: event.description ?? '',
          start_time: event.start_time
            ? event.start_time.slice(0, 10)
            : '',
        });
      } catch (err) {
        alert('Gagal mengambil data agenda');
        router.push('/admin/events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, router]);

  /** Submit edit */
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await api.post(`/admin/events/${id}?_method=PATCH`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      router.push('/admin/events');
    } catch {
      alert('Gagal memperbarui agenda');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-slate-500">Memuat data agenda...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        Edit Agenda Kegiatan
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <form onSubmit={submit} className="space-y-6 p-6">
          <InputField
            name="title"
            placeholder="Judul Kegiatan"
            defaultValue={form.title}
            required
          />

          <InputField
            name="lecturer"
            placeholder="Nama Ustadz / Pemateri"
            defaultValue={form.lecturer}
          />

          <InputField
            name="location"
            placeholder="Lokasi"
            defaultValue={form.location}
          />

          <DatePicker
            placeholder="Tanggal Kegiatan"
            defaultDate={form.start_time}
          />

          <TextArea
            placeholder="Deskripsi kegiatan"
            value={form.description}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, description: val }))
            }
          />

          <FileInput />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>

            <button
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
            >
              {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
