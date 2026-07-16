import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "The Final Bell '20",
  description: "Official Farewell Festival for 2020-2021 Batch of Shahid President Ziaur Rahman Hall, RUET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-background text-foreground min-h-screen selection:bg-gold/30 selection:text-gold">
        {/* Navigation Bar will be inserted here */}
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gold/20 px-6 py-4 flex justify-between items-center">
          <div className="font-serif text-xl text-gold font-bold">The Final Bell '20</div>
          <div className="flex gap-6 text-sm tracking-wide">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <a href="/arena" className="hover:text-gold transition-colors">The Arena</a>
            <a href="/feast" className="hover:text-gold transition-colors">The Feast</a>
            <a href="/farewell" className="hover:text-gold transition-colors">The Farewell</a>
            <a href="/last-table" className="hover:text-gold transition-colors">The Last Table</a>
            <a href="/archive" className="hover:text-gold transition-colors">Archive</a>
            <a href="/admin" className="hover:text-gold transition-colors opacity-50">Admin</a>
          </div>
        </nav>

        <main className="pt-20">
          {children}
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
