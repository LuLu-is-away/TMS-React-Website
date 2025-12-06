export default function RulesPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Server Rules</h1>
        <p className="text-zinc-400 mt-2">
          By joining our servers, you agree to follow these rules. Ignorance is not an excuse.
        </p>
      </div>

      <div className="space-y-6">
        <RuleSection title="General Conduct">
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li>No racism, homophobia, or hate speech of any kind.</li>
            <li>Respect all players and staff members.</li>
            <li>Do not spam voice or text chat.</li>
            <li>No advertising other communities or services.</li>
          </ul>
        </RuleSection>

        <RuleSection title="Gameplay Integrity">
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li>No hacking, scripting, or exploiting glitches.</li>
            <li>No "ghosting" (revealing information while dead).</li>
            <li>Do not delay the round unnecessarily (camping).</li>
            <li>Teaming with the murderer is strictly prohibited.</li>
          </ul>
        </RuleSection>
      </div>
    </div>
  );
}

// Helper component for rule sections
function RuleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
      <h2 className="text-xl font-semibold text-red-500 mb-4">{title}</h2>
      {children}
    </div>
  );
}