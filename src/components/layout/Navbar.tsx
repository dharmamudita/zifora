import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Coins, 
  Landmark, 
  HeartHandshake, 
  MapPin, 
  FileText, 
  Menu, 
  X, 
  UserCircle, 
  ShieldCheck, 
  ArrowRight,
  LogOut,
  Repeat,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { getCurrentUser, switchRole, UserProfile } from '../../services/authStore';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(getCurrentUser());
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Listen to role changes
  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('zifora_auth_change', handleAuthChange);
    return () => window.removeEventListener('zifora_auth_change', handleAuthChange);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/', icon: Compass },
    { name: 'Zakat', path: '/zakat', icon: Coins },
    { name: 'Wakaf', path: '/wakaf', icon: Landmark },
    { name: 'Infak', path: '/infak-sedekah', icon: HeartHandshake },
    { name: 'Peta GIS', path: '/peta', icon: MapPin },
    { name: 'Transparansi', path: '/transparansi', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSwitchAccount = (targetRole: 'admin' | 'muzaki') => {
    switchRole(targetRole);
    setAccountDropdownOpen(false);
    navigate('/portal');
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        
        {/* Floating Island Pill Navbar */}
        <div className="relative bg-[#0F3E32]/92 backdrop-blur-xl border border-[#1B5E4B]/60 hover:border-[#D4AF37]/40 shadow-2xl shadow-[#092820]/40 rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo with Modern Icon */}
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1B5E4B] via-[#2D7D67] to-[#D4AF37] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0F3E32] rounded-full flex items-center justify-center">
                  <span className="text-base font-bold text-[#D4AF37] font-serif">Z</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-black tracking-tight text-white font-serif">ZIFORA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                </div>
                <span className="text-[9px] text-[#A3C9BC] tracking-wider font-semibold uppercase -mt-0.5">
                  Better Era
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Floating Pill Tabs) */}
            <nav className="hidden lg:flex items-center space-x-1 bg-[#092820]/60 p-1 rounded-full border border-[#1B5E4B]/40">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-[#1B5E4B] text-white shadow-md border border-[#2D7D67]/60'
                        : 'text-[#CDE1D9] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#D4AF37]' : 'text-[#87B7A5]'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: CTA & Unified Account Pill */}
            <div className="hidden sm:flex items-center space-x-2.5">
              
              {/* Quick CTA */}
              <Link
                to="/zakat"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#092820] hover:brightness-110 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Donasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* UNIFIED ACCOUNT DROPDOWN (User & Admin in ONE Place) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    currentUser.role === 'admin'
                      ? 'bg-[#1B5E4B]/80 text-[#FAF5E8] border-[#D4AF37]/50 hover:border-[#D4AF37]'
                      : 'bg-[#1B5E4B]/50 text-[#E8F3EE] border-[#2D7D67]/50 hover:bg-[#1B5E4B]'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#092820] to-[#1B5E4B] flex items-center justify-center text-white border border-[#D4AF37]/40">
                    {currentUser.role === 'admin' ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    ) : (
                      <UserCircle className="w-3.5 h-3.5 text-[#E8F3EE]" />
                    )}
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[11px] font-bold text-white max-w-[90px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-[#D4AF37] uppercase font-mono">
                      {currentUser.role === 'admin' ? 'Admin' : 'Muzaki'}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-[#A3C9BC]" />
                </button>

                {/* Account Dropdown Modal / Popover */}
                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-[#092820] border border-[#1B5E4B] shadow-2xl rounded-2xl p-4 text-white space-y-3 z-50 animate-fadeIn backdrop-blur-2xl">
                    <div className="flex items-center space-x-3 pb-3 border-b border-[#1B5E4B]/60">
                      <div className="w-10 h-10 rounded-full bg-[#1B5E4B] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                        {currentUser.role === 'admin' ? 'A' : 'M'}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
                        <p className="text-[11px] text-[#A3C9BC] truncate">{currentUser.email}</p>
                        <span className="inline-block mt-0.5 text-[9px] font-extrabold uppercase px-2 py-0.2 rounded bg-[#1B5E4B] text-[#D4AF37]">
                          Peran: {currentUser.role === 'admin' ? 'Administrator ZIFORA' : 'Muzaki / Donatur'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <Link
                        to="/portal"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#1B5E4B]/40 hover:bg-[#1B5E4B] transition text-[#E8F3EE] font-semibold"
                      >
                        <span className="flex items-center space-x-2">
                          <UserCircle className="w-4 h-4 text-[#D4AF37]" />
                          <span>Buka Dashboard {currentUser.role === 'admin' ? 'Admin' : 'Muzaki'}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Switch Role Fast Toggle */}
                    <div className="pt-2 border-t border-[#1B5E4B]/50">
                      <span className="text-[10px] text-[#87B7A5] uppercase font-bold block mb-1.5">
                        Ganti Akun Masuk:
                      </span>

                      {currentUser.role === 'muzaki' ? (
                        <button
                          type="button"
                          onClick={() => handleSwitchAccount('admin')}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#0F3E32] hover:bg-[#1B5E4B] border border-[#D4AF37]/40 text-left text-xs text-[#FAF5E8] transition"
                        >
                          <span className="flex items-center space-x-2">
                            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                            <span>Masuk sebagai <strong>Admin ZIFORA</strong></span>
                          </span>
                          <Repeat className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSwitchAccount('muzaki')}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#0F3E32] hover:bg-[#1B5E4B] border border-gray-600 text-left text-xs text-[#E8F3EE] transition"
                        >
                          <span className="flex items-center space-x-2">
                            <UserCircle className="w-4 h-4 text-[#87B7A5]" />
                            <span>Masuk sebagai <strong>Muzaki (Rahmat)</strong></span>
                          </span>
                          <Repeat className="w-3.5 h-3.5 text-[#87B7A5]" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <Link
                to="/portal"
                className="p-1.5 rounded-full bg-[#1B5E4B] text-white"
                title="Akun Saya"
              >
                <UserCircle className="w-5 h-5 text-[#D4AF37]" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-full bg-[#1B5E4B] text-white hover:bg-[#2D7D67]"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Floating Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 bg-[#092820]/95 backdrop-blur-2xl border border-[#1B5E4B] rounded-3xl p-4 shadow-2xl space-y-2 animate-fadeIn text-white">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-[#1B5E4B]/50">
              <span className="text-xs text-[#A3C9BC]">Akun: <strong className="text-white">{currentUser.name}</strong></span>
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-[#1B5E4B] px-2 py-0.5 rounded-full">
                {currentUser.role}
              </span>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    active ? 'bg-[#1B5E4B] text-white' : 'text-[#CDE1D9] hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#D4AF37]' : 'text-[#87B7A5]'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-[#1B5E4B]/60 space-y-2">
              <Link
                to="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#1B5E4B] text-xs font-bold text-white"
              >
                <span>Buka Dashboard ({currentUser.role})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  handleSwitchAccount(currentUser.role === 'admin' ? 'muzaki' : 'admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-[#0F3E32] text-[#D4AF37] border border-[#1B5E4B]"
              >
                <span>Ganti ke Akun {currentUser.role === 'admin' ? 'Muzaki' : 'Admin'}</span>
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
