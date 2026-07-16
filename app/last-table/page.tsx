'use client';

import { motion } from 'framer-motion';

export default function LastTablePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-charcoal/50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl w-full bg-[#1A1A1A] border-2 border-gold p-2 shadow-2xl"
      >
        <div className="border border-gold/50 p-8 md:p-16 text-center h-full">
          <h3 className="text-gold tracking-[0.4em] uppercase text-sm mb-4">Chapter IV</h3>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-12">The Last Table</h1>
          
          <div className="w-16 h-[1px] bg-gold mx-auto mb-12"></div>

          <div className="space-y-12 font-serif">
            <div>
              <h2 className="text-2xl text-gold mb-6 italic">The Spread</h2>
              <p className="text-lg text-gray-300">Plain Rice</p>
              <p className="text-lg text-gray-300 mt-4">Beef Bhuna</p>
              <p className="text-lg text-gray-300 mt-4">Mixed Vegetable</p>
              <p className="text-lg text-gray-300 mt-4">Thick Dal</p>
            </div>

            <div className="w-8 h-[1px] bg-gold/30 mx-auto"></div>

            <div>
              <h2 className="text-2xl text-gold mb-6 italic">Sweet Ending</h2>
              <p className="text-lg text-gray-300">Mishti Doi</p>
              <p className="text-sm text-gray-500 mt-2">Bogra Special</p>
            </div>
          </div>
          
          <div className="mt-16 text-gold/60 text-sm tracking-widest uppercase">
            23 July, 2026 • 9:30 PM
          </div>
        </div>
      </motion.div>
    </div>
  );
}
