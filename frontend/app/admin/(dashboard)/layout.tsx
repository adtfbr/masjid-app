'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { 
    LayoutDashboard, 
    Wallet, 
    Calendar, 
    CreditCard, 
    LogOut, 
    Menu, 
    X,
    TrendingDown
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true); // Default open di desktop

    // Proteksi Halaman: Cek token saat load
    useEffect(() => {
        const token = Cookies.get('admin_token');
        if (!token) {
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        Cookies.remove('admin_token');
        Cookies.remove('admin_user');
        router.push('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Donasi Masuk', href: '/admin/donations', icon: Wallet },
        { name: 'Pengeluaran', href: '/admin/expenses', icon: TrendingDown }, // Fitur Baru
        { name: 'Kegiatan', href: '/admin/events', icon: Calendar },
        { name: 'Rekening Bank', href: '/admin/bank-accounts', icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30
                w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 flex flex-col
            `}>
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <span className="text-xl font-bold text-amber-500">Al-Huda Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.href} 
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    isActive 
                                    ? 'bg-amber-600 text-white shadow-lg' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header Mobile */}
                <header className="md:hidden bg-white h-16 border-b border-slate-200 flex items-center px-4 justify-between">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-600">
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                    <span className="font-semibold text-slate-800">Dashboard</span>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}