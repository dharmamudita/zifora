import React, { useState, useEffect } from 'react';
import { 
  UserCircle, 
  ShieldCheck, 
  Repeat, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Mail,
  Key
} from 'lucide-react';
import { getCurrentUser, switchRole, UserProfile } from '../services/authStore';
import { UserDashboardPage } from './UserDashboardPage';
import { AdminDashboard } from './admin/AdminDashboard';

export const PortalPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(getCurrentUser());
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [authError, setAuthError] = useState('');

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

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = inputEmail.trim().toLowerCase();

    if (cleanEmail === 'admin@zifora.org') {
      switchRole('admin');
      setShowSwitchModal(false);
      setAuthError('');
    } else if (cleanEmail.includes('admin')) {
      switchRole('admin');
      setShowSwitchModal(false);
      setAuthError('');
    } else {
      switchRole('muzaki');
      setShowSwitchModal(false);
      setAuthError('');
    }
  };

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
                  Masuk ke Portal ZIFORA
                </h3>
                <p className="text-xs text-gray-500">
                  Gunakan akun Admin atau Akun Donatur untuk mengakses data.
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
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Pilih Akun Cepat (Demo Lomba):
              </span>
              
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
                    <h4 className="text-xs font-bold text-gray-900">Super Admin ZIFORA</h4>
                    <p className="text-[10px] text-gray-500 font-mono">admin@zifora.org (Role: Admin)</p>
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
                    <h4 className="text-xs font-bold text-gray-900">Rahmat Hidayat, S.T.</h4>
                    <p className="text-[10px] text-gray-500 font-mono">rahmat.h@gmail.com (Role: Donatur)</p>
                  </div>
                </div>
                {currentUser.role === 'muzaki' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                )}
              </button>
            </div>

            {/* Manual Form Login */}
            <form onSubmit={handleManualLogin} className="pt-3 border-t border-gray-100 space-y-3">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Atau Masukkan Email Akun:
              </span>

              <div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="Ketik email (misal: admin@zifora.org)..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1B5E4B]"
                    required
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Tips: Masukkan email dengan kata "admin" untuk masuk sebagai Admin.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1B5E4B] text-white hover:bg-[#0F3E32] transition shadow"
              >
                Masuk ke Akun Ini
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
