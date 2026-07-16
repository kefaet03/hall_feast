'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const chapters = [
  { id: 'I', title: 'The Arena', desc: 'Sports & Games', href: '/arena', delay: 0.1 },
  { id: 'II', title: 'The Feast', desc: 'Grand Lunch', href: '/feast', delay: 0.2 },
  { id: 'III', title: 'The Farewell', desc: 'Evening Ceremony', href: '/farewell', delay: 0.3 },
  { id: 'IV', title: 'The Last Table', desc: 'Dinner', href: '/last-table', delay: 0.4 },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl z-10"
      >
        <h3 className="text-gold tracking-[0.3em] text-sm uppercase mb-4">Shahid President Ziaur Rahman Hall, RUET</h3>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
          The Final Bell <span className="text-gold">'20</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-2 italic font-serif">
          Celebrating the Bonds. Honoring the Memories. Welcoming New Beginnings.
        </p>
        <p className="text-gold/80 font-medium tracking-widest mt-6">23 JULY, 2026</p>
      </motion.div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full max-w-6xl z-10">
        {chapters.map((chapter) => (
          <Link href={chapter.href} key={chapter.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: chapter.delay, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group border border-gold/20 bg-charcoal/50 hover:bg-charcoal/80 backdrop-blur-sm p-8 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden h-64 flex flex-col justify-end"
            >
              <div className="absolute top-0 right-0 p-6 text-6xl font-serif font-black text-gold/10 group-hover:text-gold/20 transition-colors">
                {chapter.id}
              </div>
              <h2 className="text-2xl font-serif font-bold text-gold mb-2">Chapter {chapter.id}</h2>
              <h3 className="text-xl mb-1">{chapter.title}</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{chapter.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
