import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  UserCircle, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { login, REGISTERED_ACCOUNTS } from '../services/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);

      if (res.success && res.user) {
        setSuccessMessage(`Berhasil masuk sebagai ${res.user.name}! Mengarahkan ke Dashboard...`);
        setTimeout(() => {
          navigate('/portal');
        }, 800);
      } else {
        setErrorMessage(res.error || 'Email atau password salah.');
      }
    }, 400);
  };

  const handleAutoFill = (accType: 'admin' | 'user') => {
    const target = accType === 'admin' ? REGISTERED_ACCOUNTS[0] : REGISTERED_ACCOUNTS[1];
    setEmail(target.email);
    setPassword(target.password);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        
        {/* Card Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1B5E4B] via-[#2D7D67] to-[#D4AF37] p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#0F3E32] rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-[#D4AF37] font-serif">Z</span>
              </div>
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-[#092820] font-serif tracking-tight">
            Masuk ke Portal ZIFORA
          </h1>
          <p className="text-xs text-gray-500">
            Sistem Manajemen Informasi ZISWAF Terintegrasi & Terpercaya
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora-lg border border-[#1B5E4B]/15 space-y-6">
          
          {/* Quick Demo 1-Click Fill Buttons */}
          <div className="space-y-2.5 p-3.5 bg-[#F3FAF6] rounded-2xl border border-[#1B5E4B]/20">
            <span className="text-[11px] font-bold text-[#0F3E32] uppercase tracking-wider block flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pilih Akun Demo (1-Klik Isi Cepat):</span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleAutoFill('admin')}
                className="p-2.5 rounded-xl border border-[#D4AF37]/50 bg-white hover:bg-[#FAF5E8] transition text-left flex flex-col space-y-0.5 shadow-sm group"
              >
                <span className="text-[11px] font-bold text-[#092820] flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Akun Admin</span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono">admin@zifora.org</span>
                <span className="text-[9px] text-[#1B5E4B] font-semibold">pass: admin123</span>
              </button>

              <button
                type="button"
                onClick={() => handleAutoFill('user')}
                className="p-2.5 rounded-xl border border-[#1B5E4B]/30 bg-white hover:bg-[#E8F3EE] transition text-left flex flex-col space-y-0.5 shadow-sm group"
              >
                <span className="text-[11px] font-bold text-[#092820] flex items-center space-x-1">
                  <UserCircle className="w-3.5 h-3.5 text-[#1B5E4B]" />
                  <span>Akun Pengguna</span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono">user@zifora.org</span>
                <span className="text-[9px] text-[#1B5E4B] font-semibold">pass: user123</span>
              </button>
            </div>
          </div>

          {/* Feedback alerts */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start space-x-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form Inputs */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh: admin@zifora.org"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Kata Sandi (Password)
                </label>
                <span className="text-[11px] text-gray-400">admin123 / user123</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Akun'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-500">
              Kerangka login ini berjalan lokal (mock store) sebelum aktivasi Supabase Cloud.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
