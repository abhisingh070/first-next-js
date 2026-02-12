import {
  type ContestProblem,
  type ContestStatus,
  type LeaderboardRow,
  type ProblemAttemptStatus,
} from "@/lib/types";

export function getContestStatus(
  startTime: string,
  durationMinutes: number,
  now: Date = new Date(),
): ContestStatus {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  if (now < start) return "UPCOMING";
  if (now >= start && now <= end) return "LIVE";
  return "ENDED";
}

export function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
}

export function formatDateTime(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(isoDate));
}

export function getNextProblemToSolve(
  problems: ContestProblem[],
  problemStatuses: Record<string, ProblemAttemptStatus>,
) {
  return (
    problems.find((problem) => problemStatuses[problem.id] !== "SOLVED") ?? null
  );
}

export function statusLabel(status: ProblemAttemptStatus) {
  if (status === "SOLVED") return "Solved";
  if (status === "UNSOLVED") return "Unsolved";
  return "Not attempted";
}

export function sortLeaderboardRows(rows: LeaderboardRow[]) {
  return [...rows].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    if (b.problemsSolved !== a.problemsSolved) {
      return b.problemsSolved - a.problemsSolved;
    }
    return a.username.localeCompare(b.username);
  });
}

export function getStatusBadgeClass(status: ContestStatus) {
  if (status === "LIVE") return "bg-green-500/20 text-green-300 border border-green-500/40";
  if (status === "UPCOMING") return "bg-blue-500/20 text-blue-300 border border-blue-500/40";
  return "bg-zinc-500/20 text-zinc-300 border border-zinc-500/40";
}
