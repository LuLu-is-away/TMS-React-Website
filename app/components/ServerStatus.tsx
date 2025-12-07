'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react'; // Example using lucide-react icons

interface ServerState {
  status: 'Online' | 'Offline' | 'Private';
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
      const response = await fetch('/api/server-status', { 
        cache: 'no-store' // Always fetch fresh data
      });
      const data: ServerState = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch server status:', error);
      setStatus({ status: 'Offline', map: 'N/A', players: 0, maxPlayers: 0, name: 'Error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Optional: Auto-refresh every 30 seconds
    const intervalId = setInterval(fetchStatus, 30000); 
    return () => clearInterval(intervalId);
  }, []);

  const statusColor = status?.status === 'Online' ? 'bg-green-600' : 'bg-red-600';
  const statusText = status?.status || 'Loading...';

  return (
    <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 shadow-xl space-y-3">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <span className={`h-3 w-3 rounded-full ${statusColor}`}></span>
          <h3 className="font-semibold text-lg text-white">Server Status: {statusText}</h3>
        </div>
        <button 
          onClick={fetchStatus} 
          disabled={loading} 
          className={`text-zinc-500 hover:text-white transition-colors p-1 rounded ${loading ? 'animate-spin' : ''}`}
          title="Refresh Status"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {loading ? (
        <p className="text-zinc-500">Querying server...</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <StatusItem label="Current Map" value={status?.map || 'N/A'} />
          <StatusItem 
            label="Players Online" 
            value={`${status?.players} / ${status?.maxPlayers}`} 
          />
          <StatusItem label="Server Name" value={status?.name || 'N/A'} spanFull={true} />
        </div>
      )}
    </div>
  );
}

// Helper component for styled status items
function StatusItem({ label, value, spanFull = false }: { label: string, value: string | number, spanFull?: boolean }) {
  return (
    <div className={`${spanFull ? 'col-span-2' : ''}`}>
      <p className="text-zinc-500">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
}