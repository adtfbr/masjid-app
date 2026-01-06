'use client';

import { Menu } from 'lucide-react';
import { useSidebarContext } from './SidebarContext';

export default function AppHeader() {
  const { toggleSidebar, toggleMobileSidebar } = useSidebarContext();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4">
      <button
        onClick={handleToggle}
        className="rounded-lg p-2 hover:bg-slate-100"
      >
        <Menu className="h-5 w-5 text-slate-700" />
      </button>

      <h1 className="text-sm font-semibold text-slate-800">
        Admin Dashboard
      </h1>
    </header>
  );
}
