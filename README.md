# The Choco Studios Information

Situs informasi publik The Choco Studios (TCS), dibuat dengan HTML, CSS, dan JavaScript modular tanpa framework atau proses build.

## Struktur proyek

```text
.
├── index.html
├── package.json
├── .github/
│   └── workflows/
│       └── validate-site.yml
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
├── docs/
│   ├── content-plan.md
│   ├── questionnaire.md
│   └── questions/
│       ├── README.md
│       ├── identity-branding.md
│       ├── products-projects.md
│       ├── data-privacy-security.md
│       ├── support-contact.md
│       ├── design-accessibility.md
│       ├── legal-licensing.md
│       └── updates-maintenance.md
└── scripts/
    └── validate-site.mjs
```

## Pembagian tanggung jawab

- `index.html`: metadata halaman, stylesheet, landmark utama, dan titik pemasangan komponen. Tidak menampung seluruh konten, CSS, atau JavaScript.
- `components/`: tiap bagian halaman berada di berkas terpisah; header hanya menyediakan tempat untuk menu dan tombolnya.
- `assets/css/tokens.css`: warna, ukuran konten, dan token desain.
- `assets/css/base.css`: aturan dasar, tipografi, fokus keyboard, dan tautan lewati ke konten utama.
- `assets/css/layout.css`: struktur header, navigasi, hero, section, grid, dan footer.
- `assets/css/components.css`: gaya tombol, kartu, label, dan komponen visual.
- `assets/css/responsive.css`: breakpoint layar dan reduced motion; menu tetap dapat diakses pada rentang tablet.
- `assets/js/main.js`: memuat komponen dan menghubungkan fitur dengan data.
- `assets/js/menu.js`: buka/tutup menu, penutupan lewat tautan atau Escape, dan sinkronisasi saat ukuran layar berubah.
- `assets/js/features/`: fungsi untuk katalog produk, tautan situs, daftar misi, dan navigasi.
- `data/site.js`: identitas, visi, misi, kontak, bahasa, dan pasar.
- `data/navigation.js`: satu sumber data untuk label, target, dan kelompok menu.
- `data/products.js`: katalog produk, kategori, status, simbol, dan deskripsi.
- `docs/content-plan.md`: backlog konten dan aturan verifikasi.
- `docs/questions/`: bank pertanyaan terkonfirmasi, pertanyaan tertunda, serta pertanyaan masa depan per bidang.
- `docs/questionnaire.md`: indeks ke bank pertanyaan.
- `scripts/validate-site.mjs`: pemeriksaan struktur berkas, impor JavaScript, target tautan, menu responsif, dan tautan dokumentasi.
- `.github/workflows/validate-site.yml`: menjalankan pemeriksaan statis di GitHub Actions pada push ke `main` dan pull request.

## Menjalankan dan memvalidasi

Untuk menyajikan situs secara lokal, gunakan server statis. Situs memakai ES modules dan memuat komponen dengan `fetch()`, jadi membuka `index.html` langsung melalui skema `file://` tidak didukung.

Pemeriksaan statis tanpa dependensi pihak ketiga:

```bash
node scripts/validate-site.mjs
```

Pemeriksaan ini membantu menemukan berkas hilang, impor yang rusak, target menu yang tidak ada, atau kesalahan sintaks JavaScript. Pemeriksaan statis tidak membuktikan bahwa situs sudah diuji di browser atau layanan eksternal sedang aktif.

## Aturan konten dan verifikasi

Jangan mengarang status produk, klaim keamanan, tanggal rilis, tautan, atau informasi legal. Sebelum publikasi, pastikan komponen dan file data sinkron, tautan masih aktif, dan navigasi bekerja di ponsel maupun tablet.
