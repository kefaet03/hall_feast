'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, Utensils, GraduationCap, Users, Image as ImageIcon, Volume2, VolumeX, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize audio only on client side
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/16/audio_b29c92135c.mp3?filename=ambient-piano-amp-strings-10711.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Arena', href: '/arena', icon: Trophy },
    { name: 'Feast', href: '/feast', icon: Utensils },
    { name: 'Farewell', href: '/farewell', icon: GraduationCap },
    { name: 'Archive', href: '/archive', icon: ImageIcon },
  ];

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 glass-panel px-8 py-4 justify-between items-center">
        <Link href="/" className="font-serif text-2xl text-gold font-bold text-gradient-gold hover:scale-105 transition-transform">
          The Final Bell '20
        </Link>
        <div className="flex gap-8 items-center text-sm tracking-wide font-medium">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`hover:text-gold transition-colors relative ${pathname === item.href ? 'text-gold' : 'text-gray-300'}`}
            >
              {item.name}
              {pathname === item.href && (
                <motion.div layoutId="underline" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gold rounded-full" />
              )}
            </Link>
          ))}
          <Link href="/admin" className="text-gray-500 hover:text-white transition-colors opacity-50 ml-4">
            <Settings size={18} />
          </Link>
          <button 
            onClick={toggleAudio}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gold flex items-center justify-center"
            title="Toggle Ambient Sound"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isAudioPlaying ? 'playing' : 'muted'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {isAudioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Pill Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm">
        <nav className="glass-panel rounded-full px-4 py-3 flex justify-between items-center shadow-2xl">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors px-2 ${pathname === item.href ? 'text-gold' : 'text-gray-400'}`}
            >
              <item.icon size={20} className={pathname === item.href ? 'scale-110 transition-transform' : ''} />
              <span className="text-[9px] font-medium">{item.name}</span>
            </Link>
          ))}
          
          <div className="w-px h-8 bg-gray-700/50 mx-1"></div>
          
          <button 
            onClick={toggleAudio}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${isAudioPlaying ? 'text-[#00f3ff]' : 'text-gray-400'}`}
          >
            {isAudioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span className="text-[9px] font-medium">Audio</span>
          </button>
        </nav>
      </div>
    </>
  );
}
