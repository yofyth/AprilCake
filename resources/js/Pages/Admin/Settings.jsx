import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Settings({ setting }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        _method: 'post',
        site_name: setting.site_name || '',
        site_tagline: setting.site_tagline || '',
        hero_title_line1: setting.hero_title_line1 || '',
        hero_title_line2: setting.hero_title_line2 || '',
        hero_description: setting.hero_description || '',
        phone: setting.phone || '',
        whatsapp: setting.whatsapp || '',
        instagram: setting.instagram || '',
        tiktok: setting.tiktok || '',
        address: setting.address || '',
        hours_weekday: setting.hours_weekday || '',
        hours_weekend: setting.hours_weekend || '',
        hero_images: [],
    });

    const submit = (e) => {
        e.preventDefault();
       transform((formData) => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        if (key === 'hero_images') {
            (value || []).forEach((file) => fd.append('hero_images[]', file));
        } else if (value !== null && value !== undefined) {
            fd.append(key, value);
        }
    });
    return fd;
});
        post(route('admin.settings.update'), { forceFormData: true });
    };

    return (
        <AdminLayout title="Pengaturan Website">
            <Head title="Pengaturan" />

            <form onSubmit={submit} className="max-w-2xl space-y-6" encType="multipart/form-data">
                <div className="bg-white rounded-2xl border border-cake-100 p-6 space-y-4">
                    <h2 className="font-semibold text-cake-900">Identitas Website</h2>
                    <TextField label="Nama Toko" value={data.site_name} onChange={(v) => setData('site_name', v)} error={errors.site_name} />
                    <TextField label="Tagline" value={data.site_tagline} onChange={(v) => setData('site_tagline', v)} />
                </div>

                <div className="bg-white rounded-2xl border border-cake-100 p-6 space-y-4">
                    <h2 className="font-semibold text-cake-900">Hero Section (Beranda)</h2>
                    <TextField label="Judul Baris 1" value={data.hero_title_line1} onChange={(v) => setData('hero_title_line1', v)} />
                    <TextField label="Judul Baris 2 (dicetak miring & warna)" value={data.hero_title_line2} onChange={(v) => setData('hero_title_line2', v)} />
                    <div>
                        <label className="block text-sm font-medium text-cake-800 mb-1">Deskripsi</label>
                        <textarea className="input min-h-[90px]" value={data.hero_description} onChange={(e) => setData('hero_description', e.target.value)} />
                    </div>
                   <div>
    <label className="block text-sm font-medium text-cake-800 mb-1">
        Foto Hero (bisa pilih beberapa — tampil bergantian otomatis setiap 3 detik)
    </label>
    <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setData('hero_images', Array.from(e.target.files))}
    />
    {setting.hero_image_urls?.length > 0 && data.hero_images.length === 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
            {setting.hero_image_urls.map((url, i) => (
                <img key={i} src={url} className="h-20 w-20 object-cover rounded-lg" />
            ))}
        </div>
    )}
    <p className="text-xs text-cake-800/50 mt-1">
        Tahan Ctrl (atau Shift) saat memilih file untuk upload beberapa foto sekaligus. Upload baru akan mengganti seluruh foto hero lama.
    </p>
</div>
                </div>

                <div className="bg-white rounded-2xl border border-cake-100 p-6 space-y-4">
                    <h2 className="font-semibold text-cake-900">Kontak & Operasional</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="No. Telepon (tampil)" value={data.phone} onChange={(v) => setData('phone', v)} />
                        <TextField label="No. WhatsApp (format 62..., untuk tombol order)" value={data.whatsapp} onChange={(v) => setData('whatsapp', v)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Instagram" value={data.instagram} onChange={(v) => setData('instagram', v)} />
                        <TextField label="TikTok" value={data.tiktok} onChange={(v) => setData('tiktok', v)} />
                    </div>
                    <TextField label="Alamat" value={data.address} onChange={(v) => setData('address', v)} />
                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Jam Operasional (Senin-Sabtu)" value={data.hours_weekday} onChange={(v) => setData('hours_weekday', v)} />
                        <TextField label="Jam Operasional (Minggu)" value={data.hours_weekend} onChange={(v) => setData('hours_weekend', v)} />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-xl bg-cake-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cake-700 disabled:opacity-60"
                >
                    <Save size={16} /> Simpan Pengaturan
                </button>

                <style>{`.input { width: 100%; border: 1px solid #f8d4e0; border-radius: 0.75rem; padding: 0.6rem 0.9rem; font-size: 0.875rem; }
                .input:focus { outline: none; box-shadow: 0 0 0 2px #ec93b2; }`}</style>
            </form>
        </AdminLayout>
    );
}

function TextField({ label, value, onChange, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-cake-800 mb-1">{label}</label>
            <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
}
