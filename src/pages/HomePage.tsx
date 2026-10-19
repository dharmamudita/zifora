import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Coins, 
  Landmark, 
  HeartHandshake, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  Calculator, 
  Sparkles,
  Users,
  Building2,
  Lock
} from 'lucide-react';
import { getStoredPrograms, getStoredAssets, getStoredTransactions } from '../services/dataStore';

export const HomePage: React.FC = () => {
  const programs = getStoredPrograms();
  const assets = getStoredAssets();
  const transactions = getStoredTransactions();

  // Quick Calculator State
  const [calcMonthlyIncome, setCalcMonthlyIncome] = useState<number>(10000000);
  const goldPricePerGram = 1350000;
  const nisabTahunan = 85 * goldPricePerGram; // Rp 114.750.000
  const nisabBulanan = nisabTahunan / 12; // Rp 9.562.500
  const isWajibZakat = calcMonthlyIncome >= nisabBulanan;
  const quickZakatDue = isWajibZakat ? calcMonthlyIncome * 0.025 : 0;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Stats calculation
  const totalCollected = programs.reduce((acc, p) => acc + p.collected_amount, 0);
  const totalBeneficiaries = programs.reduce((acc, p) => acc + p.beneficiary_count, 0);
  const totalAssetValue = assets.reduce((acc, a) => acc + a.estimated_value, 0);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#092820] via-[#0F3E32] to-[#092820] text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Background Glow & Islamic Geometric Pattern */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-15 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1B5E4B]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ZISWAF for a Better Era</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-tight text-[#FAF5E8]">
                Sistem Manajemen Informasi ZISWAF Digital Terpadu
              </h1>

              <p className="text-base sm:text-lg text-[#CDE1D9] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Menghubungkan <strong>data muzaki, donatur, mustahik, transaksi real-time, dan aset wakaf produktif</strong> dalam satu platform elegan dengan slogan:
                <span className="block mt-1 font-semibold text-[#D4AF37]">
                  “Terintegrasi, Transparan, dan Terpercaya.”
                </span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/zakat"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#092820] hover:brightness-110 shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <span>Tunaikan ZISWAF Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/peta"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm bg-[#1B5E4B]/80 hover:bg-[#1B5E4B] text-white border border-[#2D7D67] transition-all flex items-center justify-center space-x-2 backdrop-blur-sm"
                >
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Eksplorasi Peta Sebaran</span>
                </Link>
              </div>

              {/* Guarantees Pill */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#A3C9BC]">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sesuai Fatwa DSN-MUI</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Audit Finansial Terbuka</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sensor QRIS DANA Bisnis Instan</span>
                </span>
              </div>
            </div>

            {/* Hero Right: Quick Calculator Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-[#111827] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1B5E4B]">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#092820] font-serif">Kalkulator Zakat Cepat</h3>
                      <p className="text-[11px] text-gray-500">Hitung zakat penghasilan Anda</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-[#E8F3EE] text-[#1B5E4B] px-2.5 py-1 rounded-full uppercase">
                    Nisab 85g Emas
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Penghasilan Bulanan Anda (Take Home Pay)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-500">Rp</span>
                    <input
                      type="number"
                      step={500000}
                      value={calcMonthlyIncome}
                      onChange={(e) => setCalcMonthlyIncome(Number(e.target.value))}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Standar nisab bulanan: {formatRupiah(nisabBulanan)}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F3FAF6] border border-[#1B5E4B]/20 space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Status Kewajiban:</span>
                    <span className={`font-bold ${isWajibZakat ? 'text-[#1B5E4B]' : 'text-amber-700'}`}>
                      {isWajibZakat ? 'Wajib Zakat (2.5%)' : 'Belum Wajib (Dianjurkan Infak)'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-emerald-200 flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-gray-700">Kewajiban Zakat:</span>
                    <span className="text-xl font-extrabold text-[#0F3E32] font-mono">
                      {formatRupiah(quickZakatDue)}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/checkout?programId=prog-zakat-1&amount=${quickZakatDue > 0 ? quickZakatDue : 50000}&type=zakat`}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white transition flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Bayar Zakat Ini via QRIS DANA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. THREE KEY STATS COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F3EE] flex items-center justify-center text-[#1B5E4B] flex-shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Total Dana Terhimpun</span>
              <span className="text-2xl font-black text-[#092820] font-mono">{formatRupiah(totalCollected)}</span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">Real-time transparan</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF5E8] flex items-center justify-center text-[#C5A059] flex-shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Valuasi Aset Wakaf</span>
              <span className="text-2xl font-black text-[#092820] font-mono">{formatRupiah(totalAssetValue)}</span>
              <span className="text-[11px] text-amber-800 font-semibold block mt-0.5">{assets.length} Aset Produktif Aktif</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 flex-shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Mustahik & Jiwa Terbantu</span>
              <span className="text-2xl font-black text-[#092820] font-mono">{totalBeneficiaries.toLocaleString('id-ID')} Jiwa</span>
              <span className="text-[11px] text-teal-700 font-semibold block mt-0.5">8 Golongan Asnaf Terverifikasi</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. LIMA PILAR KONEKSI ZIFORA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E4B]">
            Ekosistem Terintegrasi
          </span>
          <h2 className="text-3xl font-extrabold text-[#092820] font-serif">
            Menghubungkan 5 Elemen Utama ZISWAF
          </h2>
          <p className="text-sm text-gray-600">
            ZIFORA merancang jembatan digital yang mulus agar setiap data dan rupiah dapat dipertanggungjawabkan secara terbuka kepada umat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
          {[
            { title: 'Muzaki & Donatur', desc: 'Kemudahan kalkulasi dan bayar instan tanpa repot admin.', icon: Coins, color: 'text-emerald-700' },
            { title: 'Mustahik Terdata', desc: 'Verifikasi berbasis 8 Asnaf dengan perlindungan privasi.', icon: Users, color: 'text-teal-700' },
            { title: 'Aset Wakaf', desc: 'Pemantauan fisik, sertifikasi, dan imbal hasil produktif.', icon: Landmark, color: 'text-amber-700' },
            { title: 'Sensor Transaksi', desc: 'Verifikasi otomatis QRIS DANA Bisnis via kode unik.', icon: Sparkles, color: 'text-emerald-800' },
            { title: 'Audit Terbuka', desc: 'Laporan penyaluran real-time di peta interaktif GIS.', icon: ShieldCheck, color: 'text-[#0F3E32]' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#F3FAF6] flex items-center justify-center mb-3">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-bold text-sm text-[#092820] mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PROGRAM UNGGULAN ZISWAF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E4B]">
              Program Prioritas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092820] font-serif">
              Salurkan Kebaikan Terbaik Hari Ini
            </h2>
          </div>
          <Link
            to="/zakat"
            className="text-xs font-bold text-[#1B5E4B] hover:text-[#0F3E32] flex items-center space-x-1"
          >
            <span>Lihat Semua Program</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.slice(0, 3).map((prog) => {
            const pct = Math.min(Math.round((prog.collected_amount / prog.target_amount) * 100), 100);
            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl overflow-hidden shadow-zifora border border-[#1B5E4B]/10 flex flex-col hover:shadow-zifora-lg transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={prog.image_url}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0F3E32]/90 text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase backdrop-blur-sm">
                    {prog.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/90 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                    {prog.location_name}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-medium text-emerald-700 block mb-1">
                      {prog.subcategory}
                    </span>
                    <h3 className="font-bold text-base text-[#092820] font-serif line-clamp-2 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-2">
                      {prog.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#1B5E4B] to-[#D4AF37] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Terkumpul</span>
                        <span className="font-bold text-[#092820]">{formatRupiah(prog.collected_amount)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 block text-[10px]">Capaian</span>
                        <span className="font-bold text-[#1B5E4B]">{pct}%</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/checkout?programId=${prog.id}&type=${prog.category}`}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#F3FAF6] text-[#1B5E4B] hover:bg-[#1B5E4B] hover:text-white transition flex items-center justify-center space-x-1.5 border border-[#1B5E4B]/20"
                  >
                    <span>Salurkan Sekarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
