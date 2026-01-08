import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, FileText, Search, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { getPosts, deletePost } from '@/lib/blogData.js';
import { logout, getAdminUser } from '@/lib/auth.js';
import { useToast } from '@/components/ui/use-toast.js';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const navigate = useNavigate();
    const { toast } = useToast();
    const user = getAdminUser();

    useEffect(() => {
        setPosts(getPosts());
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const updated = deletePost(id);
            setPosts(updated);
            toast({
                title: "Post deleted",
                description: "The tutorial has been removed.",
            });
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - rifspace</title>
            </Helmet>
            <div className="min-h-screen bg-[#0a0a0a] pb-20">
                {/* Header handled by AdminLayout */}

                <main className="max-w-7xl mx-auto px-4 py-12">
                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl font-black uppercase text-white mb-2">Dashboard</h1>
                            <p className="text-white/40 font-medium">Manage your tutorials and articles.</p>
                        </div>
                        <Link to="/admin/new">
                            <Button className="bg-[#3cbeee] text-black hover:bg-[#3cbeee] hover:opacity-90 font-black uppercase tracking-wider h-12 px-8">
                                <Plus className="w-5 h-5 mr-2" />
                                New Tutorial
                            </Button>
                        </Link>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-white/10 py-3 px-10 text-white font-bold outline-none focus:border-[#3cbeee] transition-colors uppercase placeholder-white/20"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setViewMode('grid')}
                                className={`border-white/10 ${viewMode === 'grid' ? 'bg-[#3cbeee] text-black border-[#3cbeee]' : 'bg-transparent text-white hover:bg-white/5'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setViewMode('list')}
                                className={`border-white/10 ${viewMode === 'list' ? 'bg-[#3cbeee] text-black border-[#3cbeee]' : 'bg-transparent text-white hover:bg-white/5'}`}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Posts List */}
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-lg">
                            <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/40 font-bold uppercase">No posts found.</p>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                            {filteredPosts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`bg-[#1a1a1a] border border-white/10 overflow-hidden hover:border-[#3cbeee]/50 transition-colors group ${viewMode === 'list' ? 'flex items-center gap-6 p-4' : 'flex flex-col'
                                        }`}
                                >
                                    {/* Image */}
                                    <div className={viewMode === 'list' ? "w-24 h-16 shrink-0 bg-black/50 overflow-hidden" : "aspect-video bg-black/50 overflow-hidden border-b border-white/10 relative"}>
                                        <img src="https://images.unsplash.com/photo-1595872018818-97555653a011" alt="cover" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                        {viewMode === 'grid' && (
                                            <div className="absolute top-2 left-2 bg-[#3cbeee] text-black text-[10px] font-black uppercase px-2 py-0.5">
                                                {post.category}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-1 ${viewMode === 'grid' ? 'p-6' : ''}`}>
                                        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-white/40">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.author}</span>
                                        </div>
                                        <h3 className="text-xl font-black uppercase text-white mb-4 line-clamp-2 leading-tight">
                                            {post.title}
                                        </h3>

                                        <div className="flex gap-2 mt-auto">
                                            <Link to={`/admin/edit/${post.id}`} className="flex-1">
                                                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 hover:text-[#3cbeee] hover:border-[#3cbeee]">
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleDelete(post.id)}
                                                className="border-white/10 text-white hover:bg-[#ff4d4d]/10 hover:text-[#ff4d4d] hover:border-[#ff4d4d]"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;
