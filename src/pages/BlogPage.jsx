import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Plus, Edit, Trash2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getPosts, savePost, deletePost } from '@/lib/blogData';
import AdminBlogModal from '@/components/AdminBlogModal';

const BlogPage = ({ language }) => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load posts
    setPosts(getPosts());

    // Check admin status
    const adminStatus = localStorage.getItem('rifspace_admin_mode') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const content = {
    en: {
      title: 'Tutorials & Articles - rifspace',
      description: 'Learn design, photo editing, and creative techniques through detailed tutorials',
      heading: 'TUTORIALS',
      subtitle: 'Level up your creative game',
      searchPlaceholder: 'Search tutorials...',
      allCategories: 'All',
      categories: ['Design', 'Photo Editing', 'Photoshop Tips', 'Illustrator Tips']
    },
    id: {
      title: 'Tutorial & Artikel - rifspace',
      description: 'Pelajari desain, edit foto, dan teknik kreatif melalui tutorial detail',
      heading: 'TUTORIAL',
      subtitle: 'Tingkatkan skill kreatifmu',
      searchPlaceholder: 'Cari tutorial...',
      allCategories: 'Semua',
      categories: ['Desain', 'Edit Foto', 'Tips Photoshop', 'Tips Illustrator']
    }
  };

  const t = content[language];

  // Admin Actions
  const handleAdminLogin = () => {
    const password = prompt("Enter Admin Password (demo: admin123):");
    if (password === 'admin123') {
      localStorage.setItem('rifspace_admin_mode', 'true');
      setIsAdmin(true);
      toast({ title: "Admin Mode Enabled", description: "You can now edit tutorials." });
    } else {
      toast({ title: "Access Denied", variant: "destructive" });
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('rifspace_admin_mode');
    setIsAdmin(false);
    toast({ title: "Logged Out", description: "Admin mode disabled." });
  };

  const handleSavePost = (postData) => {
    const updatedPosts = savePost(postData);
    setPosts(updatedPosts);
    setEditingPost(null);
    toast({ title: "Success", description: "Post saved successfully." });
  };

  const handleDeletePost = (id, e) => {
    e.preventDefault(); // Prevent link click
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = deletePost(id);
      setPosts(updatedPosts);
      toast({ title: "Deleted", description: "Post deleted successfully." });
    }
  };

  const handleEditClick = (post, e) => {
    e.preventDefault(); // Prevent link click
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  // Filter Logic
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <div className="pt-32 pb-20 px-4 min-h-screen relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center relative"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white transform -rotate-1 inline-block mb-4">
              {t.heading}
              <BookOpen className="inline-block ml-4 w-16 h-16 text-[#3cbeee]" />
            </h1>
            <p className="text-xl text-white/60 font-bold uppercase tracking-wider">{t.subtitle}</p>

            {/* Admin Toggle (Hidden/Subtle) */}
            <div className="absolute top-0 right-0">
               {isAdmin ? (
                 <div className="flex gap-2">
                   <Button onClick={handleAddNew} className="bg-[#3cbeee] text-black font-bold">
                     <Plus className="w-4 h-4 mr-2" /> New Post
                   </Button>
                   <Button onClick={handleAdminLogout} variant="destructive" size="icon">
                     <Lock className="w-4 h-4" />
                   </Button>
                 </div>
               ) : (
                 <Button variant="ghost" size="sm" onClick={handleAdminLogin} className="opacity-20 hover:opacity-100 transition-opacity">
                   <Lock className="w-4 h-4" />
                 </Button>
               )}
            </div>
          </motion.div>

          {/* Search & Filter */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-[#1a1a1a] border-2 border-white/20 focus:border-[#3cbeee] text-white placeholder-white/40 font-bold uppercase tracking-wider outline-none transition-all duration-300"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 font-black uppercase text-sm transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-[#3cbeee] text-black border-2 border-[#3cbeee]'
                    : 'bg-transparent text-white border-2 border-white/20 hover:border-[#3cbeee]'
                }`}
              >
                {t.allCategories}
              </button>
              {t.categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 font-black uppercase text-sm transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#3cbeee] text-black border-2 border-[#3cbeee]'
                      : 'bg-transparent text-white border-2 border-white/20 hover:border-[#3cbeee]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
                className="group relative"
              >
                <Link to={`/blog/${post.id}`} className="block h-full">
                  <div className="bg-[#1a1a1a] border-4 border-white/10 group-hover:border-[#3cbeee] transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="aspect-video overflow-hidden relative">
                      <img alt={post.imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div className="absolute top-4 left-4 bg-[#3cbeee] text-black px-3 py-1 font-black text-xs uppercase z-10">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col">
                      <h2 className="text-2xl font-black text-white group-hover:text-[#3cbeee] transition-colors leading-tight mb-auto">
                        {post.title}
                      </h2>
                      <p className="text-white/60 font-medium line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-auto">
                        <span className="text-xs text-white/40 font-bold uppercase">{post.readTime} • {post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Admin Controls Overlay */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      className="h-8 w-8 bg-black/80 hover:bg-[#3cbeee] hover:text-black border border-white/20"
                      onClick={(e) => handleEditClick(post, e)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive"
                      className="h-8 w-8 border border-white/20"
                      onClick={(e) => handleDeletePost(post.id, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40 text-xl font-bold uppercase">No tutorials found.</p>
            </div>
          )}
        </div>

        {/* Admin Modal */}
        <AdminBlogModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePost}
          post={editingPost}
        />
      </div>
    </>
  );
};

export default BlogPage;