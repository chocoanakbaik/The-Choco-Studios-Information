# Data, Privasi, dan Keamanan

## Terkonfirmasi
- [x] Choco AI memakai layanan model AI melalui Groq.
- [x] Choco AI menampilkan iklan dari jaringan pihak ketiga Adsterra.
- [x] Choco AI menggunakan Supabase untuk akun dan data terkait.
- [x] KasirKita dirancang untuk menyimpan data operasional secara lokal melalui SQLite.
- [x] Permintaan koreksi/penghapusan data dapat diajukan melalui kanal dukungan; mekanisme dan cakupan hak pengguna masih perlu diperjelas.
- [x] Celah keamanan bisa dilaporkan melalui Choco AI atau Sara AI; Choco AI menjadi kanal yang disarankan.

## Menunggu konfirmasi
- [ ] **PRV-01:** Data apa saja yang benar-benar disimpan untuk akun, profil, riwayat chat, dan memori Choco AI?
- [ ] **PRV-02:** Berapa lama setiap kategori data disimpan, dan apa yang menghapusnya?
- [ ] **PRV-03:** Apakah ada penyimpanan browser seperti localStorage, cookie, atau cache yang perlu dijelaskan secara publik?
- [ ] **PRV-04:** Bagaimana pengguna meminta ekspor, koreksi, atau penghapusan data, dan apa batasan yang berlaku?
- [ ] **PRV-05:** Data apa yang dikirim ke Groq dan Adsterra, serta penyedia apa lagi yang menerima data?
- [ ] **PRV-06:** Apakah setiap layanan punya kebijakan retensi atau lokasi pemrosesan yang harus dirujuk?
- [ ] **PRV-07:** Siapa yang menerima laporan keamanan, bagaimana cara menghubunginya, dan apa target responsnya?

## Pertanyaan masa depan
- [NANTI] **PRV-08:** Apakah perlu halaman status layanan atau riwayat insiden keamanan publik?
- [NANTI] **PRV-09:** Apakah diperlukan proses pengungkapan kerentanan yang terdokumentasi?
- [NANTI] **PRV-10:** Kapan data inventaris pihak ketiga perlu ditinjau ulang?

## Aturan
Jangan menuliskan klaim seperti “data tidak disimpan”, “sepenuhnya privat”, atau “aman 100%” sebelum dapat dibuktikan dari implementasi dan konfigurasi aktual.

## Sumber yang perlu disinkronkan
- `components/safety.html`
- `components/technology.html`
- dokumentasi privasi produk terkait
