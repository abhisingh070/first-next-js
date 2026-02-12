import { type UserStats } from "@/lib/types";

type DashboardStatsProps = {
  stats: UserStats;
};

const statConfig: Array<{ key: keyof UserStats; label: string; suffix?: string }> = [
  { key: "totalSolved", label: "Total Problems Solved" },
  { key: "totalSubmissions", label: "Total Submissions" },
  { key: "accuracy", label: "Accuracy", suffix: "%" },
  { key: "currentStreak", label: "Current Streak" },
  { key: "contestsParticipated", label: "Contests Participated" },
];

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statConfig.map((item) => {
        const value = stats[item.key];
        return (
          <article key={item.key} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
              {value}
              {item.suffix ?? ""}
            </p>
          </article>
        );
      })}
    </div>
  );
}
