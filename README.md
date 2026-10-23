# The Choco Studios Information

Situs informasi publik The Choco Studios (TCS), dibuat dengan HTML, CSS, dan JavaScript modular tanpa framework atau proses build.

## Struktur proyek

```text
.
├── index.html
├── components/
│   ├── header.html
│   ├── hero.html
│   ├── overview.html
│   ├── about.html
│   ├── products.html
│   ├── projects.html
│   ├── technology.html
│   ├── safety.html
│   ├── updates.html
│   ├── contact.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   └── js/
│       ├── main.js
│       ├── menu.js
│       └── features/
│           ├── catalog.js
│           ├── links.js
│           ├── missions.js
│           └── navigation.js
├── data/
│   ├── site.js
│   ├── navigation.js
│   └── products.js
└── docs/
    ├── content-plan.md
    ├── questionnaire.md
    └── questions/
        ├── README.md
        ├── identity-branding.md
        ├── products-projects.md
        ├── data-privacy-security.md
        ├── support-contact.md
        ├── design-accessibility.md
        ├── legal-licensing.md
        └── updates-maintenance.md
```

## Pembagian tanggung jawab

- `index.html`: metadata halaman, tautan stylesheet, landmark utama, dan titik pemasangan komponen. Tidak menampung seluruh konten, CSS, atau JavaScript.
- `components/`: setiap bagian halaman berada di berkas terpisah; header menyediakan tempat untuk menu yang dirender dari data.
- `assets/css/tokens.css`: warna, ukuran konten, dan token desain.
- `assets/css/base.css`: aturan dasar, tipografi, fokus keyboard, dan tautan lewati ke konten utama.
- `assets/css/layout.css`: struktur header, navigasi, hero, section, grid, dan footer.
- `assets/css/components.css`: gaya tombol, kartu, label, dan komponen visual.
- `assets/css/responsive.css`: breakpoint layar dan preferensi reduced motion; menu tetap dapat dibuka pada rentang tablet.
- `assets/js/main.js`: pemuatan komponen, inisialisasi fitur, dan penghubung data dengan tampilan.
- `assets/js/menu.js`: buka/tutup menu, klik tautan, tombol Escape, dan perubahan ukuran layar.
- `assets/js/features/`: fungsi terpisah untuk katalog produk, tautan situs, daftar misi, dan navigasi.
- `data/site.js`: identitas, visi, misi, kontak, bahasa, serta pasar.
- `data/navigation.js`: satu sumber data untuk label, tujuan, dan kelompok item menu.
- `data/products.js`: katalog produk, kategori, status, simbol, dan deskripsi.
- `docs/content-plan.md`: backlog konten dan aturan verifikasi.
- `docs/questions/`: pertanyaan terkonfirmasi, pertanyaan yang menunggu jawaban, dan ide pertanyaan masa depan berdasarkan bidang. Ajukan satu pertanyaan pada satu waktu.
- `docs/questionnaire.md`: indeks menuju bank pertanyaan, bukan tempat menumpuk seluruh jawaban.

## Menjalankan secara lokal

Jalankan melalui server statis lokal atau hosting statis. Situs memakai ES modules dan memuat komponen dengan `fetch()`, jadi membuka `index.html` langsung melalui skema `file://` tidak didukung.

## Aturan konten dan verifikasi

Jangan mengarang status produk, klaim keamanan, tanggal rilis, tautan, atau informasi legal. Sebelum publikasi, periksa bahwa komponen dan file data benar-benar sinkron, tautan yang dipakai masih aktif, dan menu bisa digunakan pada layar kecil maupun tablet.
