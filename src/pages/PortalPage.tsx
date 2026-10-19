import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserCircle, 
  ShieldCheck, 
  ArrowRight, 
  LogIn,
  LogOut,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { getCurrentUser, logout, UserProfile } from '../services/authStore';
import { UserDashboardPage } from './UserDashboardPage';
import { AdminDashboard } from './admin/AdminDashboard';

export const PortalPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('zifora_auth_change', handleAuthChange);
    return () => window.removeEventListener('zifora_auth_change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              Sesi Masuk Diperlukan
            </h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Silakan masuk dengan akun Admin atau Pengguna Anda untuk mengakses portal informasi manajemen ZIFORA.
            </p>
          </div>

          <Link
            to="/login"
            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1B5E4B] hover:bg-[#0F3E32] text-white shadow-md transition flex items-center justify-center space-x-2"
          >
            <span>Menuju Halaman Masuk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#F8FAF9]">
      
      {/* Clean Enterprise Account Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shadow-inner ${
              currentUser.role === 'admin' 
                ? 'bg-gradient-to-tr from-[#092820] to-[#0F3E32] border border-[#D4AF37]/50' 
                : 'bg-gradient-to-tr from-[#1B5E4B] to-[#2D7D67]'
            }`}>
              {currentUser.role === 'admin' ? (
                <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              ) : (
                <UserCircle className="w-6 h-6 text-[#E8F3EE]" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base font-bold text-gray-900 font-serif">{currentUser.name}</span>
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                  currentUser.role === 'admin'
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}>
                  {currentUser.role === 'admin' ? 'Portal Administrator' : 'Portal Muzaki'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{currentUser.email} • {currentUser.level}</p>
            </div>
          </div>

          {/* Account Actions */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </div>
      </div>

      {/* RENDER VIEW BASED ON ROLE */}
      {currentUser.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <UserDashboardPage />
      )}

    </div>
  );
};
