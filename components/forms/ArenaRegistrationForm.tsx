'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Sport } from '@/types';
import { createClient } from '@/lib/supabase';

// --- ZOD SCHEMAS ---

const playerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  roll: z.string().min(5, 'Valid Roll Number required'),
  room: z.string().min(1, 'Room number required'),
});

const baseSchema = z.object({
  sport: z.enum([
    'Football',
    'eFootball',
    'Cricket',
    'Table Tennis (Individual)',
    'Table Tennis (Duo)',
    'Carrom',
    '29 Cards',
    'Chess',
    'Seerah Quiz',
  ]),
  whatsappNumber: z.string().min(10, 'Valid WhatsApp number required'),
});

// Dynamic Schema logic
const registrationSchema = z.discriminatedUnion('sport', [
  // Individual Sports
  baseSchema.extend({
    sport: z.enum(['eFootball', 'Table Tennis (Individual)', 'Chess', 'Seerah Quiz']),
    captain: playerSchema,
  }),
  // Duo (Carrom - 2 players total)
  baseSchema.extend({
    sport: z.literal('Carrom'),
    teamName: z.string().min(2, 'Team Name required'),
    captain: playerSchema,
    members: z.array(playerSchema).length(1, 'Carrom requires exactly 1 partner'),
  }),
  // Small Team (29 Cards - 4 players total)
  baseSchema.extend({
    sport: z.literal('29 Cards'),
    teamName: z.string().min(2, 'Team Name required'),
    captain: playerSchema,
    members: z.array(playerSchema).length(1, '29 Cards requires exactly 1 partner'),
  }),
  // Duo (Table Tennis Duo - 2 players total)
  baseSchema.extend({
    sport: z.literal('Table Tennis (Duo)'),
    teamName: z.string().min(2, 'Team Name required'),
    captain: playerSchema,
    members: z.array(playerSchema).length(1, 'Requires exactly 1 partner'),
  }),
  // Major Team (Football, Cricket - 12 players total)
  baseSchema.extend({
    sport: z.enum(['Football', 'Cricket']),
    teamName: z.string().min(2, 'Team Name required'),
    captain: playerSchema,
    members: z.array(playerSchema).length(11, 'Requires exactly 11 squad members'),
  }),
]);

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface ArenaRegistrationFormProps {
  initialSport?: Sport;
  onClose: () => void;
}

export default function ArenaRegistrationForm({ initialSport = 'Football', onClose }: ArenaRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      sport: initialSport,
      whatsappNumber: '',
      teamName: '',
      captain: { name: '', roll: '', room: '' },
      members: [],
    },
  });

  const { control, watch, handleSubmit, setValue } = form;
  const { fields } = useFieldArray({
    control,
    name: 'members',
  });

  const selectedSport = watch('sport');

  // Handle dynamic member fields based on sport selection
  useEffect(() => {
    let requiredMembers = 0;
    if (selectedSport === 'Carrom' || selectedSport === '29 Cards' || selectedSport === 'Table Tennis (Duo)') requiredMembers = 1;
    else if (selectedSport === 'Football' || selectedSport === 'Cricket') requiredMembers = 11;

    // Reset members array to correct length
    const currentMembers = form.getValues('members') || [];
    if (currentMembers.length !== requiredMembers) {
      const newMembers = Array(requiredMembers).fill({ name: '', roll: '', room: '' });
      setValue('members', newMembers);
    }
  }, [selectedSport, setValue, form]);

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('registrations').insert({
        sport: data.sport,
        team_name: 'teamName' in data && data.teamName ? data.teamName : 'Individual/N/A',
        captain_name: data.captain.name,
        whatsapp: data.whatsappNumber,
        members: {
          captain: data.captain,
          others: 'members' in data ? data.members : []
        }
      });

      if (error) throw error;

      toast.success('Registration successful! See you at The Arena.');
      console.log('Submitted Data:', data);

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTeamSport = ['Carrom', '29 Cards', 'Table Tennis (Duo)', 'Football', 'Cricket'].includes(selectedSport as any);

  // MAPPING FOR WHATSAPP LINKS
  // Update these URLs with the actual WhatsApp Group invite links
  const whatsappLinks: { [key: string]: string } = {
    'Football': 'https://chat.whatsapp.com/FNcXkI0Hds74ggPZpSgpJ1',
    'eFootball': 'https://chat.whatsapp.com/BkrvV264EpJEnmtZYAfQHs',
    'Cricket': 'https://chat.whatsapp.com/BL29kiFbzlv3Yfkxt8DYbz',
    'Table Tennis (Individual)': 'https://chat.whatsapp.com/JGbPdpTtH7lCq8iKZHrSBE',
    'Table Tennis (Duo)': 'https://chat.whatsapp.com/JGbPdpTtH7lCq8iKZHrSBE',
    'Carrom': 'https://chat.whatsapp.com/JzuMLMHp4HT0S9U2lJ1d7Y',
    '29 Cards': 'https://chat.whatsapp.com/DontLQNLXR7AYg1Ft4XcbE',
    'Chess': 'https://chat.whatsapp.com/KfdRTrtbvpdLZY7KQUnL4Z',
    'Seerah Quiz': 'https://chat.whatsapp.com/K9vFjKvCJmv4nPDadDfMfk',
  };

  const currentGroupLink = whatsappLinks[selectedSport] || '#';

  const registerField = form.register as any;
  const formErrors = form.formState.errors as any;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel border-gold/30 rounded-2xl p-8 w-full max-w-2xl mx-auto max-h-[85vh] overflow-y-auto custom-scrollbar text-[#FAF9F6] relative shadow-2xl"
    >
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            &#10003;
          </div>
          <h2 className="text-3xl font-serif text-gold mb-4 tracking-wide">Registration Confirmed!</h2>
          <p className="text-gray-300 mb-8 text-lg">
            You have successfully registered for {selectedSport}.
          </p>

          <div className="bg-white/5 border border-gold/30 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-xl font-bold text-white mb-2">Mandatory Next Step:</h3>
            <p className="text-gray-300 mb-4 text-sm">
              It is strictly mandatory to join the official WhatsApp group for {selectedSport} to receive all fixtures, rules, and crucial updates. Players not in the group may miss important announcements.
            </p>
            <a
              href={currentGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-[#25D366] text-white font-bold py-3 rounded-lg hover:bg-[#128C7E] transition-colors shadow-lg"
            >
              Join WhatsApp Group
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white underline transition-colors"
          >
            Close and return to Arena
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8 border-b border-gold/20 pb-4">
            <h2 className="text-2xl font-serif text-gold tracking-wide">Register for <span className="font-bold">{selectedSport}</span></h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center">&times;</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg border-b border-[#D4AF37]/20 pb-2">Contact Info</h3>
              <div>
                <label className="block text-sm mb-1">WhatsApp Number</label>
                <input
                  {...form.register('whatsappNumber')}
                  className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none transition-colors"
                />
                {form.formState.errors.whatsappNumber && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.whatsappNumber.message}</p>
                )}
              </div>
            </div>

            {/* Team Details (If applicable) */}
            {isTeamSport && (
              <div className="space-y-4">
                <h3 className="text-lg border-b border-[#D4AF37]/20 pb-2">Team Details</h3>
                <div>
                  <label className="block text-sm mb-1">Team Name</label>
                  <input
                    {...registerField('teamName')}
                    className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none transition-colors"
                  />
                  {formErrors.teamName && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.teamName?.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Captain / Individual Details */}
            <div className="space-y-4">
              <h3 className="text-lg border-b border-[#D4AF37]/20 pb-2">
                {isTeamSport ? 'Captain Details' : 'Player Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input {...form.register('captain.name')} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none" />
                  {form.formState.errors.captain?.name && <p className="text-red-400 text-sm mt-1">{form.formState.errors.captain.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Roll</label>
                  <input {...form.register('captain.roll')} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none" />
                  {form.formState.errors.captain?.roll && <p className="text-red-400 text-sm mt-1">{form.formState.errors.captain.roll.message}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Room</label>
                  <input {...form.register('captain.room')} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none" />
                  {form.formState.errors.captain?.room && <p className="text-red-400 text-sm mt-1">{form.formState.errors.captain.room.message}</p>}
                </div>
              </div>
            </div>

            {/* Additional Members */}
            {fields.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg border-b border-[#D4AF37]/20 pb-2">Squad Members</h3>
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-white/5 p-4 rounded border border-white/10">
                    <div>
                      <label className="block text-xs mb-1 text-gray-400">Player {index + 2} Name</label>
                      <input {...registerField(`members.${index}.name`)} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-gray-400">Roll</label>
                      <input {...registerField(`members.${index}.roll`)} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-gray-400">Room</label>
                      <input {...registerField(`members.${index}.room`)} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none text-sm" />
                    </div>
                  </div>
                ))}
                {formErrors.members?.root && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.members.root.message}</p>
                )}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-black font-semibold py-4 rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 mt-8 shadow-[0_0_20px_rgba(229,192,123,0.3)] hover:shadow-[0_0_30px_rgba(229,192,123,0.5)]"
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
}
