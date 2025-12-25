import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code, Palette, Camera, Sparkles, Zap, Heart } from 'lucide-react';

const AboutPage = ({ language }) => {
  const content = {
    en: {
      title: 'About Me - rifspace',
      description: 'Creative designer and content creator exploring the intersection of design and digital art',
      heading: 'ABOUT',
      subtitle: 'The human behind the pixels',
      intro: {
        title: 'CREATIVE MANIFESTO',
        text: 'I believe design should break rules, not follow them. Every project is an experiment. Every tutorial is a rebellion against boring mediocrity. rifspace is where creativity runs wild and conventional wisdom gets left behind.'
      },
      journey: {
        title: 'THE JOURNEY',
        timeline: [
          {
            year: '2020',
            title: 'The Spark',
            desc: 'Started experimenting with Photoshop, fell in love with pixels'
          },
          {
            year: '2021',
            title: 'Going Deep',
            desc: 'Mastered Adobe Suite, started freelancing, discovered brutalist design'
          },
          {
            year: '2022',
            title: 'Teaching & Creating',
            desc: 'Launched rifspace, began sharing tutorials and creative experiments'
          },
          {
            year: '2023',
            title: 'Building Community',
            desc: 'Growing audience, collaborating with creatives, pushing boundaries'
          },
          {
            year: '2024',
            title: 'The Movement',
            desc: 'rifspace becomes more than a blog—it\'s a creative revolution'
          }
        ]
      },
      skills: {
        title: 'TOOLS & SUPERPOWERS',
        items: [
          { name: 'Photoshop', level: 95, icon: 'palette' },
          { name: 'Illustrator', level: 90, icon: 'code' },
          { name: 'Photo Editing', level: 92, icon: 'camera' },
          { name: 'UI/UX Design', level: 85, icon: 'sparkles' },
          { name: 'Typography', level: 88, icon: 'zap' },
          { name: 'Color Theory', level: 90, icon: 'heart' }
        ]
      },
      values: {
        title: 'CORE VALUES',
        items: [
          'Creativity over conformity',
          'Experimentation always',
          'Share knowledge freely',
          'Break the rules intentionally',
          'Stay curious, stay hungry'
        ]
      }
    },
    id: {
      title: 'Tentang Saya - rifspace',
      description: 'Desainer kreatif dan content creator yang mengeksplorasi persimpangan desain dan seni digital',
      heading: 'TENTANG',
      subtitle: 'Manusia di balik pixel',
      intro: {
        title: 'MANIFESTO KREATIF',
        text: 'Saya percaya desain harus melanggar aturan, bukan mengikutinya. Setiap proyek adalah eksperimen. Setiap tutorial adalah pemberontakan terhadap mediokritas yang membosankan. rifspace adalah tempat kreativitas berlari liar dan kebijaksanaan konvensional ditinggalkan.'
      },
      journey: {
        title: 'PERJALANAN',
        timeline: [
          {
            year: '2020',
            title: 'Percikan Api',
            desc: 'Mulai bereksperimen dengan Photoshop, jatuh cinta dengan pixel'
          },
          {
            year: '2021',
            title: 'Mendalami',
            desc: 'Menguasai Adobe Suite, mulai freelance, menemukan desain brutalist'
          },
          {
            year: '2022',
            title: 'Mengajar & Berkarya',
            desc: 'Meluncurkan rifspace, mulai berbagi tutorial dan eksperimen kreatif'
          },
          {
            year: '2023',
            title: 'Membangun Komunitas',
            desc: 'Mengembangkan audience, berkolaborasi dengan kreator, mendorong batasan'
          },
          {
            year: '2024',
            title: 'Gerakan',
            desc: 'rifspace menjadi lebih dari blog—ini adalah revolusi kreatif'
          }
        ]
      },
      skills: {
        title: 'TOOLS & KEAHLIAN',
        items: [
          { name: 'Photoshop', level: 95, icon: 'palette' },
          { name: 'Illustrator', level: 90, icon: 'code' },
          { name: 'Edit Foto', level: 92, icon: 'camera' },
          { name: 'Desain UI/UX', level: 85, icon: 'sparkles' },
          { name: 'Tipografi', level: 88, icon: 'zap' },
          { name: 'Teori Warna', level: 90, icon: 'heart' }
        ]
      },
      values: {
        title: 'NILAI INTI',
        items: [
          'Kreativitas di atas konformitas',
          'Eksperimen selalu',
          'Berbagi pengetahuan dengan bebas',
          'Langgar aturan dengan sengaja',
          'Tetap penasaran, tetap lapar'
        ]
      }
    }
  };

  const t = content[language];

  const getIcon = (iconName) => {
    const icons = {
      palette: Palette,
      code: Code,
      camera: Camera,
      sparkles: Sparkles,
      zap: Zap,
      heart: Heart
    };
    const Icon = icons[iconName];
    return <Icon className="w-6 h-6" />;
  };

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white transform rotate-1 inline-block mb-4">
              {t.heading}
              <Sparkles className="inline-block ml-4 w-16 h-16 text-[#3cbeee]" />
            </h1>
            <p className="text-xl text-white/60 font-bold uppercase tracking-wider">{t.subtitle}</p>
          </motion.div>

          {/* Intro Manifesto */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 bg-[#3cbeee]/10 border-4 border-[#3cbeee] p-8 md:p-12 transform -rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#3cbeee] mb-6 transform rotate-1">
              {t.intro.title}
            </h2>
            <p className="text-xl text-white/90 leading-relaxed font-medium">
              {t.intro.text}
            </p>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black uppercase text-white mb-12 transform -rotate-1">
              {t.journey.title}
            </h2>
            <div className="space-y-8">
              {t.journey.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 group cursor-pointer"
                >
                  <div className="flex-shrink-0 w-24">
                    <span className="text-3xl font-black text-[#3cbeee]">{item.year}</span>
                  </div>
                  <div className="flex-1 bg-[#1a1a1a] border-l-4 border-[#3cbeee] p-6 group-hover:border-l-8 transition-all duration-300">
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#3cbeee] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/70 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black uppercase text-white mb-12 transform rotate-1">
              {t.skills.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.skills.items.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1a1a] border-2 border-white/10 p-6 hover:border-[#3cbeee] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[#3cbeee]">
                        {getIcon(skill.icon)}
                      </div>
                      <span className="text-xl font-black text-white">{skill.name}</span>
                    </div>
                    <span className="text-2xl font-black text-[#3cbeee]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-[#3cbeee]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Core Values */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a] border-4 border-white/10 p-8 md:p-12"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#3cbeee] mb-8 transform -rotate-1">
              {t.values.title}
            </h2>
            <ul className="space-y-4">
              {t.values.items.map((value, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 text-xl font-bold text-white"
                >
                  <Zap className="w-6 h-6 text-[#3cbeee] flex-shrink-0" />
                  {value}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;