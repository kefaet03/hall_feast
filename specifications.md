# Specifications: The Final Bell '20

## Overview
- **Event Name:** The Final Bell '20
- **Occasion:** 2020-2021 Batch Farewell
- **Hall:** Shahid President Ziaur Rahman Hall
- **University:** Rajshahi University of Engineering and Technology (RUET)
- **Event Date:** July 23, 2026

## Aesthetic & UI/UX
- **Theme:** Dark academia meets royal elegance.
- **Color Palette:** 
  - Deep Midnight Charcoal (`#121212`)
  - Warm Cream (`#FAF9F6`)
  - Metallic Gold accents (`#D4AF37`)
- **Typography:** Elegant serif headers, clean sans-serif body text.
- **Framework & Libraries:** Next.js 14+ (App Router), TypeScript (Strict), Tailwind CSS, Framer Motion (for smooth transitions & card hover effects), Lucide React (icons), Sonner/React Hot Toast.

## Platform Architecture
- **Frontend:** Next.js (hosted on Vercel)
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage)
- **Forms & Validation:** React Hook Form + Zod

## Core Chapters (Pages)
### 1. Landing Page (`/`)
- **Hero Section:** Event title, subtitle, and date with elegant typography.
- **Chapter Grid:** Interactive Framer Motion cards linking to the four chapters.
- **Navigation:** Fixed top nav containing links to Home, Chapters, About, Archive, and Admin Login.

### 2. Chapter I: The Arena (`/arena`)
- **Concept:** Sports registration.
- **Features:** 
  - Grid of 8 sports cards: Football, eFootball, Cricket, Table Tennis, Carrom, 29 Cards, Chess, Seerah Quiz.
  - Interactive Framer Motion modal registration form upon clicking a card.
- **Dynamic Registration Logic:**
  - *Individual Games* (eFootball, Table Tennis, Chess, Seerah Quiz): Name, Roll Number, Room Number.
  - *Duo/Small Team Games* (Carrom, 29 Cards): Team Name, Captain details (Name, Roll, Room), and dynamic fields for the remaining partners (1 or 3).
  - *Major Team Games* (Football, Cricket): Team Name, Captain details, and exactly 11 additional squad member fields.
- **Database:** Supabase insertions with JSONB for team members. Success toast + WhatsApp group link on completion.

### 3. Chapter II & IV: The Feast (`/feast`) & The Last Table (`/last-table`)
- **Concept:** Meal menus.
- **Features:**
  - High-resolution framed poster containers (using `next/image`).
  - Elegant restaurant-style typography for the multi-course menus (Appetizers, Main Course, Beverages, Desserts).
  - Subtle metallic gold dividers.

### 4. Chapter III: The Farewell (`/farewell`)
- **Concept:** Ceremony timeline and details.
- **Features:**
  - Venue: Shahid President Ziaur Rahman Hall Auditorium
  - Time: Evening schedule (e.g., 5:00 PM - 9:00 PM)
  - Cards for Honored Guests (Chief Guests, Hall Provost, Special Alumni).

### 5. The Archive (`/archive`)
- **Concept:** Public photo gallery.
- **Features:** Responsive masonry or CSS grid gallery fetching from Supabase `archive_images` and `archive-photos` bucket. Lightbox effect included.

### 6. Admin Panel (`/admin`)
- **Concept:** Management dashboard.
- **Features:** 
  - Supabase Email/Password authentication protected route.
  - *Sports Registrations Viewer:* Data table with tabs for the 8 sports, export options.
  - *Archive Uploader:* Drag-and-drop file upload to Supabase storage with live gallery updates.

---

## What To Do Now
1. Define TypeScript Interfaces (`types/index.ts`) for all database tables and form inputs.
2. Initialize Supabase client helpers (`lib/supabase.ts`) using `@supabase/supabase-js`.
3. Create the complex dynamic Zod schema and form component for **Chapter I: The Arena**.
4. Since Node.js is not currently installed on the host machine, write the core architecture files into the project directory so they are ready when Node is installed.

## What's Next
1. **Action Required by User:** Please install Node.js (v18 or higher) on this machine so we can run `npx create-next-app` and install dependencies.
2. Once Node is installed, initialize the Next.js project and install necessary packages (Tailwind, Framer Motion, Zod, React Hook Form, Supabase SSR, Lucide, Sonner).
3. Build the UI components (`components/ui` and `components/forms`).
4. Build the page structures and routing.
5. Setup Supabase tables and Row Level Security (RLS) policies.
