<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['name' => 'Dinda A.', 'rating' => 5, 'comment' => 'Kuenya enak banget, lembut dan nggak terlalu manis. Cocok untuk semua acara!', 'sort_order' => 1],
            ['name' => 'Rizky M.', 'rating' => 5, 'comment' => 'Desainnya cantik, rasanya juara! Pasti pesan lagi untuk acara berikutnya.', 'sort_order' => 2],
            ['name' => 'Siti N.', 'rating' => 5, 'comment' => 'Pelayanannya ramah, responsif, dan pengiriman tepat waktu. Highly recommended!', 'sort_order' => 3],
        ];

        foreach ($items as $item) {
            Testimonial::updateOrCreate(['name' => $item['name']], $item);
        }
    }
}
