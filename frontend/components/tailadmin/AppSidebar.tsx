'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Wallet,
  HandCoins,
} from 'lucide-react';

import { useSidebarContext } from '@/components/tailadmin/SidebarContext';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/admin/dashboard',
  },
  {
    name: 'Agenda Kegiatan',
    icon: <Calendar className="w-5 h-5" />,
    path: '/admin/events',
  },
  {
    name: 'Rekening Donasi',
    icon: <CreditCard className="w-5 h-5" />,
    path: '/admin/bank-accounts',
  },
  {
    name: 'Pengeluaran',
    icon: <Wallet className="w-5 h-5" />,
    path: '/admin/expenses',
  },
  {
    name: 'Verifikasi Donasi',
    icon: <HandCoins className="w-5 h-5" />,
    path: '/admin/donations',
  },
];

export default function AppSidebar() {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    isMobile,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebarContext();

  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => pathname.startsWith(path),
    [pathname]
  );

  const showLabel = isExpanded || isHovered || isMobileOpen;

  const handleItemClick = () => {
    if (isMobile) {
      toggleMobileSidebar();
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300
        ${showLabel ? 'w-[280px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}
      onMouseEnter={() => !isExpanded && !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isExpanded && setIsHovered(false)}
    >
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 font-bold text-slate-800">
        {showLabel ? (
          <span className="text-lg">Admin Masjid</span>
        ) : (
          <span className="text-lg">🕌</span>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-6 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            onClick={handleItemClick}
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors
              ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
              }
            `}
          >
            {item.icon}
            {showLabel && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
