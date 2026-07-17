import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProductForm from './ProductForm';

export default function Edit({ product }) {
    return (
        <AdminLayout title={`Edit Menu — ${product.name}`}>
            <Head title={`Edit ${product.name}`} />
            <ProductForm
                product={product}
                onSubmit={(post) => post(route('admin.products.update', product.id), { forceFormData: true })}
                submitLabel="Perbarui Menu"
            />
        </AdminLayout>
    );
}
