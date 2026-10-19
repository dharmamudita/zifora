import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock, 
  Users, 
  Coins, 
  Landmark, 
  HeartHandshake, 
  MapPin, 
  Layers, 
  Search,
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  getStoredPrograms, 
  saveProgram, 
  deleteProgram, 
  getStoredAssets, 
  getStoredMustahik, 
  getStoredTransactions, 
  verifyTransaction 
} from '../../services/dataStore';
import { uploadToCloudinary } from '../../services/cloudinaryService';
import { Program, AsnafCategory } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'assets' | 'mustahik' | 'transactions' | 'users'>('programs');

  // Dynamic state
  const [programs, setPrograms] = useState(getStoredPrograms());
  const [assets, setAssets] = useState(getStoredAssets());
  const [mustahikList, setMustahikList] = useState(getStoredMustahik());
  const [transactions, setTransactions] = useState(getStoredTransactions());

  // Modal / Form state for new Program
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'zakat' | 'wakaf' | 'infak' | 'sedekah'>('zakat');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTarget, setNewTarget] = useState<number>(100000000);
  const [newLocation, setNewLocation] = useState('');
  const [newLat, setNewLat] = useState<number>(-6.2088);
  const [newLng, setNewLng] = useState<number>(106.8456);
  const [newBeneficiaries, setNewBeneficiaries] = useState<number>(100);

  // Cloudinary upload state
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage('Mengunggah ke Cloudinary CDN...');

    try {
      const res = await uploadToCloudinary(file);
      setUploadedImageUrl(res.url);
      setUploadMessage('✓ Foto berhasil diunggah ke Cloudinary');
    } catch (err) {
      setUploadMessage('Gagal mengunggah foto');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const newProg: Program = {
      id: `prog-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      category: newCategory,
      subcategory: newSubcategory || 'Pemberdayaan Umat',
      description: newDescription,
      target_amount: newTarget,
      collected_amount: 0,
      image_url: uploadedImageUrl || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
      location_name: newLocation || 'DKI Jakarta',
      latitude: newLat,
      longitude: newLng,
      status: 'ACTIVE',
      beneficiary_count: newBeneficiaries,
      featured: false,
      created_at: new Date().toISOString(),
    };

    saveProgram(newProg);
    setPrograms(getStoredPrograms());
    setShowAddModal(false);

    // Reset Form
    setNewTitle('');
    setNewSubcategory('');
    setNewDescription('');
    setUploadedImageUrl('');
    setUploadMessage('');
  };

  const handleDeleteProgram = (id: string) => {
    if (confirm('Yakin ingin menghapus program ini?')) {
      deleteProgram(id);
      setPrograms(getStoredPrograms());
    }
  };

  const handleManualVerifyTrx = (orderNumber: string) => {
    verifyTransaction(orderNumber);
    setTransactions(getStoredTransactions());
    setPrograms(getStoredPrograms());
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white rounded-3xl p-8 sm:p-10 shadow-zifora-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Panel Manajemen & Pengawasan ZIFORA
              </span>
            </div>
            <h1 className="text-3xl font-extrabold font-serif text-[#FAF5E8]">
              Dashboard Administrasi Terpadu
            </h1>
            <p className="text-xs text-[#CDE1D9]">
              Kelola program ZISWAF, upload foto dokumentasi ke Cloudinary, verifikasi transaksi DANA Bisnis, dan pantau database mustahik/muzaki.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-3 px-5 rounded-2xl text-xs font-bold bg-[#D4AF37] text-[#092820] hover:brightness-110 shadow-lg flex items-center space-x-2 transition flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Program Baru</span>
          </button>
        </div>

        {/* Admin Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 block">Total Program ZISWAF</span>
            <span className="text-2xl font-black text-[#0F3E32]">{programs.length}</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">Aktif di Peta GIS</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 block">Aset Wakaf Dikelola</span>
            <span className="text-2xl font-black text-[#C5A059]">{assets.length}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Valuasi puluhan miliar</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 block">Mustahik Terdata</span>
            <span className="text-2xl font-black text-rose-700">{mustahikList.length}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Kategori 8 Asnaf</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 block">Transaksi Masuk</span>
            <span className="text-2xl font-black text-teal-700">{transactions.length}</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">Terverifikasi sistem</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 overflow-x-auto bg-white rounded-2xl p-2 shadow-sm">
          {[
            { id: 'programs', label: 'Program ZISWAF (CRUD)' },
            { id: 'transactions', label: 'Verifikasi Transaksi & QRIS' },
            { id: 'mustahik', label: 'Database Mustahik Rinci' },
            { id: 'users', label: 'Data Pengguna / Muzaki' },
            { id: 'assets', label: 'Aset Wakaf Fisik' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-[#1B5E4B] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PROGRAMS MANAGEMENT */}
        {activeTab === 'programs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#092820] font-serif">Daftar Program Aktif</h3>
                <p className="text-xs text-gray-500">Program ini langsung terhubung ke publik dan titik Peta GIS</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition"
              >
                + Tambah Program
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Program & Foto</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Target Dana</th>
                    <th className="py-3 px-4">Terkumpul</th>
                    <th className="py-3 px-4">Lokasi & Koordinat</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {programs.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4 flex items-center space-x-3 max-w-sm">
                        <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <span className="font-bold text-gray-900 line-clamp-1">{p.title}</span>
                          <span className="text-[10px] text-gray-400 block">{p.subcategory}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#E8F3EE] text-[#1B5E4B]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-gray-700">
                        {formatRupiah(p.target_amount)}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0F3E32]">
                        {formatRupiah(p.collected_amount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-800 block">{p.location_name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{p.latitude}, {p.longitude}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteProgram(p.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="Hapus Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSAKSI & QRIS DANA BISNIS */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#092820] font-serif">Pusat Verifikasi Pembayaran Masuk</h3>
                <p className="text-xs text-gray-500">Mendeteksi transaksi via kode unik verifikasi DANA Bisnis</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Invoice & Tanggal</th>
                    <th className="py-3 px-4">Muzaki / Donatur</th>
                    <th className="py-3 px-4">Program</th>
                    <th className="py-3 px-4">Nominal Pokok</th>
                    <th className="py-3 px-4">Kode Unik</th>
                    <th className="py-3 px-4">Total Transfer</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {trx.order_number}
                        <span className="block text-[10px] text-gray-400 font-normal">
                          {new Date(trx.created_at).toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900 block">{trx.donor_name}</span>
                        <span className="text-[10px] text-gray-400 block">{trx.donor_phone}</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700 max-w-xs line-clamp-1">
                        {trx.program_title}
                      </td>
                      <td className="py-3 px-4 font-mono">{formatRupiah(trx.base_amount)}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">+{trx.unique_code}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0F3E32]">{formatRupiah(trx.total_amount)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          trx.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {trx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {trx.status === 'PENDING' ? (
                          <button
                            onClick={() => handleManualVerifyTrx(trx.order_number)}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition"
                          >
                            Setujui Lunas
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold text-[11px]">✓ Lunas</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DATABASE MUSTAHIK RINCI */}
        {activeTab === 'mustahik' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#092820] font-serif">Database Mustahik Terverifikasi</h3>
              <p className="text-xs text-gray-500">Klasifikasi 8 Asnaf berdasarkan hasil asesmen lapangan</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Nama & NIK Terenkripsi</th>
                    <th className="py-3 px-4">Kategori Asnaf</th>
                    <th className="py-3 px-4">Domisili / Wilayah</th>
                    <th className="py-3 px-4">Bantuan Diterima</th>
                    <th className="py-3 px-4">Catatan Kasus / Kondisi</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mustahikList.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <span className="font-bold text-gray-900 block">{m.full_name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{m.nik_masked}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800">
                          {m.asnaf_category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {m.city}, {m.province}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0F3E32]">
                        {formatRupiah(m.assistance_received_amount)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 max-w-xs">
                        {m.story}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {m.verification_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: DATA PENGGUNA / MUZAKI RINCI */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#092820] font-serif">Data Muzaki & Donatur</h3>
              <p className="text-xs text-gray-500">Data profil donatur yang telah terdaftar dalam sistem ZIFORA</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Rahmat Hidayat, S.T.', email: 'rahmat.h@gmail.com', phone: '081298765432', total: 'Rp 1.500.000', count: 3, level: 'Muzaki Platinum' },
                { name: 'Dr. Nurul Fadilah', email: 'nurul.f@hospital.co.id', phone: '081344556677', total: 'Rp 500.000', count: 1, level: 'Wakif Emas' },
                { name: 'Hamba Allah (Anonim)', email: 'anonim@zifora.org', phone: '085712348899', total: 'Rp 100.000', count: 1, level: 'Donatur Peduli' },
              ].map((u, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#F8FAF9] border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F3EE] text-[#1B5E4B]">
                      {u.level}
                    </span>
                    <span className="text-xs text-gray-400">{u.count}x Donasi</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#092820]">{u.name}</h4>
                  <p className="text-xs text-gray-500">{u.email} • {u.phone}</p>
                  <div className="pt-2 border-t border-gray-200 flex justify-between text-xs font-bold text-[#0F3E32]">
                    <span>Total Disalurkan:</span>
                    <span>{u.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ASET WAKAF FISIK */}
        {activeTab === 'assets' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#092820] font-serif">Katalog Aset Wakaf Fisik</h3>
              <p className="text-xs text-gray-500">Legalitas tanah, gedung, dan fasilitas produktif di bawah naungan nazhir</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assets.map((asset) => (
                <div key={asset.id} className="p-6 rounded-2xl bg-[#F8FAF9] border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {asset.asset_type}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">Progres: {asset.progress_percentage}%</span>
                  </div>
                  <h4 className="font-bold text-base text-[#092820] font-serif">{asset.name}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{asset.description}</p>
                  <div className="text-xs space-y-1 pt-2 border-t border-gray-200 text-gray-600">
                    <div>Lokasi: <strong className="text-gray-900">{asset.location}</strong></div>
                    <div>Nazhir Pengelola: <strong className="text-gray-900">{asset.manager_nazhir}</strong></div>
                    <div>Estimasi Valuasi: <strong className="text-[#0F3E32]">{formatRupiah(asset.estimated_value)}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL TAMBAH PROGRAM + UPLOAD CLOUDINARY */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-5 animate-fadeIn">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#092820] font-serif">
                Tambah Program ZISWAF Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Judul Program
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Beasiswa Santri Tahfidz Dhuafa..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Kategori ZISWAF
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                  >
                    <option value="zakat">Zakat</option>
                    <option value="wakaf">Wakaf</option>
                    <option value="infak">Infak</option>
                    <option value="sedekah">Sedekah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Subkategori
                  </label>
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    placeholder="Contoh: Pendidikan / Kesehatan"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    required
                  />
                </div>
              </div>

              {/* CLOUDINARY UPLOAD SECTION */}
              <div className="p-4 bg-[#F3FAF6] rounded-2xl border border-[#1B5E4B]/20 space-y-2">
                <label className="block text-xs font-bold text-[#092820] uppercase flex items-center space-x-1.5">
                  <Upload className="w-4 h-4 text-[#1B5E4B]" />
                  <span>Foto Dokumentasi (Upload Cloudinary CDN)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1B5E4B] file:text-white hover:file:bg-[#0F3E32]"
                />
                {uploadMessage && (
                  <p className="text-[11px] text-emerald-800 font-semibold">{uploadMessage}</p>
                )}
                {uploadedImageUrl && (
                  <div className="mt-2">
                    <img src={uploadedImageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl border" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Jelaskan tujuan program, sasaran mustahik, dan urgensi bantuan..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Target Dana (Rp)
                  </label>
                  <input
                    type="number"
                    step={1000000}
                    value={newTarget}
                    onChange={(e) => setNewTarget(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Target Jiwa Mustahik
                  </label>
                  <input
                    type="number"
                    value={newBeneficiaries}
                    onChange={(e) => setNewBeneficiaries(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Nama Wilayah</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Contoh: Bandung"
                    className="w-full px-3 py-2 rounded-xl border text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={newLat}
                    onChange={(e) => setNewLat(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={newLng}
                    onChange={(e) => setNewLng(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="py-2.5 px-6 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition shadow"
                >
                  Simpan Program
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
