// app/page.tsx
import Link from 'next/link';
import ServerStatus from './components/ServerStatus'; // Import the new component

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-20">
      <div className="text-center space-y-4">
        {/* ... (Existing H1 and P tags) ... */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
          WELCOME TO <span className="text-red-600">THE MURDER SCENE</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          The premier Garry's Mod Murder community. Join us for classic gameplay, 
          active staff, and regular events.
        </p>
      </div>

      {/* --- INTEGRATE SERVER STATUS HERE --- */}
      <div className="w-full max-w-lg">
        <ServerStatus />
      </div>
      {/* ------------------------------------- */}

      <div className="flex gap-4">
        <Link 
          href="/rules"
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition-colors"
        >
          Read Rules
        </Link>
        <Link 
          href="https://discord.gg/your-invite-link" // Replace with actual discord link
          target="_blank"
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition-colors"
        >
          Join Discord
        </Link>
      </div>
    </div>
  );
}