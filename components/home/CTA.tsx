import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-10">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Join now and start your coding journey</h2>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">
          Build consistency with daily problem-solving and timed contest participation.
        </p>
        <Link
          href="/auth/signup"
          className="mt-6 inline-flex rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-foreground)] hover:brightness-110"
        >
          Create Your Account
        </Link>
      </div>
    </section>
  );
}
