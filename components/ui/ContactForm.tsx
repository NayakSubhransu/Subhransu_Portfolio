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
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { sendContactMessage } from "@/app/actions";

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const name    = (data.get("name")    as string)?.trim();
  const email   = (data.get("email")   as string)?.trim();
  const subject = (data.get("subject") as string)?.trim();
  const message = (data.get("message") as string)?.trim();
  if (!name    || name.length < 2)                           errors.name    = "At least 2 characters required.";
  if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email   = "Enter a valid email address.";
  if (!subject || subject.length < 3)                        errors.subject = "At least 3 characters required.";
  if (!message || message.length < 10)                       errors.message = "At least 10 characters required.";
  return errors;
}

// ─── Floating-label input ─────────────────────────────────────────────────────
interface FloatInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  icon: React.ElementType;
  autoComplete?: string;
  disabled?: boolean;
  hasError?: boolean;
  errorMsg?: string;
  onChange?: () => void;
}

function FloatInput({
  id, name, type = "text", label, placeholder,
  icon: Icon, autoComplete, disabled, hasError, errorMsg, onChange,
}: FloatInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const lifted = focused || hasValue;

  return (
    <div className="relative flex flex-col gap-1.5">
      {/* Input wrapper */}
      <div className="relative group">
        {/* Left icon strip */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: hasError
              ? "linear-gradient(to bottom, transparent, rgba(239,68,68,0.7), transparent)"
              : focused
                ? "linear-gradient(to bottom, transparent, rgba(16,185,129,0.8), transparent)"
                : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
            opacity: focused || hasError ? 1 : 0.4,
          }}
          aria-hidden="true"
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={`
            absolute left-10 pointer-events-none select-none font-mono font-bold uppercase tracking-[0.15em]
            transition-all duration-200 ease-out z-10
            ${lifted
              ? "top-2 text-[9px]"
              : "top-1/2 -translate-y-1/2 text-[11px]"
            }
            ${hasError  ? "text-red-400"     :
              focused    ? "text-emerald-400" :
                           "text-zinc-500"
            }
          `}
        >
          {label}
        </label>

        {/* Icon */}
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none z-10"
          aria-hidden="true"
        >
          <Icon
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              hasError  ? "text-red-400/70"     :
              focused    ? "text-emerald-400"    :
                           "text-zinc-600"
            }`}
          />
        </div>

        {/* Input */}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder=""
          aria-required="true"
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            onChange?.();
          }}
          className={`
            w-full pl-10 pr-4 pt-6 pb-2.5 rounded-xl text-sm font-medium text-zinc-100
            bg-white/[0.04] border transition-all duration-200
            focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-transparent min-h-[60px]
            ${hasError
              ? "border-red-500/40 bg-red-500/[0.03] focus:border-red-500/60"
              : "border-white/[0.08] focus:border-emerald-500/45 focus:bg-white/[0.055]"
            }
          `}
        />

        {/* Focus ring glow */}
        {focused && !hasError && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: "0 0 0 1px rgba(16,185,129,0.25), 0 4px 20px rgba(16,185,129,0.06)",
            }}
            aria-hidden="true"
          />
        )}
        {focused && hasError && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: "0 0 0 1px rgba(239,68,68,0.3), 0 4px 20px rgba(239,68,68,0.06)",
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Inline error */}
      {hasError && errorMsg && (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-[11px] text-red-400 font-medium pl-1"
          role="alert"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {errorMsg}
        </p>
      )}
    </div>
  );
}

// ─── Floating-label textarea ──────────────────────────────────────────────────
interface FloatTextareaProps {
  id: string;
  name: string;
  label: string;
  rows?: number;
  disabled?: boolean;
  hasError?: boolean;
  errorMsg?: string;
  onChange?: () => void;
}

function FloatTextarea({
  id, name, label, rows = 5, disabled, hasError, errorMsg, onChange,
}: FloatTextareaProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const lifted = focused || hasValue;

  return (
    <div className="relative flex flex-col gap-1.5">
      <div className="relative group">
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: hasError
              ? "linear-gradient(to bottom, transparent, rgba(239,68,68,0.7), transparent)"
              : focused
                ? "linear-gradient(to bottom, transparent, rgba(16,185,129,0.8), transparent)"
                : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
            opacity: focused || hasError ? 1 : 0.4,
          }}
          aria-hidden="true"
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={`
            absolute left-10 pointer-events-none select-none font-mono font-bold uppercase tracking-[0.15em]
            transition-all duration-200 ease-out z-10
            ${lifted ? "top-2.5 text-[9px]" : "top-4 text-[11px]"}
            ${hasError  ? "text-red-400"     :
              focused    ? "text-emerald-400" :
                           "text-zinc-500"
            }
          `}
        >
          {label}
        </label>

        {/* Icon */}
        <div
          className="absolute left-3.5 top-4 transition-colors duration-200 pointer-events-none z-10"
          aria-hidden="true"
        >
          <MessageSquare
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              hasError  ? "text-red-400/70"   :
              focused    ? "text-emerald-400"  :
                           "text-zinc-600"
            }`}
          />
        </div>

        {/* Textarea */}
        <textarea
          id={id}
          name={name}
          rows={rows}
          disabled={disabled}
          aria-required="true"
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            setCharCount(e.target.value.length);
            onChange?.();
          }}
          className={`
            w-full pl-10 pr-4 pt-7 pb-3 rounded-xl text-sm font-medium text-zinc-100
            bg-white/[0.04] border transition-all duration-200 resize-none leading-relaxed
            focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
            ${hasError
              ? "border-red-500/40 bg-red-500/[0.03] focus:border-red-500/60"
              : "border-white/[0.08] focus:border-emerald-500/45 focus:bg-white/[0.055]"
            }
          `}
        />

        {/* Char counter */}
        <div
          className={`
            absolute bottom-2.5 right-3 text-[10px] font-mono transition-colors duration-200
            ${charCount > 500 ? "text-amber-400" :
              charCount > 0    ? "text-zinc-600"   :
                                 "text-transparent"
            }
          `}
          aria-hidden="true"
        >
          {charCount}
        </div>

        {/* Focus glow */}
        {focused && !hasError && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: "0 0 0 1px rgba(16,185,129,0.25), 0 4px 20px rgba(16,185,129,0.06)" }}
            aria-hidden="true"
          />
        )}
        {focused && hasError && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: "0 0 0 1px rgba(239,68,68,0.3), 0 4px 20px rgba(239,68,68,0.06)" }}
            aria-hidden="true"
          />
        )}
      </div>

      {hasError && errorMsg && (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-[11px] text-red-400 font-medium pl-1"
          role="alert"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {errorMsg}
        </p>
      )}
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
      {/* Animated checkmark ring */}
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.15), rgba(16,185,129,0.04))",
            boxShadow: "0 0 0 1px rgba(16,185,129,0.3), 0 0 40px rgba(16,185,129,0.15)",
          }}
        >
          <CheckCircle2 className="w-9 h-9 text-emerald-400" aria-hidden="true" />
        </div>
        {/* Outer pulse ring */}
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: "rgba(16,185,129,0.08)",
            animationDuration: "2s",
            animationIterationCount: "3",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <h4 className="text-lg font-extrabold text-zinc-100 tracking-tight">
            Message Delivered!
          </h4>
          <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
          {message}
        </p>
      </div>

      {/* Divider */}
      <div
        className="w-32 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] active:bg-white/[0.1] text-zinc-300 hover:text-zinc-100 text-sm font-semibold transition-all duration-200 min-h-[44px]"
      >
        <RefreshCcw className="w-3.5 h-3.5" aria-hidden="true" />
        Send another message
      </button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [isPending, setIsPending]       = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [globalError, setGlobalError]   = useState<string | null>(null);
  const [successMsg, setSuccessMsg]     = useState("");
  const [fieldErrors, setFieldErrors]   = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const clearField = useCallback((field: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setGlobalError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPending) return;

      const formData = new FormData(e.currentTarget);
      const errors   = validate(formData);

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
            result.message ?? "Message sent! I'll get back to you within 24 hours."
          );
          formRef.current?.reset();
        } else {
          setGlobalError(result.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        setGlobalError("Network error. Please check your connection and try again.");
      } finally {
        setIsPending(false);
      }
    },
    [isPending]
  );

  if (isSuccess) {
    return (
      <SuccessScreen
        message={successMsg}
        onReset={() => { setIsSuccess(false); setSuccessMsg(""); setGlobalError(null); }}
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-4"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FloatInput
          id="contact-name"
          name="name"
          label="Your Name"
          placeholder="Full name"
          icon={User}
          autoComplete="name"
          disabled={isPending}
          hasError={!!fieldErrors.name}
          errorMsg={fieldErrors.name}
          onChange={() => clearField("name")}
        />
        <FloatInput
          id="contact-email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          icon={Mail}
          autoComplete="email"
          disabled={isPending}
          hasError={!!fieldErrors.email}
          errorMsg={fieldErrors.email}
          onChange={() => clearField("email")}
        />
      </div>

      {/* Subject */}
      <FloatInput
        id="contact-subject"
        name="subject"
        label="Subject"
        placeholder="What's this about?"
        icon={Tag}
        disabled={isPending}
        hasError={!!fieldErrors.subject}
        errorMsg={fieldErrors.subject}
        onChange={() => clearField("subject")}
      />

      {/* Message */}
      <FloatTextarea
        id="contact-message"
        name="message"
        label="Message"
        rows={5}
        disabled={isPending}
        hasError={!!fieldErrors.message}
        errorMsg={fieldErrors.message}
        onChange={() => clearField("message")}
      />

      {/* Global error */}
      {globalError && (
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/25 text-red-400 text-sm"
          style={{ background: "rgba(239,68,68,0.05)" }}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span className="leading-relaxed">{globalError}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="relative group flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none min-h-[52px] overflow-hidden"
        style={{
          background: isPending
            ? "rgba(16,185,129,0.7)"
            : "linear-gradient(135deg, #10b981, #059669)",
          color: "#0a0a0a",
          boxShadow: isPending
            ? "none"
            : "0 4px 24px rgba(16,185,129,0.30), 0 1px 0 rgba(255,255,255,0.08) inset",
        }}
        aria-label={isPending ? "Sending message…" : "Send message"}
      >
        {/* Shimmer sweep on hover */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </button>

      {/* Footnote */}
      <p className="text-center text-[11px] text-zinc-600 font-mono">
        Responses typically within{" "}
        <span className="text-zinc-500">24 hours</span>
        {" "}·{" "}
        <span className="text-zinc-500">No spam, ever.</span>
      </p>
    </form>
  );
}
