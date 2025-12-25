import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const AdminBlogModal = ({ isOpen, onClose, onSave, post }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Design',
    excerpt: '',
    content: '',
    author: 'Rif',
    readTime: '5 min',
    tags: '',
    imageAlt: ''
  });

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        tags: post.tags ? post.tags.join(', ') : ''
      });
    } else {
      setFormData({
        title: '',
        category: 'Design',
        excerpt: '',
        content: '',
        author: 'Rif',
        readTime: '5 min',
        tags: '',
        imageAlt: ''
      });
    }
  }, [post, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1a1a1a] border-4 border-[#3cbeee] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#3cbeee]/20"
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#0a0a0a]">
            <h2 className="text-2xl font-black uppercase text-white">
              {post ? 'Edit Tutorial' : 'New Tutorial'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-[#3cbeee] hover:text-black">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-[#3cbeee] font-bold text-xs uppercase mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-white/20 p-3 text-white focus:border-[#3cbeee] outline-none font-bold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#3cbeee] font-bold text-xs uppercase mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/20 p-3 text-white focus:border-[#3cbeee] outline-none"
                >
                  <option>Design</option>
                  <option>Photo Editing</option>
                  <option>Photoshop Tips</option>
                  <option>Illustrator Tips</option>
                </select>
              </div>
              <div>
                <label className="block text-[#3cbeee] font-bold text-xs uppercase mb-2">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={e => setFormData({...formData, readTime: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/20 p-3 text-white focus:border-[#3cbeee] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#3cbeee] font-bold text-xs uppercase mb-2">Image Alt Description</label>
              <input
                type="text"
                value={formData.imageAlt}
                onChange={e => setFormData({...formData, imageAlt: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-white/20 p-3 text-white focus:border-[#3cbeee] outline-none"
                placeholder="Describe the image for the generator..."
                required
              />
            </div>

            <div>
              <label className="block text-[#3cbeee] font-bold text-xs uppercase mb-2">Excerpt (Short)</label>
              <textarea
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-white/20 p-3 text-white focus:border-[#3cbeee] outline-none h-24"
                required
              />
            </div>

            <div>
              <label className="block text-[#3cbeee] font-bold text-xs uppercase mb-2">Full Content (HTML supported)</label>
              <textarea
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-white/20 p-3 text-white focus:border-[#3cbeee] outline-none h-48 font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[#3cbeee] font-bold text-xs uppercase mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-white/20 p-3 text-white focus:border-[#3cbeee] outline-none"
                placeholder="Design, Tips, 2024"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
              <Button type="button" variant="ghost" onClick={onClose} className="text-white hover:text-white/80">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#3cbeee] text-black hover:bg-[#2da5d0] font-bold rounded-none">
                <Save className="w-4 h-4 mr-2" />
                Save Post
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminBlogModal;