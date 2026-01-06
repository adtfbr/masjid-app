'use client';

import AppHeader from '@/components/tailadmin/AppHeader';
import AppSidebar from '@/components/tailadmin/AppSidebar';
import Backdrop from '@/components/tailadmin/Backdrop';
import { SidebarProvider } from '@/components/tailadmin/SidebarContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <AppSidebar />

        {/* Backdrop (mobile) */}
        <Backdrop />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader />

          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
