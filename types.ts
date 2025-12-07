// types.ts
export interface StaffTransfer {
  steamid: string;
  profile: string; // URL to avatar
  name: string;    // Fetched Steam name
  rank: string;    // Hardcoded rank
}

// Interface for the minimal list we will manually define
export interface HardcodedStaff {
  steamid: string;
  rank: string;
}