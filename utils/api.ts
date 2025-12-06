// utils/api.ts
import { pool } from '../lib/db';
import { getSteamAvatar } from '../lib/steam';
import { StaffTransfer } from '../types';

// Define what the raw DB row looks like (SAM structure)
interface DatabaseRow {
  steamid: string;
  name: string;
  rank: string;
}

export async function getStaffData(): Promise<StaffTransfer[]> {
  try {
    // 1. Fetch staff from the database
    const [rows] = await pool.query<any[]>(
      `SELECT steamid, name, rank FROM sam_players WHERE rank != 'user' AND rank != 'guest'`
    );

    const dbRows = rows as DatabaseRow[];

    // 2. Enhance the data with Steam Avatars (Run in parallel for speed)
    const staffWithAvatars = await Promise.all(
      dbRows.map(async (member) => {
        const avatarUrl = await getSteamAvatar(member.steamid);
        
        return {
          steamid: member.steamid,
          name: member.name,
          rank: member.rank, // You might want to capitalize this: member.rank.toUpperCase()
          profile: avatarUrl,
        };
      })
    );

    return staffWithAvatars;

  } catch (error) {
    console.error('Failed to load staff:', error);
    return [];
  }
}