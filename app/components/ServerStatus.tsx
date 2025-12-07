'use client';

import { useState, useEffect } from 'react';
// If you haven't installed lucide-react, run: npm install lucide-react
import { RefreshCw, Server, Map as MapIcon, Users } from 'lucide-react'; 

interface ServerState {
  status: string;
  map: string;
  players: number;
  maxPlayers: number;
  name: string;
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerState | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/server-status');
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      setStatus({ status: 'Offline', map: 'N/A', players: 0, maxPlayers: 0, name: 'Unreachable' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const timer = setInterval(fetchStatus, 60000); // Auto-refresh every 60s
    return () => clearInterval(timer);
  }, []);

  const isOnline = status?.status === 'Online';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl max-w-md w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="text-zinc-400" size={20} />
            Server Status
          </h2>
          <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isOnline ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
          }`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
            {status?.status || 'Checking...'}
          </div>
        </div>
        <button 
          onClick={fetchStatus} 
          disabled={loading}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {status && (
        <div className="space-y-4">
          <div className="bg-zinc-950/50 rounded-lg p-3 border border-zinc-800/50">
             <p className="text-sm text-zinc-400 mb-1">Hostname</p>
             <p className="font-medium text-white truncate">{status.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950/50 rounded-lg p-3 border border-zinc-800/50">
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <MapIcon size={14} />
                <span className="text-xs uppercase tracking-wider">Map</span>
              </div>
              <p className="font-medium text-white">{status.map}</p>
            </div>

            <div className="bg-zinc-950/50 rounded-lg p-3 border border-zinc-800/50">
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <Users size={14} />
                <span className="text-xs uppercase tracking-wider">Players</span>
              </div>
              <p className="font-medium text-white">{status.players} <span className="text-zinc-600">/</span> {status.maxPlayers}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}