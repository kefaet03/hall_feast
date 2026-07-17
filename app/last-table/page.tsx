'use client';

import { motion } from 'framer-motion';

export default function LastTablePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.01 }}
        className="relative max-w-4xl w-full glass-panel p-2 shadow-2xl rounded-2xl"
      >
        <div className="border border-gold/20 rounded-xl p-8 md:p-16 text-center h-full bg-black/40">
          <h3 className="text-gold tracking-[0.4em] uppercase text-sm mb-4">Chapter IV</h3>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-12 text-gradient-gold">The Last Table</h1>

          <div className="w-16 h-[1px] bg-gold mx-auto mb-12"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            {/* Menu Image Placeholder */}
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(229,192,123,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/last-table-menu.png" 
                alt="The Last Table Menu" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400/121216/D4AF37?text=Last+Table+Platter';
                }}
              />
            </div>

            {/* Menu Items */}
            <div className="w-full md:w-1/2 space-y-6 font-serif text-left max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
              <h2 className="text-3xl text-gold mb-8 italic text-center md:text-left border-b border-gold/20 pb-4">The Menu</h2>
              
              <ul className="space-y-4">
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Polao</span>
                  <span className="text-md md:text-lg text-gold/80">পোলাও</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Roast (Sonali)</span>
                  <span className="text-md md:text-lg text-gold/80">রোস্ট (সোনালী)</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Beef</span>
                  <span className="text-md md:text-lg text-gold/80">গরুর মাংস</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Egg</span>
                  <span className="text-md md:text-lg text-gold/80">ডিম</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Dal</span>
                  <span className="text-md md:text-lg text-gold/80">ডাল</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Prawn</span>
                  <span className="text-md md:text-lg text-gold/80">চিংড়ি</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Kabab</span>
                  <span className="text-md md:text-lg text-gold/80">কাবাব</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Chinese Vegetable</span>
                  <span className="text-md md:text-lg text-gold/80">চাইনিজ ভেজিটেবল</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Doi</span>
                  <span className="text-md md:text-lg text-gold/80">দই</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Mishti</span>
                  <span className="text-md md:text-lg text-gold/80">মিষ্টি</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Drinks</span>
                  <span className="text-md md:text-lg text-gold/80">ড্রিংকস</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/10 pb-2">
                  <span className="text-lg md:text-xl text-gray-200">Salad</span>
                  <span className="text-md md:text-lg text-gold/80">সালাদ</span>
                </li>
              </ul>

              <div className="mt-8 text-center md:text-left">
                <span className="text-gold italic font-bold tracking-widest uppercase text-sm animate-pulse">
                  Surprise items are waiting....
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 text-gold/60 text-sm tracking-widest uppercase">
            23 July, 2026 • 8:00 PM
          </div>
        </div>
      </motion.div>
    </div>
  );
}
