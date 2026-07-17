import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Leaf, ChefHat, ShieldCheck, MessageCircle, ArrowRight, ChevronUp } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import StarRating from '@/Components/StarRating';
import DynamicIcon from '@/Components/DynamicIcon';
import HeroCarousel from '@/Components/HeroCarousel';
import { formatRupiah, waLink } from '@/lib';

export default function Index({ setting, products, testimonials, orderSteps }) {
    const [showAllProducts, setShowAllProducts] = useState(false);
    const PRODUCT_LIMIT = 6;
    const visibleProducts = showAllProducts ? products : products.slice(0, PRODUCT_LIMIT);
    const hasMoreProducts = products.length > PRODUCT_LIMIT;

    return (
        <>
            <Head title="Beranda" />

            <Navbar
                siteName={setting.site_name}
                tagline={setting.site_tagline}
                whatsapp={setting.whatsapp}
                active="home"
            />

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-b from-cake-50 to-cream">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-cake-900 leading-tight">
                            {setting.hero_title_line1}
                            <br />
                            <span className="italic text-cake-500">{setting.hero_title_line2}</span>
                        </h1>
                        <p className="mt-5 text-cake-800/80 max-w-md leading-relaxed">
                            {setting.hero_description}
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                            <FeatureMini icon={<Leaf size={18} />} title="Bahan Premium" desc="Pilihan terbaik & berkualitas" />
                            <FeatureMini icon={<ChefHat size={18} />} title="Fresh Made" desc="Dibuat fresh setiap hari" />
                            <FeatureMini icon={<ShieldCheck size={18} />} title="Higienis" desc="Diproduksi bersih & aman" />
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={waLink(setting.whatsapp, 'Halo, saya ingin memesan cake.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-cake-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-cake-700 transition-colors"
                            >
                                <MessageCircle size={16} /> Pesan Sekarang
                            </a>
                            <a
                                href="#menu"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-cake-300 px-6 py-3 text-sm font-semibold text-cake-700 hover:bg-cake-50 transition-colors"
                            >
                                Lihat Menu
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-square bg-cake-100">
    <HeroCarousel images={setting.hero_image_urls} />
</div>
                        <div className="absolute -bottom-4 right-6 bg-white rounded-full shadow-lg h-24 w-24 flex flex-col items-center justify-center text-center text-xs font-semibold text-cake-600 leading-tight">
                            Made
                            <br />with Love ♥
                        </div>
                    </div>
                </div>
            </section>

           {/* MENU FAVORIT */}
            <section id="menu" className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center max-w-xl mx-auto">
                    <p className="text-cake-500 text-sm font-semibold tracking-widest uppercase">— Menu Favorit —</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-cake-900 mt-2">Pilihan Cake Terbaik Kami</h2>
                    <p className="text-cake-800/70 mt-3">Berbagai pilihan rasa yang cocok untuk setiap momen spesial Anda.</p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {visibleProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={route('product.show', product.slug)}
                            className="group block rounded-2xl overflow-hidden bg-white border border-cake-100 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-cake-50 relative">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-cake-300 text-sm">
                                        Foto {product.name}
                                    </div>
                                )}
                                {product.badge && (
                                    <span className="absolute top-3 left-3 bg-cake-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                                        {product.badge}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif font-bold text-cake-900">{product.name}</h3>
                                <p className="text-sm text-cake-800/60 mt-1 line-clamp-2">{product.description}</p>
                                <p className="mt-3 font-bold text-cake-600">{formatRupiah(product.price)}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {hasMoreProducts && (
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => setShowAllProducts(!showAllProducts)}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-cake-300 px-6 py-3 text-sm font-semibold text-cake-700 hover:bg-cake-50 transition-colors"
                        >
                            {showAllProducts ? (
                                <>Tampilkan Lebih Sedikit <ChevronUp size={16} /></>
                            ) : (
                                <>Lihat Semua Menu <ArrowRight size={16} /></>
                            )}
                        </button>
                    </div>
                )}
            </section>

            {/* WHY CHOOSE US */}
            <section className="bg-cake-50">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="rounded-3xl bg-cake-100/60 p-10">
                        <div className="text-center max-w-xl mx-auto mb-10">
                            <p className="text-cake-500 text-sm font-semibold tracking-widest uppercase">— Mengapa Memilih Kami? —</p>
                            <h2 className="font-serif text-3xl font-bold text-cake-900 mt-2">
                                Kualitas adalah <span className="text-cake-500">Prioritas Kami</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <WhyItem icon="leaf" title="Bahan Berkualitas" desc="Kami hanya menggunakan bahan pilihan terbaik." />
                            <WhyItem icon="heart" title="Diproses dengan Hati" desc="Setiap kue dibuat dengan cinta & perhatian penuh." />
                            <WhyItem icon="package-check" title="Kemasan Aman" desc="Dikemas rapi, aman, dan siap sampai ke tangan Anda." />
                            <WhyItem icon="clock" title="Tepat Waktu" desc="Pesanan Anda kami proses tepat waktu." />
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimoni" className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center max-w-xl mx-auto">
                    <p className="text-cake-500 text-sm font-semibold tracking-widest uppercase">— Testimoni Pelanggan —</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-cake-900 mt-2">Apa Kata Mereka?</h2>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.id} className="rounded-2xl bg-white border border-cake-100 p-6 shadow-sm">
                            <p className="text-cake-800/80 text-sm leading-relaxed mb-4">&ldquo;{t.comment}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-cake-100 overflow-hidden flex-shrink-0">
                                    {t.avatar_url && <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-cake-900 text-sm">{t.name}</p>
                                    <StarRating rating={t.rating} size={14} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CARA ORDER */}
            <section id="cara-order" className="bg-cake-800">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <p className="text-center text-cake-200 text-sm font-semibold tracking-widest uppercase">— Cara Order —</p>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {orderSteps.map((step, idx) => (
                            <div key={step.id} className="flex items-start gap-4">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cake-600 text-white flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </div>
                                <div>
                                    <div className="mb-2 text-cake-200">
                                        <DynamicIcon name={step.icon} size={22} />
                                    </div>
                                    <h3 className="text-white font-semibold">{step.title}</h3>
                                    <p className="text-cake-200 text-sm mt-1">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer setting={setting} />
        </>
    );
}

function FeatureMini({ icon, title, desc }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="h-9 w-9 flex items-center justify-center rounded-full bg-cake-100 text-cake-600">
                {icon}
            </span>
            <p className="text-xs font-semibold text-cake-900">{title}</p>
            <p className="text-[11px] text-cake-800/60 leading-snug">{desc}</p>
        </div>
    );
}

function WhyItem({ icon, title, desc }) {
    return (
        <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-white flex items-center justify-center text-cake-600 shadow-sm mb-3">
                <DynamicIcon name={icon} size={22} />
            </div>
            <h3 className="font-semibold text-cake-900 text-sm">{title}</h3>
            <p className="text-xs text-cake-800/60 mt-1 leading-relaxed">{desc}</p>
        </div>
    );
}
