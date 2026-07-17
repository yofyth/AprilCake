<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        Setting::updateOrCreate(['id' => 1], [
            'site_name' => 'AprilCake',
            'site_tagline' => 'Premium Cake for Every Moment',
            'hero_title_line1' => 'Kue Spesial untuk',
            'hero_title_line2' => 'Momen Berharga',
            'hero_description' => 'Kami adalah UMKM rumahan yang menghadirkan cake lezat, kualitas terbaik, dan dibuat dengan cinta.',
            'hero_image' => 'hero/hero-cake.jpg',
            'phone' => '0812-3456-7890',
            'whatsapp' => '6281234567890',
            'instagram' => '@aprilcake.cake',
            'tiktok' => '@aprilcake',
            'address' => 'Sukabumi, Jawa Barat',
            'hours_weekday' => 'Senin - Sabtu: 08.00 - 20.00',
            'hours_weekend' => 'Minggu: 09.00 - 18.00',
        ]);
    }
}
