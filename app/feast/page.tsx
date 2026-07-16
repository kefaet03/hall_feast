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

          <div className="space-y-12 font-serif">
            <div>
              <h2 className="text-2xl text-gold mb-6 italic">Appetizers</h2>
              <p className="text-lg text-gray-300">Crispy Chicken Wontons</p>
              <p className="text-sm text-gray-500 mt-2">with Sweet Chili Dip</p>
            </div>

            <div className="w-8 h-[1px] bg-gold/30 mx-auto"></div>

            <div>
              <h2 className="text-2xl text-gold mb-6 italic">Main Course</h2>
              <p className="text-lg text-gray-300">Kacchi Biryani (Mutton)</p>
              <p className="text-sm text-gray-500 mt-2">Served with Raita & Borhani</p>
              <p className="text-lg text-gray-300 mt-4">Chicken Roast</p>
            </div>

            <div className="w-8 h-[1px] bg-gold/30 mx-auto"></div>

            <div>
              <h2 className="text-2xl text-gold mb-6 italic">Desserts</h2>
              <p className="text-lg text-gray-300">Traditional Jorda</p>
              <p className="text-sm text-gray-500 mt-2">with mini Gulab Jamun</p>
            </div>
          </div>

          <div className="mt-16 text-gold/60 text-sm tracking-widest uppercase">
            23 July, 2026 • 1:30 PM
          </div>
        </div>
      </motion.div>
    </div>
  );
}
