<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'tagline', 'description', 'category', 'price',
        'image', 'gallery', 'features', 'badge', 'is_bestseller',
        'is_active', 'sort_order',
    ];

    protected $casts = [
        'gallery' => 'array',
        'features' => 'array',
        'is_bestseller' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:0',
    ];

    protected static function booted()
    {
        static::saving(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/'.$this->image) : null;
    }

    public function getGalleryUrlsAttribute(): array
    {
        return collect($this->gallery ?? [])
            ->map(fn ($path) => asset('storage/'.$path))
            ->values()
            ->all();
    }
}
