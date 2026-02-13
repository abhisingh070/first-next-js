import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
      <div className="rounded-2xl border border-border bg-[radial-gradient(circle_at_top,_rgba(32,197,142,0.18),_transparent_58%),var(--color-bg-secondary)] p-8 sm:p-12">
        <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-text-secondary">
          CodeArena MVP
        </span>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Master DSA & Competitive Programming
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">
          Solve curated questions, join timed contests, and benchmark your progress against global competitors.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/auth/signup"
            className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground hover:brightness-110"
          >
            Start Solving
          </Link>
          <Link
            href="/contests"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-surface-2"
          >
            View Contests
          </Link>
        </div>
      </div>
    </section>
  );
}
