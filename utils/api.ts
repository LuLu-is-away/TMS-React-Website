// utils/api.ts
import { getSteamProfileSummary } from '../lib/steam';
import { StaffTransfer, HardcodedStaff } from '../types';

// 1. HARDCODED STAFF LIST (Replace with your staff's real SteamIDs and ranks)
const staffRoster: HardcodedStaff[] = [
    { steamid: 'STEAM_0:1:155590429', rank: 'Owner' }, // Example STEAM_ID
    { steamid: 'STEAM_0:0:63546227', rank: 'Owner' },
    { steamid: 'STEAM_0:1:149928982', rank: 'Owner' },
    { steamid: 'STEAM_0:1:428207401', rank: 'Head Admin' },
    { steamid: 'STEAM_0:0:76649992', rank: 'Admin' },
    { steamid: 'STEAM_0:0:154590953', rank: 'Admin' },
    { steamid: 'STEAM_0:1:179274330', rank: 'Discord Moderator' },
    { steamid: 'STEAM_0:1:91747760', rank: 'Game Moderator' },
    { steamid: 'STEAM_0:1:449827198', rank: 'Game Moderator' },
    { steamid: 'STEAM_0:0:635848535', rank: 'Game Moderator' },
    { steamid: 'STEAM_0:1:558424760', rank: 'Game Moderator' },
    { steamid: 'STEAM_0:0:173878345', rank: 'Game Moderator' },
    { steamid: 'STEAM_0:0:142431488', rank: 'Game Moderator' },
    // Add all your staff members here
];

export async function getStaffData(): Promise<StaffTransfer[]> {
  try {
    // 1. Convert the hardcoded list into a list of promises to fetch profile data in parallel
    const staffPromises = staffRoster.map(async (member) => {
      // Fetch the full profile summary (name and avatar URL)
      const profile = await getSteamProfileSummary(member.steamid);

      // 2. Map the data to the final StaffTransfer structure
      return {
        steamid: member.steamid,
        name: profile.personaname, // The Steam name
        profile: profile.avatarfull, // The full avatar URL
        rank: member.rank, // The hardcoded rank
      };
    });

    // Resolve all promises
    const staffWithDetails = await Promise.all(staffPromises);
    
    // Filter out any members where the Steam API failed (profile would be null/undefined)
    return staffWithDetails.filter(member => member.name && member.profile) as StaffTransfer[];

  } catch (error) {
    console.error('Failed to load staff details:', error);
    return [];
  }
}