import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Instagram, Youtube, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const content = {
    en: {
      title: 'Contact - rifspace',
      description: 'Get in touch and connect with the creative community',
      heading: 'CONNECT',
      subtitle: 'Let\'s create something wild',
      form: {
        title: 'DROP A MESSAGE',
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        placeholder: 'Tell me about your project, question, or just say hi...',
        send: 'Send Message'
      },
      social: {
        title: 'FIND ME ONLINE',
        subtitle: 'Follow the creative chaos'
      },
      signoff: {
        title: 'THE VIBE',
        text: 'Whether you\'re here to learn, collaborate, or just vibe with creative energy—rifspace is your space. Let\'s break some rules and make something unforgettable together.'
      }
    },
    id: {
      title: 'Kontak - rifspace',
      description: 'Hubungi dan terhubung dengan komunitas kreatif',
      heading: 'KONTAK',
      subtitle: 'Mari buat sesuatu yang liar',
      form: {
        title: 'KIRIM PESAN',
        name: 'Nama Kamu',
        email: 'Email Kamu',
        message: 'Pesan Kamu',
        placeholder: 'Ceritakan tentang proyekmu, pertanyaan, atau sekedar sapa...',
        send: 'Kirim Pesan'
      },
      social: {
        title: 'TEMUKAN SAYA ONLINE',
        subtitle: 'Ikuti kekacauan kreatif'
      },
      signoff: {
        title: 'VIBES',
        text: 'Apakah kamu di sini untuk belajar, berkolaborasi, atau sekedar vibe dengan energi kreatif—rifspace adalah ruangmu. Mari kita langgar beberapa aturan dan buat sesuatu yang tak terlupakan bersama.'
      }
    }
  };

  const t = content[language];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@rifspace',
      url: '#',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: 'rifspace',
      url: '#',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: MessageSquare,
      name: 'TikTok',
      handle: '@rifspace',
      url: '#',
      color: 'from-gray-800 to-gray-900'
    },
    {
      icon: Mail,
      name: 'Email',
      handle: 'hello@rifspace.com',
      url: '#',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 " + (language === 'en' ? "Form submission coming soon!" : "Pengiriman form segera hadir!"),
      description: language === 'en' ? "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" : "Fitur ini belum tersedia—tapi jangan khawatir! Kamu bisa request di prompt berikutnya! 🚀"
    });
  };

  const handleSocialClick = () => {
    toast({
      title: "🚧 " + (language === 'en' ? "Social links coming soon!" : "Link sosial segera hadir!"),
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white transform -rotate-1 inline-block mb-4">
              {t.heading}
              <Send className="inline-block ml-4 w-16 h-16 text-[#3cbeee]" />
            </h1>
            <p className="text-xl text-white/60 font-bold uppercase tracking-wider">{t.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[#3cbeee] mb-8 transform -rotate-1">
                {t.form.title}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/60 font-bold text-sm uppercase mb-2">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-white/20 focus:border-[#3cbeee] text-white font-medium outline-none transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-bold text-sm uppercase mb-2">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-white/20 focus:border-[#3cbeee] text-white font-medium outline-none transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-bold text-sm uppercase mb-2">
                    {t.form.message}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    placeholder={t.form.placeholder}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-white/20 focus:border-[#3cbeee] text-white placeholder-white/30 font-medium outline-none transition-all duration-300 resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#3cbeee] hover:bg-[#2da5d0] text-black font-black text-lg py-6 rounded-none transform hover:scale-105 transition-all duration-300"
                >
                  <Send className="mr-2 w-5 h-5" />
                  {t.form.send}
                </Button>
              </form>
            </motion.section>

            {/* Social Links */}
            <motion.section
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4 transform rotate-1">
                {t.social.title}
              </h2>
              <p className="text-white/60 font-bold uppercase text-sm mb-8">{t.social.subtitle}</p>

              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    onClick={handleSocialClick}
                    className="group cursor-pointer"
                  >
                    <div className="bg-[#1a1a1a] border-2 border-white/10 hover:border-[#3cbeee] p-6 transition-all duration-300 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-black text-lg">{social.name}</div>
                        <div className="text-[#3cbeee] font-bold text-sm">{social.handle}</div>
                      </div>
                      <Send className="w-5 h-5 text-white/40 group-hover:text-[#3cbeee] group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sign-off Message */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center bg-[#3cbeee]/10 border-4 border-[#3cbeee] p-8 md:p-12 transform rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#3cbeee] mb-6 transform -rotate-1 inline-block">
              {t.signoff.title}
            </h2>
            <p className="text-xl text-white/90 leading-relaxed font-medium max-w-3xl mx-auto">
              {t.signoff.text}
            </p>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default ContactPage;