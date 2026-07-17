import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProductForm from './ProductForm';

export default function Create() {
    return (
        <AdminLayout title="Tambah Menu">
            <Head title="Tambah Menu" />
            <ProductForm
                onSubmit={(post) => post(route('admin.products.store'), { forceFormData: true })}
                submitLabel="Simpan Menu"
            />
        </AdminLayout>
    );
}
