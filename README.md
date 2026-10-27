# The Choco Studios Information

Situs informasi publik The Choco Studios (TCS), dibuat dengan HTML, CSS, dan JavaScript modular tanpa framework. Build Node.js kecil menyiapkan bundel deploy terpisah agar file dokumentasi internal tidak ikut diterbitkan di Netlify.

## Struktur proyek

```text
.
├── index.html
├── 404.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── _headers
├── netlify.toml
├── .gitignore
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
│   │   ├── diagnostics.css
│   │   ├── product-pages.css
│   │   └── responsive.css
│   └── js/
│       ├── diagnostics.js
│       ├── main.js
│       ├── menu.js
│       └── features/
│           ├── active-navigation.js
│           ├── catalog.js
│           ├── links.js
│           ├── missions.js
│           ├── navigation.js
│           └── site-content.js
├── products/
│   ├── choco-ai.html
│   ├── kasirkita.html
│   ├── chocobot-guardian.html
│   └── privacy-guardian.html
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
    ├── build-site.mjs
    └── validate-site.mjs
```

## Pembagian tanggung jawab

- `index.html`: metadata halaman, canonical URL, verifikasi Google Search Console, Open Graph/Twitter untuk pratinjau tautan, favicon, stylesheet, landmark utama, dan titik pemasangan komponen.
- `sitemap.xml`: daftar URL publik kanonis yang layak ditemukan mesin pencari.
- `robots.txt`: aturan perayapan dasar untuk halaman publik dan alamat sitemap.
- `favicon.svg`: identitas grafis TCS pada tab browser dan daftar bookmark.
- `404.html`: halaman tidak ditemukan yang berdiri sendiri, dengan navigasi kembali ke beranda dan kanal pelaporan tautan rusak; tidak bergantung pada JavaScript aplikasi.
- `_headers`: header keamanan dasar untuk deploy Netlify, termasuk MIME sniffing, kebijakan referrer, pencegahan framing, serta pembatasan izin browser.
- `netlify.toml`: menjalankan `npm run build` dan menetapkan `dist/` sebagai direktori publik.
- `.gitignore`: mengecualikan output build lokal `dist/` dan keadaan kerja Netlify.
- `components/`: tiap bagian halaman berada di berkas terpisah; header hanya menyediakan tempat untuk menu dan tombolnya.
- `assets/css/tokens.css`: warna, ukuran konten, dan token desain.
- `assets/css/base.css`: aturan dasar, tipografi, fokus keyboard, dan tautan lewati ke konten utama.
- `assets/css/layout.css`: struktur header, navigasi, hero, section, grid, dan footer.
- `assets/css/components.css`: gaya tombol, kartu, label, dan komponen visual.
- `assets/css/responsive.css`: breakpoint layar dan reduced motion; menu tetap dapat diakses pada rentang tablet.
- `assets/js/main.js`: memuat komponen dan menghubungkan fitur dengan data.
- `assets/js/diagnostics.js`: menangkap error JavaScript global, Promise yang gagal, aset yang gagal dimuat, dan kegagalan permintaan komponen; menampilkan kategori, sumber, waktu, pesan, status HTTP, baris/kolom, serta stack bila tersedia.
- `assets/css/diagnostics.css`: gaya panel diagnostik yang muncul ketika ada masalah.
- `assets/css/product-pages.css`: gaya responsif bersama untuk halaman detail produk agar tetap konsisten dengan identitas visual TCS.
- `assets/js/menu.js`: buka/tutup menu, penutupan lewat tautan atau Escape, dan sinkronisasi saat ukuran layar berubah.
- `assets/js/features/`: pengelolaan navigasi aktif, katalog produk beserta tautan detailnya, tautan situs, daftar misi, dan pengisian konten dari `data/site.js`.
- `components/contact.html` dan `data/site.js`: menampilkan kanal kontak resmi, termasuk profil LinkedIn terbaru yang dikonfirmasi.
- `products/`: halaman informasi terpisah untuk Choco AI, KasirKita, Chocobot Guardian, dan Privacy Guardian. Setiap halaman memiliki metadata dasar, breadcrumb, dan status yang dibatasi pada informasi terkonfirmasi.
- `data/site.js`: identitas, visi, misi, kontak, bahasa, dan pasar.
- `data/navigation.js`: satu sumber data untuk label, target, dan kelompok menu.
- `data/products.js`: katalog produk, kategori, status, simbol, deskripsi, dan path halaman detail masing-masing produk.
- `docs/content-plan.md`: backlog konten dan aturan verifikasi.
- `docs/questions/`: bank pertanyaan terkonfirmasi, pertanyaan tertunda, serta pertanyaan masa depan per bidang.
- `docs/questionnaire.md`: indeks ke bank pertanyaan.
- `scripts/build-site.mjs`: membuat `dist/` dengan menyalin hanya aset publik, komponen, data katalog, halaman produk, favicon, halaman 404, robots.txt, sitemap.xml, dan headers. Dokumen internal, validator, serta konfigurasi build tidak ikut diterbitkan.
- `scripts/validate-site.mjs`: pemeriksaan file wajib, titik pemasangan komponen, ID/anchor dan referensi ARIA, aset lokal, halaman detail tiap produk, impor dan sintaks JavaScript, bentuk data situs/produk, konfigurasi Netlify, URL konfigurasi, serta tautan relatif dokumentasi.
- `.github/workflows/validate-site.yml`: menjalankan pemeriksaan statis di GitHub Actions pada push ke `main` dan pull request.

## SEO dan penemuan crawler

Halaman utama menggunakan judul dan deskripsi yang menjelaskan nama lengkap studio serta pendirinya, canonical URL ke alamat publik Netlify, dan metadata Open Graph/Twitter. `robots.txt` mengizinkan crawler umum mengakses halaman publik dan menunjuk ke sitemap. Sitemap hanya mencantumkan beranda dan empat halaman detail produk yang ada. Sitemap dan robots.txt disalin ke folder `dist/` oleh build produksi.

Sitemap membantu mesin pencari menemukan URL, tetapi tidak menjamin semua URL akan diindeks atau mendapat peringkat tertentu. Setelah deploy, periksa alamat `/robots.txt` dan `/sitemap.xml` melalui browser, lalu kirim sitemap di Google Search Console saat properti terverifikasi. Untuk pengindeksan manual, gunakan Request Indexing secara wajar; kuota inspeksi URL terpisah dari pengiriman sitemap.

## Menjalankan dan memvalidasi

Untuk menyajikan situs secara lokal, gunakan server statis. Situs memakai ES modules dan memuat komponen dengan `fetch()`, jadi membuka `index.html` langsung melalui skema `file://` tidak didukung.

Pemeriksaan integritas dan build produksi tanpa dependensi pihak ketiga:

```bash
npm run validate
npm run build
```

Build menghasilkan folder `dist/` untuk deploy. Folder tersebut hanya berisi file yang memang dibutuhkan situs publik. Jangan ubah konfigurasi Netlify menjadi menerbitkan folder root, karena root repo juga berisi dokumentasi kerja dan bank pertanyaan internal.

Pemeriksaan ini membantu menemukan berkas hilang, tautan internal yang rusak, ID duplikat, referensi aksesibilitas yang tidak cocok, data produk yang tidak lengkap, impor yang rusak, atau kesalahan sintaks JavaScript. Pemeriksaan ini bersifat statis: tidak membuka browser, tidak menguji tampilan responsif secara visual, dan tidak memverifikasi apakah layanan atau tautan eksternal benar-benar aktif.

Saat situs berjalan, panel diagnostik mengidentifikasi error JavaScript client dan Promise yang gagal, kegagalan aset, HTTP 404/401/403/408/429/5xx, serta kegagalan koneksi tanpa respons. Panel menyertakan waktu, ID laporan, konteks, pesan teknis, saran pemeriksaan, dan jejak JavaScript bila tersedia; tombol **Salin laporan** memudahkan pengguna mengirim detailnya secara manual. Detail ditampilkan di browser dan konsol pengembang, bukan dikirim ke server. Karena situs ini statis, panel tidak dapat membaca log server/Netlify atau memastikan penyebab koneksi tanpa respons; pemeriksaan sisi hosting tetap dilakukan dari dashboard dan log penyedia.

## Aturan konten dan verifikasi

Jangan mengarang status produk, klaim keamanan, tanggal rilis, tautan, atau informasi legal. Sebelum publikasi, pastikan komponen dan file data sinkron, tautan masih aktif, dan navigasi bekerja di ponsel maupun tablet.
