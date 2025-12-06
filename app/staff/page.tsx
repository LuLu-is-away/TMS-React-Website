// app/staff/page.tsx
import Image from 'next/image';
import { getStaffData } from '../../utils/api';

export default async function StaffPage() {
  const staff = await getStaffData();

  if (!staff || staff.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">System Error</h2>
        <p className="text-zinc-400">Unable to connect to the Staff Database.</p>
        <p className="text-sm text-zinc-600 mt-2">
          (Check your .env.local file and make sure the table 'sam_players' exists)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Staff Team</h1>
        <p className="text-zinc-400 mt-2">Meet the team behind The Murder Scene.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-800">
              <th className="py-4 px-4 font-medium">Avatar</th>
              <th className="py-4 px-4 font-medium">Name</th>
              <th className="py-4 px-4 font-medium">Rank</th>
              <th className="py-4 px-4 font-medium">SteamID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {staff.map((member) => (
              <tr key={member.steamid} className="group hover:bg-zinc-900/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="relative h-10 w-10">
                    <Image
                      src={member.profile}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border border-zinc-700 group-hover:border-red-500 transition-colors"
                    />
                  </div>
                </td>
                <td className="py-3 px-4 text-white font-medium">{member.name}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-zinc-800 text-zinc-300 uppercase tracking-wide">
                    {member.rank}
                  </span>
                </td>
                <td className="py-3 px-4 text-zinc-500 font-mono text-xs">{member.steamid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}