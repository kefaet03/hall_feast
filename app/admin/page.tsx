'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { Lock, Upload, Users, Loader2, Download, Filter } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Should check Supabase session
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'registrations' | 'upload' | 'corrections'>('registrations');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [corrections, setCorrections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSport, setFilterSport] = useState<string>('All');

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setIsLoading(true);
        const supabase = createClient();
        
        if (activeTab === 'registrations') {
          const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data) {
            setRegistrations(data);
          }
        } else if (activeTab === 'corrections') {
          const { data, error } = await supabase
            .from('info_corrections')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data) {
            setCorrections(data);
          }
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    if (email === 'ziahall@ruet.ac.bd' && password === '1234ZiaHall@') {
      setIsAuthenticated(true);
    }
  };

  const uniqueSports = useMemo(() => {
    const sports = new Set(registrations.map(r => r.sport));
    return ['All', ...Array.from(sports)];
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    let filtered = filterSport === 'All' ? registrations : registrations.filter(r => r.sport === filterSport);
    
    // Deduplicate: keep only the most recent registration for a given sport + whatsapp combination
    const seen = new Set();
    return filtered.filter(r => {
      const key = `${r.sport}-${r.whatsapp}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
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

  const exportCorrectionsToCSV = () => {
    const headers = ['Correct Name', 'Correct Roll', 'Correct Dept', 'Correct Room No', 'Date'];
    const rows = corrections.map(reg => [
      reg.correct_name,
      reg.correct_roll,
      reg.correct_dept,
      reg.correct_room_no,
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
    link.setAttribute('download', `info_corrections.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-2xl max-w-md w-full relative z-10"
        >
          <div className="flex justify-center mb-6 text-gold">
            <Lock size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-script text-center mb-8 text-gold">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded p-3 text-white focus:border-gold outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded p-3 text-white focus:border-gold outline-none transition-colors"
                required
              />
            </div>
            <button type="submit" className="w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-gold-light transition-colors mt-6 shadow-[0_0_15px_rgba(229,192,123,0.3)]">
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pt-32 max-w-7xl mx-auto bg-background text-white relative">
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
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
          className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors ${activeTab === 'registrations' ? 'bg-gold text-black shadow-[0_0_15px_rgba(229,192,123,0.3)]' : 'glass-panel text-gray-400 hover:text-white'}`}
        >
          <Users size={20} /> Registrations
        </button>
        <button
          onClick={() => setActiveTab('corrections')}
          className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors ${activeTab === 'corrections' ? 'bg-gold text-black shadow-[0_0_15px_rgba(229,192,123,0.3)]' : 'glass-panel text-gray-400 hover:text-white'}`}
        >
          <Users size={20} /> Corrections
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-gold text-black shadow-[0_0_15px_rgba(229,192,123,0.3)]' : 'glass-panel text-gray-400 hover:text-white'}`}
        >
          <Upload size={20} /> Archive Uploader
        </button>
      </div>

      {activeTab === 'registrations' && (
        <div className="glass-panel p-8 rounded-2xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-serif text-gold text-3xl">Sports Registrations</h2>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-black/40 border border-gray-700 rounded-lg px-3 py-2">
                <Filter size={16} className="text-gold" />
                <select
                  value={filterSport}
                  onChange={(e) => setFilterSport(e.target.value)}
                  className="bg-transparent text-sm outline-none text-gray-300 cursor-pointer [&>option]:bg-charcoal"
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

          <div className="mt-4 border border-gold/20 rounded-xl overflow-hidden bg-black/40">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gold border-b border-gold/20">
                <tr>
                  <th className="p-4">Sport</th>
                  <th className="p-4">Team/Player</th>
                  <th className="p-4">Captain</th>
                  <th className="p-4">WhatsApp</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
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
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
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

      {activeTab === 'corrections' && (
        <div className="glass-panel p-8 rounded-2xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-serif text-gold text-3xl">Information Corrections</h2>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={exportCorrectionsToCSV}
                disabled={corrections.length === 0}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>

          <div className="mt-4 border border-gold/20 rounded-xl overflow-hidden bg-black/40">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gold border-b border-gold/20">
                <tr>
                  <th className="p-4">Correct Name</th>
                  <th className="p-4">Correct Roll</th>
                  <th className="p-4">Correct Dept</th>
                  <th className="p-4">Correct Room No.</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <Loader2 className="animate-spin text-gold w-8 h-8 mx-auto" />
                    </td>
                  </tr>
                ) : corrections.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No corrections found.
                    </td>
                  </tr>
                ) : (
                  corrections.map((corr) => (
                    <tr key={corr.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium">{corr.correct_name}</td>
                      <td className="p-4">{corr.correct_roll}</td>
                      <td className="p-4">{corr.correct_dept}</td>
                      <td className="p-4">{corr.correct_room_no}</td>
                      <td className="p-4 text-gray-500">
                        {new Date(corr.created_at).toLocaleDateString()}
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
        <div className="glass-panel p-8 rounded-2xl relative z-10">
          <h2 className="text-xl font-serif text-gold mb-6 text-3xl">Upload to Archive</h2>
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-16 flex flex-col items-center justify-center text-gray-400 hover:border-gold hover:text-gold transition-colors cursor-pointer bg-black/40">
            <Upload size={48} className="mb-4 opacity-50" />
            <p className="font-medium text-lg mb-2">Drag and drop images here</p>
            <p className="text-sm opacity-60">or click to browse files (JPEG, PNG, WebP)</p>
          </div>
        </div>
      )}
    </div>
  );
}
