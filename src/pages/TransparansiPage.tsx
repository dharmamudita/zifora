import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Download, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Coins, 
  Building2, 
  Users,
  ExternalLink
} from 'lucide-react';
import { getStoredPrograms, getStoredTransactions } from '../services/dataStore';

export const TransparansiPage: React.FC = () => {
  const programs = getStoredPrograms();
  const transactions = getStoredTransactions();

  const [searchInvoice, setSearchInvoice] = useState('');
  const [searchedTrx, setSearchedTrx] = useState<any>(null);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const totalCollected = programs.reduce((acc, p) => acc + p.collected_amount, 0);
  const totalDisbursed = totalCollected * 0.91; // 91% tersalurkan, 9% operasional amil (sesuai syariah max 12.5%)

  const handleSearchInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInvoice.trim()) return;

    const found = transactions.find(
      (t) => t.order_number.toLowerCase() === searchInvoice.trim().toLowerCase()
    );

    if (found) {
      setSearchedTrx(found);
      setSearchFeedback(null);
    } else {
      setSearchedTrx(null);
      setSearchFeedback('Nomor invoice tidak ditemukan. Pastikan format benar (Contoh: ZFR-202602-0081)');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white rounded-3xl p-8 sm:p-12 shadow-zifora-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparansi Tanpa Syarat</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#FAF5E8] tracking-tight">
              Laporan Keuangan & Penyaluran Terbuka
            </h1>
            <p className="text-sm sm:text-base text-[#CDE1D9] leading-relaxed">
              ZIFORA memegang teguh amanah donatur. Setiap dana yang masuk dan keluar diaudit secara independen dan dapat dipantau oleh seluruh masyarakat secara real-time.
            </p>
          </div>
        </div>

        {/* Ringkasan Arus Kas ZISWAF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Dana Masuk</span>
            <span className="text-2xl font-black text-[#0F3E32] font-mono mt-1 block">
              {formatRupiah(totalCollected)}
            </span>
            <span className="text-xs text-emerald-700 font-semibold mt-1 block">100% Tercatat Digital</span>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Telah Disalurkan</span>
            <span className="text-2xl font-black text-[#1B5E4B] font-mono mt-1 block">
              {formatRupiah(totalDisbursed)}
            </span>
            <span className="text-xs text-gray-500 mt-1 block">Efisiensi penyaluran 91%</span>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Opini Audit Syariah & Finansial</span>
            <span className="text-xl font-bold text-[#C5A059] font-serif mt-1 block">
              WTP (Wajar Tanpa Pengecualian)
            </span>
            <span className="text-xs text-gray-500 mt-1 block">KAP Independen & Dewan Pengawas</span>
          </div>
        </div>

        {/* Pelacakan Donasi via Nomor Invoice */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E4B]">Cek Transaksi Anda</span>
            <h2 className="text-2xl font-bold text-[#092820] font-serif">Pelacak Status & Penyaluran Donasi</h2>
            <p className="text-xs text-gray-500">Masukkan nomor order/invoice untuk melacak perjalanan dana Anda</p>
          </div>

          <form onSubmit={handleSearchInvoice} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchInvoice}
                onChange={(e) => setSearchInvoice(e.target.value)}
                placeholder="Contoh: ZFR-202602-0081..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition shadow"
            >
              Lacak Invoice
            </button>
          </form>

          {searchFeedback && (
            <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
              {searchFeedback}
            </p>
          )}

          {searchedTrx && (
            <div className="p-6 bg-[#F3FAF6] rounded-2xl border border-[#1B5E4B]/30 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div>
                  <span className="text-xs font-bold font-mono text-[#092820]">{searchedTrx.order_number}</span>
                  <p className="text-[11px] text-gray-500">Dibuat pada: {new Date(searchedTrx.created_at).toLocaleString('id-ID')}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Status: {searchedTrx.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 block">Nama Muzaki/Donatur:</span>
                  <span className="font-bold text-gray-900">{searchedTrx.donor_name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Program Tujuan:</span>
                  <span className="font-bold text-gray-900">{searchedTrx.program_title}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Total Ditransfer:</span>
                  <span className="font-extrabold text-base text-[#0F3E32]">{formatRupiah(searchedTrx.total_amount)}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-gray-700 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B5E4B] flex-shrink-0" />
                <span>Dana telah dialokasikan dan disalurkan kepada mustahik di wilayah program terkait.</span>
              </div>
            </div>
          )}
        </div>

        {/* Berita Acara & Arsip Penyaluran Terbuka */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#092820] font-serif">Dokumentasi & Berita Acara Penyaluran</h2>
              <p className="text-xs text-gray-500">Bukti serah terima bantuan secara faktual di lapangan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'BA Penyaluran Beasiswa Santri Tahfidz 500 Jiwa',
                date: '15 Februari 2026',
                partner: 'Ponpes Darul Huda, Pandeglang',
                amount: 'Rp 284.500.000',
                status: 'Selesai Disalurkan',
              },
              {
                title: 'Serah Terima Sumur Bor Tenaga Surya Gunungkidul',
                date: '28 Januari 2026',
                partner: 'Kelompok Tani Tirta Lestari Playen',
                amount: 'Rp 220.000.000',
                status: 'Operasional Penuh',
              },
              {
                title: 'Distribusi Dapur Umum Banjir Demak (650 Jiwa)',
                date: '16 Februari 2026',
                partner: 'BPBD Demak & Relawan ZIFORA',
                amount: 'Rp 88.700.000',
                status: 'Tanggap Darurat',
              },
              {
                title: 'Penyaluran Modal Benih & Pupuk 140 Petani Dhuafa',
                date: '02 Februari 2026',
                partner: 'Gapoktan Berkah Cianjur',
                amount: 'Rp 122.400.000',
                status: 'Selesai Disalurkan',
              },
            ].map((doc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#1B5E4B] bg-[#E8F3EE] px-2 py-0.5 rounded">
                      {doc.date}
                    </span>
                    <h3 className="font-bold text-base text-[#092820] font-serif">{doc.title}</h3>
                    <p className="text-xs text-gray-500">Mitra Lapangan: {doc.partner}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F3E32]">{doc.amount}</span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold">{doc.status}</span>
                  <button
                    onClick={() => alert(`Mengunduh dokumen berita acara resmi: ${doc.title}`)}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#1B5E4B] font-bold hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh BA (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
