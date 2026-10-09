"use client";

import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "@/lib/api";

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(date: Date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-");
}

function parseDate(value: string) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function isDateInRange(
    date: Date,
    start: string | null,
    end: string | null
) {
    if (!start) return false;

    const value = formatDate(date);

    if (!end) {
        return value === start;
    }

    return value >= start && value <= end;
}

function calculateDays(start: string, end: string) {
    if (!start || !end) return 0;

    const startDate = parseDate(start);
    const endDate = parseDate(end);

    const difference =  endDate.getTime() - startDate.getTime();

    return Math.floor(
        difference / (1000 * 60 * 60 * 24)
    ) + 1;
}

export default function AvailabilityPage() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [selectedStart, setSelectedStart] = useState<string | null>(null);
    const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [guestName, setGuestName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [bookedDates, setBookedDates] = useState<string[]>([]);
    const [availabilityLoaded, setAvailabilityLoaded] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    useEffect(() => {
        let active = true;
        fetch(`${API_URL}/api/availability`, { cache: "no-store" })
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Could not load availability.");
                return data as { bookedDates?: string[] };
            })
            .then((data) => {
                if (active) {
                    if (!Array.isArray(data.bookedDates)) {
                        throw new Error("The availability service returned an invalid response.");
                    }
                    setBookedDates(data.bookedDates);
                    setAvailabilityLoaded(true);
                    setLoadError("");
                }
            })
            .catch((error: unknown) => {
                if (active) setLoadError(error instanceof Error ? error.message : "Could not load availability.");
            });
        return () => {
            active = false;
        };
    }, []);

    function isDateBooked(date: Date) {
        return bookedDates.includes(formatDate(date));
    }

    function selectionHasBookedDates(start: string | null, end: string | null) {
        if (!start || !end) return false;
        const first = parseDate(start);
        const last = parseDate(end);
        for (const date = new Date(first); date <= last; date.setDate(date.getDate() + 1)) {
            if (isDateBooked(date)) return true;
        }
        return false;
    }

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();

    const calendarDays = useMemo(() => {
        const days: (Date | null)[] = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    }, [year, month, firstDay, daysInMonth]);

    function previousMonth() {
        setCurrentMonth(
            new Date(year, month - 1, 1)
        );
    }

    function nextMonth() {
        setCurrentMonth(
            new Date(year, month + 1, 1)
        );
    }

    function handleDateClick(date: Date) {
        if (!availabilityLoaded || loadError || isDateBooked(date) || formatDate(date) < formatDate(new Date())) return;
        const value = formatDate(date);
        if (!selectedStart || selectedEnd) {
            setSelectedStart(value);
            setSelectedEnd(null);
            setShowModal(true);
            return;
        }

        if (value < selectedStart) {
            setSelectedEnd(selectedStart);
            setSelectedStart(value);
        } else {
            setSelectedEnd(value);
        }
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setSelectedStart(null);
        setSelectedEnd(null);
        setSubmitError("");
    }

    async function submitBooking() {
        if (!selectedStart || !selectedEnd || selectionHasBookedDates(selectedStart, selectedEnd)) {
            setSubmitError("One or more selected dates are no longer available. Please choose another date range.");
            return;
        }
        setSubmitting(true);
        setSubmitError("");
        try {
            const response = await fetch(`${API_URL}/api/availability`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    startDate: selectedStart,
                    endDate: selectedEnd,
                    name: guestName,
                    email,
                    location,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Could not book these dates.");
            const dates = bookedDates.slice();
            const cursor = parseDate(selectedStart);
            const last = parseDate(selectedEnd);
            for (; cursor <= last; cursor.setDate(cursor.getDate() + 1)) dates.push(formatDate(cursor));
            setBookedDates(dates);
            setConfirmation(data.message || "Your dates have been booked.");
            setGuestName("");
            setEmail("");
            setLocation("");
            closeModal();
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Could not book these dates.");
        } finally {
            setSubmitting(false);
        }
    }

    const selectedDays =
        selectedStart && selectedEnd
            ? calculateDays(selectedStart, selectedEnd)
            : 0;

    return (
        <main className="min-h-screen bg-[#f5f3ee] text-black">
            <header className="px-5 pt-5 sm:px-8 lg:px-12 xl:px-20">
                <a
                    href="/"
                    className="
            group
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-white
            px-5
            py-3
            text-xs
            font-medium
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            transition-all
            hover:bg-black
            hover:text-white
          "
                >
                    <span
                        className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              transition-all
              group-hover:bg-white
              group-hover:text-black
            "
                    >
                        <ArrowLeft size={14} />
                    </span>

                    Back
                </a>
            </header>

            {loadError && (
                <p role="alert" className="mx-auto mt-6 max-w-7xl px-5 text-sm text-[#a45f57] sm:px-8 lg:px-12 xl:px-20">
                    {loadError} Please try again later.
                </p>
            )}
            {confirmation && (
                <p role="status" className="mx-auto mt-6 max-w-7xl px-5 text-sm text-[#526341] sm:px-8 lg:px-12 xl:px-20">
                    {confirmation}
                </p>
            )}

            {/* ============================================================ */}
            {/* INTRO                                                         */}
            {/* ============================================================ */}

            <section className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:px-12 xl:px-20">
                <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
                    <div>
                        <p
                            className="
                text-[9px]
                uppercase
                tracking-[0.32em]
                text-black/40
              "
                        >
                            Wedding Photography
                        </p>

                        <div className="mt-4 h-px w-10 bg-black/20" />

                        <h1
                            className="
                mt-6
                max-w-3xl
                font-serif
                text-[48px]
                leading-[0.95]
                tracking-[-0.03em]
                sm:text-[70px]
                lg:text-[86px]
              "
                        >
                            Check our
                            <br />
                            availability.
                        </h1>

                        <p
                            className="
                mt-7
                max-w-xl
                text-[14px]
                leading-[1.9]
                text-black/50
                sm:text-[15px]
              "
                        >
                            Planning your wedding? Choose your preferred
                            dates below and see when our team is available
                            to tell your story.
                        </p>
                    </div>

                    {/* Legend */}
                    <div
                        className="
              rounded-[4px]
              border
              border-black/10
              bg-[#eeeae1]
              p-6
            "
                    >
                        <p
                            className="
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-black/40
              "
                        >
                            Calendar guide
                        </p>

                        <div className="mt-5 space-y-4">
                            <Legend
                                color="bg-[#7d8d63]"
                                label="Available"
                            />

                            <Legend
                                color="bg-[#b77b72]"
                                label="Booked"
                            />

                            <Legend
                                color="bg-black"
                                label="Your selected dates"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* CALENDAR                                                      */}
            {/* ============================================================ */}

            <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-8 lg:px-12 xl:px-20">
                <div
                    className="
            overflow-hidden
            rounded-[6px]
            border
            border-black/10
            bg-[#eeeae1]
            shadow-[0_20px_70px_rgba(0,0,0,0.05)]
          "
                >
                    {/* Calendar Header */}

                    <div
                        className="
              flex
              items-center
              justify-between
              border-b
              border-black/10
              px-5
              py-5
              sm:px-8
              sm:py-7
            "
                    >
                        <div>
                            <p
                                className="
                  text-[8px]
                  uppercase
                  tracking-[0.28em]
                  text-black/35
                "
                            >
                                Shoot dates
                            </p>

                            <h2
                                className="
                  mt-1
                  font-serif
                  text-[30px]
                  leading-none
                  sm:text-[38px]
                "
                            >
                                {MONTH_NAMES[month]} {year}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={previousMonth}
                                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-white
                  transition
                  hover:bg-black
                  hover:text-white
                "
                                aria-label="Previous month"
                            >
                                <ChevronLeft size={17} />
                            </button>

                            <button
                                onClick={nextMonth}
                                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-white
                  transition
                  hover:bg-black
                  hover:text-white
                "
                                aria-label="Next month"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>
                    </div>

                    {/* Weekdays */}

                    <div className="grid grid-cols-7 border-b border-black/10">
                        {WEEKDAYS.map((day) => (
                            <div
                                key={day}
                                className="
                  border-r
                  border-black/5
                  px-2
                  py-4
                  text-center
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-black/35
                  last:border-r-0
                  sm:py-5
                "
                            >
                                <span className="sm:hidden">
                                    {day.charAt(0)}
                                </span>

                                <span className="hidden sm:inline">
                                    {day}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Days */}

                    <div className="grid grid-cols-7">
                        {calendarDays.map((date, index) => {
                            if (!date) {
                                return (
                                    <div
                                        key={`empty-${index}`}
                                        className="
                      min-h-[82px]
                      border-b
                      border-r
                      border-black/5
                      bg-black/[0.012]
                      sm:min-h-[130px]
                    "
                                    />
                                );
                            }

                            const booked = isDateBooked(date);
                            const value = formatDate(date);
                            const todayValue = formatDate(new Date());
                            const isPast = value < todayValue;
                            const unavailable = booked || isPast || !availabilityLoaded || Boolean(loadError);

                            const selected = isDateInRange(
                                date,
                                selectedStart,
                                selectedEnd
                            );

                            const isToday =
                                value === todayValue;

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    disabled={unavailable}
                                    onClick={() =>
                                        handleDateClick(date)
                                    }
                                    className={`
                    group
                    relative
                    min-h-[82px]
                    border-b
                    border-r
                    border-black/5
                    p-2
                    text-left
                    transition-all
                    sm:min-h-[130px]
                    sm:p-4

                    ${booked
                                            ? "cursor-not-allowed bg-[#b77b72]/10"
                            : isPast
                                ? "cursor-not-allowed bg-black/[0.025]"
                            : "cursor-pointer hover:bg-white"
                        }

                    ${selected
                                            ? "!bg-black text-white"
                                            : ""
                                        }
                  `}
                                >
                                    {/* Date */}

                                    <div
                                        className={`
                      flex
                      items-center
                      justify-between
                    `}
                                    >
                                        <span
                                            className={`
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        font-serif
                        text-[18px]
                        sm:h-9
                        sm:w-9
                        sm:text-[21px]

                        ${isToday && !selected
                                                    ? "border border-black"
                                                    : ""
                                                }

                        ${selected
                                                    ? "border border-white/30"
                                                    : ""
                                                }
                      `}
                                        >
                                            {date.getDate()}
                                        </span>

                                        {unavailable ? (
                                            <span
                                                className="
                          hidden
                          text-[7px]
                          uppercase
                          tracking-[0.15em]
                          text-[#a45f57]
                          sm:block
                        "
                                            >
                                                {booked ? "Booked" : isPast ? "Past" : loadError ? "Unavailable" : "Checking"}
                                            </span>
                                        ) : (
                                            <span
                                                className={`
                          hidden
                          h-2
                          w-2
                          rounded-full
                          sm:block
                          ${selected
                                                        ? "bg-white"
                                                        : "bg-[#7d8d63]"
                                                    }
                        `}
                                            />
                                        )}
                                    </div>

                                    {/* Bottom information */}

                                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                                        {unavailable ? (
                                            <p
                                                className={`
                          text-[7px]
                          uppercase
                          tracking-[0.14em]
                          ${selected
                                                        ? "text-white/50"
                                                        : "text-black/30"
                                                    }
                        `}
                                            >
                                                {booked ? "Unavailable" : isPast ? "Past" : loadError ? "Unavailable" : "Checking"}
                                            </p>
                                        ) : (
                                            <p
                                                className={`
                          text-[7px]
                          uppercase
                          tracking-[0.14em]
                          transition
                          ${selected
                                                        ? "text-white/50"
                                                        : "text-black/35 group-hover:text-black"
                                                    }
                        `}
                                            >
                                                Available
                                            </p>
                                        )}
                                    </div>

                                    {/* Hover arrow */}

                                    {!unavailable && (
                                        <div
                                            className="
                        absolute
                        bottom-3
                        right-3
                        hidden
                        opacity-0
                        transition
                        group-hover:opacity-100
                        sm:block
                      "
                                        >
                                            <ArrowRight size={13} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom note */}

                <div
                    className="
            mt-7
            flex
            flex-col
            gap-4
            border-t
            border-black/10
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
                >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-black/35">
                        Click an available date to begin your enquiry.
                    </p>

                    <div className="flex items-center gap-2 text-black/40">
                        <CalendarDays size={14} />

                        <span className="text-[10px]">
                            Availability is updated regularly.
                        </span>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* DATE MODAL                                                    */}
            {/* ============================================================ */}

            {showModal && (
                <DateModal
                    selectedStart={selectedStart}
                    selectedEnd={selectedEnd}
                    selectedDays={selectedDays}
                    guestName={guestName}
                    email={email}
                    location={location}
                    setGuestName={setGuestName}
                    setEmail={setEmail}
                    setLocation={setLocation}
                    onClose={closeModal}
                    onSubmit={submitBooking}
                    submitting={submitting}
                    error={submitError}
                    unavailable={selectionHasBookedDates(selectedStart, selectedEnd)}
                    onStartChange={(value) => {
                        setSelectedStart(value);
                        setSelectedEnd(null);
                    }}
                    onEndChange={(value) => {
                        if (
                            selectedStart &&
                            value >= selectedStart
                        ) {
                            setSelectedEnd(value);
                        }
                    }}
                />
            )}
        </main>
    );
}

/* ======================================================================== */
/* LEGEND                                                                  */
/* ======================================================================== */

function Legend({
    color,
    label,
}: {
    color: string;
    label: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <span
                className={`h-3 w-3 rounded-full ${color}`}
            />

            <span className="text-[10px] uppercase tracking-[0.15em] text-black/55">
                {label}
            </span>
        </div>
    );
}

/* ======================================================================== */
/* DATE MODAL                                                              */
/* ======================================================================== */

function DateModal({
    selectedStart,
    selectedEnd,
    selectedDays,
    guestName,
    email,
    location,
    setGuestName,
    setEmail,
    setLocation,
    onClose,
    onSubmit,
    submitting,
    error,
    unavailable,
    onStartChange,
    onEndChange,
}: {
    selectedStart: string | null;
    selectedEnd: string | null;
    selectedDays: number;
    guestName: string;
    email: string;
    location: string;
    setGuestName: (value: string) => void;
    setEmail: (value: string) => void;
    setLocation: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
    submitting: boolean;
    error: string;
    unavailable: boolean;
    onStartChange: (value: string) => void;
    onEndChange: (value: string) => void;
}) {
    return (
        <div
            className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/45
        p-4
        backdrop-blur-sm
      "
            onMouseDown={onClose}
        >
            <div
                className="
          relative
          max-h-[90vh]
          w-full
          max-w-xl
          overflow-y-auto
          rounded-[5px]
          bg-[#f5f3ee]
          shadow-[0_30px_100px_rgba(0,0,0,0.25)]
        "
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Close */}

                <button
                    onClick={onClose}
                    className="
            absolute
            right-5
            top-5
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-black/10
            bg-white
            transition
            hover:bg-black
            hover:text-white
          "
                    aria-label="Close"
                >
                    <X size={15} />
                </button>

                <div className="p-6 sm:p-9">
                    {/* Heading */}

                    <p
                        className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-black/35
            "
                    >
                        Wedding enquiry
                    </p>

                    <h2
                        className="
              mt-3
              max-w-md
              font-serif
              text-[38px]
              leading-[0.95]
              sm:text-[48px]
            "
                    >
                        Tell us about
                        <br />
                        your dates.
                    </h2>

                    <p className="mt-5 max-w-md text-[13px] leading-[1.8] text-black/50">
                        Select your wedding dates and leave us a few
                        details. We&apos;ll get back to you with
                        availability and package information.
                    </p>

                    {/* Date selection */}

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <DateInput
                            label="Wedding starts"
                            value={selectedStart}
                            onChange={onStartChange}
                        />

                        <DateInput
                            label="Wedding ends"
                            value={selectedEnd}
                            min={selectedStart || undefined}
                            onChange={onEndChange}
                        />
                    </div>

                    {/* Duration */}

                    {selectedDays > 0 && (
                        <div
                            className="
                mt-4
                flex
                items-center
                justify-between
                border-y
                border-black/10
                py-4
              "
                        >
                            <span
                                className="
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-black/35
                "
                            >
                                Shoot duration
                            </span>

                            <span className="font-serif text-[20px]">
                                {selectedDays}{" "}
                                {selectedDays === 1
                                    ? "day"
                                    : "days"}
                            </span>
                        </div>
                    )}

                    {/* Couple details */}

                    <div className="mt-7 space-y-4">
                        <Input
                            label="Your name"
                            placeholder="Aarav & Meera"
                            value={guestName}
                            onChange={setGuestName}
                        />

                        <Input
                            label="Email address"
                            type="email"
                            placeholder="hello@example.com"
                            value={email}
                            onChange={setEmail}
                        />

                        <Input
                            label="Wedding location"
                            placeholder="Udaipur, Rajasthan"
                            value={location}
                            onChange={setLocation}
                        />
                    </div>

                    {/* Submit */}

                    <button
                        type="button"
                        className="
              mt-7
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-black
              px-6
              py-4
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-white
              transition
              hover:bg-[#292825]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
                        disabled={
                            !selectedStart ||
                            !selectedEnd ||
                            !guestName ||
                            !email ||
                            submitting ||
                            unavailable
                        }
                        onClick={onSubmit}
                    >
                        {submitting ? "Booking..." : "Book these dates"}
                        {!submitting && <ArrowRight size={14} />}
                    </button>

                    {error && <p role="alert" className="mt-3 text-center text-sm text-[#a45f57]">{error}</p>}
                    {unavailable && (
                        <p role="alert" className="mt-3 text-center text-sm text-[#a45f57]">
                            This date range includes dates that have already been booked.
                        </p>
                    )}
                    <p className="mt-4 text-center text-[9px] text-black/30">
                        Your dates are reserved once this booking is submitted.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ======================================================================== */
/* DATE INPUT                                                              */
/* ======================================================================== */

function DateInput({
    label,
    value,
    min,
    onChange,
}: {
    label: string;
    value: string | null;
    min?: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block">
            <span
                className="
          mb-2
          block
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-black/35
        "
            >
                {label}
            </span>

            <div className="relative">
                <CalendarDays
                    size={15}
                    className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-black/30
          "
                />

                <input
                    type="date"
                    value={value || ""}
                    min={min}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className="
            w-full
            rounded-[3px]
            border
            border-black/10
            bg-white
            px-4
            py-4
            pl-11
            text-[12px]
            text-black
            outline-none
            transition
            focus:border-black/40
          "
                />
            </div>
        </label>
    );
}

/* ======================================================================== */
/* INPUT                                                                   */
/* ======================================================================== */

function Input({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <label className="block">
            <span
                className="
          mb-2
          block
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-black/35
        "
            >
                {label}
            </span>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="
          w-full
          rounded-[3px]
          border
          border-black/10
          bg-white
          px-4
          py-4
          text-[12px]
          text-black
          outline-none
          placeholder:text-black/20
          transition
          focus:border-black/40
        "
            />
        </label>
    );
}