'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, Utensils, GraduationCap, Image as ImageIcon, Settings, Coffee } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Arena', href: '/arena', icon: Trophy },
    { name: 'Feast', href: '/feast', icon: Utensils },
    { name: 'Farewell', href: '/farewell', icon: GraduationCap },
    { name: 'Last Table', href: '/last-table', icon: Coffee },
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
        </div>
      </nav>

      {/* Mobile Bottom Pill Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm">
        <nav className="glass-panel rounded-full px-4 py-3 flex justify-between items-center shadow-2xl overflow-x-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors px-2 min-w-[50px] ${pathname === item.href ? 'text-gold' : 'text-gray-400'}`}
            >
              <item.icon size={20} className={pathname === item.href ? 'scale-110 transition-transform' : ''} />
              <span className="text-[9px] font-medium whitespace-nowrap">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
