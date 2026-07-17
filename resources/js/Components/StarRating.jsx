import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, size = 16 }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={i < rating ? 'fill-amber-400 text-amber-400' : 'fill-cake-100 text-cake-100'}
                />
            ))}
        </div>
    );
}
