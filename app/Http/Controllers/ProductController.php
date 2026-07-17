<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Setting;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        $setting = Setting::current();

        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('sort_order')
            ->take(3)
            ->get()
            ->map(fn (Testimonial $t) => [
                'id' => $t->id,
                'name' => $t->name,
                'avatar_url' => $t->avatar_url,
                'rating' => $t->rating,
                'comment' => $t->comment,
            ]);

        return Inertia::render('Product/Show', [
            'setting' => [
                'site_name' => $setting->site_name,
                'site_tagline' => $setting->site_tagline,
                'whatsapp' => $setting->whatsapp,
                'instagram' => $setting->instagram,
                'tiktok' => $setting->tiktok,
                'address' => $setting->address,
                'phone' => $setting->phone,
            ],
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'tagline' => $product->tagline,
                'description' => $product->description,
                'price' => $product->price,
                'image_url' => $product->image_url,
                'gallery_urls' => $product->gallery_urls,
                'features' => $product->features ?? [],
                'badge' => $product->badge,
            ],
            'testimonials' => $testimonials,
        ]);
    }
}
