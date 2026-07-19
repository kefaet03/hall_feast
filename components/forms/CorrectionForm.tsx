'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { Loader2, CheckCircle2, X } from 'lucide-react';

export default function CorrectionForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    correct_name: '',
    correct_roll: '',
    correct_dept: '',
    correct_room_no: '',
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('Please check the consent box before submitting.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const supabase = createClient();

    const { error: submitError } = await supabase
      .from('info_corrections')
      .insert({
        correct_name: formData.correct_name,
        correct_roll: formData.correct_roll,
        correct_dept: formData.correct_dept,
        correct_room_no: formData.correct_room_no,
      });

    setIsSubmitting(false);

    if (submitError) {
      console.error('Supabase Error:', submitError);
      const errorMessage = submitError.message || JSON.stringify(submitError);
      setError(`Failed to submit correction: ${errorMessage || 'Please try again.'}`);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const [isEnsured, setIsEnsured] = useState(false);

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl text-center max-w-md mx-auto relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-serif text-white mb-4">Correction Submitted!</h2>
        <p className="text-gray-400">
          Thank you for providing the correct information.
        </p>
      </motion.div>
    );
  }

  if (!isEnsured) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel p-8 rounded-3xl text-center max-w-md mx-auto relative overflow-hidden border border-gold/20"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
        <h2 className="text-2xl font-serif text-white mb-4">Are you sure?</h2>
        <p className="text-gray-400 mb-8">
          Please confirm that your information on the provided list is actually incorrect before proceeding with the correction form.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsEnsured(true)}
            className="px-6 py-2 rounded-xl bg-gold text-black font-semibold hover:bg-yellow-400 transition-colors"
          >
            Yes, my info is wrong
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden max-w-2xl mx-auto w-full border border-gold/20"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-yellow-200 to-gold" />
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>

      <h2 className="text-3xl font-serif text-white mb-2">Information Correction</h2>
      <p className="text-gray-400 mb-8">Please provide your correct details below.</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correct Name
            </label>
            <input
              type="text"
              required
              value={formData.correct_name}
              onChange={(e) => setFormData({ ...formData, correct_name: e.target.value })}
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correct Roll
            </label>
            <input
              type="text"
              required
              value={formData.correct_roll}
              onChange={(e) => setFormData({ ...formData, correct_roll: e.target.value })}
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. 1903023"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correct Dept
            </label>
            <input
              type="text"
              required
              value={formData.correct_dept}
              onChange={(e) => setFormData({ ...formData, correct_dept: e.target.value })}
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. CSE"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correct Room No.
            </label>
            <input
              type="text"
              required
              value={formData.correct_room_no}
              onChange={(e) => setFormData({ ...formData, correct_room_no: e.target.value })}
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. 201"
            />
          </div>
        </div>

        <div className="flex items-start gap-3 mt-6">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 bg-black/40 border-gray-700 rounded text-gold focus:ring-gold"
          />
          <label htmlFor="consent" className="text-sm text-gray-400">
            I confirm that all the information provided above is correct. I understand that this information will be used for official purposes.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !consent}
          className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            'Submit Correction'
          )}
        </button>
      </form>
    </motion.div>
  );
}
