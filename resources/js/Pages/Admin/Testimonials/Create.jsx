import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ testimonial }) {
    const isEdit = !!testimonial;

    const { data, setData, post, processing, errors, transform } = useForm({
        _method: isEdit ? 'put' : 'post',
        name: testimonial?.name || '',
        rating: testimonial?.rating || 5,
        comment: testimonial?.comment || '',
        is_active: testimonial?.is_active ?? true,
        sort_order: testimonial?.sort_order || 0,
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();

        transform((formData) => {
            const fd = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'avatar' && value) {
                    fd.append('avatar', value);
                } else if (value !== null && value !== undefined) {
                    fd.append(key, value === true ? 1 : value === false ? 0 : value);
                }
            });
            return fd;
        });

        const url = isEdit
            ? route('admin.testimonials.update', testimonial.id)
            : route('admin.testimonials.store');

        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Testimoni' : 'Tambah Testimoni'}>
            <Head title={isEdit ? 'Edit Testimoni' : 'Tambah Testimoni'} />

            <form onSubmit={submit} className="max-w-xl bg-white rounded-2xl border border-cake-100 p-6 space-y-4" encType="multipart/form-data">
                <div>
                    <label className="block text-sm font-medium text-cake-800 mb-1">Nama Pelanggan</label>
                    <input className="input" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-cake-800 mb-1">Rating (1-5)</label>
                    <select className="input" value={data.rating} onChange={(e) => setData('rating', e.target.value)}>
                        {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Bintang</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-cake-800 mb-1">Komentar</label>
                    <textarea className="input min-h-[100px]" value={data.comment} onChange={(e) => setData('comment', e.target.value)} />
                    {errors.comment && <p className="text-xs text-red-600 mt-1">{errors.comment}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-cake-800 mb-1">Foto Pelanggan (opsional)</label>
                    <input type="file" accept="image/*" onChange={(e) => setData('avatar', e.target.files[0])} />
                    {testimonial?.avatar && !data.avatar && (
                        <img src={`/storage/${testimonial.avatar}`} className="mt-2 h-16 w-16 object-cover rounded-full" />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-cake-800 mb-1">Urutan Tampil</label>
                    <input type="number" className="input" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} />
                </div>

                <label className="flex items-center gap-2 text-sm text-cake-800">
                    <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                    Tampilkan di landing page
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-xl bg-cake-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cake-700 disabled:opacity-60"
                >
                    <Save size={16} /> Simpan
                </button>

                <style>{`.input { width: 100%; border: 1px solid #f8d4e0; border-radius: 0.75rem; padding: 0.6rem 0.9rem; font-size: 0.875rem; }
                .input:focus { outline: none; box-shadow: 0 0 0 2px #ec93b2; }`}</style>
            </form>
        </AdminLayout>
    );
}
