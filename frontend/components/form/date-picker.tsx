'use client';

import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Calendar } from 'lucide-react';
import type { Hook, DateOption } from 'flatpickr/dist/types/options';

type PropsType = {
  id?: string;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  placeholder?: string;
};

export default function DatePicker({
  mode = 'single',
  onChange,
  defaultDate,
  placeholder,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      mode,
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'Y-m-d',
      defaultDate,
      onChange,
    });

    return () => {
      fp.destroy();
    };
  }, [mode, onChange, defaultDate]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm
          bg-transparent text-gray-800 border-gray-300
          focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20
          dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
      />

      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <Calendar className="w-5 h-5" />
      </span>
    </div>
  );
}
