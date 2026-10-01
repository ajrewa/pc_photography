"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, CalendarDays, MapPin, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "916263908164";
const PHONE_NUMBER = "+916263908164";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact — PC Photography";
  }, []);

  const [form, setForm] = useState({
    names: "",
    date: "",
    location: "",
    mobile: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error once user starts correcting it
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.names.trim()) {
      newErrors.names = "Please enter your name";
    }

    if (!form.date) {
      newErrors.date = "Please select your wedding date";
    }

    if (!form.location.trim()) {
      newErrors.location = "Please enter your wedding location";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number";
    } else if (
      !/^[+]?[\d\s()-]{10,15}$/.test(form.mobile.trim())
    ) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Please tell us a little about your wedding";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formattedDate = new Date(
      `${form.date}T00:00:00`,
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const message = `Hello PC Photography
I'd like to enquire about wedding photography / films.

*Names:* ${form.names}

*Wedding Date:* ${formattedDate}

*Wedding Location:* ${form.location}

*Mobile Number:* ${form.mobile}

*About the Wedding:*
${form.description}

Looking forward to hearing from you.

Thank you!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#fafafa]
        px-5
        py-14
        pb-24
        sm:px-10
        sm:py-20
        lg:px-16
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-12
          lg:grid-cols-[0.85fr_1.15fr]
          lg:items-start
          lg:gap-20
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* LEFT                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div>
          <SectionHeading
            eyebrow="Let's talk"
            title="Tell us about your day"
          />

          <p
            className="
              mt-6
              max-w-md
              text-base
              leading-relaxed
              text-stone
            "
          >
            Tell us a little about your wedding and we&rsquo;ll
            get back to you with availability, pricing, and next
            steps.
          </p>

          {/* Contact Card */}
          <div
            className="
              mt-8
              max-w-md
              rounded-[24px]
              border
              border-black/10
              bg-white
              p-5
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              sm:p-6
            "
          >
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-black/40
              "
            >
              Prefer a quick conversation?
            </p>

            <div
              className="
                mt-4
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              {/* Call */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="
                  inline-flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-black/10
                  bg-black/[0.03]
                  px-5
                  py-3.5
                  text-sm
                  text-ink
                  transition
                  hover:border-black/20
                  hover:bg-black/[0.06]
                "
              >
                <Phone size={15} />

                Call us
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-ember
                  px-5
                  py-3.5
                  text-sm
                  font-medium
                  text-white
                  transition-colors
                  hover:bg-ember-dim
                "
              >
                WhatsApp
              </a>
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="
                mt-4
                block
                text-sm
                text-black/55
                transition
                hover:text-black
              "
            >
              +91 62639 08164
            </a>
          </div>

          {/* Email */}
          <div className="mt-7">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-black/35
              "
            >
              Email
            </p>

            <a
              href="mailto:hello@theweddingfilmer.com"
              className="
                mt-2
                inline-block
                text-sm
                text-ink
                underline
                decoration-black/15
                underline-offset-4
                transition
                hover:decoration-black/50
              "
            >
              hello@theweddingfilmer.com
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* FORM                                                             */}
        {/* ---------------------------------------------------------------- */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="
            rounded-[26px]
            border
            border-black/10
            bg-white
            p-5
            shadow-[0_15px_50px_rgba(0,0,0,0.04)]
            sm:p-7
            lg:p-8
          "
        >
          {/* Names + Date */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Names */}
            <div>
              <label
                htmlFor="names"
                className="
                  mb-2
                  block
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-black/45
                "
              >
                Your names
              </label>

              <input
                id="names"
                type="text"
                value={form.names}
                onChange={(e) =>
                  updateField("names", e.target.value)
                }
                placeholder="Arya & Federico"
                className={`
                  w-full
                  rounded-2xl
                  border
                  bg-black/[0.03]
                  px-5
                  py-4
                  text-sm
                  text-ink
                  outline-none
                  transition
                  placeholder:text-stone
                  focus:bg-white
                  ${
                    errors.names
                      ? "border-red-400"
                      : "border-black/10 focus:border-ember"
                  }
                `}
              />

              {errors.names && (
                <p className="mt-1.5 text-[10px] text-red-500">
                  {errors.names}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="wedding-date"
                className="
                  mb-2
                  block
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-black/45
                "
              >
                Wedding date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-black/35
                  "
                />

                <input
                  id="wedding-date"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    updateField("date", e.target.value)
                  }
                  className={`
                    w-full
                    rounded-2xl
                    border
                    bg-black/[0.03]
                    px-5
                    py-4
                    pr-11
                    text-sm
                    text-ink
                    outline-none
                    transition
                    focus:bg-white
                    ${
                      errors.date
                        ? "border-red-400"
                        : "border-black/10 focus:border-ember"
                    }
                  `}
                />
              </div>

              {errors.date && (
                <p className="mt-1.5 text-[10px] text-red-500">
                  {errors.date}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="mt-5">
            <label
              htmlFor="location"
              className="
                mb-2
                block
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-black/45
              "
            >
              Wedding location
            </label>

            <div className="relative">
              <MapPin
                size={16}
                className="
                  pointer-events-none
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-black/30
                "
              />

              <input
                id="location"
                type="text"
                value={form.location}
                onChange={(e) =>
                  updateField("location", e.target.value)
                }
                placeholder="City, venue or destination"
                className={`
                  w-full
                  rounded-2xl
                  border
                  bg-black/[0.03]
                  py-4
                  pl-12
                  pr-5
                  text-sm
                  text-ink
                  outline-none
                  transition
                  placeholder:text-stone
                  focus:bg-white
                  ${
                    errors.location
                      ? "border-red-400"
                      : "border-black/10 focus:border-ember"
                  }
                `}
              />
            </div>

            {errors.location && (
              <p className="mt-1.5 text-[10px] text-red-500">
                {errors.location}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div className="mt-5">
            <label
              htmlFor="mobile"
              className="
                mb-2
                block
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-black/45
              "
            >
              Mobile number
            </label>

            <input
              id="mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.mobile}
              onChange={(e) =>
                updateField("mobile", e.target.value)
              }
              placeholder="+91 98765 43210"
              className={`
                w-full
                rounded-2xl
                border
                bg-black/[0.03]
                px-5
                py-4
                text-sm
                text-ink
                outline-none
                transition
                placeholder:text-stone
                focus:bg-white
                ${
                  errors.mobile
                    ? "border-red-400"
                    : "border-black/10 focus:border-ember"
                }
              `}
            />

            {errors.mobile && (
              <p className="mt-1.5 text-[10px] text-red-500">
                {errors.mobile}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mt-5">
            <label
              htmlFor="description"
              className="
                mb-2
                block
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-black/45
              "
            >
              Tell us about your wedding
            </label>

            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value,
                )
              }
              placeholder="Tell us about your wedding, venue, celebrations, number of days, or anything else you'd like us to know..."
              rows={6}
              className={`
                w-full
                resize-none
                rounded-2xl
                border
                bg-black/[0.03]
                px-5
                py-4
                text-sm
                leading-relaxed
                text-ink
                outline-none
                transition
                placeholder:text-stone
                focus:bg-white
                ${
                  errors.description
                    ? "border-red-400"
                    : "border-black/10 focus:border-ember"
                }
              `}
            />

            {errors.description && (
              <p className="mt-1.5 text-[10px] text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-ember
                px-7
                py-4
                text-sm
                font-medium
                text-paper
                transition-colors
                hover:bg-ember-dim
                sm:w-auto
              "
            >
              Send enquiry on WhatsApp
              <ArrowRight size={15} />
            </button>

            <p
              className="
                mt-3
                text-[10px]
                leading-relaxed
                text-black/35
              "
            >
              Your enquiry will open in WhatsApp with the
              details filled in. You can review the message
              before sending it to us.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
