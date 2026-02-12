import Link from "next/link";

import { type ContestListItem } from "@/lib/types";
import { formatDateTime, formatDuration, getContestStatus, getStatusBadgeClass } from "@/lib/utils";

type ContestCardProps = {
  contest: ContestListItem;
};

export default function ContestCard({ contest }: ContestCardProps) {
  const status = getContestStatus(contest.startTime, contest.durationMinutes);

  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{contest.title}</h3>
        <span className={`rounded-full px-3 py-1 text-xs ${getStatusBadgeClass(status)}`}>{status}</span>
      </div>
      <p className="mt-3 text-sm text-[var(--muted-foreground)]">Start: {formatDateTime(contest.startTime)}</p>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">Duration: {formatDuration(contest.durationMinutes)}</p>
      <Link
        href={`/contests/${contest.id}`}
        className="mt-4 inline-flex rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-2)]"
      >
        View Contest
      </Link>
    </article>
  );
}
