"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Lock, Trash2 } from "lucide-react";
import AdminGate from "@/components/admin/AdminGate";
import { adminRequest, ApiRequestError } from "@/lib/services/admin.service";
import { PASSCODE_STORAGE_KEY } from "@/lib/adminConfig";

type Booking = {
  bookingId: string;
  startDate: string;
  endDate: string;
  source: "user" | "admin";
  name: string;
  email?: string;
  location?: string;
  createdAt: string;
};

export default function AdminAvailabilityPage() {
  const [passcode, setPasscode] = useState<string | null | "checking">("checking");
  const [notice, setNotice] = useState("");
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  const lock = useCallback((message = "") => {
    window.sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
    setPasscode(null);
    setBookings(null);
    setNotice(message);
  }, []);

  const loadBookings = useCallback(async (code: string) => {
    try {
      const data = await adminRequest<{ bookings: Booking[] }>(code, "/admin/availability");
      setBookings(data.bookings);
      setLoadError("");
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 401) {
        lock("The passcode was rejected. Enter it again.");
        return;
      }
      setLoadError(error instanceof Error ? error.message : "Could not load bookings.");
    }
  }, [lock]);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(PASSCODE_STORAGE_KEY);
    if (!saved) {
      setPasscode(null);
      return;
    }
    adminRequest(saved, "/admin/verify", { method: "POST" })
      .then(() => setPasscode(saved))
      .catch(() => {
        window.sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
        setPasscode(null);
      });
  }, []);

  useEffect(() => {
    if (passcode && passcode !== "checking") void loadBookings(passcode);
  }, [passcode, loadBookings]);

  async function addAdminBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passcode === null || passcode === "checking") return;
    setSaving(true);
    setFormError("");
    try {
      await adminRequest(passcode, "/admin/availability", {
        method: "POST",
        body: { startDate, endDate, name, location },
      });
      setStartDate("");
      setEndDate("");
      setName("");
      setLocation("");
      await loadBookings(passcode);
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 401) {
        lock("The passcode was rejected. Enter it again.");
      } else {
        setFormError(error instanceof Error ? error.message : "Could not mark these dates as booked.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function removeBooking(booking: Booking) {
    if (passcode === null || passcode === "checking") return;
    if (!window.confirm(`Remove the booking for ${booking.startDate} to ${booking.endDate}?`)) return;
    try {
      await adminRequest(passcode, `/admin/availability/${encodeURIComponent(booking.bookingId)}`, {
        method: "DELETE",
      });
      await loadBookings(passcode);
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 401) {
        lock("The passcode was rejected. Enter it again.");
      } else {
        setLoadError(error instanceof Error ? error.message : "Could not remove the booking.");
      }
    }
  }

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

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
          <div>
            <h1 className="font-display text-2xl">Availability admin</h1>
            <p className="text-xs text-stone">Manage user and admin bookings</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-stone transition-colors hover:text-ink">
              <ArrowLeft size={14} /> Content admin
            </Link>
            <button
              type="button"
              onClick={() => lock()}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm transition-colors hover:border-ink"
            >
              <Lock size={14} /> Lock
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-10 lg:grid-cols-[360px_1fr]">
        <form onSubmit={addAdminBooking} className="h-fit rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="font-display text-xl">Book dates as admin</h2>
          <p className="mt-2 text-sm text-stone">Block or reserve a date range. Only admins can remove bookings.</p>
          <label className="mt-6 block text-xs font-medium">
            Start date
            <input required type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="mt-2 w-full rounded-lg border border-black/15 bg-paper px-3 py-3 text-sm" />
          </label>
          <label className="mt-4 block text-xs font-medium">
            End date
            <input required type="date" min={startDate || undefined} value={endDate} onChange={(event) => setEndDate(event.target.value)} className="mt-2 w-full rounded-lg border border-black/15 bg-paper px-3 py-3 text-sm" />
          </label>
          <label className="mt-4 block text-xs font-medium">
            Booking name <span className="font-normal text-stone">(optional)</span>
            <input value={name} onChange={(event) => setName(event.target.value)} maxLength={120} className="mt-2 w-full rounded-lg border border-black/15 bg-paper px-3 py-3 text-sm" />
          </label>
          <label className="mt-4 block text-xs font-medium">
            Location <span className="font-normal text-stone">(optional)</span>
            <input value={location} onChange={(event) => setLocation(event.target.value)} maxLength={160} className="mt-2 w-full rounded-lg border border-black/15 bg-paper px-3 py-3 text-sm" />
          </label>
          {formError && <p role="alert" className="mt-4 text-sm text-ember">{formError}</p>}
          <button disabled={saving || !startDate || !endDate} className="mt-6 w-full rounded-full bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-ember disabled:opacity-50">
            {saving ? "Saving..." : "Mark as booked"}
          </button>
        </form>

        <section>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone">Calendar reservations</p>
              <h2 className="mt-2 font-display text-3xl">Booked dates</h2>
            </div>
            {bookings && <span className="text-sm text-stone">{bookings.length} booking{bookings.length === 1 ? "" : "s"}</span>}
          </div>
          {loadError && <p role="alert" className="mt-5 rounded-xl bg-ember/10 p-4 text-sm text-ember">{loadError}</p>}
          {!bookings && !loadError && <p className="mt-6 text-sm text-stone">Loading bookings...</p>}
          {bookings?.length === 0 && <p className="mt-6 rounded-xl border border-black/10 bg-white p-6 text-sm text-stone">No dates are currently booked.</p>}
          {bookings && bookings.length > 0 && (
            <ul className="mt-5 space-y-3">
              {bookings.map((booking) => (
                <li key={booking.bookingId} className="flex flex-col justify-between gap-4 rounded-xl border border-black/10 bg-white p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{booking.name}</h3>
                      <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] uppercase tracking-wider text-stone">
                        {booking.source === "admin" ? "Admin" : "User"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone">{booking.startDate} – {booking.endDate}</p>
                    {(booking.email || booking.location) && (
                      <p className="mt-1 text-xs text-stone">{[booking.email, booking.location].filter(Boolean).join(" · ")}</p>
                    )}
                  </div>
                  <button type="button" onClick={() => void removeBooking(booking)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-ember/30 px-4 py-2 text-sm text-ember transition-colors hover:bg-ember hover:text-white">
                    <Trash2 size={14} /> Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
