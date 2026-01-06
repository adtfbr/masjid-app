'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

// TailAdmin components (SESUSAI FILE KAMU)
import InputField from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import FileInput from '@/components/form/input/FileInput';
import DatePicker from '@/components/form/date-picker';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Karena TextArea & DatePicker tidak otomatis masuk FormData
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<string | null>(null);

  // FileInput tidak punya name → pakai ref
  const posterRef = useRef<HTMLInputElement | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Inject manual field yang tidak otomatis
    if (description) {
      formData.set('description', description);
    }

    if (startTime) {
      formData.set('start_time', startTime);
    }

    if (posterRef.current?.files?.[0]) {
      formData.set('poster', posterRef.current.files[0]);
    }

    try {
      await api.post('/admin/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.push('/admin/events');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan agenda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        Tambah Agenda Kegiatan
      </h1>

      <form
        onSubmit={submit}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <InputField
          name="title"
          placeholder="Judul Kegiatan"
          required
        />

        <InputField
          name="lecturer"
          placeholder="Nama Ustadz / Pemateri"
        />

        <InputField
          name="location"
          placeholder="Lokasi Kegiatan"
          defaultValue="Masjid Al-Huda"
        />

        <DatePicker
          id="start_time"
          label="Waktu Pelaksanaan"
          placeholder="Pilih tanggal"
          onChange={(dates) => {
            const date = Array.isArray(dates) ? dates[0] : null;
            if (date instanceof Date) {
              setStartTime(
                date.toISOString().slice(0, 16)
              );
            }
          }}
        />

        <TextArea
          placeholder="Deskripsi kegiatan"
          rows={4}
          value={description}
          onChange={setDescription}
        />

        <FileInput
          className="mt-1"
          onChange={(e) => {
            posterRef.current = e.target;
          }}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Menyimpan...' : 'Simpan Agenda'}
          </button>
        </div>
      </form>
    </div>
  );
}
