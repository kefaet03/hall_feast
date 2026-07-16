'use client';

import { motion } from 'framer-motion';

export default function FeastPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF9F6]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl w-full bg-white border-2 border-gold p-2 shadow-2xl"
      >
        <div className="border border-gold/50 p-8 md:p-16 text-center h-full">
          <h3 className="text-gold tracking-[0.4em] uppercase text-sm mb-4">Chapter II</h3>
          <h1 className="text-5xl md:text-7xl font-script font-bold mb-12">The Feast</h1>
          
          <div className="w-16 h-[1px] bg-gold mx-auto mb-12"></div>

          <div className="space-y-12 font-serif">
            <div>
              <h2 className="text-3xl font-script text-gold mb-6">Appetizers</h2>
              <p className="text-lg text-gray-800">Crispy Chicken Wontons</p>
              <p className="text-sm text-gray-500 mt-2">with Sweet Chili Dip</p>
            </div>
            
            <div className="w-8 h-[1px] bg-gold/30 mx-auto"></div>

            <div>
              <h2 className="text-3xl font-script text-gold mb-6">Main Course</h2>
              <p className="text-lg text-gray-800">Kacchi Biryani (Mutton)</p>
              <p className="text-sm text-gray-500 mt-2">Served with Raita & Borhani</p>
              <p className="text-lg text-gray-800 mt-4">Chicken Roast</p>
            </div>

            <div className="w-8 h-[1px] bg-gold/30 mx-auto"></div>

            <div>
              <h2 className="text-3xl font-script text-gold mb-6">Desserts</h2>
              <p className="text-lg text-gray-800">Traditional Jorda</p>
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
