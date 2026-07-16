'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { Lock, Upload, Users, Loader2, Download, Filter } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Should check Supabase session
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'registrations' | 'upload'>('registrations');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSport, setFilterSport] = useState<string>('All');

  useEffect(() => {
    if (isAuthenticated && activeTab === 'registrations') {
      const fetchRegs = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          setRegistrations(data);
        }
        setIsLoading(false);
      };
      fetchRegs();
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    if (email === 'admin@ruet.ac.bd' && password === 'admin') {
      setIsAuthenticated(true);
    }
  };

  const uniqueSports = useMemo(() => {
    const sports = new Set(registrations.map(r => r.sport));
    return ['All', ...Array.from(sports)];
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    if (filterSport === 'All') return registrations;
    return registrations.filter(r => r.sport === filterSport);
  }, [registrations, filterSport]);

  const exportToCSV = () => {
    const headers = ['Sport', 'Team/Player', 'Captain', 'WhatsApp', 'Date'];
    const rows = filteredRegistrations.map(reg => [
      reg.sport,
      reg.team_name || 'Individual',
      reg.captain_name,
      reg.whatsapp,
      new Date(reg.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations_${filterSport.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF9F6]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl border border-gold/30 p-8 rounded-xl max-w-md w-full"
        >
          <div className="flex justify-center mb-6 text-gold">
            <Lock size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-script text-center mb-8 text-gold">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-3 text-gray-800 focus:border-gold outline-none transition-colors" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-3 text-gray-800 focus:border-gold outline-none transition-colors" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-gold text-white font-bold py-3 rounded hover:bg-gold/80 transition-colors mt-6 shadow-md">
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto bg-[#FAF9F6] text-gray-800">
      <div className="flex justify-between items-center mb-12 border-b border-gold/20 pb-6">
        <h1 className="text-5xl font-script text-gold">Admin Dashboard</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-gray-500 hover:text-charcoal transition-colors text-sm font-medium"
        >
          Sign Out
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('registrations')}
          className={`px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors ${activeTab === 'registrations' ? 'bg-gold text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-800'}`}
        >
          <Users size={20} /> Registrations
        </button>
        <button 
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-gold text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-800'}`}
        >
          <Upload size={20} /> Archive Uploader
        </button>
      </div>

      {activeTab === 'registrations' && (
        <div className="bg-white shadow-sm border border-gold/10 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-script text-gold text-3xl">Sports Registrations</h2>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-[#FAF9F6] border border-gray-200 rounded px-3 py-2">
                <Filter size={16} className="text-gray-500" />
                <select 
                  value={filterSport}
                  onChange={(e) => setFilterSport(e.target.value)}
                  className="bg-transparent text-sm outline-none text-gray-700 cursor-pointer"
                >
                  {uniqueSports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={exportToCSV}
                disabled={filteredRegistrations.length === 0}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>
          
          <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF9F6] text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="p-4">Sport</th>
                  <th className="p-4">Team/Player</th>
                  <th className="p-4">Captain</th>
                  <th className="p-4">WhatsApp</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <Loader2 className="animate-spin text-gold w-8 h-8 mx-auto" />
                    </td>
                  </tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">{reg.sport}</td>
                      <td className="p-4">{reg.team_name || 'Individual'}</td>
                      <td className="p-4">{reg.captain_name}</td>
                      <td className="p-4">{reg.whatsapp}</td>
                      <td className="p-4 text-gray-500">
                        {new Date(reg.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-white shadow-sm border border-gold/10 p-6 rounded-xl">
          <h2 className="text-xl font-script text-gold mb-6 text-3xl">Upload to Archive</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 flex flex-col items-center justify-center text-gray-400 hover:border-gold hover:text-gold transition-colors cursor-pointer bg-[#FAF9F6]">
            <Upload size={48} className="mb-4 opacity-50" />
            <p className="font-medium text-lg mb-2">Drag and drop images here</p>
            <p className="text-sm opacity-60">or click to browse files (JPEG, PNG, WebP)</p>
          </div>
        </div>
      )}
    </div>
  );
}
