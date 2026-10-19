# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## ZIFORA: ZISWAF for a Better Era
**Slogan:** *“Terintegrasi, Transparan, dan Terpercaya”*  
**Kategori:** Web Application / Sistem Informasi & Fintech Sosial Islam (Competition Grade)  
**Repository:** [https://github.com/dharmamudita/zifora.git](https://github.com/dharmamudita/zifora.git)  
**Versi:** 1.0.0 (Tahap Perencanaan & Pengembangan)

---

## 1. Executive Summary & Visi Produk

### 1.1 Latar Belakang & Problem Statement
Pengelolaan Zakat, Infak, Sedekah, dan Wakaf (ZISWAF) di era modern seringkali menghadapi kendala:
1. **Rendahnya Transparansi Real-Time:** Muzaki dan donatur kerap tidak mengetahui secara pasti ke mana dana mereka disalurkan dan progres riil aset wakaf.
2. **Fragmentasi Data:** Data muzaki, mustahik (penerima manfaat), dan aset wakaf produktif tersebar di banyak catatan manual dan tidak terintegrasi.
3. **Barrier Pembayaran untuk Lembaga/UMKM:** Akses integrasi API Enterprise e-wallet yang rumit dan mahal, serta kecemasan donatur terhadap biaya admin tersembunyi.
4. **Kurangnya Visualisasi Geografis:** Belum ada sistem ZISWAF yang menampilkan peta interaktif terpadu sebaran mustahik dan fisik aset wakaf yang mudah dipahami publik.

### 1.2 Visi & Nilai Tambah ZIFORA
**ZIFORA (ZISWAF for a Better Era)** hadir sebagai solusi manajemen informasi digital inklusif yang menghubungkan seluruh siklus ZISWAF dalam satu platform elegan:
- **Terintegrasi:** Satu platform untuk Zakat, Wakaf Aset, Infak, dan Sedekah.
- **Transparan:** Pelacakan mustahik berbasis peta (GIS), laporan audit dana, dan sertifikat digital.
- **Terpercaya:** Sistem verifikasi pembayaran otomatis (QRIS / DANA Bisnis dengan engine kode unik diskon) yang instan merubah status `Pending` ke `Sukses`.

---

## 2. Brand Identity & Design System

### 2.1 Tema & Filosofi Visual
- **Nuansa:** Modern Islamic Fintech, Mewah, Tenang, Elegan, dan Terpercaya.
- **Warna Utama (Deep Emerald & Sage, BUKAN Hijau Neon):**
  - Primary Base: `#0F3E32` (Deep Forest Emerald)
  - Primary Accent: `#1B5E4B` (Rich Jade Green)
  - Secondary / Light Mint: `#E8F3EE` (Soft Mint Whisper untuk background bersih)
  - Accent Gold / Warm Sand: `#D4AF37` / `#C5A059` (Royal Gold untuk lencana, sertifikat, & highlight nominal)
  - Neutral Dark: `#111827` (Slate Black untuk teks kontras tinggi)
  - Neutral Light / Card: `#FFFFFF` dengan bayangan lembut (*glassmorphism* halus)
- **Tipografi:** Modern Serif untuk Heading bernuansa syariah terpercaya (Playfair Display / Plus Jakarta Sans) dan Clean Sans-Serif untuk Body & Dashboard (Inter / Outfit).

---

## 3. Arsitektur Informasi & Struktur Halaman

Setiap halaman dirancang mandiri, rapi, dan terstruktur di file terpisah agar kode mudah dirawat dan dinilai tinggi oleh juri lomba.

```
zifora/
├── public/                 # Aset statis & logo
├── src/
│   ├── assets/             # Gambar & ikon
│   ├── components/         # Komponen modular reusable
│   │   ├── layout/         # Navbar, Footer, AdminSidebar
│   │   ├── common/         # Button, Modal, Card, Badge, Loading
│   │   ├── qris/           # Modal QRIS, Countdown Timer, PaymentListener
│   │   ├── calculator/     # Kalkulator Zakat (Maal, Fitrah, Profesi)
│   │   └── map/            # Komponen Leaflet Map & Filter Marker
│   ├── pages/              # Halaman Utama (File Terpisah)
│   │   ├── HomePage.tsx            # Beranda Utama
│   │   ├── ZakatPage.tsx           # Halaman Zakat & Kalkulator
│   │   ├── WakafPage.tsx           # Halaman Wakaf & Aset Produktif
│   │   ├── InfakSedekahPage.tsx    # Halaman Infak & Sedekah
│   │   ├── PetaZiswafPage.tsx      # Peta Interaktif Sebaran Mustahik & Aset
│   │   ├── TransparansiPage.tsx    # Laporan Keuangan, Realisasi & Audit
│   │   ├── CheckoutPage.tsx        # Halaman Pembayaran QRIS + Kode Unik
│   │   ├── UserDashboardPage.tsx   # Portal Muzaki / Riwayat Donasi & Sertifikat
│   │   └── admin/                  # Dashboard Admin Rinci
│   │       ├── AdminDashboard.tsx      # Ringkasan Statistik Utama
│   │       ├── AdminProgramPage.tsx    # Manajemen Program ZISWAF + Cloudinary Upload
│   │       ├── AdminAsetWakafPage.tsx  # Manajemen Aset Fisik Wakaf
│   │       ├── AdminMustahikPage.tsx   # Database Penerima Manfaat
│   │       ├── AdminTransaksiPage.tsx  # Verifikasi Transaksi Masuk
│   │       └── AdminMuzakiPage.tsx     # Data Muzaki & Donatur
│   ├── services/           # Supabase client, Cloudinary upload, Mock Payment Engine
│   ├── types/              # TypeScript Interfaces & Definitions
│   └── styles/             # Design Tokens & Theme CSS
```

---

## 4. Fitur Utama & Spesifikasi Teknis

### 4.1 Halaman Publik
1. **Beranda (Home):**
   - Hero Section dengan statistik interaktif (Total Donasi Terkumpul, Aset Wakaf Aktif, Jiwa Terbantu).
   - *Quick Zakat Calculator* (Hitung zakat langsung di beranda).
   - Program Unggulan (Emergency Relief, Wakaf Sumur Air Bersih, Beasiswa Pendidikan).
   - Ticker Transparansi Penyaluran Real-time.
2. **Halaman Zakat:**
   - Kalkulator Zakat Lengkap (Zakat Penghasilan/Profesi, Emas/Perak, Tabungan, Perdagangan, Fitrah).
   - Detail nisab otomatis mengikuti harga emas terkini.
   - Form bayar zakat langsung dengan akad zakat digital.
3. **Halaman Wakaf:**
   - Showcase Aset Wakaf Produktif (Tanah Pesantren, Klinik Umat, Sumur Wakaf, Rumah Tahfidz).
   - Progress bar pendanaan aset (contoh: 82% dari target Rp 500.000.000).
   - Galeri foto progres pembangunan berkala.
4. **Halaman Infak & Sedekah:**
   - Kategori: Sedekah Subuh, Sedekah Makan Yatim, Infak Masjid, Bencana Alam.
   - Pilihan donasi cepat (Rp 10.000, Rp 25.000, Rp 50.000, Rp 100.000, Custom).
5. **Peta Interaktif ZISWAF (Interactive GIS Map):**
   - Peta visual sebaran titik di seluruh Indonesia.
   - Filter layer:
     - 🟢 Titik Penyaluran Zakat
     - 🔵 Lokasi Fisik Aset Wakaf
     - 🟡 Posko Bantuan Infak & Sedekah
     - 🔴 Data Sebaran Mustahik (Dengan perlindungan privasi data pribadi)
   - Pop-up detail foto dan progres realisasi saat pin diklik.
6. **Halaman Transparansi & Laporan:**
   - Grafik arus kas dana masuk vs dana tersalurkan.
   - Dokumen laporan audit dan dokumentasi berita acara penyaluran.
   - Form pencarian bukti setor donasi via nomor invoice / transaksi.

---

### 4.2 Sistem Pembayaran Inovatif: QRIS DANA Bisnis + Engine Verifikasi Otomatis
1. **Mekanisme Kode Unik Verifikasi (Maksimal < Rp 500):**
   - Sistem menambahkan **3 digit acak kode verifikasi** (rentang 1 s.d. 499 perak) di atas nominal dasar donasi agar tidak membebani donatur.
   - Contoh: Donasi pokok Rp 50.000 -> Sistem mengacak kode unik `187` -> Total bayar **Rp 50.187**.
   - Rincian invoice transparan:
     - Donasi Pokok: Rp 50.000
     - Kode Unik Verifikasi Sistem: `+ Rp 187` *(Otomatis, < Rp 500)*
     - **Total Ditransfer: Rp 50.187**
2. **Visual QRIS & Hitung Mundur:**
   - Menampilkan QR Code DANA Bisnis.
   - Tombol "Salin Nominal Tepat" agar donatur tidak salah transfer sampai digit terakhir.
   - Timer countdown 15 menit untuk mengunci alokasi kode unik tersebut.
3. **Live Polling / Real-time Status Changer:**
   - Halaman checkout secara real-time memantau status pembayaran di Supabase.
   - Begitu transaksi dinyatakan lunas (melalui webhook bot HP / simulasi admin), layar otomatis berubah:
     - Suara efek chime sukses (opsional)
     - Animasi centang sukses hijau
     - Tombol unduh **Kwitansi & Sertifikat Digital ZIFORA**.

---

### 4.3 Dashboard Admin Rinci & Terstruktur
1. **Manajemen Program & Aset Wakaf (CRUD + Cloudinary):**
   - Admin dapat menambah program zakat, infak, atau aset wakaf baru.
   - Fitur upload foto dokumentasi berkualitas tinggi langsung ke **Cloudinary CDN**.
   - Kolom koordinat latitude & longitude untuk langsung muncul di Peta ZISWAF.
2. **Database Mustahik & Muzaki:**
   - Data mustahik rinci: Nama, kategori 8 asnaf (Fakir, Miskin, Fisabilillah, dll.), alamat, kebutuhan dana, status verifikasi.
   - Data muzaki/donatur: Riwayat donasi, level muzaki, total kontribusi.
3. **Pusat Verifikasi Transaksi:**
   - Tabel transaksi lengkap dengan filter status: `PENDING`, `VERIFIED`, `EXPIRED`.
   - Fitur simulasi & pemicu verifikasi otomatis kode unik untuk keperluan demo lomba.

---

## 5. Spesifikasi Arsitektur Teknologi

| Komponen | Pilihan Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Framework & Bahasa** | React 18 / Vite + TypeScript | Performa kilat, typesafe, struktur kode sangat rapi untuk penilaian lomba |
| **Styling & UI Tokens** | Tailwind CSS + Custom Emerald Theme + Lucide Icons | Desain custom modern, bukan template pasaran, responsif di HP & Desktop |
| **Database & Realtime** | Supabase (PostgreSQL) | Mengelola relasi data kompleks (Muzaki, Mustahik, Transaksi, Aset) & realtime update |
| **Media Management** | Cloudinary API | Penyimpanan foto program, aset wakaf, & bukti penyaluran yang cepat dan teroptimasi |
| **Map Rendering** | Leaflet / React-Leaflet + OpenStreetMap | Ringan, bebas biaya API key, interaktif, dan mudah dikustomisasi tema hijaunya |
| **Export Dokumen** | HTML2Canvas / jsPDF | Generate sertifikat donasi/wakaf otomatis untuk muzaki |

---

## 6. Rencana Tahapan Eksekusi & Strategi Git Commit

Sesuai instruksi: **Setiap halaman/fitur dibuat dan diperbarui dengan 1 commit terstruktur** agar riwayat commit di GitHub rapi, aktif, dan menunjukkan proses rekayasa perangkat lunak yang matang.

- **Milestone 1:** Inisialisasi Proyek, Konfigurasi TypeScript, Supabase Schema, Design System & Tailwind Theme
- **Milestone 2:** Layout Terpadu (Navbar Elegan Hijau Emerald, Footer, Notifikasi)
- **Milestone 3:** Halaman Beranda (Hero, Stats Counter, Program Unggulan)
- **Milestone 4:** Halaman Zakat & Kalkulator Zakat Interaktif
- **Milestone 5:** Halaman Wakaf & Tracker Aset Produktif
- **Milestone 6:** Halaman Infak & Sedekah
- **Milestone 7:** Halaman Peta Interaktif Sebaran ZISWAF (GIS)
- **Milestone 8:** Sistem Checkout QRIS DANA Bisnis + Engine Kode Unik & Status Real-time
- **Milestone 9:** Halaman Transparansi & Laporan Penyaluran
- **Milestone 10:** Dashboard Admin Terpadu (Statistik, CRUD Program + Upload Cloudinary, Data Mustahik)
- **Milestone 11:** Portal Donatur & Fitur Cetak Sertifikat Digital
- **Milestone 12:** Sinkronisasi Git Remote (`https://github.com/dharmamudita/zifora.git`) & Final Testing
