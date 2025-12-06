// lib/steam.ts
import SteamID from 'steamid';

const STEAM_API_KEY = process.env.STEAM_API_KEY;

export async function getSteamAvatar(steamId: string): Promise<string> {
  // 1. Convert GMod format (STEAM_0:X:Y) to 64-bit format
  let steam64 = '';
  try {
    const sid = new SteamID(steamId);
    steam64 = sid.getSteamID64();
  } catch (e) {
    console.error(`Invalid SteamID: ${steamId}`);
    return '/default_avatar.png'; // Fallback image
  }

  // 2. Fetch profile from Steam API
  try {
    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steam64}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    const data = await response.json();
    const player = data.response.players[0];
    
    return player ? player.avatarfull : '/default_avatar.png';
  } catch (error) {
    console.error('Steam API Error:', error);
    return '/default_avatar.png';
  }
}