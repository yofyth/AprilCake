<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'site_name', 'site_tagline', 'hero_title_line1', 'hero_title_line2',
        'hero_description', 'hero_image', 'hero_images', 'phone', 'whatsapp',
        'instagram', 'tiktok', 'address', 'hours_weekday', 'hours_weekend',
    ];

    protected $casts = [
        'hero_images' => 'array',
    ];

    public static function current(): self
    {
        return static::first() ?? static::create([]);
    }

    public function getHeroImageUrlAttribute(): ?string
    {
        return $this->hero_image ? asset('storage/'.$this->hero_image) : null;
    }

    public function getHeroImageUrlsAttribute(): array
    {
        if (! empty($this->hero_images)) {
            return collect($this->hero_images)
                ->map(fn ($path) => asset('storage/'.$path))
                ->values()
                ->all();
        }

        // fallback for old single hero_image field
        return $this->hero_image ? [asset('storage/'.$this->hero_image)] : [];
    }
}