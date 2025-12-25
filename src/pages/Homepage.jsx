import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Homepage = ({ language }) => {
  const [wordIndex, setWordIndex] = useState(0);

  const carouselWords = {
    en: ["chaos", "inspiration", "freedom", "umm..", "expression", "vision"],
    id: ["kekacauan", "inspirasi", "kebebasan", "emm..", "ekspresi", "visi"]
  };

  const currentWords = carouselWords[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % currentWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [language, currentWords.length]);

  const content = {
    en: {
      title: 'rifspace - Creative Design & Tutorials',
      description: 'Exploring design, creativity, and digital art. Tutorials, tips, and creative experiments.',
      hero: {
        line1: 'WHERE',
        line2: 'CREATIVITY',
        line3: 'MEETS',
        line4: 'CHAOS',
        subtitle: 'design tutorials • creative experiments • visual storytelling'
      },
      cta: 'Explore Tutorials',
      featured: 'Featured Tutorials',
      categories: [
        { name: 'Design', count: 12 },
        { name: 'Photo Editing', count: 8 },
        { name: 'Photoshop', count: 15 },
        { name: 'Illustrator', count: 10 }
      ],
      manifesto: {
        title: 'THE VISION',
        text: 'rifspace isn\'t just a blog—it\'s a creative movement. A space where design breaks rules, tutorials ignite imagination, and every pixel tells a story.'
      }
    },
    id: {
      title: 'rifspace - Desain Kreatif & Tutorial',
      description: 'Menjelajahi desain, kreativitas, dan seni digital. Tutorial, tips, dan eksperimen kreatif.',
      hero: {
        line1: 'DIMANA',
        line2: 'KREATIVITAS',
        line3: 'BERTEMU',
        line4: 'KEKACAUAN',
        subtitle: 'tutorial desain • eksperimen kreatif • visual storytelling'
      },
      cta: 'Jelajahi Tutorial',
      featured: 'Tutorial Pilihan',
      categories: [
        { name: 'Desain', count: 12 },
        { name: 'Edit Foto', count: 8 },
        { name: 'Photoshop', count: 15 },
        { name: 'Illustrator', count: 10 }
      ],
      manifesto: {
        title: 'VISI',
        text: 'rifspace bukan sekadar blog—ini adalah gerakan kreatif. Ruang dimana desain melanggar aturan, tutorial menyalakan imajinasi, dan setiap pixel menceritakan kisah.'
      }
    }
  };

  const t = content[language];

  const featuredPosts = [
    {
      id: 1,
      category: 'Photoshop',
      title: language === 'en' ? 'Master Double Exposure in 5 Minutes' : 'Kuasai Double Exposure dalam 5 Menit',
      image: 'Double exposure photo effect tutorial showing layered images'
    },
    {
      id: 2,
      category: 'Design',
      title: language === 'en' ? 'Creating Brutalist Web Design' : 'Membuat Desain Web Brutalist',
      image: 'Brutalist web design with bold typography and raw aesthetics'
    },
    {
      id: 3,
      category: 'Illustrator',
      title: language === 'en' ? 'Logo Design: From Sketch to Vector' : 'Desain Logo: Dari Sketsa ke Vektor',
      image: 'Logo design process from sketch to final vector artwork'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
          {/* Accent shapes */}
          <motion.div
            className="absolute top-20 right-10 w-32 h-32 bg-[#3cbeee] opacity-20 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-40 h-40 bg-[#3cbeee] opacity-10 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Tagline */}
              <div className="space-y-2">
                <motion.h1 
                  className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white block transform -rotate-2">{t.hero.line1}</span>
                  <span className="text-[#3cbeee] block transform rotate-1 my-2">{t.hero.line2}</span>
                  <span className="text-white/90 block transform -rotate-1">{t.hero.line3}</span>
                  <span className="block transform rotate-2 relative mt-2 h-[1.3em]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.4, ease: "backOut" }}
                        className="absolute inset-0 flex items-center justify-center text-[#3cbeee] font-['Permanent_Marker'] tracking-normal normal-case"
                      >
                        {currentWords[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <Sparkles className="absolute -top-4 -right-8 w-12 h-12 text-[#3cbeee] animate-pulse pointer-events-none" />
                  </span>
                </motion.h1>
              </div>

              <motion.p
                className="text-lg md:text-xl text-white/60 uppercase tracking-widest font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-8"
              >
                <Link to="/blog">
                  <Button 
                    size="lg" 
                    className="bg-[#3cbeee] hover:bg-[#2da5d0] text-black font-black text-lg px-8 py-6 rounded-none transform hover:scale-105 transition-all duration-300 hover:rotate-1 shadow-lg shadow-[#3cbeee]/50"
                  >
                    {t.cta}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Tutorials */}
        <section className="py-20 px-4 bg-[#0f0f0f] border-y-4 border-[#3cbeee]/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white transform -rotate-1 inline-block">
                {t.featured}
                <Zap className="inline-block ml-4 w-12 h-12 text-[#3cbeee]" />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-[#1a1a1a] border-4 border-white/10 hover:border-[#3cbeee] transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                    <div className="p-6">
                      <span className="text-[#3cbeee] font-bold text-xs uppercase tracking-wider">{post.category}</span>
                      <h3 className="text-xl font-black mt-2 text-white group-hover:text-[#3cbeee] transition-colors">{post.title}</h3>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-[#3cbeee] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#3cbeee] transform rotate-1">
                {t.manifesto.title}
              </h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                {t.manifesto.text}
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                {t.categories.map((cat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: Math.random() > 0.5 ? 2 : -2 }}
                    className="px-6 py-3 bg-[#3cbeee]/10 border-2 border-[#3cbeee] text-[#3cbeee] font-black uppercase text-sm hover:bg-[#3cbeee] hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    {cat.name} ({cat.count})
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;