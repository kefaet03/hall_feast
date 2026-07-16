'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bell, Trophy, UtensilsCrossed, Mic, Utensils } from 'lucide-react';

const chapters = [
  { id: 'I', title: 'The Arena', subtitle: '(SPORTS)', icon: <Trophy size={48} strokeWidth={1.5} />, href: '/arena', delay: 0.1 },
  { id: 'II', title: 'The Feast', subtitle: '(LUNCH)', icon: <UtensilsCrossed size={48} strokeWidth={1.5} />, href: '/feast', delay: 0.2 },
  { id: 'III', title: 'The Farewell', subtitle: '(FAREWELL CEREMONY)', icon: <Mic size={48} strokeWidth={1.5} />, href: '/farewell', delay: 0.3 },
  { id: 'IV', title: 'The Last Table', subtitle: '(DINNER)', icon: <Utensils size={48} strokeWidth={1.5} />, href: '/last-table', delay: 0.4 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-serif">
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-5xl w-full z-10 flex flex-col items-center pt-12 pb-12"
      >
        <div className="text-gold mb-2 text-2xl">✧</div>
        <h3 className="tracking-[0.2em] text-lg md:text-xl uppercase mb-4 font-medium">Shahid President Ziaur Rahman Hall</h3>
        
        <div className="flex items-center justify-center gap-4 w-full max-w-md mb-8">
          <div className="flex-1 h-[1px] bg-gold/50"></div>
          <div className="text-gold rotate-45 text-xs">◆</div>
          <div className="flex-1 h-[1px] bg-gold/50"></div>
        </div>

        {/* Title Area */}
        <div className="relative mb-12 flex flex-col items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <h1 className="font-script text-6xl md:text-8xl text-gold leading-none mr-12 -mb-6 transform -rotate-6">The</h1>
              <h1 className="font-script text-8xl md:text-[140px] text-[#1A1A1A] leading-none tracking-tight">Final</h1>
              <div className="flex items-baseline gap-4 mt-2">
                <h1 className="font-script text-8xl md:text-[140px] text-gold leading-none">Bell</h1>
                <h1 className="font-script text-6xl md:text-9xl text-[#1A1A1A] leading-none tracking-tighter">'20</h1>
              </div>
            </div>
            <div className="hidden md:block text-gold opacity-80 -ml-12 mt-12 transform rotate-12">
              <Bell size={180} strokeWidth={1} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 w-full max-w-[200px] mb-8">
          <div className="text-gold rotate-45 text-xs">◆</div>
        </div>

        <p className="text-2xl md:text-4xl tracking-[0.2em] mb-8 font-medium">23 JULY, 2026</p>
        
        <div className="flex items-center justify-center gap-4 w-full max-w-2xl mb-16">
          <div className="flex-1 h-[1px] bg-gold/50"></div>
          <div className="text-gold rotate-45 text-xs">◆</div>
          <div className="flex-1 h-[1px] bg-gold/50"></div>
        </div>

        {/* Chapters Row */}
        <div className="flex flex-col md:flex-row items-stretch justify-center w-full gap-8 md:gap-0 md:divide-x border-gold/30">
          {chapters.map((chapter) => (
            <Link href={chapter.href} key={chapter.id} className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: chapter.delay, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col items-center justify-center p-4 cursor-pointer"
              >
                <h2 className="text-sm font-bold text-gold tracking-widest uppercase mb-1">Chapter</h2>
                <h3 className="text-3xl text-gold font-bold mb-8">{chapter.id}</h3>
                
                <div className="relative mb-6">
                   <div className="absolute inset-0 bg-gold/20 transform -rotate-12 blur-md scale-150 group-hover:bg-gold/40 transition-all rounded-full"></div>
                   <div className="relative z-10 text-[#1A1A1A]">{chapter.icon}</div>
                </div>

                <h3 className="font-script text-5xl mb-2 group-hover:text-gold transition-colors">{chapter.title}</h3>
                <p className="text-xs tracking-widest text-gray-500">{chapter.subtitle}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-center gap-2">
          <p className="text-gold tracking-[0.1em] text-sm md:text-base font-bold">CELEBRATING THE BONDS.</p>
          <p className="text-gold tracking-[0.1em] text-sm md:text-base font-bold">HONORING THE MEMORIES. WELCOMING NEW BEGINNINGS.</p>
          <div className="text-gold mt-4 text-xl">✧</div>
        </div>

      </motion.div>
    </div>
  );
}
