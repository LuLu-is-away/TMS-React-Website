// lib/steam.ts
import SteamID from 'steamid';

const STEAM_API_KEY = process.env.STEAM_API_KEY;

// Define the required fields from the Steam API response
interface SteamProfile {
  steamid: string;
  personaname: string; // The user's current Steam name
  avatarfull: string;  // The URL to the user's full-sized avatar
}

/**
 * Converts GMod SteamID to Steam64 and fetches the profile summary.
 * @param steamId GMod format STEAM_0:X:Y
 * @returns SteamProfile object or a fallback object
 */
export async function getSteamProfileSummary(steamId: string): Promise<SteamProfile> {
  let steam64 = '';
  const FALLBACK_PROFILE = { 
    steamid: '0', 
    personaname: 'Unknown User', 
    avatarfull: '/default_avatar.png' 
  };

  try {
    const sid = new SteamID(steamId);
    steam64 = sid.getSteamID64();
  } catch (e) {
    console.error(`Invalid SteamID: ${steamId}`);
    return FALLBACK_PROFILE;
  }

  try {
    // Fetch profile from Steam API
    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steam64}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) throw new Error(`Steam API returned status ${response.status}`);
    
    const data = await response.json();
    const player = data.response.players[0];

    return player || FALLBACK_PROFILE;
    
  } catch (error) {
    console.error('Steam API Error:', error);
    return FALLBACK_PROFILE;
  }
}
