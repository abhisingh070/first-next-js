const features = [
  {
    title: "Curated DSA Problems",
    description: "Practice progressive sets built around arrays, graphs, trees, and dynamic programming.",
  },
  {
    title: "Weekly + Biweekly Contests",
    description: "Compete with structured timing and ranked scoring to simulate real interview pressure.",
  },
  {
    title: "Progress Tracking",
    description: "Track solved counts, streaks, and submission accuracy from a single dashboard.",
  },
  {
    title: "Global Leaderboard",
    description: "See where you stand across weekly, monthly, and all-time ratings.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Everything you need to level up</h2>
        <p className="mt-2 text-sm text-text-secondary">A focused workflow from practice to competition.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-medium text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
