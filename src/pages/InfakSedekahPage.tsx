import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Sun, 
  ShieldAlert, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Heart,
  Clock
} from 'lucide-react';
import { getStoredPrograms } from '../services/dataStore';

export const InfakSedekahPage: React.FC = () => {
  const allPrograms = getStoredPrograms();
  const infakPrograms = allPrograms.filter((p) => p.category === 'infak' || p.category === 'sedekah');

  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number>(25000);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white rounded-3xl p-8 sm:p-12 shadow-zifora-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Kebaikan Tanpa Batas Waktu</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#FAF5E8] tracking-tight">
              Infak & Sedekah: Pembuka Pintu Rezeki
            </h1>
            <p className="text-sm sm:text-base text-[#CDE1D9] leading-relaxed">
              Sedekah tidak akan mengurangi harta. Hadirkan kebaikan rutin setiap subuh, bantu saudara yang tertimpa bencana, dan ringankan beban anak-anak yatim dhuafa melalui platform ZIFORA yang transparan.
            </p>
          </div>
        </div>

        {/* Quick Sedekah Subuh Widget */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center space-x-2 text-[#C5A059]">
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#092820]">
                Gerakan Rutin: Sedekah Subuh Berkah
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#092820] font-serif">
              Malaikat Mendoakan Orang yang Bersedekah di Waktu Subuh
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              “Tidak ada satu subuh pun yang dialami hamba-hamba Allah kecuali turun kepada mereka dua malaikat. Salah satu di antara keduanya berdoa: Ya Allah, berikanlah ganti bagi orang yang berinfak.” (HR. Bukhari & Muslim)
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#F3FAF6] p-5 rounded-2xl border border-[#1B5E4B]/20 space-y-4">
            <span className="text-xs font-bold text-gray-700 block">Pilih Nominal Sedekah Subuh:</span>
            <div className="grid grid-cols-3 gap-2">
              {[10000, 25000, 50000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedQuickAmount(amt)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                    selectedQuickAmount === amt
                      ? 'bg-[#1B5E4B] text-white border-[#1B5E4B] shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#1B5E4B]/50'
                  }`}
                >
                  {formatRupiah(amt)}
                </button>
              ))}
            </div>

            <Link
              to={`/checkout?programId=prog-infak-1&amount=${selectedQuickAmount}&type=sedekah`}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white transition flex items-center justify-center space-x-2 shadow"
            >
              <span>Sedekah Subuh {formatRupiah(selectedQuickAmount)} via DANA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Daftar Program Infak & Sedekah */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#092820] font-serif">
              Program Kemanusiaan & Sedekah Aktif
            </h2>
            <p className="text-xs text-gray-500">Pilih program yang ingin Anda dukung hari ini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infakPrograms.map((prog) => {
              const pct = Math.min(Math.round((prog.collected_amount / prog.target_amount) * 100), 100);
              return (
                <div key={prog.id} className="bg-white rounded-3xl p-6 shadow-zifora border border-[#1B5E4B]/10 flex flex-col justify-between space-y-4">
                  <div className="flex items-start space-x-4">
                    <img src={prog.image_url} alt={prog.title} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded uppercase">
                        {prog.category} • {prog.subcategory}
                      </span>
                      <h3 className="font-bold text-base text-[#092820] font-serif leading-snug">{prog.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{prog.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#1B5E4B] h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Terkumpul: <strong className="text-[#1B5E4B]">{formatRupiah(prog.collected_amount)}</strong></span>
                      <span>Target: {formatRupiah(prog.target_amount)}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{prog.beneficiary_count} Penerima Manfaat</span>
                    <Link
                      to={`/checkout?programId=${prog.id}&type=${prog.category}`}
                      className="py-2 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition"
                    >
                      Bantu Program Ini
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
