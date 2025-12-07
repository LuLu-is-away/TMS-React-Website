// app/api/server-status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.STEAM_API_KEY;
  const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP;

  if (!API_KEY || !SERVER_IP) {
    return NextResponse.json({ status: 'Offline', name: 'Config Error' });
  }

  try {
    // 2. Build URL and Log it (Hide key for security in logs)
    const filter = `\\addr\\${SERVER_IP}`;
    const steamUrl = `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${API_KEY}&filter=${filter}`;
    
    const response = await fetch(steamUrl, { next: { revalidate: 10 } });
    const data = await response.json();

    const serverList = data.response?.servers;

    if (!serverList || serverList.length === 0) {
      return NextResponse.json({ status: 'Offline', name: 'Server Not Found', players: 0, maxPlayers: 0 });
    }

    const server = serverList[0];

    return NextResponse.json({
      status: 'Online',
      name: server.name,
      map: server.map,
      players: server.players,
      maxPlayers: server.max_players,
    });

  } catch (error) {
    return NextResponse.json({ status: 'Offline', name: 'Error' });
  }
}