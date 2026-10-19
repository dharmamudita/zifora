import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Coins, 
  Landmark, 
  HeartHandshake, 
  Users, 
  Layers, 
  Info, 
  ArrowRight,
  Search,
  ExternalLink
} from 'lucide-react';
import { getStoredPrograms, getStoredAssets, getStoredMustahik } from '../services/dataStore';
import { Program, WakafAsset, Mustahik } from '../types';

interface MapPoint {
  id: string;
  type: 'zakat' | 'wakaf' | 'infak_sedekah' | 'mustahik';
  title: string;
  subtitle: string;
  location: string;
  latitude: number;
  longitude: number;
  amountLabel: string;
  imageUrl?: string;
  beneficiaries?: number;
  asnaf?: string;
}

export const PetaZiswafPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'zakat' | 'wakaf' | 'infak_sedekah' | 'mustahik'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const programs = getStoredPrograms();
  const assets = getStoredAssets();
  const mustahikList = getStoredMustahik();

  // Consolidate all points
  const points: MapPoint[] = [
    // Zakat Programs
    ...programs
      .filter((p) => p.category === 'zakat')
      .map((p) => ({
        id: p.id,
        type: 'zakat' as const,
        title: p.title,
        subtitle: p.subcategory,
        location: p.location_name,
        latitude: p.latitude,
        longitude: p.longitude,
        amountLabel: `Terkumpul: Rp ${p.collected_amount.toLocaleString('id-ID')}`,
        imageUrl: p.image_url,
        beneficiaries: p.beneficiary_count,
      })),
    // Wakaf Assets
    ...assets.map((a) => ({
      id: a.id,
      type: 'wakaf' as const,
      title: a.name,
      subtitle: `Aset ${a.asset_type.toUpperCase()} • Nazhir: ${a.manager_nazhir}`,
      location: a.location,
      latitude: a.latitude,
      longitude: a.longitude,
      amountLabel: `Nilai Aset: Rp ${a.estimated_value.toLocaleString('id-ID')}`,
      imageUrl: a.documentation_photos[0],
    })),
    // Infak & Sedekah
    ...programs
      .filter((p) => p.category === 'infak' || p.category === 'sedekah')
      .map((p) => ({
        id: p.id,
        type: 'infak_sedekah' as const,
        title: p.title,
        subtitle: p.subcategory,
        location: p.location_name,
        latitude: p.latitude,
        longitude: p.longitude,
        amountLabel: `Tersalurkan: Rp ${p.collected_amount.toLocaleString('id-ID')}`,
        imageUrl: p.image_url,
        beneficiaries: p.beneficiary_count,
      })),
    // Mustahik
    ...mustahikList.map((m) => ({
      id: m.id,
      type: 'mustahik' as const,
      title: m.full_name,
      subtitle: `Asnaf ${m.asnaf_category.toUpperCase()} • NIK: ${m.nik_masked}`,
      location: `${m.city}, ${m.province}`,
      latitude: m.latitude,
      longitude: m.longitude,
      amountLabel: `Bantuan Diterima: Rp ${m.assistance_received_amount.toLocaleString('id-ID')}`,
      asnaf: m.asnaf_category,
    })),
  ];

  // Filtering
  const filteredPoints = points.filter((pt) => {
    const matchesFilter = filter === 'ALL' || pt.type === filter;
    const matchesSearch =
      pt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Color helper for badges
  const getBadgeColor = (type: MapPoint['type']) => {
    switch (type) {
      case 'zakat':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'wakaf':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'infak_sedekah':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'mustahik':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getMarkerIcon = (type: MapPoint['type']) => {
    switch (type) {
      case 'zakat':
        return '🟢';
      case 'wakaf':
        return '🔵';
      case 'infak_sedekah':
        return '🟡';
      case 'mustahik':
        return '🔴';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white rounded-3xl p-8 sm:p-10 shadow-zifora-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Sistem Informasi Geografis (GIS) Terpadu</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Peta Sebaran Zakat, Wakaf, Infak, & Mustahik
            </h1>
            <p className="text-sm text-[#CDE1D9] leading-relaxed">
              Wujud nyata transparansi ZIFORA. Jelajahi sebaran fisik aset wakaf produktif, titik penyaluran program zakat, posko infak, serta persebaran penerima manfaat (mustahik) di berbagai wilayah Indonesia.
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-zifora border border-[#1B5E4B]/10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  filter === 'ALL'
                    ? 'bg-[#0F3E32] text-white shadow'
                    : 'bg-[#F3FAF6] text-gray-700 hover:bg-[#E8F3EE]'
                }`}
              >
                Semua Titik ({points.length})
              </button>
              
              <button
                onClick={() => setFilter('zakat')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  filter === 'zakat'
                    ? 'bg-[#1B5E4B] text-white shadow'
                    : 'bg-[#F3FAF6] text-emerald-800 hover:bg-[#E8F3EE]'
                }`}
              >
                <span>🟢</span>
                <span>Zakat</span>
              </button>

              <button
                onClick={() => setFilter('wakaf')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  filter === 'wakaf'
                    ? 'bg-[#C5A059] text-[#092820] shadow'
                    : 'bg-[#F3FAF6] text-amber-900 hover:bg-[#E8F3EE]'
                }`}
              >
                <span>🔵</span>
                <span>Aset Wakaf</span>
              </button>

              <button
                onClick={() => setFilter('infak_sedekah')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  filter === 'infak_sedekah'
                    ? 'bg-teal-700 text-white shadow'
                    : 'bg-[#F3FAF6] text-teal-800 hover:bg-[#E8F3EE]'
                }`}
              >
                <span>🟡</span>
                <span>Infak & Sedekah</span>
              </button>

              <button
                onClick={() => setFilter('mustahik')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  filter === 'mustahik'
                    ? 'bg-rose-700 text-white shadow'
                    : 'bg-[#F3FAF6] text-rose-800 hover:bg-[#E8F3EE]'
                }`}
              >
                <span>🔴</span>
                <span>Mustahik (8 Asnaf)</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lokasi, kota, atau nama..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
              />
            </div>

          </div>
        </div>

        {/* Map Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map Visualizer */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 shadow-zifora-lg border border-[#1B5E4B]/10 space-y-4">
            
            <div className="flex items-center justify-between text-xs text-gray-500 px-2">
              <span className="font-semibold text-[#092820]">
                Menampilkan {filteredPoints.length} titik sebaran aktif di Indonesia
              </span>
              <span className="text-[11px] text-[#4E9B84]">
                Klik pada daftar di samping untuk menyorot detail
              </span>
            </div>

            {/* Embedded Interactive Map Container */}
            <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-slate-100">
              <iframe
                title="Peta ZISWAF Indonesia"
                src="https://www.openstreetmap.org/export/embed.html?bbox=105.5%2C-8.5%2C112.5%2C-6.0&amp;layer=mapnik"
                className="w-full h-full border-0 filter contrast-105"
              />

              {/* Floating Map Legend Overlay */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#1B5E4B]/20 shadow-md text-xs space-y-1.5 z-20">
                <span className="font-bold text-[#092820] block mb-1">Legenda Peta:</span>
                <div className="flex items-center space-x-2">
                  <span>🟢</span>
                  <span>Program Zakat Berjalan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🔵</span>
                  <span>Aset Fisik Wakaf Produktif</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🟡</span>
                  <span>Posko Infak & Sedekah</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🔴</span>
                  <span>Lokasi Sebaran Mustahik</span>
                </div>
              </div>

              {/* Interactive Detail Modal inside Map if a point is selected */}
              {selectedPoint && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#1B5E4B]/30 shadow-2xl z-30 animate-fadeIn">
                  <div className="flex items-start justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getBadgeColor(selectedPoint.type)}`}>
                      {getMarkerIcon(selectedPoint.type)} {selectedPoint.type.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => setSelectedPoint(null)}
                      className="text-gray-400 hover:text-gray-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <h4 className="font-bold text-sm text-[#092820] mt-2 font-serif">
                    {selectedPoint.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedPoint.subtitle}</p>

                  {selectedPoint.imageUrl && (
                    <img
                      src={selectedPoint.imageUrl}
                      alt={selectedPoint.title}
                      className="w-full h-28 object-cover rounded-xl mt-2 border border-gray-100"
                    />
                  )}

                  <div className="mt-3 p-2.5 bg-[#F3FAF6] rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lokasi:</span>
                      <span className="font-semibold text-gray-900">{selectedPoint.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status Keuangan:</span>
                      <span className="font-bold text-[#1B5E4B]">{selectedPoint.amountLabel}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Link
                      to={`/checkout?programId=${selectedPoint.id}&type=${selectedPoint.type}`}
                      className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition flex items-center justify-center space-x-1.5 shadow"
                    >
                      <span>Salurkan Bantuan ke Titik Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right: Sidebar Directory List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-zifora border border-[#1B5E4B]/10">
              <h3 className="text-base font-bold text-[#092820] font-serif mb-3">
                Daftar Titik Penyaluran & Aset
              </h3>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredPoints.length === 0 ? (
                  <p className="text-xs text-gray-500 py-6 text-center">
                    Tidak ditemukan data yang sesuai filter atau pencarian.
                  </p>
                ) : (
                  filteredPoints.map((pt) => (
                    <div
                      key={pt.id}
                      onClick={() => setSelectedPoint(pt)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedPoint?.id === pt.id
                          ? 'border-[#1B5E4B] bg-[#E8F3EE] shadow-sm'
                          : 'border-gray-200 bg-white hover:border-[#1B5E4B]/40 hover:bg-[#F8FAF9]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getBadgeColor(pt.type)}`}>
                          {getMarkerIcon(pt.type)} {pt.type.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {pt.latitude.toFixed(2)}, {pt.longitude.toFixed(2)}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-[#092820] line-clamp-1">
                        {pt.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#1B5E4B]" />
                        <span>{pt.location}</span>
                      </p>

                      <div className="mt-2 text-[11px] font-semibold text-[#1B5E4B]">
                        {pt.amountLabel}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
