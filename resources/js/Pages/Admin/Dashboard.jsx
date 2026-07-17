import { Head, Link } from '@inertiajs/react';
import { CakeSlice, MessageSquareQuote, ListOrdered } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ stats }) {
    const cards = [
        { label: 'Menu Cake', value: stats.products, icon: CakeSlice, href: '/admin/products' },
        { label: 'Testimoni', value: stats.testimonials, icon: MessageSquareQuote, href: '/admin/testimonials' },
        { label: 'Langkah Cara Order', value: stats.orderSteps, icon: ListOrdered, href: '/admin/order-steps' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {cards.map((c) => {
                    const Icon = c.icon;
                    return (
                        <Link
                            key={c.label}
                            href={c.href}
                            className="bg-white rounded-2xl border border-cake-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cake-100 text-cake-600 mb-4">
                                <Icon size={20} />
                            </span>
                            <p className="text-3xl font-bold text-cake-900">{c.value}</p>
                            <p className="text-sm text-cake-800/60 mt-1">{c.label}</p>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-8 bg-white rounded-2xl border border-cake-100 p-6">
                <h2 className="font-semibold text-cake-900 mb-2">Selamat datang di Panel Admin AprilCake 🎂</h2>
                <p className="text-sm text-cake-800/70 leading-relaxed">
                    Dari sini kamu bisa mengelola galeri katalog menu cake, testimoni pelanggan, dan langkah cara
                    order yang tampil di landing page. Perubahan akan langsung terlihat di halaman utama setelah disimpan.
                </p>
            </div>
        </AdminLayout>
    );
}
