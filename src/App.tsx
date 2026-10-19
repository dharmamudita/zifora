import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ZakatPage } from './pages/ZakatPage';
import { WakafPage } from './pages/WakafPage';
import { InfakSedekahPage } from './pages/InfakSedekahPage';
import { PetaZiswafPage } from './pages/PetaZiswafPage';
import { TransparansiPage } from './pages/TransparansiPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PortalPage } from './pages/PortalPage';
import { LoginPage } from './pages/LoginPage';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#111827]">
        <Navbar />
        {/* Main body without gap so hero flows to top */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/zakat" element={<ZakatPage />} />
            <Route path="/wakaf" element={<WakafPage />} />
            <Route path="/infak-sedekah" element={<InfakSedekahPage />} />
            <Route path="/peta" element={<PetaZiswafPage />} />
            <Route path="/transparansi" element={<TransparansiPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* Unified Account / Dashboard Portal */}
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/portal-donatur" element={<Navigate to="/portal" replace />} />
            <Route path="/admin" element={<Navigate to="/portal" replace />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
