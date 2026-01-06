'use client';

import React from 'react';
import { useSidebarContext } from '@/components/tailadmin/SidebarContext';

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebarContext();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
