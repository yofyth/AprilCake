import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatRupiah } from '@/lib';

export default function Index({ products }) {
    const destroy = (product) => {
        if (confirm(`Hapus menu "${product.name}"?`)) {
            router.delete(route('admin.products.destroy', product.id));
        }
    };

    return (
        <AdminLayout title="Galeri Katalog">
            <Head title="Galeri Katalog" />

            <div className="flex justify-end mb-4">
                <Link
                    href={route('admin.products.create')}
                    className="inline-flex items-center gap-2 rounded-xl bg-cake-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cake-700"
                >
                    <Plus size={16} /> Tambah Menu
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-cake-100 overflow-hidden shadow-sm">
                        <div className="aspect-[4/3] bg-cake-50 relative">
                            {p.image && (
                                <img src={`/storage/${p.image}`} alt={p.name} className="w-full h-full object-cover" />
                            )}
                            {p.is_bestseller && (
                                <span className="absolute top-3 left-3 flex items-center gap-1 bg-amber-400 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                    <Star size={12} /> Bestseller
                                </span>
                            )}
                            {!p.is_active && (
                                <span className="absolute top-3 right-3 bg-gray-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                    Nonaktif
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-cake-900">{p.name}</h3>
                            <p className="text-sm text-cake-800/60 mt-1 line-clamp-2">{p.tagline}</p>
                            <p className="font-bold text-cake-600 mt-2">{formatRupiah(p.price)}</p>

                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={route('admin.products.edit', p.id)}
                                    className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-cake-200 py-2 text-sm text-cake-700 hover:bg-cake-50"
                                >
                                    <Pencil size={14} /> Edit
                                </Link>
                                <button
                                    onClick={() => destroy(p)}
                                    className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-red-200 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={14} /> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <p className="text-center text-cake-800/60 py-12">Belum ada menu. Klik "Tambah Menu" untuk mulai.</p>
            )}
        </AdminLayout>
    );
}
