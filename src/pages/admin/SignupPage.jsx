import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { signup } from '@/lib/auth.js';
import { useToast } from '@/components/ui/use-toast.js';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                variant: "destructive"
            });
            return;
        }

        if (username.length < 3 || password.length < 4) {
            toast({
                title: "Error",
                description: "Username or password too short.",
                variant: "destructive"
            });
            return;
        }

        const result = signup(username, password);
        if (result.success) {
            toast({
                title: "Success",
                description: "Account created! Redirecting to dashboard...",
            });
            navigate('/admin');
        }
    };

    return (
        <>
            <Helmet>
                <title>Admin Signup - rifspace</title>
            </Helmet>
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#3cbeee]" />

                        <div className="mb-8">
                            <div className="w-12 h-12 bg-[#3cbeee]/10 flex items-center justify-center mb-6">
                                <UserPlus className="w-6 h-6 text-[#3cbeee]" />
                            </div>
                            <h1 className="text-3xl font-black uppercase text-white mb-2">Admin Setup</h1>
                            <p className="text-white/40 font-medium">Create your admin credentials.</p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/60">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-bold outline-none focus:border-[#3cbeee] transition-colors"
                                    placeholder="Choose username"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/60">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-bold outline-none focus:border-[#3cbeee] transition-colors"
                                    placeholder="Choose password"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/60">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white font-bold outline-none focus:border-[#3cbeee] transition-colors"
                                    placeholder="Confirm password"
                                />
                            </div>

                            <Button type="submit" className="w-full bg-[#3cbeee] text-black hover:bg-[#3cbeee] hover:opacity-90 font-black uppercase tracking-wider h-12 text-base">
                                Create Account <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/10 text-center">
                            <p className="text-white/40 text-sm font-medium">
                                Already have an account?{' '}
                                <Link to="/admin/login" className="text-[#3cbeee] hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SignupPage;
