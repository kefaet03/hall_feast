'use client';

import { motion } from 'framer-motion';

export default function FeastPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.01 }}
        className="relative max-w-4xl w-full glass-panel p-2 shadow-2xl rounded-2xl"
      >
        <div className="border border-gold/20 rounded-xl p-8 md:p-16 text-center h-full bg-black/40">
          <h3 className="text-gold tracking-[0.4em] uppercase text-sm mb-4">Chapter II</h3>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-12 text-gradient-gold">The Feast</h1>

          <div className="w-16 h-[1px] bg-gold mx-auto mb-12"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            {/* Menu Image Placeholder */}
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(229,192,123,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/feast-menu.png" 
                alt="Feast Menu Platter" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400/121216/D4AF37?text=Feast+Platter';
                }}
              />
            </div>

            {/* Menu Items */}
            <div className="w-full md:w-1/2 space-y-6 font-serif text-left">
              <h2 className="text-3xl text-gold mb-8 italic text-center md:text-left border-b border-gold/20 pb-4">The Menu</h2>
              
              <ul className="space-y-4">
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-xl text-gray-200">Khichuri</span>
                  <span className="text-lg text-gold/80">খিচুড়ি</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-xl text-gray-200">Chicken Kosha</span>
                  <span className="text-lg text-gold/80">চিকেন কষা</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-xl text-gray-200">Begun Vaji</span>
                  <span className="text-lg text-gold/80">বেগুন ভাজি</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-xl text-gray-200">Alu Vorta</span>
                  <span className="text-lg text-gold/80">আলু ভর্তা</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-xl text-gray-200">Achar</span>
                  <span className="text-lg text-gold/80">আচার</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-xl text-gray-200">Fresh Salad</span>
                  <span className="text-lg text-gold/80">সালাদ</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-gold/60 text-sm tracking-widest uppercase">
            26 July, 2026 • 1:00 PM
          </div>
        </div>
      </motion.div>
    </div>
  );
}
