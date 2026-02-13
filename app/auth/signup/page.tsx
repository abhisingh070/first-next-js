"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Unable to create account.");
      setLoading(false);
      return;
    }

    setSuccess("Account created. Redirecting to login...");
    setTimeout(() => router.push("/auth/login"), 900);
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl justify-center px-4 py-14 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold text-foreground">Create your CodeArena account</h1>
        <p className="mt-2 text-sm text-text-secondary">You can start with mock contests and stats immediately.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-text-secondary">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              placeholder="Enter username"
              minLength={3}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-text-secondary">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-text-secondary">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {success ? <p className="text-sm text-green-300">{success}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
