'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sport } from '@/types';
import ArenaRegistrationForm from '@/components/forms/ArenaRegistrationForm';
import { Trophy, Gamepad2, Target, Dices, Layers, Crown, BrainCircuit, TableProperties } from 'lucide-react';

const sports: { name: Sport; icon: React.ReactNode; type: string }[] = [
  { name: 'Football', icon: <Trophy size={40} />, type: 'Major Team (12)' },
  { name: 'Cricket', icon: <Target size={40} />, type: 'Major Team (12)' },
  { name: 'eFootball', icon: <Gamepad2 size={40} />, type: 'Individual' },
  { name: 'Table Tennis', icon: <TableProperties size={40} />, type: 'Individual' },
  { name: 'Carrom', icon: <Dices size={40} />, type: 'Duo (2)' },
  { name: '29 Cards', icon: <Layers size={40} />, type: 'Small Team (4)' },
  { name: 'Chess', icon: <Crown size={40} />, type: 'Individual' },
  { name: 'Seerah Quiz', icon: <BrainCircuit size={40} />, type: 'Individual' },
];

export default function ArenaPage() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  return (
    <div className="min-h-screen p-8 pt-32 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="fixed top-[20%] left-[20%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-wide">
          Chapter I: <span className="text-gradient-gold">The Arena</span>
        </h1>
        <p className="text-xl text-gray-400 font-serif italic">Step onto the field of glory. Register for your event below.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sports.map((sport, index) => (
          <motion.div
            key={sport.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSport(sport.name)}
            className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer glass-panel-hover transition-all min-h-[220px]"
          >
            <div className="text-gold mb-6 group-hover:scale-110 transition-transform">{sport.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{sport.name}</h3>
            <span className="text-xs text-neon-blue uppercase tracking-widest font-semibold bg-[#00f3ff]/10 px-3 py-1.5 rounded-full">{sport.type}</span>
          </motion.div>
        ))}
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedSport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setSelectedSport(null)}
            />
            <div className="relative z-10 w-full max-w-2xl">
              <ArenaRegistrationForm
                initialSport={selectedSport}
                onClose={() => setSelectedSport(null)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
