'use client';

import { motion } from 'framer-motion';

export default function LastTablePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF9F6]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white border border-gold/30 p-12 text-center rounded-sm shadow-xl"
      >
        <h3 className="text-gold tracking-[0.4em] uppercase text-sm mb-4">Chapter IV</h3>
        <h1 className="text-5xl md:text-7xl font-script font-bold mb-8">The Last Table</h1>
        <p className="text-gray-600 font-serif italic mb-12">Our final meal together under the stars.</p>
        
        <div className="space-y-8 font-serif">
          <div className="p-6 border border-gold/10 bg-[#FAF9F6] rounded">
            <h2 className="text-3xl font-script text-gold mb-6">The Menu</h2>
            <ul className="space-y-4 text-gray-800">
              <li>Plain Rice</li>
              <li>Beef Bhuna</li>
              <li>Mixed Vegetable</li>
              <li>Thick Dal</li>
            </ul>
          </div>
          
          <div className="p-6 border border-gold/10 bg-[#FAF9F6] rounded">
            <h2 className="text-3xl font-script text-gold mb-6">Sweet Ending</h2>
            <ul className="space-y-4 text-gray-800">
              <li>Sweet Doi</li>
              <li>Rasgulla</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-gold/60 text-sm tracking-widest uppercase">
          23 July, 2026 • 9:30 PM
        </div>
      </motion.div>
    </div>
  );
}
