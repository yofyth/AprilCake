import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard, CakeSlice, MessageSquareQuote, ListOrdered,
    Settings, LogOut, Cake, CheckCircle2, ExternalLink, UserCircle,
} from 'lucide-react';

const NAV = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, match: '/admin' },
    { href: '/admin/products', label: 'Galeri Katalog', icon: CakeSlice, match: '/admin/products' },
    { href: '/admin/testimonials', label: 'Testimoni', icon: MessageSquareQuote, match: '/admin/testimonials' },
    { href: '/admin/order-steps', label: 'Cara Order', icon: ListOrdered, match: '/admin/order-steps' },
    { href: '/admin/settings', label: 'Pengaturan', icon: Settings, match: '/admin/settings' },
];

export default function AdminLayout({ children, title }) {
    const { url, props } = usePage();
    const flashSuccess = props.flash?.success;
    const user = props.auth?.user;

    const logout = (e) => {
        e.preventDefault();
        router.post(route('admin.logout'));
    };

    return (
        <div className="min-h-screen bg-cake-50 flex">
            <aside className="w-64 bg-cake-800 text-white flex flex-col fixed inset-y-0">
                <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                        <Cake size={18} />
                    </span>
                    <div>
                        <p className="font-serif font-bold leading-tight">AprilCake</p>
                        <p className="text-[11px] text-cake-200 leading-tight">Admin Panel</p>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {NAV.map((item) => {
                        const isActive = url === item.match || url.startsWith(item.match + '/');
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive ? 'bg-cake-600 text-white' : 'text-cake-200 hover:bg-white/5'
                                }`}
                            >
                                <Icon size={18} /> {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-white/10">
                    <form onSubmit={logout}>
                        <button type="submit" className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-cake-200 hover:bg-white/5">
                            <LogOut size={18} /> Keluar
                        </button>
                    </form>
                </div>
            </aside>

            <div className="flex-1 ml-64">
                <header className="bg-white border-b border-cake-100 px-8 py-5 flex items-center justify-between">
                    <h1 className="font-serif text-xl font-bold text-cake-900">{title}</h1>

                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-cake-200 px-4 py-2 text-sm font-medium text-cake-700 hover:bg-cake-50 transition-colors"
                        >
                            <ExternalLink size={15} /> Lihat Beranda
                        </a>

                        {user && (
                            <div className="flex items-center gap-2 pl-4 border-l border-cake-100 text-sm text-cake-800">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cake-100 text-cake-600">
                                    <UserCircle size={18} />
                                </span>
                                <span className="font-medium">{user.name}</span>
                            </div>
                        )}
                    </div>
                </header>

                <main className="p-8">
                    {flashSuccess && (
                        <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
                            <CheckCircle2 size={16} /> {flashSuccess}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}