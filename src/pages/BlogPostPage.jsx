import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPostById } from '@/lib/blogData';
import { useToast } from '@/components/ui/use-toast';

const BlogPostPage = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchedPost = getPostById(id);
    if (fetchedPost) {
      setPost(fetchedPost);
    } else {
      // Handle not found
      toast({
        title: "Error",
        description: "Post not found. Redirecting...",
        variant: "destructive"
      });
      setTimeout(() => navigate('/blog'), 2000);
    }
  }, [id, navigate, toast]);

  if (!post) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#3cbeee]">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{post.title} - rifspace</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="pt-24 pb-20 px-4 min-h-screen bg-[#0a0a0a]">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-8 text-white/60 hover:text-[#3cbeee] pl-0 hover:bg-transparent">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Back to Tutorials' : 'Kembali ke Tutorial'}
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <span className="bg-[#3cbeee] text-black px-3 py-1 font-black text-xs uppercase tracking-wider">
                {post.category}
              </span>
              <div className="flex items-center text-white/60 text-sm font-bold uppercase gap-4">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between border-y border-white/10 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full border border-white/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#3cbeee]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm uppercase">{language === 'en' ? 'Written by' : 'Ditulis oleh'}</div>
                  <div className="text-[#3cbeee] font-black">{post.author}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 border-4 border-white/10"
          >
            <div className="aspect-video w-full overflow-hidden">
               <img alt={post.imageAlt} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:text-white
              prose-h3:text-[#3cbeee] prose-h3:text-2xl prose-h3:mt-8
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-[#3cbeee] prose-blockquote:bg-[#1a1a1a] prose-blockquote:p-6 prose-blockquote:not-italic
              prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/10 text-white/60 text-sm font-bold uppercase hover:border-[#3cbeee] hover:text-[#3cbeee] transition-colors cursor-default">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;