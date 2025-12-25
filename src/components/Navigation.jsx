import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = ({ language, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = {
    en: [
      { path: '/', label: 'Home' },
      { path: '/blog', label: 'Tutorials' },
      { path: '/portfolio', label: 'Work' },
      { path: '/about', label: 'About' },
      { path: '/support', label: 'Support' },
      { path: '/contact', label: 'Connect' }
    ],
    id: [
      { path: '/', label: 'Beranda' },
      { path: '/blog', label: 'Tutorial' },
      { path: '/portfolio', label: 'Karya' },
      { path: '/about', label: 'Tentang' },
      { path: '/support', label: 'Dukungan' },
      { path: '/contact', label: 'Kontak' }
    ]
  };

  const items = navItems[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.div 
              className="text-3xl font-black tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-white">rif</span>
              <span className="text-[#3cbeee] relative">
                space
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-[#3cbeee]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  location.pathname === item.path ? 'text-[#3cbeee]' : 'text-white/70 hover:text-white'
                }`}>
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#3cbeee]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2 hover:bg-[#3cbeee]/10 hover:text-[#3cbeee] transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="font-bold text-xs uppercase">{language === 'en' ? 'ID' : 'EN'}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hover:bg-[#3cbeee]/10"
            >
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-[#3cbeee]/10"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-bold uppercase tracking-wider transition-colors ${
                      location.pathname === item.path ? 'text-[#3cbeee]' : 'text-white/70'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;