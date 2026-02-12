import Link from "next/link";
import { notFound } from "next/navigation";

import { getContestById } from "@/lib/mock-data";
import { formatDateTime, formatDuration, getContestStatus, getStatusBadgeClass } from "@/lib/utils";

type ContestDetailPageProps = {
  params: Promise<{ contestId: string }>;
};

export default async function ContestDetailPage({ params }: ContestDetailPageProps) {
  const { contestId } = await params;
  const contest = getContestById(contestId);

  if (!contest) {
    notFound();
  }

  const status = getContestStatus(contest.startTime, contest.durationMinutes);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-[var(--foreground)]">{contest.title}</h1>
          <span className={`rounded-full px-3 py-1 text-xs ${getStatusBadgeClass(status)}`}>{status}</span>
        </div>

        <div className="mt-4 space-y-1 text-sm text-[var(--muted-foreground)]">
          <p>Start: {formatDateTime(contest.startTime)}</p>
          <p>Duration: {formatDuration(contest.durationMinutes)}</p>
          <p>Timer: Optional in MVP (placeholder)</p>
        </div>

        <Link
          href={`/contests/${contest.id}/problems`}
          className="mt-5 inline-flex rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:brightness-110"
        >
          Open Problems
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Problem list</h2>
        <ul className="mt-4 space-y-3">
          {contest.problems.map((problem, index) => (
            <li key={problem.id} className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm">
              <p className="font-medium text-[var(--foreground)]">
                {index + 1}. {problem.title}
              </p>
              <p className="mt-1 text-[var(--muted-foreground)]">Difficulty: {problem.difficulty}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
