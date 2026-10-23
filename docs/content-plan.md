# Rencana Konten The Choco Studios

Dokumen kerja untuk melengkapi pusat informasi. Konten publik hanya diperbarui setelah fakta dikonfirmasi. Jangan menampilkan rahasia operasional, kredensial, atau detail proyek yang belum layak diumumkan.

## Sudah dikonfirmasi
- Nama: The Choco Studios (TCS). Studio kreatif multisektor yang dikelola mandiri oleh solo developer, bukan perusahaan.
- Mulai 12 Desember 2023 dari proyek Chocobot Guardian. Belum ada tonggak lain yang dikonfirmasi.
- Visi, misi, nilai utama, bahasa, dan pasar awal ada di `data/site.js`.
- Nama pendiri ditampilkan; kisah pribadi pendiri tidak.
- Prinsip: tidak membolehkan hacking, penyebaran data ilegal, atau tindakan ilegal.
- Choco AI adalah produk browser yang tersedia. Sara AI adalah asisten pada Help Center Choco AI.
- KasirKita dan Chocobot Guardian dalam pengembangan; rincian status rilis Privacy Guardian masih perlu diverifikasi.
- Sebagian produk berbayar dan sebagian gratis. Dua proyek internal dirahasiakan.
- Choco AI menggunakan Groq untuk pemrosesan model dan menampilkan iklan Adsterra.
- Source Choco AI mengatur penyimpanan profil akun, judul percakapan, isi pesan, dan catatan memori pada Supabase. Source juga memiliki alur ekstraksi kandidat memori berbasis Groq setelah pasangan pesan akun berhasil disimpan.
- Migrasi source mengaktifkan Row Level Security untuk membatasi data akun menurut pemilik, tetapi perilaku konfigurasi produksi belum diperiksa melalui situs live.
- Kanal kontak mencakup email, telepon, dan Google Form yang dikonfigurasi di `data/site.js`. Waktu respons yang disampaikan adalah paling lama 3 hari.
- Hak cipta ditampilkan; penjualan ulang hanya sesuai versi/lisensi yang memang diizinkan.
- Pasar kedua: Asia. Tombol ganti bahasa direncanakan untuk tahap berikutnya.
- Catatan rilis menggunakan tanggal dan daftar perubahan; sumber status rilis adalah pendiri TCS.
- Struktur menu, komponen, data produk, dan bank pertanyaan dipisahkan; pemeriksaan integritas statis tersedia di `scripts/validate-site.mjs`.
- Situs menampilkan panel diagnostik di browser untuk error JavaScript, Promise yang gagal, aset gagal dimuat, HTTP 404/401/403/408/429/5xx, serta koneksi yang gagal sebelum respons HTTP. Detail mencakup ID, waktu, sumber, resource, pesan, saran, dan stack bila tersedia; pengguna dapat menyalin laporan secara manual. Tidak ada telemetri error otomatis ke server.
- Karena TCS Information adalah situs statis, detail respons HTTP yang terlihat dari browser tidak sama dengan akses ke log server. Log hosting/CDN atau fungsi backend harus diperiksa secara terpisah lewat dashboard penyedia.
- Katalog situs membaca data statis dari `data/products.js`; belum ada sinkronisasi otomatis katalog dengan Choco AI.
- Identitas browser berupa `favicon.svg`, metadata Open Graph/Twitter dasar, halaman 404 mandiri, `robots.txt`, dan header keamanan dasar untuk Netlify sudah tersedia.
- Domain publik resmi situs informasi belum dikonfirmasi dalam konfigurasi repo. URL canonical, `og:url`, `og:image`, dan sitemap menunggu domain resmi agar tidak memakai alamat yang salah.
- Empat halaman detail produk terpisah tersedia melalui `products/`. Halaman Choco AI memisahkan fitur katalog dari menu segera hadir; KasirKita, Chocobot Guardian, dan Privacy Guardian secara eksplisit menjelaskan bahwa status rilis atau detail finalnya masih terbatas/berkembang.

## Perlu diverifikasi atau dilengkapi
- Apakah Google Form masih aktif dan dapat dipakai oleh publik.
- Perilaku produksi untuk riwayat chat dan ekstraksi/simpan memori akun Choco AI.
- Kebijakan retensi dan alur penghapusan mandiri profil, percakapan, pesan, dan memori.
- Data yang diproses jaringan iklan dan penyedia pihak ketiga lain.
- Fitur serta status rilis final produk yang masih dikembangkan.
- Syarat penggunaan dan kebijakan privasi umum/per produk.
- Ketentuan lisensi, distribusi, refund, garansi, dan dukungan produk berbayar.
- Catatan rilis pertama dengan tanggal dan perubahan yang terverifikasi.
- Audit aksesibilitas, versi Bahasa Inggris, dan mekanisme masukan khusus untuk situs informasi.
- Akun media sosial setelah tersedia.

## Struktur pertanyaan
Pertanyaan berjalan dan backlog masa depan dipisah berdasarkan bidang di `docs/questions/`. `docs/questionnaire.md` menjadi halaman indeksnya. Pertanyaan harus diajukan satu per satu dan tidak mengulang jawaban yang sudah dikonfirmasi.

## Aturan pembaruan
1. Pilih pertanyaan belum terjawab dari `docs/questions/README.md` dan file bidangnya.
2. Simpan fakta final di file data, komponen, atau dokumentasi yang sesuai, bukan di satu file HTML besar.
3. Jangan mengubah status produk berdasarkan perkiraan.
4. Verifikasi tautan, klaim, tanggal, dan perilaku responsif sebelum publikasi.
5. Pertahankan halaman awal ringan; komponen, gaya, data, fitur, dan pertanyaan dipisahkan.
6. Jalankan `node scripts/validate-site.mjs` sebelum publikasi; pemeriksaan browser dan layanan eksternal tetap dilakukan terpisah.
