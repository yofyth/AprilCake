import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import DynamicIcon, { ICON_OPTIONS } from '@/Components/DynamicIcon';

export default function Index({ orderSteps }) {
    const [editingId, setEditingId] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    const destroy = (step) => {
        if (confirm(`Hapus langkah "${step.title}"?`)) {
            router.delete(route('admin.order-steps.destroy', step.id));
        }
    };

    return (
        <AdminLayout title="Cara Order">
            <Head title="Cara Order" />

            <p className="text-sm text-cake-800/60 mb-4">
                Atur langkah-langkah "Cara Order" yang tampil di landing page. Urutan mengikuti kolom "Urutan Tampil".
            </p>

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="inline-flex items-center gap-2 rounded-xl bg-cake-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cake-700"
                >
                    <Plus size={16} /> Tambah Langkah
                </button>
            </div>

            {showCreate && (
                <StepForm onDone={() => setShowCreate(false)} />
            )}

            <div className="space-y-3 mt-4">
                {orderSteps.map((step) =>
                    editingId === step.id ? (
                        <StepForm key={step.id} step={step} onDone={() => setEditingId(null)} />
                    ) : (
                        <div key={step.id} className="bg-white rounded-2xl border border-cake-100 p-5 flex items-center gap-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cake-100 text-cake-600 flex-shrink-0">
                                <DynamicIcon name={step.icon} size={18} />
                            </span>
                            <div className="flex-1">
                                <p className="font-semibold text-cake-900 text-sm">{step.title}</p>
                                <p className="text-xs text-cake-800/60">{step.description}</p>
                            </div>
                            <span className="text-xs text-cake-800/40">Urutan: {step.sort_order}</span>
                            <button onClick={() => setEditingId(step.id)} className="text-cake-600">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => destroy(step)} className="text-red-500">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )
                )}
            </div>

            {orderSteps.length === 0 && !showCreate && (
                <p className="text-center text-cake-800/60 py-12">Belum ada langkah cara order.</p>
            )}
        </AdminLayout>
    );
}

function StepForm({ step, onDone }) {
    const isEdit = !!step;
    const { data, setData, post, put, processing, errors } = useForm({
        icon: step?.icon || 'message-circle',
        title: step?.title || '',
        description: step?.description || '',
        sort_order: step?.sort_order || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        const options = { onSuccess: onDone };
        if (isEdit) {
            put(route('admin.order-steps.update', step.id), options);
        } else {
            post(route('admin.order-steps.store'), options);
        }
    };

    return (
        <form onSubmit={submit} className="bg-white rounded-2xl border-2 border-cake-300 p-5 mb-3 grid grid-cols-12 gap-3 items-end">
            <div className="col-span-2">
                <label className="block text-xs font-medium text-cake-800 mb-1">Icon</label>
                <select className="input" value={data.icon} onChange={(e) => setData('icon', e.target.value)}>
                    {ICON_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
            <div className="col-span-3">
                <label className="block text-xs font-medium text-cake-800 mb-1">Judul</label>
                <input className="input" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>
            <div className="col-span-4">
                <label className="block text-xs font-medium text-cake-800 mb-1">Deskripsi</label>
                <input className="input" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </div>
            <div className="col-span-1">
                <label className="block text-xs font-medium text-cake-800 mb-1">Urutan</label>
                <input type="number" className="input" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} />
            </div>
            <div className="col-span-2 flex gap-2">
                <button type="submit" disabled={processing} className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-cake-600 text-white py-2 text-sm">
                    <Save size={14} /> Simpan
                </button>
                <button type="button" onClick={onDone} className="rounded-lg border border-cake-200 px-3 text-cake-700">
                    <X size={16} />
                </button>
            </div>
            <style>{`.input { width: 100%; border: 1px solid #f8d4e0; border-radius: 0.6rem; padding: 0.5rem 0.7rem; font-size: 0.8rem; }`}</style>
        </form>
    );
}
