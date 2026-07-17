<?php

namespace App\Http\Controllers;

use App\Models\OrderStep;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $setting = Setting::current();

        $products = Product::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Product $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'description' => $p->tagline,
                'price' => $p->price,
                'image_url' => $p->image_url,
                'badge' => $p->badge,
                'is_bestseller' => $p->is_bestseller,
            ]);

        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Testimonial $t) => [
                'id' => $t->id,
                'name' => $t->name,
                'avatar_url' => $t->avatar_url,
                'rating' => $t->rating,
                'comment' => $t->comment,
            ]);

        $orderSteps = OrderStep::orderBy('sort_order')->get();

        return Inertia::render('Landing/Index', [
            'setting' => [
                'site_name' => $setting->site_name,
                'site_tagline' => $setting->site_tagline,
                'hero_title_line1' => $setting->hero_title_line1,
                'hero_title_line2' => $setting->hero_title_line2,
                'hero_description' => $setting->hero_description,
                'hero_image_urls' => $setting->hero_image_urls,
                'phone' => $setting->phone,
                'whatsapp' => $setting->whatsapp,
                'instagram' => $setting->instagram,
                'tiktok' => $setting->tiktok,
                'address' => $setting->address,
                'hours_weekday' => $setting->hours_weekday,
                'hours_weekend' => $setting->hours_weekend,
            ],
            'products' => $products,
            'testimonials' => $testimonials,
            'orderSteps' => $orderSteps,
        ]);
    }
}
