import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StarRating from '@/Components/StarRating';

export default function Index({ testimonials }) {
    const destroy = (t) => {
        if (confirm(`Hapus testimoni dari "${t.name}"?`)) {
            router.delete(route('admin.testimonials.destroy', t.id));
        }
    };

    return (
        <AdminLayout title="Testimoni">
            <Head title="Testimoni" />

            <div className="flex justify-end mb-4">
                <Link
                    href={route('admin.testimonials.create')}
                    className="inline-flex items-center gap-2 rounded-xl bg-cake-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cake-700"
                >
                    <Plus size={16} /> Tambah Testimoni
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-white rounded-2xl border border-cake-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-cake-100 overflow-hidden flex-shrink-0">
                                {t.avatar && <img src={`/storage/${t.avatar}`} className="w-full h-full object-cover" />}
                            </div>
                            <div>
                                <p className="font-semibold text-cake-900 text-sm">{t.name}</p>
                                <StarRating rating={t.rating} size={14} />
                            </div>
                        </div>
                        <p className="text-sm text-cake-800/70 leading-relaxed line-clamp-3">{t.comment}</p>
                        {!t.is_active && (
                            <span className="inline-block mt-3 text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Nonaktif</span>
                        )}
                        <div className="mt-4 flex gap-2">
                            <Link
                                href={route('admin.testimonials.edit', t.id)}
                                className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-cake-200 py-2 text-sm text-cake-700 hover:bg-cake-50"
                            >
                                <Pencil size={14} /> Edit
                            </Link>
                            <button
                                onClick={() => destroy(t)}
                                className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-red-200 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <Trash2 size={14} /> Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <p className="text-center text-cake-800/60 py-12">Belum ada testimoni.</p>
            )}
        </AdminLayout>
    );
}
