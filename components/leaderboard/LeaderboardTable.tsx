import { type LeaderboardFilter, type LeaderboardRow } from "@/lib/types";
import { sortLeaderboardRows } from "@/lib/utils";

type LeaderboardTableProps = {
  rows: LeaderboardRow[];
  filter: LeaderboardFilter;
};

export default function LeaderboardTable({ rows, filter }: LeaderboardTableProps) {
  const sortedRows = sortLeaderboardRows(rows);

  return (
    <section className="rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">{filter.replace("_", " ")} leaderboard</h2>
        <span className="text-xs uppercase text-text-secondary">Stable ranking</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text-secondary">
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">Username</th>
              <th className="px-3 py-2">Rating / Points</th>
              <th className="px-3 py-2">Problems Solved</th>
              <th className="px-3 py-2">Contests Participated</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <tr key={row.username} className="border-b border-border/70 text-foreground">
                <td className="px-3 py-3">{index + 1}</td>
                <td className="px-3 py-3">{row.username}</td>
                <td className="px-3 py-3">{row.rating}</td>
                <td className="px-3 py-3">{row.problemsSolved}</td>
                <td className="px-3 py-3">{row.contestsParticipated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
