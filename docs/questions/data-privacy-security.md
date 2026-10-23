# Data, Privasi, dan Keamanan

## Terkonfirmasi dari source code
- [x] Choco AI memakai layanan model AI melalui Groq; Sara AI juga meneruskan pertanyaan ke layanan model AI.
- [x] Choco AI menampilkan iklan dari jaringan pihak ketiga Adsterra.
- [x] Source code Choco AI memakai Supabase untuk autentikasi Google dan data akun.
- [x] Skema Supabase mendefinisikan profil (nama tampilan, email, avatar), percakapan (judul dan waktu), pesan (peran, isi, dan waktu), serta memori (isi singkat dan waktu).
- [x] Source code mengatur sesi autentikasi persisten pada klien.
- [x] Setelah pasangan pesan pengguna/asisten berhasil disimpan pada sesi login, klien memanggil endpoint memori. Endpoint itu mengirim isi pesan pengguna dan jawaban asisten ke Groq untuk mencoba mengekstrak maksimal tiga catatan singkat; catatan baru yang lolos filter dapat disimpan ke tabel memori Supabase.
- [x] Saat menghasilkan jawaban, fungsi chat dapat mengirim pesan, riwayat yang dibatasi ukurannya, dan catatan memori terpilih ke Groq.
- [x] Migrasi mengaktifkan Row Level Security dan membuat kebijakan yang membatasi profil, percakapan, pesan, serta memori ke akun pemiliknya.
- [x] KasirKita dirancang untuk menyimpan data operasional secara lokal melalui SQLite.
- [x] Permintaan koreksi/penghapusan data dapat diajukan melalui kanal dukungan; mekanisme dan cakupan hak pengguna masih perlu diperjelas.
- [x] Celah keamanan bisa dilaporkan melalui Choco AI atau Sara AI; Choco AI menjadi kanal yang disarankan.

## Menunggu konfirmasi produksi
- [ ] **PRV-01:** Verifikasi bahwa seluruh alur dan migrasi data di atas benar-benar aktif pada situs live; bedakan implementasi source dari perilaku produksi.
- [ ] **PRV-02:** Berapa lama profil, riwayat chat, dan memori disimpan, serta apa yang benar-benar menghapus tiap kategori data?
- [ ] **PRV-03:** Konfirmasi perilaku penyimpanan browser (sesi autentikasi, localStorage, cookie, dan cache) dari konfigurasi aktif.
- [ ] **PRV-04:** Bagaimana pengguna meminta ekspor, koreksi, atau penghapusan data, dan apa batasan yang berlaku?
- [ ] **PRV-05:** Data apa yang diproses Adsterra atau penyedia pihak ketiga lain selain Groq dan Supabase?
- [ ] **PRV-06:** Apakah setiap layanan punya kebijakan retensi atau lokasi pemrosesan yang harus dirujuk?
- [ ] **PRV-07:** Siapa yang menerima laporan keamanan, bagaimana cara menghubunginya, dan apa target responsnya?

## Pertanyaan masa depan
- [NANTI] **PRV-08:** Apakah perlu halaman status layanan atau riwayat insiden keamanan publik?
- [NANTI] **PRV-09:** Apakah diperlukan proses pengungkapan kerentanan yang terdokumentasi?
- [NANTI] **PRV-10:** Kapan data inventaris pihak ketiga perlu ditinjau ulang?

## Aturan
Jangan menuliskan klaim seperti “data tidak disimpan”, “sepenuhnya privat”, atau “aman 100%” sebelum dapat dibuktikan dari implementasi dan konfigurasi aktual. Kebijakan retensi tidak boleh diasumsikan hanya karena tabel tidak memiliki kolom retensi eksplisit.

## Sumber yang perlu disinkronkan
- `components/safety.html`
- `components/technology.html`
- dokumentasi privasi produk terkait
- source `AIKEPRIBADIAN/public/auth.js`, `netlify/functions/chat.js`, `netlify/functions/memory.js`, dan migrasi akun Supabase
