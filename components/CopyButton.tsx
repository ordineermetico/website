"use client";

import { useState } from "react";

export function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard unavailable: the text can still be selected */
        }
      }}
      className="label min-h-11 text-oe-bronze underline-offset-4 hover:underline"
      aria-live="polite"
    >
      {copied ? done : label}
    </button>
  );
}
