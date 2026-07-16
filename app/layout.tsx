import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import { Toaster } from 'sonner';
import Navigation from "@/components/Navigation";
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
        <Navigation />

        <main className="pt-20">
          {children}
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
