# 🎂 AprilCake — Landing Page & Admin CMS

Website landing page dan sistem CMS untuk usaha rumahan kue AprilCake, dibangun menggunakan Laravel, React, dan Inertia.js.

---

## 📖 Tentang Project

AprilCake adalah website yang dirancang untuk mempromosikan dan mengelola produk usaha kue rumahan. Website ini terdiri dari halaman landing page yang menarik bagi pelanggan, serta dashboard admin untuk mengelola konten seperti produk, testimoni, dan banner promosi.

---

## ✨ Fitur

- 🖼️ Hero image carousel di halaman utama
- 🍰 Galeri produk kue
- 💬 Testimoni pelanggan
- 📲 Integrasi pemesanan via WhatsApp
- 🔐 Dashboard admin untuk mengelola konten (produk, testimoni, banner)

---

## 🛠️ Tech Stack

- **Backend:** Laravel
- **Frontend:** React + Inertia.js
- **Styling:** Tailwind CSS
- **Bundler:** Vite

---

## 🚀 Setup & Instalasi

### 1. Clone repository

\`\`\`bash
git clone https://github.com/yofyth/AprilCake.git
cd AprilCake
\`\`\`

### 2. Install dependencies PHP

\`\`\`bash
composer install
\`\`\`

### 3. Install dependencies JavaScript

\`\`\`bash
npm install
\`\`\`

### 4. Konfigurasi environment

Copy file `.env.example` menjadi `.env`, lalu sesuaikan konfigurasi database dan variabel lain sesuai kebutuhan:

\`\`\`bash
cp .env.example .env
php artisan key:generate
\`\`\`

### 5. Migrasi database

\`\`\`bash
php artisan migrate
\`\`\`

### 6. Jalankan development server

Jalankan backend Laravel:

\`\`\`bash
php artisan serve
\`\`\`

Di terminal terpisah, jalankan Vite untuk frontend:

\`\`\`bash
npm run dev
\`\`\`

Akses aplikasi di `http://localhost:8000`.

---

## 📂 Struktur Project

\`\`\`
app/            # Logic backend Laravel (Controllers, Models)
resources/
├── js/         # Komponen React (Pages, Components)
└── css/        # Styling Tailwind
routes/         # Definisi routing Laravel
\`\`\`

---

## 📌 Catatan

- Nomor WhatsApp untuk fitur pemesanan dapat dikonfigurasi melalui dashboard admin.
- Pastikan sudah menjalankan `npm run build` sebelum deploy ke production.

---

## 👤 Author

**Yofy Taufik Hidayat**
Sistem Informasi — Institut Pendidikan Indonesia Garut
