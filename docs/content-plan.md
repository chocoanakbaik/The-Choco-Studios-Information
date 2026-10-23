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
- Katalog situs membaca data statis dari `data/products.js`; belum ada sinkronisasi otomatis katalog dengan Choco AI.

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
