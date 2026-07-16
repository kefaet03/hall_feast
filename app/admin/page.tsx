'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// import { createClient } from '@/lib/supabase';
import { Lock, Upload, Users } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Should check Supabase session
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'registrations' | 'upload'>('registrations');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    if (email === 'admin@ruet.ac.bd' && password === 'admin') {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal/80 border border-gold/30 p-8 rounded-xl max-w-md w-full backdrop-blur-sm"
        >
          <div className="flex justify-center mb-6 text-gold">
            <Lock size={48} />
          </div>
          <h1 className="text-2xl font-serif text-center mb-8 text-gold">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-400">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-gold outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-400">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-gold outline-none" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-gold text-black font-bold py-3 rounded hover:bg-gold-light transition-colors mt-6">
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12 border-b border-gold/20 pb-6">
        <h1 className="text-3xl font-serif text-gold">Admin Dashboard</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          Sign Out
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('registrations')}
          className={`px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors ${activeTab === 'registrations' ? 'bg-gold text-black' : 'bg-charcoal text-gray-400 hover:text-white'}`}
        >
          <Users size={20} /> Registrations
        </button>
        <button 
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-gold text-black' : 'bg-charcoal text-gray-400 hover:text-white'}`}
        >
          <Upload size={20} /> Archive Uploader
        </button>
      </div>

      {activeTab === 'registrations' && (
        <div className="bg-charcoal/50 border border-gold/10 p-6 rounded-xl">
          <h2 className="text-xl font-serif text-gold mb-6">Sports Registrations</h2>
          <div className="text-gray-400 italic">
            This module will connect to Supabase 'registrations' table to display and export registered players and teams.
          </div>
          {/* Placeholder for Data Table */}
          <div className="mt-8 border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-gray-400">
                <tr>
                  <th className="p-4">Sport</th>
                  <th className="p-4">Team/Player</th>
                  <th className="p-4">WhatsApp</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="p-4">Football</td>
                  <td className="p-4">Team Phoenix</td>
                  <td className="p-4">01700000000</td>
                  <td className="p-4">16 Jul, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-charcoal/50 border border-gold/10 p-6 rounded-xl">
          <h2 className="text-xl font-serif text-gold mb-6">Upload to Archive</h2>
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-16 flex flex-col items-center justify-center text-gray-400 hover:border-gold hover:text-gold transition-colors cursor-pointer bg-black/20">
            <Upload size={48} className="mb-4 opacity-50" />
            <p className="font-medium text-lg mb-2">Drag and drop images here</p>
            <p className="text-sm opacity-60">or click to browse files (JPEG, PNG, WebP)</p>
          </div>
        </div>
      )}
    </div>
  );
}
