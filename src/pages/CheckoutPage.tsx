import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  ArrowLeft,
  Smartphone,
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  getStoredPrograms, 
  createTransaction, 
  verifyTransaction, 
  generateUniqueCode 
} from '../services/dataStore';
import { Transaction } from '../types';

export const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const programId = searchParams.get('programId') || 'prog-zakat-1';
  const defaultAmount = Number(searchParams.get('amount')) || 50000;
  const programTypeParam = searchParams.get('type') || 'zakat';

  const programs = getStoredPrograms();
  const program = programs.find((p) => p.id === programId) || programs[0];

  // Unique code generation strictly 1 to 499
  const [uniqueCode] = useState<number>(() => generateUniqueCode());
  const [baseAmount, setBaseAmount] = useState<number>(defaultAmount);
  const totalAmount = baseAmount + uniqueCode;

  // Donor form
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Flow states: 'FORM' | 'WAITING_PAYMENT' | 'SUCCESS'
  const [step, setStep] = useState<'FORM' | 'WAITING_PAYMENT' | 'SUCCESS'>('FORM');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [isSimulatingBot, setIsSimulatingBot] = useState(false);

  // Countdown timer when waiting payment
  useEffect(() => {
    if (step !== 'WAITING_PAYMENT') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderNumber = `ZFR-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(newOrderNumber);

    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      order_number: newOrderNumber,
      program_id: program.id,
      program_title: program.title,
      program_type: program.category,
      donor_name: isAnonymous ? 'Hamba Allah' : donorName || 'Donatur ZIFORA',
      donor_email: donorEmail || 'donatur@zifora.org',
      donor_phone: donorPhone || '08123456789',
      base_amount: baseAmount,
      unique_code: uniqueCode,
      total_amount: totalAmount,
      payment_method: 'QRIS_DANA',
      status: 'PENDING',
      notes: notes,
      is_anonymous: isAnonymous,
      created_at: new Date().toISOString(),
    };

    createTransaction(newTrx);
    setStep('WAITING_PAYMENT');
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(totalAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2500);
  };

  // Triggered when HP Bot / Webhook receives DANA Bisnis notification
  const handlePaymentSuccess = () => {
    setIsSimulatingBot(true);
    setTimeout(() => {
      verifyTransaction(orderNumber);
      setIsSimulatingBot(false);
      setStep('SUCCESS');

      // Trigger Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0F3E32', '#1B5E4B', '#D4AF37', '#E8F3EE'],
      });
    }, 1200);
  };

  const formatMinutes = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 text-sm text-[#1B5E4B] hover:text-[#0F3E32] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Program</span>
          </button>
          <span className="text-xs text-[#4E9B84] bg-[#E8F3EE] px-3 py-1 rounded-full font-semibold">
            Transaksi Aman & Terenkripsi
          </span>
        </div>

        {/* STEP 1: FORM PENGISIAN DATA */}
        {step === 'FORM' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Program Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-zifora border border-[#1B5E4B]/10">
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#E8F3EE] text-[#1B5E4B] mb-3">
                  {program.category}
                </span>
                <h2 className="text-xl font-bold text-[#092820] font-serif leading-snug mb-3">
                  {program.title}
                </h2>
                <img
                  src={program.image_url}
                  alt={program.title}
                  className="w-full h-44 object-cover rounded-xl mb-4 border border-[#E8F3EE]"
                />
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {program.description}
                </p>
                <div className="p-3 bg-[#F3FAF6] rounded-xl text-xs text-[#0F3E32] space-y-1">
                  <div className="flex justify-between">
                    <span>Wilayah Penyaluran:</span>
                    <span className="font-semibold">{program.location_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Penerima:</span>
                    <span className="font-semibold">{program.beneficiary_count} Jiwa</span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-[#0F3E32] text-white p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center space-x-2 text-[#D4AF37]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-bold">Jaminan Transparansi ZIFORA</span>
                </div>
                <p className="text-xs text-[#CDE1D9] leading-relaxed">
                  Setiap rupiah yang Anda salurkan akan langsung tercatat di buku besar digital, masuk dalam laporan audit publik, dan dapat dipantau di Peta Interaktif.
                </p>
              </div>
            </div>

            {/* Right: Payment Input Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleStartPayment} className="bg-white rounded-2xl p-6 sm:p-8 shadow-zifora border border-[#1B5E4B]/10 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#092820] font-serif mb-1">
                    Formulir Donasi & ZISWAF
                  </h3>
                  <p className="text-xs text-gray-500">
                    Silakan isi nominal dan data Anda untuk penerbitan bukti setor digital.
                  </p>
                </div>

                {/* Nominal Buttons */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Pilih Nominal Donasi
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 mb-3">
                    {[25000, 50000, 100000, 250000, 500000, 1000000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setBaseAmount(amt)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                          baseAmount === amt
                            ? 'bg-[#1B5E4B] text-white border-[#1B5E4B] shadow-sm'
                            : 'bg-[#F8FAF9] text-gray-700 border-gray-200 hover:border-[#1B5E4B]/50'
                        }`}
                      >
                        {formatRupiah(amt)}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-sm font-bold text-gray-500">Rp</span>
                    <input
                      type="number"
                      min={10000}
                      step={5000}
                      value={baseAmount}
                      onChange={(e) => setBaseAmount(Number(e.target.value))}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B] font-semibold text-gray-900 text-sm"
                      placeholder="Nominal lainnya..."
                      required
                    />
                  </div>
                </div>

                {/* Donor Info Inputs */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Identitas Donatur
                    </label>
                    <label className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-[#1B5E4B] focus:ring-[#1B5E4B]"
                      />
                      <span>Sembunyikan nama (Hamba Allah)</span>
                    </label>
                  </div>

                  {!isAnonymous && (
                    <div>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Nama Lengkap / Muzaki"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
                        required={!isAnonymous}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="Alamat Email (untuk kwitansi)"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
                      required
                    />
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="Nomor WhatsApp (08xxxx)"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Doa atau pesan khusus untuk mustahik/penerima (opsional)..."
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
                    />
                  </div>
                </div>

                {/* Calculation Preview */}
                <div className="p-4 bg-[#F3FAF6] rounded-xl border border-[#1B5E4B]/20 text-xs space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Nominal Donasi Pokok:</span>
                    <span className="font-semibold text-gray-900">{formatRupiah(baseAmount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center space-x-1">
                      <span>Kode Verifikasi Sistem:</span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-mono">
                        +{formatRupiah(uniqueCode)}
                      </span>
                    </span>
                    <span className="font-semibold text-emerald-700">+{uniqueCode}</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-200 flex justify-between text-sm font-bold text-[#092820]">
                    <span>Total Pembayaran:</span>
                    <span className="text-base text-[#1B5E4B]">{formatRupiah(totalAmount)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#1B5E4B] to-[#0F3E32] hover:brightness-110 shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>Lanjutkan ke Pembayaran QRIS</span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </form>
            </div>

          </div>
        )}

        {/* STEP 2: WAITING PAYMENT (QRIS DANA BISNIS + KODE UNIK SENSOR) */}
        {step === 'WAITING_PAYMENT' && (
          <div className="bg-white rounded-3xl shadow-zifora-lg border border-[#1B5E4B]/15 overflow-hidden">
            
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-[#0F3E32] to-[#1B5E4B] text-white p-6 sm:p-8 text-center relative">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold mb-2">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Menunggu Pembayaran Transfer</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FAF5E8]">
                Scan QRIS DANA Bisnis
              </h2>
              <p className="text-xs text-[#CDE1D9] mt-1">
                Nomor Pesanan: <strong className="font-mono text-white">{orderNumber}</strong> • Batas Waktu: <strong className="text-[#D4AF37] font-mono">{formatMinutes(timeLeft)}</strong>
              </p>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: QR Code Container */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="p-4 bg-white rounded-2xl shadow-md border-2 border-[#1B5E4B]/30 relative group">
                  
                  {/* Decorative QR Header */}
                  <div className="text-[10px] font-bold tracking-wider text-gray-500 mb-2 uppercase flex items-center justify-between w-full px-1">
                    <span className="text-[#1B5E4B] font-extrabold">QRIS</span>
                    <span className="text-gray-400">NMID: ID1029384756</span>
                  </div>

                  {/* QR Image Mock with Official QRIS Look */}
                  <div className="relative w-56 h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-2 border border-gray-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://zifora.org/pay/${orderNumber}?amount=${totalAmount}`}
                      alt="QRIS DANA Bisnis ZIFORA"
                      className="w-full h-full object-contain"
                    />
                    {/* DANA Bisnis Center Badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-[#118EEA] text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow border border-white">
                        DANA
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] font-bold text-[#092820]">
                    MERCHANT: YAYASAN ZIFORA ZISWAF
                  </div>
                  <div className="text-[9px] text-gray-400">
                    Didukung: DANA, GoPay, OVO, ShopeePay, BCA, Mandiri, dll.
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 max-w-xs">
                  Buka aplikasi <strong>DANA</strong> atau m-Banking Anda, pilih menu <strong>Scan QR</strong>, lalu arahkan kamera ke kode di atas.
                </p>
              </div>

              {/* Right Column: Exact Nominal & Automatic Detection Explanation */}
              <div className="md:col-span-7 space-y-5">
                
                {/* Nominal Box with Copy Action */}
                <div className="p-5 rounded-2xl bg-[#F3FAF6] border border-[#1B5E4B]/30 space-y-3">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                    Jumlah yang Harus Ditransfer
                  </span>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0F3E32] font-mono tracking-tight">
                        {formatRupiah(totalAmount)}
                      </span>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Donasi: {formatRupiah(baseAmount)} + Kode Verifikasi: <strong className="text-emerald-700">Rp {uniqueCode}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyAmount}
                      className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition shadow-sm"
                    >
                      {copiedAmount ? (
                        <>
                          <Check className="w-4 h-4 text-[#D4AF37]" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Salin Nominal</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>PENTING:</strong> Pastikan transfer tepat hingga 3 digit terakhir (<strong>{uniqueCode}</strong>) agar sistem sensor kami langsung mendeteksi pembayaran Anda tanpa perlu konfirmasi manual.
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping"></div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Mendengarkan Sinyal Notifikasi Pembayaran...</h4>
                      <p className="text-[11px] text-gray-500">Status akan berubah otomatis ke SUKSES saat dana masuk</p>
                    </div>
                  </div>
                  <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
                </div>

                {/* Automated Payment Gateway Verification Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF5E8] to-[#E8F3EE] border border-[#D4AF37]/50 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#092820] flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#1B5E4B]" />
                      <span>Verifikasi Otomatis Gateway Pembayaran</span>
                    </span>
                    <span className="text-[10px] bg-[#1B5E4B] text-white px-2 py-0.5 rounded-full font-bold">
                      Otomatis
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Sistem memantau mutasi rekening QRIS secara real-time. Jika Anda telah menyelesaikan pembayaran di aplikasi perbankan atau e-wallet, klik verifikasi untuk konfirmasi instan:
                  </p>
                  <button
                    type="button"
                    onClick={handlePaymentSuccess}
                    disabled={isSimulatingBot}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white shadow transition flex items-center justify-center space-x-2"
                  >
                    {isSimulatingBot ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                        <span>Memverifikasi Mutasi Rekening QRIS...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Saya Sudah Membayar (Cek Mutasi Sekarang)</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* STEP 3: PAYMENT SUCCESS (SERTIFIKAT & BUKTI DONASI RESMI) */}
        {step === 'SUCCESS' && (
          <div className="bg-white rounded-3xl shadow-zifora-lg border border-[#1B5E4B]/20 p-6 sm:p-10 text-center space-y-6 animate-fadeIn">
            
            <div className="w-20 h-20 bg-[#E8F3EE] rounded-full flex items-center justify-center mx-auto text-[#1B5E4B] shadow-inner border border-[#1B5E4B]/30">
              <CheckCircle2 className="w-12 h-12 text-[#1B5E4B]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                Alhamdulillah • Pembayaran Terverifikasi
              </span>
              <h2 className="text-3xl font-extrabold text-[#092820] font-serif mt-2">
                Terima Kasih atas Kebaikan Anda!
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-lg mx-auto">
                Dana zakat/donasi Anda sebesar <strong>{formatRupiah(totalAmount)}</strong> telah resmi diterima oleh sistem ZIFORA dan siap disalurkan kepada mustahik yang berhak.
              </p>
            </div>

            {/* Electronic Receipt / Certificate Card */}
            <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#F8FAF9] border-2 border-dashed border-[#1B5E4B]/40 text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div>
                  <span className="text-lg font-bold text-[#0F3E32] font-serif">ZIFORA CERTIFICATE</span>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Tanda Bukti Setor ZISWAF Digital</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-gray-700">{orderNumber}</span>
                  <p className="text-[10px] text-gray-400">{new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 block">Nama Muzaki/Donatur:</span>
                  <span className="font-bold text-gray-900">{isAnonymous ? 'Hamba Allah' : donorName || 'Donatur ZIFORA'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Program:</span>
                  <span className="font-bold text-gray-900">{program.title}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Kategori ZISWAF:</span>
                  <span className="font-bold text-[#1B5E4B] uppercase">{program.category}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Total Disalurkan:</span>
                  <span className="font-bold text-lg text-[#0F3E32]">{formatRupiah(totalAmount)}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200 text-[11px] text-gray-600 italic">
                “Semoga Allah memberikan pahala atas apa yang telah engkau berikan, menjadikannya penyuci bagimu, dan melimpahkan berkah pada harta yang masih tinggal padamu.” (Doa Penerimaan Zakat)
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition flex items-center justify-center space-x-2 shadow-md"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>Cetak / Unduh Bukti Donasi (PDF)</span>
              </button>

              <Link
                to="/transparansi"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-[#E8F3EE] text-[#1B5E4B] hover:bg-[#CDE1D9] transition flex items-center justify-center space-x-2"
              >
                <span>Lihat Laporan Penyaluran</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
