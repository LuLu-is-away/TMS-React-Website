// types.ts
export interface StaffTransfer {
  steamid: string;
  profile: string; // URL to avatar
  name: string;
  rank: string;
}

export interface ApiData {
  staff: StaffTransfer[];
}