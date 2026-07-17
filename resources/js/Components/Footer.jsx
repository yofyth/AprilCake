import { Link } from '@inertiajs/react';
import { Cake, Phone, AtSign, MapPin, Music2 } from 'lucide-react';

export default function Footer({ setting }) {
    return (
        <footer className="bg-cake-800 text-cake-100">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                            <Cake size={18} />
                        </span>
                        <span className="font-serif text-lg font-bold text-white">{setting?.site_name || 'AprilCake'}</span>
                    </div>
                    <p className="text-sm text-cake-200 leading-relaxed">
                        UMKM Cake rumahan yang menghadirkan kue lezat dengan bahan berkualitas dan dibuat dengan cinta.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Menu</h4>
                    <ul className="space-y-2 text-sm text-cake-200">
                        <li><Link href={route('home')}>Beranda</Link></li>
                        <li><a href={route('home') + '#menu'}>Menu</a></li>
                        <li><a href={route('home') + '#cara-order'}>Cara Order</a></li>
                        <li><a href={route('home') + '#testimoni'}>Testimoni</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Kontak Kami</h4>
                    <ul className="space-y-2 text-sm text-cake-200">
                        {setting?.phone && (
                            <li className="flex items-center gap-2"><Phone size={14} /> {setting.phone}</li>
                        )}
                       {setting?.instagram && (
    <li className="flex items-center gap-2"><AtSign size={14} /> {setting.instagram}</li>
)}
                        {setting?.tiktok && (
                            <li className="flex items-center gap-2"><Music2 size={14} /> {setting.tiktok}</li>
                        )}
                        {setting?.address && (
                            <li className="flex items-center gap-2"><MapPin size={14} /> {setting.address}</li>
                        )}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Jam Operasional</h4>
                    <ul className="space-y-2 text-sm text-cake-200">
                        {setting?.hours_weekday && <li>{setting.hours_weekday}</li>}
                        {setting?.hours_weekend && <li>{setting.hours_weekend}</li>}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10 py-5 text-center text-xs text-cake-300">
                &copy; {new Date().getFullYear()} {setting?.site_name || 'AprilCake'}. All Rights Reserved.
            </div>
        </footer>
    );
}
