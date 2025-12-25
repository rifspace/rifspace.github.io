import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Coffee, Sparkles, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SupportPage = ({ language }) => {
  const { toast } = useToast();

  const content = {
    en: {
      title: 'Support - rifspace',
      description: 'Support the creative journey and fuel the vision',
      heading: 'SUPPORT',
      subtitle: 'Support the art, fuel the vision',
      intro: {
        title: 'FUEL THE MOVEMENT',
        text: 'rifspace is built on passion, late nights, and countless experiments. Your support helps keep the tutorials free, the content fresh, and the creative fire burning. Every contribution, no matter how small, makes a huge difference.'
      },
      ways: {
        title: 'WAYS TO SUPPORT',
        items: [
          {
            icon: 'coffee',
            title: 'Buy Me a Coffee',
            desc: 'Fuel my late-night creative sessions with caffeine power'
          },
          {
            icon: 'heart',
            title: 'Monthly Support',
            desc: 'Join the inner circle and get exclusive content & early access'
          },
          {
            icon: 'sparkles',
            title: 'One-Time Donation',
            desc: 'A one-time boost to support the creative chaos'
          }
        ]
      },
      donate: 'Donate Now',
      copyAddress: 'Copy Address',
      qrTitle: 'Scan to Donate',
      thanks: {
        title: 'MUCH LOVE',
        text: 'Your support means the world. It allows me to create more tutorials, experiment with new ideas, and keep pushing creative boundaries. Together, we\'re building something special.'
      }
    },
    id: {
      title: 'Dukungan - rifspace',
      description: 'Dukung perjalanan kreatif dan nyalakan visi',
      heading: 'DUKUNGAN',
      subtitle: 'Dukung seni, nyalakan visi',
      intro: {
        title: 'NYALAKAN GERAKAN',
        text: 'rifspace dibangun atas dasar passion, malam-malam panjang, dan eksperimen tak terhitung. Dukunganmu membantu menjaga tutorial tetap gratis, konten tetap segar, dan api kreatif tetap menyala. Setiap kontribusi, sekecil apapun, membuat perbedaan besar.'
      },
      ways: {
        title: 'CARA MENDUKUNG',
        items: [
          {
            icon: 'coffee',
            title: 'Belikan Saya Kopi',
            desc: 'Nyalakan sesi kreatif larut malamku dengan kekuatan kafein'
          },
          {
            icon: 'heart',
            title: 'Dukungan Bulanan',
            desc: 'Bergabung dengan inner circle dan dapatkan konten eksklusif & akses awal'
          },
          {
            icon: 'sparkles',
            title: 'Donasi Sekali',
            desc: 'Dorongan sekali untuk mendukung kekacauan kreatif'
          }
        ]
      },
      donate: 'Donasi Sekarang',
      copyAddress: 'Salin Alamat',
      qrTitle: 'Scan untuk Donasi',
      thanks: {
        title: 'TERIMA KASIH',
        text: 'Dukunganmu berarti segalanya. Ini memungkinkan saya untuk membuat lebih banyak tutorial, bereksperimen dengan ide baru, dan terus mendorong batasan kreatif. Bersama, kita membangun sesuatu yang spesial.'
      }
    }
  };

  const t = content[language];

  const getIcon = (iconName) => {
    const icons = {
      coffee: Coffee,
      heart: Heart,
      sparkles: Sparkles
    };
    const Icon = icons[iconName];
    return <Icon className="w-8 h-8" />;
  };

  const handleDonate = () => {
    toast({
      title: "🚧 " + (language === 'en' ? "Donation links coming soon!" : "Link donasi segera hadir!"),
      description: language === 'en' ? "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" : "Fitur ini belum tersedia—tapi jangan khawatir! Kamu bisa request di prompt berikutnya! 🚀"
    });
  };

  const handleCopy = () => {
    toast({
      title: language === 'en' ? "✨ Address copied!" : "✨ Alamat disalin!",
      description: language === 'en' ? "Wallet address copied to clipboard" : "Alamat wallet disalin ke clipboard"
    });
  };

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white transform rotate-1 inline-block mb-4">
              {t.heading}
              <Heart className="inline-block ml-4 w-16 h-16 text-[#3cbeee] fill-[#3cbeee]" />
            </h1>
            <p className="text-2xl text-[#3cbeee] font-black uppercase tracking-wider">{t.subtitle}</p>
          </motion.div>

          {/* Intro */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-[#3cbeee]/10 border-4 border-[#3cbeee] p-8 md:p-12 transform -rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#3cbeee] mb-6 transform rotate-1">
              {t.intro.title}
            </h2>
            <p className="text-xl text-white/90 leading-relaxed font-medium">
              {t.intro.text}
            </p>
          </motion.section>

          {/* Ways to Support */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black uppercase text-white mb-12 transform -rotate-1">
              {t.ways.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.ways.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  className="bg-[#1a1a1a] border-4 border-white/10 hover:border-[#3cbeee] p-8 transition-all duration-300 cursor-pointer"
                  onClick={handleDonate}
                >
                  <div className="text-[#3cbeee] mb-4">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Donation Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-[#1a1a1a] border-4 border-[#3cbeee] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* QR Code */}
                <div className="text-center">
                  <h3 className="text-2xl font-black text-[#3cbeee] mb-6 uppercase">{t.qrTitle}</h3>
                  <div className="inline-block p-6 bg-white">
                    <div className="w-48 h-48 bg-gradient-to-br from-[#3cbeee] to-[#2da5d0] flex items-center justify-center">
                      <span className="text-white font-black text-xs uppercase text-center px-4">
                        {language === 'en' ? 'QR Code Placeholder' : 'Placeholder QR Code'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Donation Info */}
                <div className="space-y-6">
                  <div>
                    <span className="text-white/40 font-bold text-sm uppercase block mb-2">
                      {language === 'en' ? 'Crypto Wallet' : 'Wallet Kripto'}
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="bg-black/50 text-[#3cbeee] px-4 py-2 font-mono text-sm flex-1 border border-[#3cbeee]/30">
                        0x1234...5678
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        className="hover:bg-[#3cbeee]/10 hover:text-[#3cbeee]"
                      >
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleDonate}
                    className="w-full bg-[#3cbeee] hover:bg-[#2da5d0] text-black font-black text-lg py-6 rounded-none transform hover:scale-105 transition-all duration-300"
                  >
                    <Heart className="mr-2 w-5 h-5 fill-black" />
                    {t.donate}
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Thank You */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-[#3cbeee]/20 to-transparent border-4 border-[#3cbeee]/30 p-8 md:p-12"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#3cbeee] mb-6 transform -rotate-1 inline-block">
              {t.thanks.title}
              <Sparkles className="inline-block ml-3 w-10 h-10" />
            </h2>
            <p className="text-xl text-white/90 leading-relaxed font-medium max-w-3xl mx-auto">
              {t.thanks.text}
            </p>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default SupportPage;