import { Head, useForm } from '@inertiajs/react';
import { Cake, LogIn } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login'));
    };

    return (
        <div className="min-h-screen bg-cake-50 flex items-center justify-center px-6">
            <Head title="Login Admin" />
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-cake-100 p-8">
                <div className="flex flex-col items-center mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cake-100 text-cake-600 mb-3">
                        <Cake size={24} />
                    </span>
                    <h1 className="font-serif text-xl font-bold text-cake-900">AprilCake Admin</h1>
                    <p className="text-sm text-cake-800/60">Masuk untuk mengelola website</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-cake-800 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded-xl border border-cake-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cake-400"
                        />
                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cake-800 mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded-xl border border-cake-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cake-400"
                        />
                        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                    </div>

                    <label className="flex items-center gap-2 text-sm text-cake-800/70">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        Ingat saya
                    </label>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-cake-600 py-3 text-sm font-semibold text-white hover:bg-cake-700 transition-colors disabled:opacity-60"
                    >
                        <LogIn size={16} /> Masuk
                    </button>
                </form>
            </div>
        </div>
    );
}
