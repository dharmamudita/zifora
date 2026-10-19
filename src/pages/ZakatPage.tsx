import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Coins, 
  Calculator, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';
import { getStoredPrograms } from '../services/dataStore';

export const ZakatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'penghasilan' | 'emas' | 'tabungan' | 'perdagangan' | 'fitrah'>('penghasilan');

  // Input States
  const [income, setIncome] = useState<number>(12000000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(2000000);

  const [goldGrams, setGoldGrams] = useState<number>(95);
  const [savingsAmount, setSavingsAmount] = useState<number>(125000000);

  const [tradeAssets, setTradeAssets] = useState<number>(200000000);
  const [tradeReceivables, setTradeReceivables] = useState<number>(20000000);
  const [tradeDebts, setTradeDebts] = useState<number>(40000000);

  const [fitrahSouls, setFitrahSouls] = useState<number>(4);

  // Constants (Harga Emas & Nisab)
  const goldPrice = 1350000; // Rp 1.350.000 / gram
  const nisabTahunan = 85 * goldPrice; // Rp 114.750.000
  const nisabBulanan = nisabTahunan / 12; // Rp 9.562.500
  const fitrahPricePerSoul = 45000; // Rp 45.000 per jiwa (setara 2.5kg beras premium)

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Calculations
  const calcZakat = () => {
    switch (activeTab) {
      case 'penghasilan': {
        const netIncome = income + otherIncome - expenses;
        if (netIncome >= nisabBulanan) {
          return {
            isWajib: true,
            totalBase: netIncome,
            nisab: nisabBulanan,
            due: netIncome * 0.025,
            desc: 'Wajib Zakat Profesi (2.5% per bulan)',
          };
        }
        return {
          isWajib: false,
          totalBase: netIncome,
          nisab: nisabBulanan,
          due: 0,
          desc: 'Belum mencapai nisab bulanan (Dianjurkan Infak/Sedekah)',
        };
      }
      case 'emas': {
        if (goldGrams >= 85) {
          const goldVal = goldGrams * goldPrice;
          return {
            isWajib: true,
            totalBase: goldVal,
            nisab: nisabTahunan,
            due: goldVal * 0.025,
            desc: 'Wajib Zakat Emas (2.5% per tahun setelah haul 1 tahun)',
          };
        }
        return {
          isWajib: false,
          totalBase: goldGrams * goldPrice,
          nisab: nisabTahunan,
          due: 0,
          desc: 'Belum mencapai nisab 85 gram emas',
        };
      }
      case 'tabungan': {
        if (savingsAmount >= nisabTahunan) {
          return {
            isWajib: true,
            totalBase: savingsAmount,
            nisab: nisabTahunan,
            due: savingsAmount * 0.025,
            desc: 'Wajib Zakat Simpanan/Tabungan (2.5% per tahun)',
          };
        }
        return {
          isWajib: false,
          totalBase: savingsAmount,
          nisab: nisabTahunan,
          due: 0,
          desc: 'Tabungan belum mencapai nisab setara 85 gram emas',
        };
      }
      case 'perdagangan': {
        const netTrade = tradeAssets + tradeReceivables - tradeDebts;
        if (netTrade >= nisabTahunan) {
          return {
            isWajib: true,
            totalBase: netTrade,
            nisab: nisabTahunan,
            due: netTrade * 0.025,
            desc: 'Wajib Zakat Niaga/Perdagangan (2.5% per tahun)',
          };
        }
        return {
          isWajib: false,
          totalBase: netTrade,
          nisab: nisabTahunan,
          due: 0,
          desc: 'Aset bersih perdagangan belum mencapai nisab',
        };
      }
      case 'fitrah': {
        return {
          isWajib: true,
          totalBase: fitrahSouls * fitrahPricePerSoul,
          nisab: 0,
          due: fitrahSouls * fitrahPricePerSoul,
          desc: `Kewajiban Zakat Fitrah untuk ${fitrahSouls} Jiwa`,
        };
      }
    }
  };

  const result = calcZakat();
  const zakatPrograms = getStoredPrograms().filter((p) => p.category === 'zakat');

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white rounded-3xl p-8 sm:p-12 shadow-zifora-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold">
              <Coins className="w-3.5 h-3.5" />
              <span>Rukun Islam Ketiga</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#FAF5E8] tracking-tight">
              Kalkulator & Penyaluran Zakat Terpercaya
            </h1>
            <p className="text-sm sm:text-base text-[#CDE1D9] leading-relaxed">
              Sucikan harta dan raih keberkahan hidup. ZIFORA menyediakan kalkulator zakat terverifikasi syariah sesuai nisab harga emas terkini, serta menyalurkannya langsung kepada 8 Asnaf mustahik.
            </p>
          </div>
        </div>

        {/* Kalkulator Zakat Interaktif */}
        <div className="bg-white rounded-3xl shadow-zifora-lg border border-[#1B5E4B]/10 overflow-hidden">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-100 overflow-x-auto bg-[#F8FAF9]">
            {[
              { id: 'penghasilan', label: 'Zakat Penghasilan / Profesi' },
              { id: 'emas', label: 'Zakat Emas & Logam Mulia' },
              { id: 'tabungan', label: 'Zakat Tabungan & Deposito' },
              { id: 'perdagangan', label: 'Zakat Perdagangan / Bisnis' },
              { id: 'fitrah', label: 'Zakat Fitrah' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-6 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#1B5E4B] text-[#0F3E32] bg-white shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {activeTab === 'penghasilan' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Penghasilan Utama Bulanan (Gaji Pokok / Omzet Bersih)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">Rp</span>
                      <input
                        type="number"
                        step={500000}
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Penghasilan Tambahan / Bonus (Bulanan)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">Rp</span>
                      <input
                        type="number"
                        step={250000}
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Pengeluaran Kebutuhan Pokok Bulanan (Opsional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">Rp</span>
                      <input
                        type="number"
                        step={250000}
                        value={expenses}
                        onChange={(e) => setExpenses(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'emas' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Total Berat Emas yang Dimiliki & Tersimpan (Gram)
                    </label>
                    <input
                      type="number"
                      step={1}
                      value={goldGrams}
                      onChange={(e) => setGoldGrams(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Nisab emas adalah 85 gram murni yang telah tersimpan genap 1 tahun (haul).
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'tabungan' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Saldo Akhir Tabungan / Giro / Deposito yang Tersimpan 1 Tahun
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-gray-400">Rp</span>
                      <input
                        type="number"
                        step={1000000}
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'perdagangan' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Nilai Stok Barang / Aset Lancar Usaha
                    </label>
                    <input
                      type="number"
                      value={tradeAssets}
                      onChange={(e) => setTradeAssets(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Piutang Usaha yang Dapat Ditagih
                    </label>
                    <input
                      type="number"
                      value={tradeReceivables}
                      onChange={(e) => setTradeReceivables(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Hutang Usaha Jatuh Tempo
                    </label>
                    <input
                      type="number"
                      value={tradeDebts}
                      onChange={(e) => setTradeDebts(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'fitrah' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Jumlah Anggota Keluarga (Jiwa yang Ditanggung)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={fitrahSouls}
                      onChange={(e) => setFitrahSouls(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Kadar zakat fitrah per jiwa: Rp 45.000 (setara 2.5 kg / 3.5 liter beras berkualitas).
                    </p>
                  </div>
                </div>
              )}

              {/* Akad Niat Zakat Digital */}
              <div className="p-4 bg-[#F3FAF6] rounded-2xl border border-[#1B5E4B]/20 space-y-2">
                <span className="text-xs font-bold text-[#092820] flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-[#1B5E4B]" />
                  <span>Akad Niat Membayar Zakat (Digital)</span>
                </span>
                <p className="text-xs font-serif italic text-gray-800">
                  “Nawaitu an ukhrija zakaata maali fardhan lillaahi ta’aala.”
                </p>
                <p className="text-[11px] text-gray-500">
                  (Artinya: Aku berniat mengeluarkan zakat hartaku fardhu karena Allah Ta’ala)
                </p>
              </div>

            </div>

            {/* Result & Summary Column */}
            <div className="lg:col-span-5 bg-[#0F3E32] text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
              <div>
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest block mb-1">
                  Hasil Perhitungan Zakat
                </span>
                <h3 className="text-2xl font-black font-serif text-[#FAF5E8]">
                  {result.isWajib ? 'Wajib Dikeluarkan' : 'Belum Wajib Zakat'}
                </h3>
                <p className="text-xs text-[#CDE1D9] mt-1">{result.desc}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#1B5E4B]">
                {result.nisab > 0 && (
                  <div className="flex justify-between text-xs text-[#CDE1D9]">
                    <span>Ambang Nisab:</span>
                    <span className="font-mono font-semibold">{formatRupiah(result.nisab)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-[#CDE1D9]">
                  <span>Harta Kena Zakat:</span>
                  <span className="font-mono font-semibold">{formatRupiah(result.totalBase)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-[#1B5E4B]/60">
                  <span className="text-sm font-bold text-white">Nominal Zakat:</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] font-mono">
                    {formatRupiah(result.due)}
                  </span>
                </div>
              </div>

              <Link
                to={`/checkout?programId=${zakatPrograms[0]?.id || 'prog-zakat-1'}&amount=${result.due > 0 ? result.due : 50000}&type=zakat`}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#092820] hover:brightness-110 shadow-md transition flex items-center justify-center space-x-2"
              >
                <span>Bayar Zakat Ini via QRIS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

        {/* Daftar Program Zakat Terbuka */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#092820] font-serif">
                Program Penyaluran Zakat
              </h2>
              <p className="text-xs text-gray-500">Pilih program penyaluran khusus untuk asnaf mustahik terverifikasi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zakatPrograms.map((prog) => (
              <div key={prog.id} className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 flex flex-col justify-between space-y-4">
                <div className="flex items-start space-x-4">
                  <img src={prog.image_url} alt={prog.title} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#1B5E4B] bg-[#E8F3EE] px-2 py-0.5 rounded">
                      {prog.subcategory}
                    </span>
                    <h3 className="font-bold text-base text-[#092820] font-serif leading-snug">{prog.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{prog.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-600">
                    Terkumpul: <strong className="text-[#1B5E4B]">{formatRupiah(prog.collected_amount)}</strong>
                  </span>
                  <Link
                    to={`/checkout?programId=${prog.id}&type=zakat`}
                    className="py-2 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition"
                  >
                    Salurkan Zakat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
