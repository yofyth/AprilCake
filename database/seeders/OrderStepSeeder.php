<?php

namespace Database\Seeders;

use App\Models\OrderStep;
use Illuminate\Database\Seeder;

class OrderStepSeeder extends Seeder
{
    public function run(): void
    {
        $steps = [
            ['icon' => 'message-circle', 'title' => 'Hubungi Kami', 'description' => 'Chat via WhatsApp untuk info & order', 'sort_order' => 1],
            ['icon' => 'clipboard-list', 'title' => 'Tentukan Pesanan', 'description' => 'Pilih rasa, ukuran, dan tanggal', 'sort_order' => 2],
            ['icon' => 'credit-card', 'title' => 'Lakukan Pembayaran', 'description' => 'Pembayaran mudah dan aman', 'sort_order' => 3],
            ['icon' => 'truck', 'title' => 'Pesanan Dikirim', 'description' => 'Kue dikirim dengan aman ke alamat Anda', 'sort_order' => 4],
        ];

        foreach ($steps as $step) {
            OrderStep::updateOrCreate(['title' => $step['title']], $step);
        }
    }
}
