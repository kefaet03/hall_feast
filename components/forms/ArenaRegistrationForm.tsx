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
    'Table Tennis',
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
    sport: z.enum(['eFootball', 'Table Tennis', 'Chess', 'Seerah Quiz']),
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
    members: z.array(playerSchema).length(3, '29 Cards requires exactly 3 partners'),
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
    if (selectedSport === 'Carrom') requiredMembers = 1;
    else if (selectedSport === '29 Cards') requiredMembers = 3;
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
        team_name: 'teamName' in data ? data.teamName : null,
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
      
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTeamSport = ['Carrom', '29 Cards', 'Football', 'Cricket'].includes(selectedSport);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl p-6 w-full max-w-2xl mx-auto max-h-[80vh] overflow-y-auto custom-scrollbar text-[#FAF9F6]"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-[#D4AF37]">Register for {selectedSport}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
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
                {...form.register('teamName' as any)} 
                className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none transition-colors"
              />
              {(form.formState.errors as any).teamName && (
                <p className="text-red-400 text-sm mt-1">{(form.formState.errors as any).teamName?.message as string}</p>
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
                  <input {...form.register(`members.${index}.name` as any)} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-400">Roll</label>
                  <input {...form.register(`members.${index}.roll` as any)} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-400">Room</label>
                  <input {...form.register(`members.${index}.room` as any)} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:border-[#D4AF37] outline-none text-sm" />
                </div>
              </div>
            ))}
            {(form.formState.errors as any).members?.root && (
              <p className="text-red-400 text-sm mt-1">{(form.formState.errors as any).members.root.message as string}</p>
            )}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#D4AF37] text-black font-semibold py-3 rounded-lg hover:bg-[#F3E5AB] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Registering...' : 'Complete Registration'}
        </button>
      </form>
    </motion.div>
  );
}
