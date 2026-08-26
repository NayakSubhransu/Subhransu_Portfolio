"use client";

import { useState, useCallback, useRef } from "react";
import {
  Send,
  Loader2,
  User,
  Mail,
  MessageSquare,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { sendContactMessage } from "@/app/actions";

// ─── Field component ──────────────────────────────────────────────────────────
function Field({
  id,
  label,
  icon: Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 uppercase tracking-[0.14em]"
      >
        <Icon className="w-3 h-3" aria-hidden="true" />
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-400 font-medium mt-0.5">
          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Input / Textarea shared classes ─────────────────────────────────────────
const INPUT_BASE =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-zinc-200 placeholder-zinc-600 text-sm font-medium focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]";

function inputClass(hasError: boolean) {
  return `${INPUT_BASE} ${
    hasError
      ? "border-red-500/50 focus:border-red-500/70 focus:bg-red-500/[0.03]"
      : "border-white/[0.08] focus:border-emerald-500/50 focus:bg-white/[0.06]"
  }`;
}

// ─── Main Form ────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [isPending, setIsPending]   = useState(false);
  const [isSuccess, setIsSuccess]   = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg]   = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // ── Client-side validation ────────────────────────────────────────────────
  const validate = useCallback((data: FormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    const name    = (data.get("name") as string)?.trim();
    const email   = (data.get("email") as string)?.trim();
    const subject = (data.get("subject") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name || name.length < 2)
      errors.name = "Please enter your full name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address.";
    if (!subject || subject.length < 3)
      errors.subject = "Please enter a subject (min 3 characters).";
    if (!message || message.length < 10)
      errors.message = "Message must be at least 10 characters.";

    return errors;
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPending) return;

      const formData = new FormData(e.currentTarget);

      // Client-side validation first
      const errors = validate(formData);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
      setGlobalError(null);
      setIsPending(true);

      try {
        const result = await sendContactMessage(formData);
        if (result.success) {
          setIsSuccess(true);
          setSuccessMsg(
            result.message ??
              "Message sent! I'll get back to you within 24 hours."
          );
          formRef.current?.reset();
        } else {
          setGlobalError(
            result.error ?? "Something went wrong. Please try again."
          );
        }
      } catch {
        setGlobalError(
          "Network error. Please check your connection and try again."
        );
      } finally {
        setIsPending(false);
      }
    },
    [isPending, validate]
  );

  // ── Success state ─────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" aria-hidden="true" />
        </div>
        <div>
          <h4 className="text-base font-bold text-zinc-100 mb-1">
            Message Sent!
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
            {successMsg}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setSuccessMsg("");
            setGlobalError(null);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-sm font-semibold transition-all min-h-[44px]"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-4"
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="contact-name" label="Name" icon={User} error={fieldErrors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            disabled={isPending}
            className={inputClass(!!fieldErrors.name)}
            aria-required="true"
            aria-invalid={!!fieldErrors.name}
            onChange={() =>
              setFieldErrors((prev) => ({ ...prev, name: "" }))
            }
          />
        </Field>

        <Field id="contact-email" label="Email" icon={Mail} error={fieldErrors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isPending}
            className={inputClass(!!fieldErrors.email)}
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            onChange={() =>
              setFieldErrors((prev) => ({ ...prev, email: "" }))
            }
          />
        </Field>
      </div>

      {/* Subject */}
      <Field id="contact-subject" label="Subject" icon={Tag} error={fieldErrors.subject}>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="What's this about?"
          disabled={isPending}
          className={inputClass(!!fieldErrors.subject)}
          aria-required="true"
          aria-invalid={!!fieldErrors.subject}
          onChange={() =>
            setFieldErrors((prev) => ({ ...prev, subject: "" }))
          }
        />
      </Field>

      {/* Message */}
      <Field id="contact-message" label="Message" icon={MessageSquare} error={fieldErrors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, opportunity, or just say hello..."
          disabled={isPending}
          className={`${inputClass(!!fieldErrors.message)} resize-none leading-relaxed`}
          style={{ minHeight: "auto" }}
          aria-required="true"
          aria-invalid={!!fieldErrors.message}
          onChange={() =>
            setFieldErrors((prev) => ({ ...prev, message: "" }))
          }
        />
      </Field>

      {/* Global error banner */}
      {globalError && (
        <div
          className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/25 text-red-400 text-sm"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-900 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none min-h-[48px]"
        aria-label={isPending ? "Sending message…" : "Send message"}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
