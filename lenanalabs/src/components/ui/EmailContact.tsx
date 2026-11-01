"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function EmailContact({ email }: { email: string }) {
  const [status, setStatus] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  const fallback = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showFallback) {
      fallback.current?.focus();
      fallback.current?.select();
    }
  }, [showFallback]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setShowFallback(false);
      setStatus("Email address copied.");
    } catch {
      setShowFallback(true);
      setStatus("Select and copy the email address below.");
    }
  }

  return (
    <div className="contact-direct">
      <a className="mail-link" href={`mailto:${email}`}>{email}</a>
      <button className="copy-btn" type="button" onClick={copy}>
        {status === "Email address copied." ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        Copy email
      </button>
      <span className="copy-state" role="status">{status}</span>
      {showFallback && <input className="copy-fallback" ref={fallback}
        aria-label="Email address to copy" value={email} readOnly onFocus={event => event.currentTarget.select()} />}
    </div>
  );
}
