// app/api/server-status/route.ts
import { NextResponse } from 'next/server';
const { query } = require('gamedig');

// IMPORTANT: Replace these with your actual server details
const SERVER_HOST = '131.153.222.106'; // Your server's IP address or domain
const SERVER_PORT = 27065;        // Your server's query port (usually 27015 or 27016)

export async function GET() {
  try {
    const state = await query({
      type: 'garrysmod', // Specifies the game engine/type
      host: SERVER_HOST,
      port: SERVER_PORT,
    });
    console.log(state);
    // Return only the essential, clean data
    return NextResponse.json({
      status: state.password ? 'Private' : 'Online',
      map: state.map,
      players: state.players.length,
      maxPlayers: state.maxplayers,
      name: state.name,
    }, { status: 200 });

  } catch (error) {
    // If the server is offline or unreachable
    console.error('Gamedig query failed:', error);
    return NextResponse.json({
      status: 'Offline',
      map: 'N/A',
      players: 0,
      maxPlayers: 0,
      name: 'Server Unreachable',
    }, { status: 200 });
  }
}