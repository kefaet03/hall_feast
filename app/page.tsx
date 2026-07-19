'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Trophy, GraduationCap, Clock, Settings } from 'lucide-react';

const chapters = [
  { id: 'I', title: 'The Arena', desc: 'Sports & Games', href: '/arena', icon: Trophy },
  { id: 'II', title: 'The Feast', desc: 'Grand Lunch', href: '/feast', icon: Users },
  { id: 'III', title: 'The Farewell', desc: 'Evening Ceremony', href: '/farewell', icon: GraduationCap },
  { id: 'IV', title: 'The Last Table', desc: 'Dinner', href: '/last-table', icon: UtensilsIcon },
  { id: 'V', title: 'Miscellaneous', desc: 'Corrections & Info', href: '/misc', icon: Settings },
];

function UtensilsIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

// Kinetic Text Component
const KineticText = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center flex-wrap">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: index * 0.05, type: 'spring', bounce: 0.4 }}
          whileHover={{ scale: 1.2, color: '#E5C07B', textShadow: '0px 0px 20px rgba(229, 192, 123, 0.8)' }}
          className="inline-block cursor-default font-serif font-bold text-5xl md:text-7xl lg:text-8xl"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-07-23T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative overflow-x-hidden pt-24 pb-32">
      {/* Background Decorative Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center w-full max-w-5xl z-10 mb-20"
      >
        <motion.h3 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gold tracking-[0.4em] text-xs md:text-sm uppercase mb-4 font-medium"
        >
          Shahid President Ziaur Rahman Hall
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-gray-400 uppercase tracking-widest text-sm mb-8 italic"
        >
          Presents
        </motion.p>
        
        <KineticText text="The Final Bell '20" />
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-gray-400 mt-10 italic font-serif max-w-4xl mx-auto md:whitespace-nowrap"
        >
          Celebrating the Bonds. Honoring the Memories. Welcoming New Beginnings.
        </motion.p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-32">
        {/* Countdown Card (Spans 2 cols on tablet/desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass-panel rounded-3xl p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden group transition-colors duration-300"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors duration-500" />
          <div>
            <div className="flex items-center gap-3 text-gold mb-2">
              <Calendar size={20} />
              <span className="font-semibold tracking-wider uppercase text-sm">The Date</span>
            </div>
            <h2 className="text-3xl font-serif text-white">July 23, 2026</h2>
          </div>
          
          <div className="flex gap-8 mt-8">
            <div>
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">{timeLeft.days}</div>
              <div className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">Days</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">{timeLeft.hours}</div>
              <div className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">Hours</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">{timeLeft.minutes}</div>
              <div className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">Mins</div>
            </div>
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel rounded-3xl p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3 text-[#00f3ff] mb-4">
            <MapPin size={20} />
            <span className="font-semibold tracking-wider uppercase text-sm">Venue</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">RUET Campus</h3>
            <p className="text-white font-bold text-sm">Shahid President Ziaur Rahman Hall Premises.</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel rounded-3xl p-6 flex items-center gap-4"
        >
          <div className="p-4 bg-white/5 rounded-full text-gold">
            <Users size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-white">180+</div>
            <div className="text-sm text-gray-400">Graduating Brothers</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel rounded-3xl p-6 flex items-center gap-4"
        >
          <div className="p-4 bg-white/5 rounded-full text-[#00f3ff]">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-white">4 Years</div>
            <div className="text-sm text-gray-400">Of Unforgettable Memories</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel rounded-3xl p-6 flex items-center gap-4"
        >
          <div className="p-4 bg-white/5 rounded-full text-gold">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-white">IV</div>
            <div className="text-sm text-gray-400">Signature Chapters</div>
          </div>
        </motion.div>
      </div>

      {/* Chapters Scrollytelling */}
      <div className="w-full max-w-5xl z-10 flex flex-col gap-12 md:gap-24">
        {chapters.map((chapter, index) => (
          <Link href={chapter.href} key={chapter.id}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 cursor-pointer group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/5 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-500 shrink-0">
                <chapter.icon size={48} strokeWidth={1.5} />
              </div>
              
              <div className={`flex-1 text-center ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="text-gold font-serif text-lg md:text-xl tracking-widest mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  CHAPTER {chapter.id}
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 group-hover:text-gradient-gold transition-all duration-300">
                  {chapter.title}
                </h2>
                <p className="text-gray-400 text-lg md:text-xl">
                  {chapter.desc}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}
