export type Sport =
  | 'Football'
  | 'eFootball'
  | 'Cricket'
  | 'Table Tennis (Individual)'
  | 'Table Tennis (Duo)'
  | 'Carrom'
  | '29 Cards'
  | 'Chess'
  | 'Seerah Quiz';

export type GameCategory = 'Individual' | 'Duo/Small Team' | 'Major Team';

export interface PlayerDetails {
  name: string;
  roll: string;
  room: string;
}

export interface RegistrationBase {
  id: string;
  created_at: string;
  sport: Sport;
  team_name?: string; // Optional for individual games
  captain_details: PlayerDetails;
  team_members?: PlayerDetails[]; // JSONB in Supabase
  whatsapp_number: string;
}

export interface ArchiveImage {
  id: string;
  created_at: string;
  url: string;
  title?: string;
  uploaded_by?: string;
}

// Form Types (Zod inferred types will be used, but good to have base interfaces)
export interface ArenaRegistrationFormData {
  sport: Sport;
  teamName?: string;
  captain: PlayerDetails;
  members?: PlayerDetails[];
  whatsappNumber: string;
}
