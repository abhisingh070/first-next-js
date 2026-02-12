"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

type NavbarProps = {
  isAuthenticated?: boolean;
  username?: string;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contests", label: "Contests" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Navbar({ isAuthenticated = false, username }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          CodeArena
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] md:hidden"
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href={`/${username}/dashboard`}
                className="rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                {username}
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--surface-2)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:brightness-110"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {isOpen ? (
        <div className="space-y-1 border-t border-[var(--border)] px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                href={`/${username}/dashboard`}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full rounded-md border border-[var(--border)] px-3 py-2 text-left text-sm text-[var(--foreground)] hover:bg-[var(--surface-2)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="block rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-foreground)]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      ) : null}
    </header>
  );
}
