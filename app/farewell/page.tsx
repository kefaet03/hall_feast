'use client';

import { motion } from 'framer-motion';
import { CalendarClock, MapPin } from 'lucide-react';

const guests = [
  { name: 'Prof. Dr. S. M. Abdur Razzak', role: 'Vice-Chancellor, RUET', type: 'Chief Guest' },
  { name: 'Dr. Md Rabiul Islam Sarker', role: 'Hall Provost', type: 'Special Guest' },
  { name: 'Dr. Md. Sanowar Hossain', role: 'Assistant Provost', type: 'Honorable Guest' },
  { name: 'Jahid Hasan', role: 'Assistant Provost', type: 'Honorable Guest' },
];

export default function FarewellPage() {
  return (
    <div className="min-h-screen p-8 pt-32 max-w-5xl mx-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[30%] right-[-10%] w-[300px] h-[300px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-gold tracking-[0.4em] uppercase text-sm mb-4">Chapter III</h3>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">The Farewell</h1>
        <p className="text-xl text-gray-300 font-serif italic">Honoring the Memories. Welcoming New Beginnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Timeline & Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 rounded-2xl relative z-10"
        >
          <h2 className="text-2xl font-serif text-white mb-8">Event Details</h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 rounded-full text-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Venue</h3>
                <p className="text-gray-300">Shahid President Ziaur Rahman Hall Auditorium</p>
                <p className="text-sm text-gray-400">RUET Campus, Rajshahi</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 rounded-full text-gold">
                <CalendarClock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Schedule</h3>
                <p className="text-gold font-bold mb-4">Date: TBA</p>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold/30 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gold bg-charcoal text-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[-0.3rem] md:ml-0"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded border border-gold/10 bg-black/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gold">5:00 PM</div>
                      </div>
                      <div className="text-gray-300 text-sm">Guests Arrival & Reception</div>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gold bg-charcoal text-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[-0.3rem] md:ml-0"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded border border-gold/10 bg-black/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gold">5:30 PM</div>
                      </div>
                      <div className="text-gray-300 text-sm">Quran Recitation & Opening Speech</div>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gold bg-charcoal text-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[-0.3rem] md:ml-0"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded border border-gold/10 bg-black/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gold">7:00 PM</div>
                      </div>
                      <div className="text-gray-300 text-sm">Crest Distribution & Cultural Program</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Honored Guests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-serif text-gold mb-8">Honored Guests</h2>
          <div className="space-y-4">
            {guests.map((guest, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="glass-panel border-l-4 border-l-gold p-6 rounded-r-xl"
              >
                <div className="text-xs text-gold/80 uppercase tracking-widest mb-1">{guest.type}</div>
                <h3 className="text-xl font-bold text-white mb-1">{guest.name}</h3>
                <p className="text-gray-400">{guest.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
