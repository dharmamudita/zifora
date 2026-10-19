import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircle, 
  Coins, 
  Landmark, 
  HeartHandshake, 
  Download, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { getStoredTransactions } from '../services/dataStore';

export const UserDashboardPage: React.FC = () => {
  const transactions = getStoredTransactions();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const verifiedTrx = transactions.filter((t) => t.status === 'VERIFIED');
  const totalMyDonation = verifiedTrx.reduce((acc, t) => acc + t.total_amount, 0);

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* User Profile Banner */}
        <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white rounded-3xl p-8 sm:p-10 shadow-zifora-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-[#092820] shadow-md border-2 border-white/20 flex-shrink-0">
              <UserCircle className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Akun Muzaki / Donatur Aktif
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Rahmat Hidayat, S.T.
              </h1>
              <p className="text-xs text-[#CDE1D9]">
                Bergabung sejak Januari 2026 • Status: Muzaki Terdaftar
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right min-w-[200px]">
            <span className="text-xs text-[#CDE1D9] block">Total Kontribusi ZISWAF</span>
            <span className="text-2xl font-black text-[#D4AF37] font-mono mt-0.5 block">
              {formatRupiah(totalMyDonation)}
            </span>
            <span className="text-[11px] text-[#A3C9BC] block mt-0.5">{verifiedTrx.length} Transaksi Terverifikasi</span>
          </div>
        </div>

        {/* Quick Badges & Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Lencana Amal</span>
              <span className="font-bold text-sm text-[#092820]">Wakif Peduli Santri</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#1B5E4B] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Kepatuhan Syariah</span>
              <span className="font-bold text-sm text-[#092820]">Zakat Maal Rutin Terpenuhi</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-zifora border border-[#1B5E4B]/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 flex-shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Penerima Manfaat</span>
              <span className="font-bold text-sm text-[#092820]">12 Mustahik Terdampak</span>
            </div>
          </div>
        </div>

        {/* Riwayat Transaksi Lengkap */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#092820] font-serif">Riwayat Donasi & Akad ZISWAF</h2>
              <p className="text-xs text-gray-500">Daftar transaksi yang pernah Anda salurkan lewat sistem ZIFORA</p>
            </div>
            <Link
              to="/zakat"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition"
            >
              Donasi Baru
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF9] text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">No. Invoice</th>
                  <th className="py-3 px-4">Program Tujuan</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Total Ditransfer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Aksi / Sertifikat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {trx.order_number}
                      <span className="block text-[10px] text-gray-400 font-normal">
                        {new Date(trx.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900 max-w-xs">
                      {trx.program_title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#E8F3EE] text-[#1B5E4B]">
                        {trx.program_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0F3E32]">
                      {formatRupiah(trx.total_amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      {trx.status === 'VERIFIED' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Terverifikasi</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-amber-600 font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {trx.status === 'VERIFIED' ? (
                        <button
                          onClick={() => alert(`Mengunduh sertifikat resmi digital untuk transaksi: ${trx.order_number}`)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#E8F3EE] text-[#1B5E4B] hover:bg-[#CDE1D9] transition"
                        >
                          <Download className="w-3 h-3 text-[#D4AF37]" />
                          <span>Sertifikat (PDF)</span>
                        </button>
                      ) : (
                        <Link
                          to={`/checkout?programId=${trx.program_id}&amount=${trx.base_amount}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 transition"
                        >
                          <span>Bayar Sekarang</span>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
