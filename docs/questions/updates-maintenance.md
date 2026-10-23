# Pembaruan dan Pemeliharaan

## Terkonfirmasi
- [x] Catatan rilis memakai format tanggal dan daftar perubahan.
- [x] Sumber resmi status serta tanggal rilis adalah pendiri TCS.
- [x] Konten publik hanya boleh diperbarui berdasarkan fakta yang dikonfirmasi.
- [x] GitHub Actions menjalankan pemeriksaan integritas situs saat push ke `main` dan pull request. Pemeriksaan ini mencakup struktur serta referensi internal, bukan ketersediaan URL eksternal.
- [x] Situs memiliki panel diagnostik browser untuk error client, kegagalan aset, status HTTP, dan kegagalan koneksi; detail tidak otomatis dikirim ke server.

## Menunggu konfirmasi
- [ ] **OPS-01:** Seberapa sering halaman produk dan tautan resmi ditinjau?
- [ ] **OPS-02:** Bagaimana pengunjung mengirim koreksi atau masukan khusus untuk situs informasi?
- [ ] **OPS-03:** Apakah situs akan menampilkan catatan rilis TCS saja atau catatan rilis terpisah per produk?
- [ ] **OPS-04:** Siapa yang memverifikasi status produk dan tanggal sebelum sebuah pembaruan dipublikasikan?

## Pertanyaan masa depan
- [NANTI] **OPS-05:** Apakah diperlukan halaman status produk dan layanan?
- [NANTI] **OPS-06:** Apakah ada target ketersediaan atau waktu respons untuk layanan daring?
- [NANTI] **OPS-07:** Jika dibutuhkan pelaporan error ke server, layanan/log mana yang dipakai, berapa lama data disimpan, dan detail apa yang boleh dikirim tanpa mengumpulkan data pribadi berlebihan?

## Sumber yang perlu disinkronkan
- `components/updates.html`
- `docs/content-plan.md`
- `data/products.js`
- seluruh tautan publik pada `data/site.js`
