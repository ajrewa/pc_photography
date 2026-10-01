"use client";

import Link from "next/link";
import { useState } from "react";
import { adminRequest, ApiRequestError } from "@/lib/services/admin.service";

type Props = {
  /** Shown when a saved passcode stopped working. */
  notice?: string;
  onUnlock: (passcode: string) => void;
};

export default function AdminGate({ notice, onUnlock }: Props) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setChecking(true);
    setError("");
    try {
      await adminRequest(passcode, "/admin/verify", { method: "POST" });
      onUnlock(passcode);
    } catch (err) {
      setError(
        err instanceof ApiRequestError ? err.message : "Could not reach the server. Check that the backend is running."
      );
    } finally {
      setChecking(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-display text-4xl text-ink">Admin</h1>
        <p className="mt-2 text-sm text-stone">Enter the passcode to manage the site&rsquo;s content.</p>

        {notice && <p className="mt-4 text-sm text-ember-dim">{notice}</p>}

        <label htmlFor="passcode" className="mt-8 block text-sm font-medium text-ink">
          Passcode
        </label>
        <input
          id="passcode"
          type="password"
          autoFocus
          autoComplete="off"
          value={passcode}
          onChange={(event) => setPasscode(event.target.value)}
          className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-ink focus-visible:ring-2 focus-visible:ring-ink/20"
        />
        {error && (
          <p role="alert" className="mt-2 text-sm text-ember">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={checking || !passcode}
          className="mt-5 w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ember disabled:opacity-50"
        >
          {checking ? "Checking…" : "Unlock"}
        </button>

        <Link href="/" className="mt-6 inline-block text-sm text-stone underline-offset-4 hover:text-ink hover:underline">
          Back to the site
        </Link>
      </form>
    </main>
  );
}
