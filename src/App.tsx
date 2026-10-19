import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#111827]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/zakat" element={<ZakatPage />} />
            <Route path="/wakaf" element={<WakafPage />} />
            <Route path="/infak-sedekah" element={<InfakSedekahPage />} />
            <Route path="/peta" element={<PetaZiswafPage />} />
            <Route path="/transparansi" element={<TransparansiPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/portal-donatur" element={<UserDashboardPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
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
