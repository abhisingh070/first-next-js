export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} CodeArena. All rights reserved.</p>
        <p>Master DSA. Compete weekly. Climb the leaderboard.</p>
      </div>
    </footer>
  );
}
