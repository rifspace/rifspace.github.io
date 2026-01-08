import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PublicLayout from '@/components/PublicLayout.jsx';
import Navigation from '@/components/Navigation.jsx'; // Keep for now or remove if unused directly
import Homepage from '@/pages/Homepage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import BlogPostPage from '@/pages/BlogPostPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import PortfolioPage from '@/pages/PortfolioPage.jsx';
import SupportPage from '@/pages/SupportPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';

import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import LoginPage from '@/pages/admin/LoginPage.jsx';
import SignupPage from '@/pages/admin/SignupPage.jsx';
import AdminLayout from '@/layouts/AdminLayout.jsx';
import AdminDashboard from '@/pages/admin/AdminDashboard.jsx';
import AdminEditorPage from '@/pages/admin/AdminEditorPage.jsx';

function App() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en');
  };

  return (
    <Router>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
        {/* Grain texture overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}></div>

        <Routes>
          {/* Public Routes with Navigation */}
          <Route element={<PublicLayout language={language} toggleLanguage={toggleLanguage} />}>
            <Route path="/" element={<Homepage language={language} />} />
            <Route path="/blog" element={<BlogPage language={language} />} />
            <Route path="/blog/:id" element={<BlogPostPage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route path="/portfolio" element={<PortfolioPage language={language} />} />
            <Route path="/support" element={<SupportPage language={language} />} />
            <Route path="/contact" element={<ContactPage language={language} />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/signup" element={<SignupPage />} />

          {/* Dashboard with Navigation */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* Editor - Full Screen (No Navigation) */}
          <Route path="/admin/new" element={
            <ProtectedRoute>
              <AdminEditorPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit/:id" element={
            <ProtectedRoute>
              <AdminEditorPage />
            </ProtectedRoute>
          } />
        </Routes>

        <Toaster />
      </div>
    </Router>
  );
}

export default App;