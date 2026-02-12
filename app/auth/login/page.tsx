"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("Invalid credentials. Try demo: sourav / password123");
      setLoading(false);
      return;
    }

    window.location.href = result?.url ?? "/";
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl justify-center px-4 py-14 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Login to CodeArena</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">Use your username or email and password.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted-foreground)]">Username or email</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
              placeholder="sourav or sourav@codearena.dev"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-[var(--muted-foreground)]">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
              placeholder="password123"
              required
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          New here?{" "}
          <Link href="/auth/signup" className="text-[var(--accent)] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
