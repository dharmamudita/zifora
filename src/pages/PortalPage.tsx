import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircle, 
  ShieldCheck, 
  Repeat, 
  ArrowRight, 
  CheckCircle2, 
  LogIn,
  AlertCircle
} from 'lucide-react';
import { getCurrentUser, switchRole, UserProfile } from '../services/authStore';
import { UserDashboardPage } from './UserDashboardPage';
import { AdminDashboard } from './admin/AdminDashboard';

export const PortalPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getCurrentUser());
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('zifora_auth_change', handleAuthChange);
    return () => window.removeEventListener('zifora_auth_change', handleAuthChange);
  }, []);

  const handleQuickSwitch = (role: 'admin' | 'muzaki') => {
    switchRole(role);
    setShowSwitchModal(false);
  };

  // IF NOT LOGGED IN
  if (!currentUser) {
    return (
      <div className="pt-28 sm:pt-36 pb-20 min-h-screen bg-[#F8FAF9] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-zifora-lg border border-[#1B5E4B]/15 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#E8F3EE] flex items-center justify-center mx-auto text-[#1B5E4B]">
            <LogIn className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#092820] font-serif">
              Silakan Masuk Terlebih Dahulu
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Portal data muzaki dan pengawasan admin ZIFORA memerlukan autentikasi akun.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/login"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white shadow transition flex items-center justify-center space-x-2"
            >
              <span>Buka Halaman Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 flex items-center justify-center space-x-2 text-xs">
              <span className="text-gray-400">Atau masuk cepat:</span>
              <button
                onClick={() => handleQuickSwitch('admin')}
                className="font-bold text-[#D4AF37] hover:underline"
              >
                Admin
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={() => handleQuickSwitch('muzaki')}
                className="font-bold text-[#1B5E4B] hover:underline"
              >
                Donatur
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#F8FAF9]">
      
      {/* Unified Account Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
              currentUser.role === 'admin' ? 'bg-[#0F3E32] border border-[#D4AF37]/50' : 'bg-[#1B5E4B]'
            }`}>
              {currentUser.role === 'admin' ? <ShieldCheck className="w-5 h-5 text-[#D4AF37]" /> : <UserCircle className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-gray-900">{currentUser.name}</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  currentUser.role === 'admin'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {currentUser.role === 'admin' ? 'Akun Administrator' : 'Akun Muzaki / Donatur'}
                </span>
              </div>
              <p className="text-xs text-gray-500">{currentUser.email} • {currentUser.level}</p>
            </div>
          </div>

          {/* Switch Account Trigger */}
          <button
            type="button"
            onClick={() => setShowSwitchModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#F3FAF6] text-[#1B5E4B] hover:bg-[#E8F3EE] border border-[#1B5E4B]/30 transition"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Ganti Akun Masuk</span>
          </button>
        </div>
      </div>

      {/* RENDER VIEW BASED ON UNIFIED ACCOUNT ROLE */}
      {currentUser.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <UserDashboardPage />
      )}

      {/* LOGIN / ACCOUNT SWITCHER MODAL */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-[#092820] font-serif">
                  Ganti Akun Masuk
                </h3>
                <p className="text-xs text-gray-500">
                  Pilih salah satu dari 2 akun terdaftar untuk melihat tampilannya:
                </p>
              </div>
              <button
                onClick={() => setShowSwitchModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-base"
              >
                ✕
              </button>
            </div>

            {/* Quick Demo Switcher Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickSwitch('admin')}
                className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                  currentUser.role === 'admin'
                    ? 'border-[#D4AF37] bg-[#FAF5E8]'
                    : 'border-gray-200 hover:border-[#1B5E4B]/40 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0F3E32] flex items-center justify-center text-[#D4AF37]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">1. Akun Admin (Super Admin)</h4>
                    <p className="text-[10px] text-gray-500 font-mono">admin@zifora.org (pass: admin123)</p>
                  </div>
                </div>
                {currentUser.role === 'admin' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleQuickSwitch('muzaki')}
                className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                  currentUser.role === 'muzaki'
                    ? 'border-[#1B5E4B] bg-[#E8F3EE]'
                    : 'border-gray-200 hover:border-[#1B5E4B]/40 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B5E4B] flex items-center justify-center text-white">
                    <UserCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">2. Akun Pengguna (Rahmat Hidayat)</h4>
                    <p className="text-[10px] text-gray-500 font-mono">user@zifora.org (pass: user123)</p>
                  </div>
                </div>
                {currentUser.role === 'muzaki' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                )}
              </button>
            </div>

            <div className="pt-2 text-center">
              <Link
                to="/login"
                onClick={() => setShowSwitchModal(false)}
                className="text-xs text-[#1B5E4B] font-bold hover:underline"
              >
                Buka Halaman Form Login Lengkap
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
