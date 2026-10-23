# The Choco Studios Information

Website informasi publik The Choco Studios (TCS), dibangun sebagai situs statis modular tanpa framework atau build step.

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
│       └── menu.js
├── data/
│   ├── site.js
│   ├── navigation.js
│   └── products.js
└── docs/
    ├── content-plan.md
    └── questionnaire.md
```

## Pembagian tanggung jawab
- `index.html`: kerangka halaman dan titik pemasangan komponen. Tidak menampung semua konten, CSS, atau JavaScript.
- `components/`: potongan halaman terpisah untuk header/menu, hero, ringkasan, tentang, katalog produk, proyek, teknologi, privasi, pembaruan, kontak, dan footer.
- `assets/css/tokens.css`: warna, ukuran konten, dan token desain.
- `assets/css/base.css`: aturan dasar dan tipografi.
- `assets/css/layout.css`: struktur header, navigasi, hero, section, grid, dan footer.
- `assets/css/components.css`: gaya tombol, kartu, label, dan komponen visual.
- `assets/css/responsive.css`: breakpoint layar dan preferensi reduced motion.
- `assets/js/menu.js`: perilaku buka/tutup menu, klik tautan, tombol Escape, dan resize.
- `assets/js/main.js`: memuat komponen HTML dan merender produk serta misi dari data.
- `data/site.js`: identitas, visi, misi, nilai, bahasa, dan pasar.
- `data/products.js`: katalog produk, kategori, status, simbol, dan deskripsi.
- `data/navigation.js`: daftar item navigasi.
- `docs/content-plan.md`: backlog konten dan aturan verifikasi.
- `docs/questionnaire.md`: pertanyaan yang dijawab satu per satu dan dapat terus ditambah.

## Menjalankan secara lokal
Jalankan melalui server statis lokal atau hosting statis. Situs memakai ES modules dan memuat komponen dengan `fetch()`, jadi membuka `index.html` langsung melalui skema `file://` tidak didukung.

## Aturan konten
Jangan mengarang status produk, klaim keamanan, tanggal rilis, tautan, atau informasi legal. Perbarui file komponen/data/dokumentasi yang relevan, bukan menumpuk semuanya di satu file. Pertanyaan diajukan satu per satu; setelah jawaban dikonfirmasi, informasi terkait diperbarui dan pertanyaan berikutnya dipilih dari backlog.