import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { logout, getAdminUser } from '@/lib/auth.js';

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const user = getAdminUser();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const items = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="group flex items-center gap-4">
                        <motion.div
                            className="text-3xl font-black tracking-tight"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span className="text-white">rif</span>
                            <span className="text-[#3cbeee] relative">
                                space
                            </span>
                        </motion.div>
                        <span className="bg-[#3cbeee]/10 text-[#3cbeee] px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full border border-[#3cbeee]/20">
                            Admin
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {items.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="relative group flex items-center gap-2"
                            >
                                <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${location.pathname === item.path ? 'text-[#3cbeee]' : 'text-white/70 hover:text-white'
                                    }`}>
                                    {item.label}
                                </span>
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="activeNavAdmin"
                                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#3cbeee]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}

                        <div className="h-4 w-px bg-white/10" />

                        <div className="flex items-center gap-4">
                            <span className="text-white/60 text-sm font-bold uppercase hidden md:inline-block">
                                {user}
                            </span>
                            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-white/60 hover:text-[#ff4d4d] hover:bg-[#ff4d4d]/10 transition-colors">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
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
                                        className={`block text-lg font-bold uppercase tracking-wider transition-colors ${location.pathname === item.path ? 'text-[#3cbeee]' : 'text-white/70'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="pt-4 border-t border-white/10"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 font-bold uppercase">{user}</span>
                                    <Button onClick={handleLogout} variant="ghost" className="text-[#ff4d4d] hover:bg-[#ff4d4d]/10">
                                        Logout
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default AdminNavbar;
