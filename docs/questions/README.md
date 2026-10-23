# Bank Pertanyaan TCS

Bank ini menyimpan pertanyaan yang sudah dijawab, pertanyaan yang masih menunggu jawaban, dan pertanyaan masa depan hasil audit. Pertanyaan dipisah berdasarkan bidang supaya tidak menumpuk di `index.html` atau satu dokumen panjang.

## Alur kerja
1. Buka file bidang yang relevan.
2. Pilih satu pertanyaan paling penting yang belum terjawab. Jangan mengulang pertanyaan yang sudah dikonfirmasi.
3. Setelah jawaban dikonfirmasi, tandai statusnya dan perbarui file sumber situs yang relevan.
4. Verifikasi ulang fakta, tautan, dan implementasi. Jangan menganggap jawaban sebagai fakta publik sebelum dikonfirmasi.
5. Tambahkan temuan baru ke file bidang yang tepat, bukan ke `index.html`.

## Status
- `[x]` Terjawab dan dikonfirmasi.
- `[ ]` Menunggu jawaban atau verifikasi.
- `[NANTI]` Pertanyaan masa depan; jangan diajukan sebelum relevan.

## Bidang
- [Identitas dan branding](identity-branding.md)
- [Produk dan proyek](products-projects.md)
- [Data, privasi, dan keamanan](data-privacy-security.md)
- [Dukungan dan kontak](support-contact.md)
- [Desain dan aksesibilitas](design-accessibility.md)
- [Legal dan lisensi](legal-licensing.md)
- [Pembaruan dan pemeliharaan](updates-maintenance.md)

## Prioritas audit
1. **Data dan memori Choco AI:** pastikan aliran, penyimpanan, retensi, dan penghapusan data sebelum menulis klaim privasi final.
2. **Detail produk yang belum lengkap:** terutama Chocobot Guardian dan Privacy Guardian.
3. **Legal dan lisensi:** selesaikan sebelum distribusi produk berbayar.
4. **Operasional situs:** verifikasi formulir kontak, proses koreksi, dan jadwal tinjau konten.

Pertanyaan ditanyakan satu per satu, sesuai kebutuhan nyata. Daftar ini adalah backlog, bukan kuesioner yang wajib dijawab sekaligus.
