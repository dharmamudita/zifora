import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Building2, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { getStoredAssets, getStoredPrograms } from '../services/dataStore';

export const WakafPage: React.FC = () => {
  const assets = getStoredAssets();
  const wakafPrograms = getStoredPrograms().filter((p) => p.category === 'wakaf');
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const totalWakafValuation = assets.reduce((acc, a) => acc + a.estimated_value, 0);

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white rounded-3xl p-8 sm:p-12 shadow-zifora-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              <span>Amal Jariyah Abadi</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#FAF5E8] tracking-tight">
              Manajemen & Pengembangan Aset Wakaf Produktif
            </h1>
            <p className="text-sm sm:text-base text-[#CDE1D9] leading-relaxed">
              Wakaf mengalirkan pahala tanpa henti. Di ZIFORA, aset wakaf uang maupun wakaf benda (tanah, bangunan, fasilitas kesehatan) dikelola secara produktif, diawasi oleh Nazhir resmi terdaftar BWI, dan imbal hasilnya dialirkan untuk kesejahteraan mustahik.
            </p>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Valuasi Aset Wakaf</span>
            <span className="text-2xl font-black text-[#092820] font-mono mt-1 block">
              {formatRupiah(totalWakafValuation)}
            </span>
            <span className="text-xs text-emerald-700 font-semibold mt-1 block">Tercatat di sistem terintegrasi</span>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Imbal Hasil (Yield) Bulanan</span>
            <span className="text-2xl font-black text-[#1B5E4B] font-mono mt-1 block">
              Rp 42.000.000 / bln
            </span>
            <span className="text-xs text-gray-500 mt-1 block">Dialirkan 100% untuk beasiswa & dhuafa</span>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Kemitraan Nazhir Resmi</span>
            <span className="text-2xl font-black text-[#C5A059] font-serif mt-1 block">
              BWI & Yayasan Mandiri
            </span>
            <span className="text-xs text-gray-500 mt-1 block">Transparansi laporan berkala</span>
          </div>
        </div>

        {/* Showcase Aset Wakaf Aktif & Tracker Progres */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E4B]">Katalog Fisik</span>
            <h2 className="text-2xl font-bold text-[#092820] font-serif">Aset Wakaf Dalam Pengelolaan</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List Aset (Left) */}
            <div className="lg:col-span-5 space-y-4">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedAsset.id === asset.id
                      ? 'border-[#1B5E4B] bg-[#E8F3EE] shadow-md'
                      : 'border-gray-200 bg-white hover:border-[#1B5E4B]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {asset.asset_type}
                    </span>
                    <span className="text-xs font-bold text-[#1B5E4B]">
                      Progres: {asset.progress_percentage}%
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#092820] font-serif">{asset.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#1B5E4B]" />
                    <span>{asset.location}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Detail Aset Terpilih (Right) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-zifora-lg border border-[#1B5E4B]/10 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-[#E8F3EE] px-2.5 py-0.5 rounded">
                    Status: {selectedAsset.status}
                  </span>
                  <h3 className="text-xl font-bold text-[#092820] font-serif mt-1">
                    {selectedAsset.name}
                  </h3>
                </div>
                <span className="text-sm font-mono font-bold text-[#1B5E4B]">
                  {formatRupiah(selectedAsset.estimated_value)}
                </span>
              </div>

              {/* Photos Gallery */}
              <div className="grid grid-cols-2 gap-3">
                {selectedAsset.documentation_photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt={selectedAsset.name}
                    className="w-full h-44 object-cover rounded-xl border border-gray-100"
                  />
                ))}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedAsset.description}
              </p>

              <div className="p-4 bg-[#F3FAF6] rounded-2xl text-xs space-y-2 border border-[#1B5E4B]/20">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengelola / Nazhir:</span>
                  <span className="font-bold text-gray-900">{selectedAsset.manager_nazhir}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokasi Koordinat:</span>
                  <span className="font-mono text-gray-900">{selectedAsset.latitude}, {selectedAsset.longitude}</span>
                </div>
                {selectedAsset.yield_monthly && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Imbal Hasil Produktif:</span>
                    <span className="font-bold text-emerald-700">{formatRupiah(selectedAsset.yield_monthly)} / bulan</span>
                  </div>
                )}
              </div>

              <Link
                to={`/checkout?programId=prog-wakaf-1&type=wakaf`}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white transition flex items-center justify-center space-x-2 shadow"
              >
                <span>Tunaikan Wakaf Uang untuk Program Ini</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

        {/* Program Wakaf Uang */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#092820] font-serif">Program Wakaf Uang Berjalan</h2>
            <p className="text-xs text-gray-500">Mulai dari Rp 50.000 Anda sudah dapat menjadi wakif abadi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wakafPrograms.map((prog) => (
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
                    to={`/checkout?programId=${prog.id}&type=wakaf`}
                    className="py-2 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition"
                  >
                    Ikut Wakaf Uang
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
