import { Program, WakafAsset, Mustahik, Transaction } from '../types';

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-zakat-1',
    title: 'Zakat Penghasilan: Beasiswa Santri & Yatim Berprestasi',
    slug: 'beasiswa-santri-yatim',
    category: 'zakat',
    subcategory: 'Pendidikan & Asnaf Fisabilillah',
    description: 'Penyaluran zakat maal dan profesi untuk membiayai pendidikan 500 santri penghafal Quran dari keluarga dhuafa di pelosok Nusantara.',
    target_amount: 350000000,
    collected_amount: 284500000,
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    location_name: 'Jawa Barat & Banten',
    latitude: -6.9175,
    longitude: 107.6191,
    status: 'ACTIVE',
    beneficiary_count: 512,
    featured: true,
    created_at: '2026-01-10T08:00:00Z',
  },
  {
    id: 'prog-zakat-2',
    title: 'Zakat Pertanian: Modal Benih & Pupuk Petani Dhuafa',
    slug: 'modal-petani-dhuafa',
    category: 'zakat',
    subcategory: 'Pemberdayaan Ekonomi Mustahik',
    description: 'Bantuan permodalan syariah tanpa riba untuk kelompok tani mustahik di Cianjur guna mencapai kemandirian pangan.',
    target_amount: 150000000,
    collected_amount: 122400000,
    image_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    location_name: 'Cianjur, Jawa Barat',
    latitude: -6.8222,
    longitude: 107.1394,
    status: 'ACTIVE',
    beneficiary_count: 140,
    featured: false,
    created_at: '2026-01-18T10:00:00Z',
  },
  {
    id: 'prog-wakaf-1',
    title: 'Wakaf Produktif: Klinik Bersalin Cuma-Cuma Dhuafa',
    slug: 'klinik-bersalin-cuma-cuma',
    category: 'wakaf',
    subcategory: 'Kesehatan Umat',
    description: 'Pembangunan dan pengadaan alat medis klinik bersalin gratis bagi ibu hamil mustahik di daerah rural Banten.',
    target_amount: 750000000,
    collected_amount: 615000000,
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    location_name: 'Pandeglang, Banten',
    latitude: -6.3088,
    longitude: 106.1065,
    status: 'ACTIVE',
    beneficiary_count: 1200,
    featured: true,
    created_at: '2026-01-05T09:00:00Z',
  },
  {
    id: 'prog-wakaf-2',
    title: 'Wakaf Air: Sumur Bor Tenaga Surya Gunungkidul',
    slug: 'sumur-bor-gunungkidul',
    category: 'wakaf',
    subcategory: 'Infrastruktur Sumber Daya Air',
    description: 'Pembuatan sumur bor kedalaman 120 meter bertenaga surya untuk mengalirkan air bersih ke 3 desa yang terdampak kekeringan menahun.',
    target_amount: 220000000,
    collected_amount: 220000000,
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    location_name: 'Gunungkidul, DI Yogyakarta',
    latitude: -7.9606,
    longitude: 110.6033,
    status: 'COMPLETED',
    beneficiary_count: 1850,
    featured: false,
    created_at: '2025-11-20T11:00:00Z',
  },
  {
    id: 'prog-infak-1',
    title: 'Sedekah Subuh: 1.000 Paket Nasi Berkah Jumat',
    slug: 'sedekah-subuh-nasi-berkah',
    category: 'sedekah',
    subcategory: 'Pangan Harian Dhuafa',
    description: 'Rutinitas sedekah subuh untuk menyediakan sarapan bergizi bagi pejuang nafkah jalanan, pemulung, dan anak yatim.',
    target_amount: 50000000,
    collected_amount: 43250000,
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    location_name: 'DKI Jakarta & Sekitarnya',
    latitude: -6.2088,
    longitude: 106.8456,
    status: 'ACTIVE',
    beneficiary_count: 1000,
    featured: true,
    created_at: '2026-02-01T04:30:00Z',
  },
  {
    id: 'prog-infak-2',
    title: 'Tanggap Darurat: Dapur Umum Bencana Banjir Demak',
    slug: 'tanggap-darurat-banjir-demak',
    category: 'infak',
    subcategory: 'Kebencanaan & Darurat Kemanusiaan',
    description: 'Distribusi makanan hangat, obat-obatan dasar, selimut, dan hygiene kit untuk 300 kepala keluarga pengungsi banjir.',
    target_amount: 100000000,
    collected_amount: 88700000,
    image_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    location_name: 'Demak, Jawa Tengah',
    latitude: -6.8944,
    longitude: 110.6386,
    status: 'ACTIVE',
    beneficiary_count: 650,
    featured: false,
    created_at: '2026-02-15T12:00:00Z',
  },
];

export const INITIAL_WAKAF_ASSETS: WakafAsset[] = [
  {
    id: 'asset-1',
    name: 'Gedung Sentra Bisnis Syariah & UMKM Mualaf',
    asset_type: 'produktif',
    location: 'Jl. Soekarno-Hatta, Bandung, Jawa Barat',
    latitude: -6.9388,
    longitude: 107.6543,
    area_sqm: 1200,
    estimated_value: 3500000000,
    yield_monthly: 42000000,
    manager_nazhir: 'Yayasan Wakaf ZIFORA Mandiri',
    documentation_photos: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    ],
    progress_percentage: 100,
    description: 'Aset wakaf berwujud gedung produktif yang disewakan untuk operasional UMKM halal. Seluruh imbal hasil (yield) disalurkan ke beasiswa santri.',
    status: 'OPERASIONAL',
    updated_at: '2026-02-10T14:00:00Z',
  },
  {
    id: 'asset-2',
    name: 'Tanah Wakaf Perluasan Pesantren Tahfidz Preneur',
    asset_type: 'tanah',
    location: 'Bogor, Jawa Barat',
    latitude: -6.5971,
    longitude: 106.806,
    area_sqm: 4500,
    estimated_value: 2250000000,
    manager_nazhir: 'BWI Wilayah Jawa Barat & Nazhir ZIFORA',
    documentation_photos: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    ],
    progress_percentage: 75,
    description: 'Lahan pembebasan wakaf seluas 4.500 m2 untuk asrama dan laboratorium wirausaha santri penghafal Al-Quran.',
    status: 'PROGRES',
    updated_at: '2026-02-14T09:30:00Z',
  },
  {
    id: 'asset-3',
    name: 'Jaringan Pipanisasi & Sumur Wakaf Surya',
    asset_type: 'sumur',
    location: 'Playen, Gunungkidul, DIY',
    latitude: -7.9421,
    longitude: 110.5358,
    estimated_value: 220000000,
    manager_nazhir: 'Kelompok Pengelola Sarana Air Mandiri',
    documentation_photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    ],
    progress_percentage: 100,
    description: 'Instalasi sumur bor terbarukan dan 4 tandon air utama yang telah mengalirkan 15.000 liter air bersih per hari untuk 350 KK.',
    status: 'OPERASIONAL',
    updated_at: '2026-01-28T16:00:00Z',
  },
];

export const INITIAL_MUSTAHIK: Mustahik[] = [
  {
    id: 'mst-1',
    full_name: 'Ibu Maryam (58 th)',
    nik_masked: '3204**********02',
    asnaf_category: 'fakir',
    city: 'Bandung',
    province: 'Jawa Barat',
    latitude: -6.9147,
    longitude: 107.6098,
    verification_status: 'TERVERIFIKASI',
    assistance_received_amount: 4500000,
    story: 'Lansia sebatang kara dengan keterbatasan fisik, membutuhkan bantuan jaminan pangan bulanan dan biaya pengobatan.',
  },
  {
    id: 'mst-2',
    full_name: 'Pak Hendra (42 th)',
    nik_masked: '3203**********08',
    asnaf_category: 'miskin',
    city: 'Cianjur',
    province: 'Jawa Barat',
    latitude: -6.8201,
    longitude: 107.1425,
    verification_status: 'TERVERIFIKASI',
    assistance_received_amount: 6000000,
    story: 'Buruh tani harian dengan 4 anak usia sekolah. Menerima bantuan modal peralatan pertanian mandiri.',
  },
  {
    id: 'mst-3',
    full_name: 'Ustadz Salman Al-Farisi',
    nik_masked: '3321**********01',
    asnaf_category: 'fisabilillah',
    city: 'Demak',
    province: 'Jawa Tengah',
    latitude: -6.892,
    longitude: 110.635,
    verification_status: 'TERVERIFIKASI',
    assistance_received_amount: 3500000,
    story: 'Guru ngaji sukarela di pesisir utara Demak yang mengajar 80 anak tanpa pungutan SPP.',
  },
  {
    id: 'mst-4',
    full_name: 'Ibu Siti Khodijah (34 th)',
    nik_masked: '3601**********05',
    asnaf_category: 'gharimin',
    city: 'Pandeglang',
    province: 'Banten',
    latitude: -6.312,
    longitude: 106.102,
    verification_status: 'TERVERIFIKASI',
    assistance_received_amount: 5000000,
    story: 'Ibu rumah tangga terlilit utang pengobatan darurat anak di rentenir lokal, kini telah dilunasi lewat dana zakat asnaf gharimin.',
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-1001',
    order_number: 'ZFR-202602-0081',
    program_id: 'prog-zakat-1',
    program_title: 'Zakat Penghasilan: Beasiswa Santri & Yatim Berprestasi',
    program_type: 'zakat',
    donor_name: 'Rahmat Hidayat, S.T.',
    donor_email: 'rahmat.h@gmail.com',
    donor_phone: '081298765432',
    base_amount: 1500000,
    unique_code: 147,
    total_amount: 1500147,
    payment_method: 'QRIS_DANA',
    status: 'VERIFIED',
    notes: 'Semoga berkah untuk adik-adik santri penghafal Quran.',
    is_anonymous: false,
    created_at: '2026-02-18T10:15:00Z',
    verified_at: '2026-02-18T10:16:12Z',
  },
  {
    id: 'trx-1002',
    order_number: 'ZFR-202602-0082',
    program_id: 'prog-infak-1',
    program_title: 'Sedekah Subuh: 1.000 Paket Nasi Berkah Jumat',
    program_type: 'sedekah',
    donor_name: 'Hamba Allah',
    donor_email: 'anonim@zifora.org',
    donor_phone: '085712348899',
    base_amount: 100000,
    unique_code: 289,
    total_amount: 100289,
    payment_method: 'QRIS_DANA',
    status: 'VERIFIED',
    notes: 'Doakan hajat keluarga kami dipermudah.',
    is_anonymous: true,
    created_at: '2026-02-18T05:30:00Z',
    verified_at: '2026-02-18T05:31:05Z',
  },
  {
    id: 'trx-1003',
    order_number: 'ZFR-202602-0083',
    program_id: 'prog-wakaf-1',
    program_title: 'Wakaf Produktif: Klinik Bersalin Cuma-Cuma Dhuafa',
    program_type: 'wakaf',
    donor_name: 'Dr. Nurul Fadilah',
    donor_email: 'nurul.f@hospital.co.id',
    donor_phone: '081344556677',
    base_amount: 500000,
    unique_code: 312,
    total_amount: 500312,
    payment_method: 'QRIS_DANA',
    status: 'PENDING',
    notes: 'Wakaf atas nama almarhumah ibunda Hj. Aminah.',
    is_anonymous: false,
    created_at: '2026-02-19T09:00:00Z',
  },
];

// LocalStorage helpers to allow live CRUD and persist across user tests
const STORAGE_KEYS = {
  PROGRAMS: 'zifora_programs_v1',
  ASSETS: 'zifora_assets_v1',
  MUSTAHIK: 'zifora_mustahik_v1',
  TRANSACTIONS: 'zifora_transactions_v1',
};

export function getStoredPrograms(): Program[] {
  const data = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
    return INITIAL_PROGRAMS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PROGRAMS;
  }
}

export function saveProgram(program: Program): void {
  const programs = getStoredPrograms();
  const index = programs.findIndex((p) => p.id === program.id);
  if (index >= 0) {
    programs[index] = program;
  } else {
    programs.unshift(program);
  }
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
}

export function deleteProgram(id: string): void {
  const programs = getStoredPrograms().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
}

export function getStoredAssets(): WakafAsset[] {
  const data = localStorage.getItem(STORAGE_KEYS.ASSETS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(INITIAL_WAKAF_ASSETS));
    return INITIAL_WAKAF_ASSETS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_WAKAF_ASSETS;
  }
}

export function saveAsset(asset: WakafAsset): void {
  const assets = getStoredAssets();
  const index = assets.findIndex((a) => a.id === asset.id);
  if (index >= 0) {
    assets[index] = asset;
  } else {
    assets.unshift(asset);
  }
  localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
}

export function getStoredMustahik(): Mustahik[] {
  const data = localStorage.getItem(STORAGE_KEYS.MUSTAHIK);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.MUSTAHIK, JSON.stringify(INITIAL_MUSTAHIK));
    return INITIAL_MUSTAHIK;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_MUSTAHIK;
  }
}

export function getStoredTransactions(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
    return INITIAL_TRANSACTIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

export function createTransaction(trx: Transaction): void {
  const list = getStoredTransactions();
  list.unshift(trx);
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list));
}

export function verifyTransaction(orderNumber: string): Transaction | null {
  const list = getStoredTransactions();
  const trx = list.find((t) => t.order_number === orderNumber);
  if (trx) {
    trx.status = 'VERIFIED';
    trx.verified_at = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list));

    // Also update collected_amount on the corresponding program
    const programs = getStoredPrograms();
    const prog = programs.find((p) => p.id === trx.program_id);
    if (prog) {
      prog.collected_amount += trx.base_amount;
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    }
    return trx;
  }
  return null;
}

/**
 * Generate unique verification code between 1 and 499 (strictly under 500 IDR)
 */
export function generateUniqueCode(): number {
  return Math.floor(Math.random() * 498) + 1;
}
