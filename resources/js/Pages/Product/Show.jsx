import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { MessageCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import StarRating from '@/Components/StarRating';
import DynamicIcon from '@/Components/DynamicIcon';
import { formatRupiah, waLink } from '@/lib';

export default function Show({ setting, product, testimonials }) {
    const gallery = product.gallery_urls?.length ? product.gallery_urls : [product.image_url].filter(Boolean);
    const [activeImage, setActiveImage] = useState(gallery[0]);

    const orderMessage = `Halo, saya ingin memesan ${product.name} (${formatRupiah(product.price)}). Apakah masih tersedia?`;

    return (
        <>
            <Head title={product.name} />

            <Navbar
                siteName={setting.site_name}
                tagline={setting.site_tagline}
                whatsapp={setting.whatsapp}
                active="menu"
            />

            <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-cake-800/60 flex items-center gap-2">
                <Link href={route('home')} className="hover:text-cake-600">Beranda</Link>
                <ChevronRight size={14} />
                <a href={route('home') + '#menu'} className="hover:text-cake-600">Menu</a>
                <ChevronRight size={14} />
                <span className="text-cake-800 font-medium">{product.name}</span>
            </div>

            <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-12">
                {/* GALLERY */}
                <div>
                    <div className="rounded-2xl overflow-hidden bg-cake-50 aspect-square">
                        {activeImage ? (
                            <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-cake-300">Foto {product.name}</div>
                        )}
                    </div>
                    {gallery.length > 1 && (
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {gallery.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(img)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                                        activeImage === img ? 'border-cake-500' : 'border-transparent'
                                    }`}
                                >
                                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* INFO */}
                <div>
                    {product.badge && (
                        <span className="inline-block bg-cake-100 text-cake-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                            {product.badge}
                        </span>
                    )}
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-cake-900">{product.name}</h1>
                    {product.tagline && (
                        <p className="mt-2 text-cake-500 font-medium">{product.tagline}</p>
                    )}
                    {product.description && (
                        <p className="mt-4 text-cake-800/70 leading-relaxed">{product.description}</p>
                    )}

                    {product.features?.length > 0 && (
                        <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-cake-100">
                            {product.features.slice(0, 3).map((f, i) => (
                                <div key={i}>
                                    <span className="h-8 w-8 flex items-center justify-center rounded-full bg-cake-50 text-cake-600 mb-1">
                                        <DynamicIcon name={f.icon} size={16} />
                                    </span>
                                    <p className="text-xs font-semibold text-cake-900 leading-snug">{f.title}</p>
                                    {f.desc && <p className="text-[11px] text-cake-800/60 mt-0.5">{f.desc}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    <p className="mt-8 font-serif text-3xl font-bold text-cake-600">{formatRupiah(product.price)}</p>

                    <a
                        href={waLink(setting.whatsapp, orderMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cake-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-cake-700 transition-colors"
                    >
                        <MessageCircle size={18} /> Pesan via WhatsApp
                    </a>

                    <p className="mt-3 flex items-center gap-2 text-xs text-cake-800/60">
                        <ShieldCheck size={14} /> Pembayaran aman & pengiriman terpercaya
                    </p>
                </div>
            </section>

            {/* FEATURE STRIP */}
            {product.features?.length > 0 && (
                <section className="bg-cake-50">
                    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {product.features.map((f, i) => (
                            <div key={i} className="text-center">
                                <div className="mx-auto h-12 w-12 rounded-full bg-white flex items-center justify-center text-cake-600 shadow-sm mb-3">
                                    <DynamicIcon name={f.icon} size={22} />
                                </div>
                                <p className="text-sm font-medium text-cake-900 leading-snug">{f.title}</p>
                                {f.desc && <p className="text-xs text-cake-800/60 mt-1">{f.desc}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* TESTIMONIALS */}
            {testimonials.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-serif text-2xl font-bold text-cake-900">Apa Kata Mereka?</h2>
                        <a href={route('home') + '#testimoni'} className="text-sm font-semibold text-cake-600 flex items-center gap-1">
                            Lihat semua testimoni <ChevronRight size={16} />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.id} className="rounded-2xl border border-cake-100 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-full bg-cake-100 overflow-hidden flex-shrink-0">
                                        {t.avatar_url && <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-cake-900 text-sm">{t.name}</p>
                                        <StarRating rating={t.rating} size={14} />
                                    </div>
                                </div>
                                <p className="text-sm text-cake-800/70 leading-relaxed">{t.comment}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 pb-16">
                <div className="rounded-3xl bg-cake-50 p-10 grid md:grid-cols-2 gap-8 items-center overflow-hidden">
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-cake-900">Siap buat momen spesial Anda?</h2>
                        <p className="mt-2 text-cake-800/70">
                            Pesan sekarang dan buat momen Anda lebih berkesan dengan cake terbaik dari kami!
                        </p>
                        <a
                            href={waLink(setting.whatsapp, 'Halo, saya ingin memesan cake untuk momen spesial saya.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-cake-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-cake-700 transition-colors"
                        >
                            <MessageCircle size={16} /> Pesan Sekarang
                        </a>
                    </div>
                    <div className="rounded-2xl overflow-hidden aspect-video bg-cake-100">
                        {activeImage && <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />}
                    </div>
                </div>
            </section>

            <Footer setting={setting} />
        </>
    );
}
