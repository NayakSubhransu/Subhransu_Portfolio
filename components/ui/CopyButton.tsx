"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CopyButton({ text, className = "", children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied!" : "Copy email address"}
      className={`flex items-center gap-2 transition-all duration-200 min-h-[44px] ${className}`}
    >
      <span
        className={`flex items-center justify-center w-4 h-4 transition-all duration-200 ${
          copied ? "text-emerald-400" : "text-zinc-400"
        }`}
      >
        {copied ? (
          <Check className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
      </span>
      {children && (
        <span className={copied ? "text-emerald-400" : ""}>{children}</span>
      )}
      {copied && (
        <span
          role="status"
          aria-live="polite"
          className="text-xs text-emerald-400 font-medium"
        >
          Copied!
        </span>
      )}
    </button>
  );
}
