# The Choco Studios Information

Website informasi publik The Choco Studios (TCS), disusun sebagai situs statis tanpa framework atau build step.

## Struktur proyek

```text
.
├── index.html
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
- `index.html`: kerangka semantik dan urutan section, tanpa CSS/JavaScript inline.
- `assets/css/tokens.css`: warna, ukuran konten, dan token desain.
- `assets/css/base.css`: reset ringan, tipografi, dan aturan dasar.
- `assets/css/layout.css`: header, navigasi, hero, section, grid, footer, dan struktur responsif.
- `assets/css/components.css`: tombol, kartu, label, dan komponen visual.
- `assets/css/responsive.css`: breakpoint layar kecil/menengah dan preferensi reduced motion.
- `assets/js/menu.js`: buka/tutup menu, klik tautan, tombol Escape, dan resize.
- `assets/js/main.js`: inisialisasi perilaku halaman dan render daftar produk/misi dari data.
- `data/site.js`: identitas TCS, visi, misi, nilai, bahasa, dan pasar.
- `data/products.js`: daftar produk beserta kategori, status, simbol, dan deskripsi.
- `data/navigation.js`: definisi item navigasi.
- `docs/content-plan.md`: backlog konten dan aturan verifikasi.
- `docs/questionnaire.md`: pertanyaan konten yang dijawab satu per satu dan terus diperluas.

## Menjalankan secara lokal
Buka melalui server statis lokal karena JavaScript memakai ES modules. Tidak diperlukan package manager atau proses build.

## Aturan konten
Jangan mengarang status produk, klaim keamanan, tanggal rilis, tautan, atau informasi legal. Perbarui file data/dokumentasi yang relevan, bukan menumpuk semuanya di satu file HTML. Pertanyaan konten diajukan satu per satu; setelah jawaban dikonfirmasi, data terkait diperbarui dan pertanyaan berikutnya dipilih dari backlog.