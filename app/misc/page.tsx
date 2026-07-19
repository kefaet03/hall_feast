'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileEdit, Info } from 'lucide-react';
import CorrectionForm from '@/components/forms/CorrectionForm';

export default function MiscPage() {
  const [showCorrectionForm, setShowCorrectionForm] = useState(false);

  return (
    <div className="min-h-screen p-8 pt-32 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="fixed top-[20%] right-[20%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-wide">
          Chapter V: <span className="text-gradient-gold">Miscellaneous</span>
        </h1>
        <p className="text-xl text-gray-400 font-serif italic">
          Corrections, Information & Utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCorrectionForm(true)}
          className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer glass-panel-hover transition-all min-h-[250px]"
        >
          <div className="text-gold mb-6 group-hover:scale-110 transition-transform">
            <FileEdit size={48} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white tracking-wide">
            Name/Roll/Dept/Room No. Correction
          </h3>
          <p className="text-gray-400">
            Submit a correction if any of your information was registered incorrectly.
          </p>
        </motion.div>

        {/* Placeholder for future miscellaneous options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-50 min-h-[250px]"
        >
          <div className="text-gray-500 mb-6">
            <Info size={48} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-300 tracking-wide">
            More Options
          </h3>
          <p className="text-gray-500">
            Coming soon...
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showCorrectionForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setShowCorrectionForm(false)}
            />
            <div className="relative z-10 w-full max-w-2xl">
              <CorrectionForm onClose={() => setShowCorrectionForm(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
