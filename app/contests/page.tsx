import ContestCard from "@/components/contests/ContestCard";
import { contests } from "@/lib/mock-data";

export default function ContestsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-[var(--foreground)]">Contests</h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">Upcoming, live, and completed events.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {contests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    </section>
  );
}
