"use client";

import { useState, useCallback, useRef } from "react";
import { Send, Loader2, User, Mail, MessageSquare, Tag } from "lucide-react";
import { sendContactMessage } from "@/app/actions";
import Toast, { type ToastMessage } from "@/components/ui/Toast";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastMessage["type"], message: string) => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, type, message }]);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPending) return;

      setIsPending(true);
      const formData = new FormData(e.currentTarget);

      try {
        const result = await sendContactMessage(formData);
        if (result.success) {
          addToast("success", result.message ?? "Message sent successfully!");
          formRef.current?.reset();
        } else {
          addToast("error", result.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        addToast("error", "Network error. Please check your connection and try again.");
      } finally {
        setIsPending(false);
      }
    },
    [isPending, addToast]
  );

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
        className="flex flex-col gap-4"
      >
        {/* Name & Email row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-name"
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              <User className="w-3 h-3" aria-hidden="true" />
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              placeholder="Your full name"
              disabled={isPending}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 placeholder-zinc-600 text-sm font-medium focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              <Mail className="w-3 h-3" aria-hidden="true" />
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              disabled={isPending}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 placeholder-zinc-600 text-sm font-medium focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              aria-required="true"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-subject"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            <Tag className="w-3 h-3" aria-hidden="true" />
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            minLength={3}
            placeholder="What's this about?"
            disabled={isPending}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 placeholder-zinc-600 text-sm font-medium focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            aria-required="true"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            <MessageSquare className="w-3 h-3" aria-hidden="true" />
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder="Tell me about your project, opportunity, or just say hello..."
            disabled={isPending}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 placeholder-zinc-600 text-sm font-medium focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none leading-relaxed"
            aria-required="true"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-900 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 min-h-[44px]"
          aria-label={isPending ? "Sending message..." : "Send message"}
        >
          {isPending ? (
            <>
              <Loader2
                className="w-4 h-4 animate-spin"
                aria-hidden="true"
              />
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

      {/* Toast notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  );
}
