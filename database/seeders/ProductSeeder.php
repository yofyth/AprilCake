<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Choco Drip Cake',
                'tagline' => 'Rich & Dekaden dengan Cokelat Premium',
                'description' => 'Perpaduan sempurna antara sponge cokelat yang rich, ganache drip mengkilap, dan taburan cokelat premium di atasnya. Cocok untuk pecinta cokelat sejati.',
                'category' => 'Cokelat',
                'price' => 155000,
                'image' => 'products/choco-drip.jpg',
                'gallery' => ['products/choco-drip.jpg', 'products/choco-drip-2.jpg', 'products/choco-drip-3.jpg', 'products/choco-drip-4.jpg'],
                'features' => [
                    ['icon' => 'cake-slice', 'title' => 'Rasa cokelat yang intens', 'desc' => 'Disukai semua kalangan'],
                    ['icon' => 'heart', 'title' => 'Tekstur lembut & moist', 'desc' => 'Di setiap gigitan'],
                    ['icon' => 'cup-soda', 'title' => 'Ganache premium', 'desc' => 'Tidak eneg & pas manisnya'],
                    ['icon' => 'gift', 'title' => 'Tampilan elegan', 'desc' => 'Untuk setiap momen spesial'],
                ],
                'badge' => 'Favorit',
                'is_bestseller' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Red Velvet Cake',
                'tagline' => 'Lembut & Klasik dengan Rasa Khas Red Velvet',
                'description' => 'Perpaduan sempurna antara sponge red velvet yang lembut, cream cheese frosting yang creamy, dan taburan remah red velvet di atasnya. Cocok untuk berbagai momen spesial Anda.',
                'category' => 'Klasik',
                'price' => 150000,
                'image' => 'products/red-velvet.jpg',
                'gallery' => ['products/red-velvet.jpg', 'products/red-velvet-2.jpg', 'products/red-velvet-3.jpg', 'products/red-velvet-4.jpg'],
                'features' => [
                    ['icon' => 'cake-slice', 'title' => 'Rasa klasik yang disukai semua kalangan', 'desc' => ''],
                    ['icon' => 'heart', 'title' => 'Tekstur lembut & moist di setiap gigitan', 'desc' => ''],
                    ['icon' => 'cup-soda', 'title' => 'Cream cheese frosting yang tidak eneg', 'desc' => ''],
                    ['icon' => 'gift', 'title' => 'Tampilan elegan untuk setiap momen spesial', 'desc' => ''],
                ],
                'badge' => 'Best Seller',
                'is_bestseller' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Matcha Cake',
                'tagline' => 'Perpaduan Matcha Premium yang Lembut & Nikmat',
                'description' => 'Sponge matcha premium berlapis dengan cream lembut dan taburan blueberry segar. Rasa matcha yang otentik, tidak terlalu pahit maupun terlalu manis.',
                'category' => 'Premium',
                'price' => 160000,
                'image' => 'products/matcha.jpg',
                'gallery' => ['products/matcha.jpg', 'products/matcha-2.jpg', 'products/matcha-3.jpg', 'products/matcha-4.jpg'],
                'features' => [
                    ['icon' => 'cake-slice', 'title' => 'Matcha premium otentik', 'desc' => 'Tidak terlalu pahit'],
                    ['icon' => 'heart', 'title' => 'Tekstur lembut berlapis', 'desc' => 'Moist di setiap gigitan'],
                    ['icon' => 'cup-soda', 'title' => 'Cream ringan', 'desc' => 'Manis pas & segar'],
                    ['icon' => 'gift', 'title' => 'Tampilan elegan', 'desc' => 'Untuk momen spesial'],
                ],
                'badge' => null,
                'is_bestseller' => false,
                'sort_order' => 3,
            ],
            [
                'name' => 'Fruity Fresh Cake',
                'tagline' => 'Segar dengan Buah Pilihan Berkualitas',
                'description' => 'Sponge vanilla lembut dipadukan dengan cream ringan dan topping buah segar pilihan seperti kiwi, blueberry, dan anggur. Menyegarkan dan cantik untuk acara spesial.',
                'category' => 'Fresh',
                'price' => 165000,
                'image' => 'products/fruity-fresh.jpg',
                'gallery' => ['products/fruity-fresh.jpg', 'products/fruity-fresh-2.jpg', 'products/fruity-fresh-3.jpg', 'products/fruity-fresh-4.jpg'],
                'features' => [
                    ['icon' => 'cake-slice', 'title' => 'Buah segar pilihan', 'desc' => 'Kualitas terbaik'],
                    ['icon' => 'heart', 'title' => 'Cream ringan tidak eneg', 'desc' => 'Cocok untuk semua usia'],
                    ['icon' => 'cup-soda', 'title' => 'Rasa segar & manis pas', 'desc' => ''],
                    ['icon' => 'gift', 'title' => 'Tampilan cantik & colorful', 'desc' => ''],
                ],
                'badge' => null,
                'is_bestseller' => false,
                'sort_order' => 4,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['name' => $product['name']], $product);
        }
    }
}
