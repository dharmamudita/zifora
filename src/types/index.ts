export type ProgramType = 'zakat' | 'wakaf' | 'infak' | 'sedekah';

export type PaymentStatus = 'PENDING' | 'VERIFIED' | 'EXPIRED' | 'FAILED';

export interface Program {
  id: string;
  title: string;
  slug: string;
  category: ProgramType;
  subcategory: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  image_url: string;
  location_name: string;
  latitude: number;
  longitude: number;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  beneficiary_count: number;
  featured?: boolean;
  created_at: string;
}

export interface WakafAsset {
  id: string;
  name: string;
  asset_type: 'tanah' | 'bangunan' | 'klinik' | 'sumur' | 'produktif';
  location: string;
  latitude: number;
  longitude: number;
  area_sqm?: number;
  estimated_value: number;
  yield_monthly?: number;
  manager_nazhir: string;
  documentation_photos: string[];
  progress_percentage: number;
  description: string;
  status: 'PROGRES' | 'OPERASIONAL' | 'SELESAI';
  updated_at: string;
}

export type AsnafCategory =
  | 'fakir'
  | 'miskin'
  | 'amil'
  | 'mualaf'
  | 'riqab'
  | 'gharimin'
  | 'fisabilillah'
  | 'ibnu_sabil';

export interface Mustahik {
  id: string;
  full_name: string;
  nik_masked: string;
  asnaf_category: AsnafCategory;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  verification_status: 'TERVERIFIKASI' | 'MENUNGGU' | 'DITOLAK';
  assistance_received_amount: number;
  story: string;
}

export interface Transaction {
  id: string;
  order_number: string;
  program_id: string;
  program_title: string;
  program_type: ProgramType;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  base_amount: number;
  unique_code: number; // 1 s.d. 499 IDR
  total_amount: number; // base_amount + unique_code
  payment_method: 'QRIS_DANA' | 'QRIS_UNIVERSAL' | 'MANUAL_TRANSFER';
  status: PaymentStatus;
  notes?: string;
  is_anonymous: boolean;
  created_at: string;
  verified_at?: string;
}

export interface ZakatCalculationInput {
  category: 'penghasilan' | 'emas' | 'tabungan' | 'perdagangan' | 'fitrah';
  monthly_income?: number;
  other_income?: number;
  monthly_expenses?: number;
  gold_weight_grams?: number;
  gold_price_per_gram?: number;
  total_savings?: number;
  trade_assets?: number;
  trade_debts?: number;
  family_members_count?: number;
}
