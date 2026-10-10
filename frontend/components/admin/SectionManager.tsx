"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { adminRequest, ApiRequestError } from "@/lib/services/admin.service";
import type { AdminItem, SectionConfig } from "@/lib/types";
import ItemForm from "./ItemForm";

type Props = {
  section: SectionConfig;
  items: AdminItem[];
  categories: string[];
  passcode: string;
  onChanged: (message: string) => void;
  onError: (message: string) => void;
  onUnauthorized: () => void;
};

export default function SectionManager({ section, items, categories, passcode, onChanged, onError, onUnauthorized }: Props) {
  const [form, setForm] = useState<{ item?: AdminItem } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  async function remove(item: AdminItem) {
    const name = section.title(item) || section.singular;
    if (!window.confirm(`Delete “${name}”? Its uploaded files are removed too. This can't be undone.`)) return;

    setDeletingId(String(item._id));
    try {
      await adminRequest(passcode, `/admin/${section.key}/${item._id}`, { method: "DELETE" });
      onChanged(`Deleted “${name}”.`);
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) return onUnauthorized();
      onError(err instanceof Error ? err.message : "Could not delete. Try again.");
    } finally {
      setDeletingId(null);
    }
  }

  async function removeAllReviews() {
    if (!window.confirm("Delete every review? Their uploaded files are removed too. This can't be undone.")) return;

    setDeletingAll(true);
    try {
      const result = await adminRequest<{ deleted: number }>(passcode, "/admin/gratitude", { method: "DELETE" });
      onChanged(`Deleted ${result.deleted} review${result.deleted === 1 ? "" : "s"}.`);
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) return onUnauthorized();
      onError(err instanceof Error ? err.message : "Could not delete reviews. Try again.");
    } finally {
      setDeletingAll(false);
    }
  }

  return (
    <section aria-labelledby="section-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="section-title" className="font-display text-3xl text-ink">
            {section.tab}
          </h2>
          <p className="mt-1 text-sm text-stone">{section.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {section.key === "gratitude" && items.length > 0 && (
            <button
              type="button"
              disabled={deletingAll}
              onClick={() => void removeAllReviews()}
              className="inline-flex items-center gap-2 rounded-full border border-ember/40 px-5 py-2.5 text-sm font-medium text-ember-dim transition-colors hover:bg-ember hover:text-paper disabled:opacity-50"
            >
              <Trash2 size={16} />
              {deletingAll ? "Deleting…" : "Delete all reviews"}
            </button>
          )}
          <button
            type="button"
            onClick={() => setForm({})}
            className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ember-dim"
          >
            <Plus size={16} strokeWidth={2.25} />
            Add {section.singular}
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-black/20 px-6 py-14 text-center">
          <p className="font-display text-xl text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm text-stone">Add a {section.singular} and it will appear on the site straight away.</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const thumb = section.thumb(item);
            const [first, ...rest] = section.lines(item).filter(Boolean);
            return (
              <li key={item.id} className="flex overflow-hidden rounded-2xl border border-black/10 bg-white">
                <div className="h-auto w-28 shrink-0 bg-paper-dim">
                  {thumb && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <p className="truncate font-display text-lg leading-tight text-ink">{section.title(item)}</p>
                  {first && <p className="mt-1 truncate text-sm text-stone">{first}</p>}
                  {rest.map((line) => (
                    <p key={line} className="truncate text-xs text-stone">
                      {line}
                    </p>
                  ))}
                  <div className="mt-auto flex gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setForm({ item })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1.5 text-xs text-ink transition-colors hover:border-ink"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === item._id}
                      onClick={() => void remove(item)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1.5 text-xs text-ember-dim transition-colors hover:border-ember hover:bg-ember hover:text-paper disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                      {deletingId === item._id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {form && (
        <ItemForm
          key={`${section.key}-${form.item?.id ?? "new"}`}
          section={section}
          item={form.item}
          categories={categories}
          passcode={passcode}
          onCancel={() => setForm(null)}
          onSaved={(message) => {
            setForm(null);
            onChanged(message);
          }}
          onUnauthorized={onUnauthorized}
        />
      )}
    </section>
  );
}
