import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  HeartHandshake, 
  Landmark, 
  Coins, 
  MapPin, 
  FileText, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCircle,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/', icon: Compass },
    { name: 'Zakat', path: '/zakat', icon: Coins },
    { name: 'Wakaf Aset', path: '/wakaf', icon: Landmark },
    { name: 'Infak & Sedekah', path: '/infak-sedekah', icon: HeartHandshake },
    { name: 'Peta ZISWAF', path: '/peta', icon: MapPin },
    { name: 'Transparansi', path: '/transparansi', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F3E32]/95 backdrop-blur-md border-b border-[#1B5E4B]/40 text-white shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#1B5E4B] to-[#2D7D67] p-2.5 flex items-center justify-center shadow-md border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all">
              <span className="text-xl font-bold text-[#FAF5E8] tracking-wider font-serif">Z</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-serif">ZIFORA</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              </div>
              <span className="text-[10px] text-[#A3C9BC] tracking-wider font-medium uppercase">
                ZISWAF for a Better Era
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#1B5E4B] text-white shadow-inner font-semibold border border-[#2D7D67]'
                      : 'text-[#CDE1D9] hover:text-white hover:bg-[#1B5E4B]/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#D4AF37]' : 'text-[#87B7A5]'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions (Donatur & Admin) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/portal-donatur"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#E8F3EE] hover:bg-[#1B5E4B]/60 transition border border-[#2D7D67]/40"
              title="Portal Riwayat & Sertifikat Donatur"
            >
              <UserCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Portal Muzaki</span>
            </Link>

            <Link
              to="/admin"
              className="flex items-center space-x-1 px-2.5 py-2 rounded-lg text-xs font-medium text-[#A3C9BC] hover:text-white hover:bg-[#1B5E4B]/40 transition"
              title="Panel Admin Pengelolaan"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#87B7A5]" />
              <span>Admin</span>
            </Link>

            <Link
              to="/zakat"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#092820] hover:brightness-110 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Tunaikan ZISWAF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/zakat"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#D4AF37] text-[#092820]"
            >
              Donasi
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1B5E4B] text-white hover:bg-[#2D7D67] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#092820] border-t border-[#1B5E4B] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active ? 'bg-[#1B5E4B] text-white font-semibold' : 'text-[#CDE1D9] hover:bg-[#1B5E4B]/40'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#D4AF37]' : 'text-[#87B7A5]'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-3 border-t border-[#1B5E4B]/60 flex flex-col space-y-2">
            <Link
              to="/portal-donatur"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#CDE1D9] bg-[#1B5E4B]/40"
            >
              <span className="flex items-center space-x-2">
                <UserCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Portal Muzaki & Donatur</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs text-[#87B7A5]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Dashboard Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
