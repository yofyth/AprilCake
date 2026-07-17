import { useEffect, useState } from 'react';

export default function HeroCarousel({ images = [], intervalMs = 3000 }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (images.length < 2) return;

        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % images.length);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [images.length, intervalMs]);

    if (images.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center text-cake-400">
                Foto Hero Cake
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {images.map((src, i) => (
                <img
                    key={src + i}
                    src={src}
                    alt={`Hero cake ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        i === active ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}

            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-label={`Slide ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${
                                i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}