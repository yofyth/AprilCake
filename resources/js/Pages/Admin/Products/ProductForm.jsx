import { useForm } from '@inertiajs/react';
import { Plus, Trash2, Save } from 'lucide-react';
import { ICON_OPTIONS } from '@/Components/DynamicIcon';

const emptyFeature = { icon: 'cake-slice', title: '', desc: '' };

export default function ProductForm({ product, onSubmit, submitLabel = 'Simpan' }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        _method: product ? 'put' : 'post',
        name: product?.name || '',
        tagline: product?.tagline || '',
        description: product?.description || '',
        category: product?.category || '',
        price: product?.price || '',
        badge: product?.badge || '',
        is_bestseller: product?.is_bestseller || false,
        is_active: product?.is_active ?? true,
        sort_order: product?.sort_order || 0,
        image: null,
        gallery: [],
        features: product?.features?.length ? product.features : [emptyFeature],
    });

    const updateFeature = (i, key, value) => {
        const next = [...data.features];
        next[i] = { ...next[i], [key]: value };
        setData('features', next);
    };

    const addFeature = () => setData('features', [...data.features, emptyFeature]);
    const removeFeature = (i) => setData('features', data.features.filter((_, idx) => idx !== i));

    const submit = (e) => {
        e.preventDefault();

        transform((formData) => {
            const fd = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'gallery') {
                    (value || []).forEach((file) => fd.append('gallery[]', file));
                } else if (key === 'features') {
                    value.forEach((f) => {
                        fd.append('feature_icon[]', f.icon);
                        fd.append('feature_title[]', f.title);
                        fd.append('feature_desc[]', f.desc || '');
                    });
                } else if (key === 'image' && value) {
                    fd.append('image', value);
                } else if (value !== null && value !== undefined) {
                    fd.append(key, value === true ? 1 : value === false ? 0 : value);
                }
            });
            return fd;
        });

        onSubmit(post);
    };

    return (
        <form onSubmit={submit} className="space-y-8" encType="multipart/form-data">
            <div className="bg-white rounded-2xl border border-cake-100 p-6 space-y-4">
                <h2 className="font-semibold text-cake-900">Informasi Menu</h2>

                <Field label="Nama Menu" error={errors.name}>
                    <input
                        className="input"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </Field>

                <Field label="Tagline (subjudul singkat)" error={errors.tagline}>
                    <input
                        className="input"
                        value={data.tagline}
                        onChange={(e) => setData('tagline', e.target.value)}
                        placeholder='Contoh: "Lembut & Klasik dengan Rasa Khas Red Velvet"'
                    />
                </Field>

                <Field label="Deskripsi" error={errors.description}>
                    <textarea
                        className="input min-h-[100px]"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Kategori" error={errors.category}>
                        <input
                            className="input"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                        />
                    </Field>
                    <Field label="Harga (Rp)" error={errors.price}>
                        <input
                            type="number"
                            className="input"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Badge (opsional)" error={errors.badge}>
                        <input
                            className="input"
                            value={data.badge}
                            onChange={(e) => setData('badge', e.target.value)}
                            placeholder="Best Seller"
                        />
                    </Field>
                    <Field label="Urutan Tampil" error={errors.sort_order}>
                        <input
                            type="number"
                            className="input"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', e.target.value)}
                        />
                    </Field>
                </div>

                <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-cake-800">
                        <input
                            type="checkbox"
                            checked={data.is_bestseller}
                            onChange={(e) => setData('is_bestseller', e.target.checked)}
                        />
                        Tandai sebagai Bestseller
                    </label>
                    <label className="flex items-center gap-2 text-sm text-cake-800">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        Tampilkan di landing page
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-cake-100 p-6 space-y-4">
                <h2 className="font-semibold text-cake-900">Foto Menu</h2>

                <Field label="Foto Utama (tampil di kartu menu & halaman detail)" error={errors.image}>
                    <input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} />
                    {product?.image && !data.image && (
                        <img src={`/storage/${product.image}`} className="mt-2 h-24 w-24 object-cover rounded-lg" />
                    )}
                </Field>

                <Field label="Galeri Foto (thumbnail di halaman detail, bisa pilih beberapa)" error={errors.gallery}>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setData('gallery', Array.from(e.target.files))}
                    />
                    {product?.gallery?.length > 0 && data.gallery.length === 0 && (
                        <div className="mt-2 flex gap-2 flex-wrap">
                            {product.gallery.map((g, i) => (
                                <img key={i} src={`/storage/${g}`} className="h-16 w-16 object-cover rounded-lg" />
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-cake-800/50 mt-1">Mengunggah galeri baru akan mengganti seluruh galeri lama.</p>
                </Field>
            </div>

            <div className="bg-white rounded-2xl border border-cake-100 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-cake-900">Fitur / Keunggulan Menu</h2>
                    <button type="button" onClick={addFeature} className="text-sm text-cake-600 flex items-center gap-1 font-medium">
                        <Plus size={14} /> Tambah
                    </button>
                </div>
                <p className="text-xs text-cake-800/50 -mt-2">Tampil sebagai 3-4 poin keunggulan di halaman detail menu (seperti "Tekstur lembut & moist").</p>

                {data.features.map((f, i) => (
                    <div key={i} className="grid grid-cols-12 gap-3 items-start border-t border-cake-50 pt-4 first:border-t-0 first:pt-0">
                        <div className="col-span-2">
                            <select
                                className="input"
                                value={f.icon}
                                onChange={(e) => updateFeature(i, 'icon', e.target.value)}
                            >
                                {ICON_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-4">
                            <input
                                className="input"
                                placeholder="Judul singkat"
                                value={f.title}
                                onChange={(e) => updateFeature(i, 'title', e.target.value)}
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                className="input"
                                placeholder="Keterangan (opsional)"
                                value={f.desc}
                                onChange={(e) => updateFeature(i, 'desc', e.target.value)}
                            />
                        </div>
                        <button type="button" onClick={() => removeFeature(i)} className="col-span-1 text-red-500 mt-2">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-2 rounded-xl bg-cake-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cake-700 disabled:opacity-60"
            >
                <Save size={16} /> {submitLabel}
            </button>

            <style>{`.input { width: 100%; border: 1px solid #f8d4e0; border-radius: 0.75rem; padding: 0.6rem 0.9rem; font-size: 0.875rem; }
            .input:focus { outline: none; box-shadow: 0 0 0 2px #ec93b2; }`}</style>
        </form>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-cake-800 mb-1">{label}</label>
            {children}
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
}
