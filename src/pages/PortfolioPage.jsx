import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PortfolioPage = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { toast } = useToast();

  const content = {
    en: {
      title: 'Portfolio - rifspace',
      description: 'Creative projects, design work, and visual experiments',
      heading: 'PORTFOLIO',
      subtitle: 'Where ideas become reality',
      viewCase: 'View Case Study',
      close: 'Close',
      client: 'Client',
      role: 'Role',
      year: 'Year',
      tools: 'Tools'
    },
    id: {
      title: 'Portfolio - rifspace',
      description: 'Proyek kreatif, karya desain, dan eksperimen visual',
      heading: 'PORTFOLIO',
      subtitle: 'Dimana ide menjadi kenyataan',
      viewCase: 'Lihat Studi Kasus',
      close: 'Tutup',
      client: 'Klien',
      role: 'Peran',
      year: 'Tahun',
      tools: 'Tools'
    }
  };

  const t = content[language];

  const projects = [
    {
      id: 1,
      title: 'Neon Dreams Brand Identity',
      category: 'Branding',
      image: 'Neon brand identity design with vibrant colors and modern typography',
      client: 'Neon Dreams Co.',
      role: language === 'en' ? 'Brand Designer' : 'Desainer Brand',
      year: '2024',
      tools: 'Illustrator, Photoshop',
      description: language === 'en' 
        ? 'Complete brand identity system featuring bold neon aesthetics, experimental typography, and a rebellious visual language that captures Gen Z energy.'
        : 'Sistem identitas brand lengkap dengan estetika neon yang berani, tipografi eksperimental, dan bahasa visual yang memberontak menangkap energi Gen Z.'
    },
    {
      id: 2,
      title: 'Urban Photography Series',
      category: 'Photography',
      image: 'Urban street photography with dramatic lighting and gritty atmosphere',
      client: language === 'en' ? 'Personal Project' : 'Proyek Personal',
      role: language === 'en' ? 'Photographer & Editor' : 'Fotografer & Editor',
      year: '2023',
      tools: 'Lightroom, Photoshop',
      description: language === 'en'
        ? 'Raw and unfiltered urban exploration capturing the chaos and beauty of city life through moody color grading and dramatic compositions.'
        : 'Eksplorasi urban yang mentah dan tanpa filter menangkap kekacauan dan keindahan kehidupan kota melalui color grading yang moody dan komposisi dramatis.'
    },
    {
      id: 3,
      title: 'Chaos UI Design System',
      category: 'UI/UX',
      image: 'Brutalist UI design system with bold typography and unconventional layouts',
      client: 'Tech Startup',
      role: language === 'en' ? 'UI/UX Designer' : 'Desainer UI/UX',
      year: '2024',
      tools: 'Figma, Illustrator',
      description: language === 'en'
        ? 'Brutalist-inspired design system that breaks conventional UI rules while maintaining usability. Bold, chaotic, and unapologetically different.'
        : 'Sistem desain terinspirasi brutalist yang melanggar aturan UI konvensional sambil mempertahankan kegunaan. Berani, kacau, dan tanpa permintaan maaf berbeda.'
    },
    {
      id: 4,
      title: 'Glitch Art Experiments',
      category: 'Digital Art',
      image: 'Glitch art with distorted colors and digital artifacts creating abstract compositions',
      client: language === 'en' ? 'Personal Project' : 'Proyek Personal',
      role: language === 'en' ? 'Digital Artist' : 'Seniman Digital',
      year: '2023',
      tools: 'Photoshop, After Effects',
      description: language === 'en'
        ? 'Experimental series exploring digital corruption as an art form. Embracing errors, glitches, and digital artifacts to create unexpected beauty.'
        : 'Seri eksperimental mengeksplorasi korupsi digital sebagai bentuk seni. Merangkul error, glitch, dan artifak digital untuk menciptakan keindahan tak terduga.'
    },
    {
      id: 5,
      title: 'Punk Poster Collection',
      category: 'Graphic Design',
      image: 'Punk rock inspired poster design with aggressive typography and bold graphics',
      client: 'Music Festival',
      role: language === 'en' ? 'Graphic Designer' : 'Desainer Grafis',
      year: '2024',
      tools: 'Illustrator, Photoshop',
      description: language === 'en'
        ? 'Music festival poster series channeling punk rock energy through aggressive typography, distressed textures, and rebellious compositions.'
        : 'Seri poster festival musik menyalurkan energi punk rock melalui tipografi agresif, tekstur rusak, dan komposisi pemberontak.'
    },
    {
      id: 6,
      title: 'Cyber Editorial Layout',
      category: 'Editorial',
      image: 'Futuristic editorial magazine layout with cyberpunk aesthetics',
      client: 'Digital Magazine',
      role: language === 'en' ? 'Art Director' : 'Art Director',
      year: '2024',
      tools: 'InDesign, Photoshop',
      description: language === 'en'
        ? 'Futuristic editorial design merging cyberpunk aesthetics with experimental layouts. Dynamic, immersive, and pushing the boundaries of digital publishing.'
        : 'Desain editorial futuristik menggabungkan estetika cyberpunk dengan layout eksperimental. Dinamis, imersif, dan mendorong batasan penerbitan digital.'
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleViewCase = () => {
    toast({
      title: "🚧 " + (language === 'en' ? "Case study coming soon!" : "Studi kasus segera hadir!"),
      description: language === 'en' ? "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" : "Fitur ini belum tersedia—tapi jangan khawatir! Kamu bisa request di prompt berikutnya! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white transform -rotate-1 inline-block mb-4">
              {t.heading}
              <Layers className="inline-block ml-4 w-16 h-16 text-[#3cbeee]" />
            </h1>
            <p className="text-xl text-white/60 font-bold uppercase tracking-wider">{t.subtitle}</p>
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer relative overflow-hidden"
              >
                <div className="aspect-square bg-[#1a1a1a] border-4 border-white/10 group-hover:border-[#3cbeee] transition-all duration-300 overflow-hidden">
                  <img alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[#3cbeee] font-black text-xs uppercase mb-2">{project.category}</span>
                    <h3 className="text-2xl font-black text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-white/80">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-bold uppercase">{language === 'en' ? 'View Details' : 'Lihat Detail'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border-4 border-[#3cbeee] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-[#3cbeee] hover:text-black"
                >
                  <X className="w-6 h-6" />
                </Button>

                <div className="aspect-video overflow-hidden">
                  <img alt={selectedProject.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <span className="text-[#3cbeee] font-black text-sm uppercase">{selectedProject.category}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">{selectedProject.title}</h2>
                    <p className="text-lg text-white/80 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t-2 border-white/10">
                    <div>
                      <span className="text-white/40 font-bold text-xs uppercase block mb-1">{t.client}</span>
                      <span className="text-white font-bold">{selectedProject.client}</span>
                    </div>
                    <div>
                      <span className="text-white/40 font-bold text-xs uppercase block mb-1">{t.role}</span>
                      <span className="text-white font-bold">{selectedProject.role}</span>
                    </div>
                    <div>
                      <span className="text-white/40 font-bold text-xs uppercase block mb-1">{t.year}</span>
                      <span className="text-white font-bold">{selectedProject.year}</span>
                    </div>
                    <div>
                      <span className="text-white/40 font-bold text-xs uppercase block mb-1">{t.tools}</span>
                      <span className="text-white font-bold">{selectedProject.tools}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleViewCase}
                    className="w-full bg-[#3cbeee] hover:bg-[#2da5d0] text-black font-black text-lg py-6 rounded-none"
                  >
                    {t.viewCase}
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioPage;