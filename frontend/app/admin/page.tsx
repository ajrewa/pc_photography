"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import AdminGate from "@/components/admin/AdminGate";
import SectionManager from "@/components/admin/SectionManager";
import { adminRequest } from "@/lib/services/admin.service";
import { getSiteContent } from "@/lib/services/content.service";
import { PASSCODE_STORAGE_KEY, SECTIONS } from "@/lib/adminConfig";
import { ContentSection } from "@/lib/enums";
import type { AdminItem, SectionKey, SiteContent } from "@/lib/types";

type Toast = { text: string; tone: "ok" | "error" };

export default function AdminPage() {
  // "checking" while we look for a saved passcode, so the gate doesn't flash.
  const [passcode, setPasscode] = useState<string | null | "checking">("checking");
  const [notice, setNotice] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [active, setActive] = useState<SectionKey>(ContentSection.Hero);
  const [toast, setToast] = useState<Toast | null>(null);
  const [loadError, setLoadError] = useState("");

  const lock = useCallback((message = "") => {
    window.sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
    setPasscode(null);
    setContent(null);
    setNotice(message);
  }, []);

  const load = useCallback(async () => {
    try {
      setContent(await getSiteContent());
      setLoadError("");
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not load the content.");
    }
  }, []);

  // Reuse a passcode saved earlier in this browser tab, if it still works.
  useEffect(() => {
    const saved = window.sessionStorage.getItem(PASSCODE_STORAGE_KEY);
    if (!saved) return setPasscode(null);
    adminRequest(saved, "/admin/verify", { method: "POST" })
      .then(() => setPasscode(saved))
      .catch(() => {
        window.sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
        setPasscode(null);
      });
  }, []);

  useEffect(() => {
    if (passcode && passcode !== "checking") void load();
  }, [passcode, load]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (passcode === "checking") return <main className="min-h-screen bg-paper" />;

  if (passcode === null) {
    return (
      <AdminGate
        notice={notice}
        onUnlock={(value) => {
          window.sessionStorage.setItem(PASSCODE_STORAGE_KEY, value);
          setNotice("");
          setPasscode(value);
        }}
      />
    );
  }

  const section = SECTIONS.find((s) => s.key === active)!;
  const items = (content?.[active] ?? []) as unknown as AdminItem[];
  const categories = Array.from(
    new Set([...(content?.films ?? []), ...(content?.hero ?? [])].map((film) => film.category).filter(Boolean))
  );

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
          <div>
            <h1 className="font-display text-2xl">Content admin</h1>
            <p className="text-xs text-stone">PC Photography</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-full px-4 py-2 text-sm text-stone transition-colors hover:text-ink">
              View site
            </Link>
            <button
              type="button"
              onClick={() => lock()}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm transition-colors hover:border-ink"
            >
              <Lock size={14} />
              Lock
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-10">
        <nav aria-label="Content sections" className="flex gap-2 overflow-x-auto pb-1">
          {SECTIONS.map((s) => {
            const count = content?.[s.key]?.length;
            const selected = s.key === active;
            return (
              <button
                key={s.key}
                type="button"
                aria-current={selected ? "page" : undefined}
                onClick={() => setActive(s.key)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  selected ? "border-ink bg-ink text-paper" : "border-black/15 bg-white text-stone hover:border-ink hover:text-ink"
                }`}
              >
                {s.tab}
                {count !== undefined && <span className={`ml-2 ${selected ? "text-paper/60" : "text-stone-light"}`}>{count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="mt-8">
          {loadError ? (
            <div className="rounded-2xl border border-ember/30 bg-ember/10 px-6 py-6 text-sm text-ember-dim">
              <p>{loadError}</p>
              <p className="mt-1">Check that the backend is running and NEXT_PUBLIC_BACKEND_URL points to it.</p>
              <button type="button" onClick={() => void load()} className="mt-3 underline underline-offset-4">
                Try again
              </button>
            </div>
          ) : !content ? (
            <p className="text-sm text-stone">Loading…</p>
          ) : (
            <SectionManager
              section={section}
              items={items}
              categories={categories}
              passcode={passcode}
              onChanged={(text) => {
                setToast({ text, tone: "ok" });
                void load();
              }}
              onError={(text) => setToast({ text, tone: "error" })}
              onUnauthorized={() => lock("The passcode was rejected. Enter it again.")}
            />
          )}
        </div>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
        {toast && (
          <p
            className={`pointer-events-auto rounded-full px-5 py-3 text-sm shadow-lg ${
              toast.tone === "ok" ? "bg-ink text-paper" : "bg-ember text-paper"
            }`}
          >
            {toast.text}
          </p>
        )}
      </div>
    </main>
  );
}
