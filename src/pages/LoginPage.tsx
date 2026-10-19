import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { login } from '../services/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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
        setSuccessMessage(`Autentikasi berhasil. Mengalihkan ke dashboard Anda...`);
        setTimeout(() => {
          navigate('/portal');
        }, 600);
      } else {
        setErrorMessage(res.error || 'Alamat email atau kata sandi tidak valid.');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1B5E4B] via-[#2D7D67] to-[#D4AF37] p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#0F3E32] rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-[#D4AF37] font-serif">Z</span>
              </div>
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-[#092820] font-serif tracking-tight">
            Masuk ke Akun ZIFORA
          </h1>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            Sistem Informasi Manajemen ZISWAF Terintegrasi, Transparan, dan Terpercaya
          </p>
        </div>

        {/* Clean Enterprise Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-zifora-lg border border-[#1B5E4B]/15 space-y-6">
          
          {/* Feedback alerts */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-start space-x-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-start space-x-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
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
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => alert('Fitur pemulihan kata sandi akan mengirimkan tautan reset ke email terdaftar Anda.')}
                  className="text-[11px] text-[#1B5E4B] hover:underline font-semibold"
                >
                  Lupa kata sandi?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-[#1B5E4B] focus:border-[#1B5E4B] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#1B5E4B] focus:ring-[#1B5E4B]"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 mt-2"
            >
              <span>{isLoading ? 'Memverifikasi Kredensial...' : 'Masuk ke Akun'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Assurance */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-center space-x-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-[#1B5E4B]" />
            <span>Koneksi aman terenkripsi SSL 256-bit</span>
          </div>

        </div>

      </div>
    </div>
  );
};
