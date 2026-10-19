import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#092820] text-[#A3C9BC] border-t border-[#1B5E4B]/50 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1B5E4B]/40">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B5E4B] flex items-center justify-center border border-[#D4AF37]/40 shadow-inner">
                <span className="text-xl font-bold text-[#FAF5E8] font-serif">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white font-serif tracking-tight">ZIFORA</span>
                <span className="text-[10px] text-[#D4AF37] tracking-wider uppercase font-medium">
                  ZISWAF for a Better Era
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#CDE1D9]/80 leading-relaxed max-w-sm">
              Sistem manajemen informasi digital terpadu yang menghubungkan data muzaki, donatur, mustahik, transaksi real-time, dan aset wakaf produktif secara transparan dan akuntabel.
            </p>

            <div className="p-3.5 rounded-xl bg-[#0F3E32]/70 border border-[#1B5E4B] text-xs text-[#E8F3EE] flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
              <span>Slogan: <strong>“Terintegrasi, Transparan, dan Terpercaya.”</strong></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Layanan ZISWAF
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/zakat" className="hover:text-white transition flex items-center space-x-1.5">
                  <span>Kalkulator & Bayar Zakat</span>
                </Link>
              </li>
              <li>
                <Link to="/wakaf" className="hover:text-white transition flex items-center space-x-1.5">
                  <span>Wakaf Aset Produktif</span>
                </Link>
              </li>
              <li>
                <Link to="/infak-sedekah" className="hover:text-white transition flex items-center space-x-1.5">
                  <span>Infak & Sedekah Subuh</span>
                </Link>
              </li>
              <li>
                <Link to="/peta" className="hover:text-white transition flex items-center space-x-1.5">
                  <span>Peta Interaktif Sebaran</span>
                </Link>
              </li>
              <li>
                <Link to="/transparansi" className="hover:text-white transition flex items-center space-x-1.5">
                  <span>Laporan Audit Transparansi</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 8 Asnaf Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              8 Golongan Asnaf
            </h3>
            <ul className="space-y-1.5 text-xs text-[#A3C9BC]/90">
              <li>• Fakir & Miskin</li>
              <li>• Amil Zakat</li>
              <li>• Mualaf</li>
              <li>• Riqab (Hamba Sahaya)</li>
              <li>• Gharimin (Terlilit Utang)</li>
              <li>• Fisabilillah (Pejuang Kebaikan)</li>
              <li>• Ibnu Sabil (Musafir)</li>
            </ul>
          </div>

          {/* Kontak & Lembaga */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Pusat Layanan
            </h3>
            <div className="flex items-start space-x-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#87B7A5] flex-shrink-0 mt-0.5" />
              <span>Gedung ZIFORA Center, Jakarta & Bandung, Indonesia</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs">
              <Mail className="w-4 h-4 text-[#87B7A5] flex-shrink-0" />
              <span>layanan@zifora.org</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs">
              <Phone className="w-4 h-4 text-[#87B7A5] flex-shrink-0" />
              <span>+62 812-9900-ZIFORA</span>
            </div>
            
            <div className="pt-2">
              <Link
                to="/portal"
                className="inline-flex items-center space-x-1 text-[11px] text-[#D4AF37] hover:underline"
              >
                <span>Portal Akun & Layanan</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#87B7A5] gap-4">
          <p>© {new Date().getFullYear()} ZIFORA (ZISWAF for a Better Era). Hak Cipta Dilindungi. Terintegrasi, Transparan, dan Terpercaya.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Sistem Manajemen ZISWAF Modern</span>
              <span className="text-[#D4AF37] font-semibold">• Indonesia</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
