'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { createClient } from '@/lib/supabase';
// import { ArchiveImage } from '@/types';
import { X, Loader2 } from 'lucide-react';

// Mock data for UI demonstration until Supabase is hooked up
const mockImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', title: 'Batch Graduation' },
  { id: '2', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', title: 'Hall Assembly' },
  { id: '3', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', title: 'Campus Tour' },
  { id: '4', url: 'https://images.unsplash.com/photo-1519452314541-e12918e5b42d?w=800&q=80', title: 'Cricket Match' },
  { id: '5', url: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=800&q=80', title: 'Friends' },
  { id: '6', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80', title: 'Night Walk' },
];

export default function ArchivePage() {
  const [images, setImages] = useState(mockImages); // Replace with state of type ArchiveImage[]
  const isLoading = false;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /* 
  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase.from('archive_images').select('*').order('created_at', { ascending: false });
      if (data && !error) setImages(data);
      setIsLoading(false);
    }
    fetchImages();
  }, []);
  */

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">The Archive</h1>
        <p className="text-xl text-gray-300 font-serif italic">Preserving memories of the 2020-2021 batch.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gold w-12 h-12" />
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl border border-gold/10 hover:border-gold/50 transition-colors"
              onClick={() => setSelectedImage(img.url)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.title || 'Archive Image'} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-gold font-serif text-lg">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md">
            <button 
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-[90vh] object-contain rounded border border-gold/20 shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
