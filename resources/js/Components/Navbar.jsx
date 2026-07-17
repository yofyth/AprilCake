import { Link, usePage } from '@inertiajs/react';
import { Cake, MessageCircle, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { waLink } from '@/lib';

export default function Navbar({ siteName = 'AprilCake', tagline = '', whatsapp = '', active = 'home' }) {
    const [open, setOpen] = useState(false);
    const { props } = usePage();
    const isLoggedIn = !!props.auth?.user;

    const links = [
        { key: 'home', label: 'Beranda', href: route('home') },
        { key: 'menu', label: 'Menu', href: route('home') + '#menu' },
        { key: 'testimoni', label: 'Testimoni', href: route('home') + '#testimoni' },
        { key: 'order', label: 'Cara Order', href: route('home') + '#cara-order' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-cake-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href={route('home')} className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cake-100 text-cake-600">
                        <Cake size={20} />
                    </span>
                    <span>
                        <span className="block font-serif text-lg font-bold text-cake-800 leading-tight">{siteName}</span>
                        {tagline && <span className="block text-[11px] text-cake-500 leading-tight">{tagline}</span>}
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <a
                            key={l.key}
                            href={l.href}
                            className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                                active === l.key
                                    ? 'text-cake-600 border-cake-500'
                                    : 'text-cake-800/70 border-transparent hover:text-cake-600'
                            }`}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    {isLoggedIn && (
                        <a
                            href="/admin"
                            className="inline-flex items-center gap-2 rounded-full border border-cake-300 px-4 py-2.5 text-sm font-semibold text-cake-700 hover:bg-cake-50 transition-colors"
                        >
                            <LayoutDashboard size={16} /> Panel Admin
                        </a>
                    )}
                    <a
                        href={waLink(whatsapp, 'Halo, saya ingin bertanya tentang menu cake.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-cake-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cake-700 transition-colors"
                    >
                        <MessageCircle size={16} /> Pesan Sekarang
                    </a>
                </div>

                <button className="md:hidden text-cake-800" onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-cake-100 bg-cream px-6 py-4 space-y-3">
                    {links.map((l) => (
                        <a key={l.key} href={l.href} className="block text-sm font-medium text-cake-800">
                            {l.label}
                        </a>
                    ))}
                    {isLoggedIn && (
                        <a
                            href="/admin"
                            className="flex items-center justify-center gap-2 rounded-full border border-cake-300 px-5 py-2.5 text-sm font-semibold text-cake-700"
                        >
                            <LayoutDashboard size={16} /> Panel Admin
                        </a>
                    )}
                    <a
                        href={waLink(whatsapp, 'Halo, saya ingin bertanya tentang menu cake.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-full bg-cake-600 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                        <MessageCircle size={16} /> Pesan Sekarang
                    </a>
                </div>
            )}
        </header>
    );
}
