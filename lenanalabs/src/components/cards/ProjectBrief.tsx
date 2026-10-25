"use client";

import { useEffect, useRef, useState } from "react";
import { contactEmail, projectEmail } from "@/content/site";

const interests = ["A digital product", "AI & data", "Software infrastructure", "Not sure yet"];

export default function ProjectBrief() {
  const [interest, setInterest] = useState(interests[3]);
  const [brief, setBrief] = useState("");
  const [product, setProduct] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  const fallback = useRef<HTMLInputElement>(null);
  const subject = product ? `Product enquiry: ${product}` : `Project enquiry: ${interest}`;
  const body = `Hi Lenana Labs,\n\n${product ? `I'd like to learn about ${product}.` : interest === "Not sure yet" ? "I'd like to discuss an idea and find the right approach." : `I'd like to discuss ${interest.toLowerCase()}.`}\n\n${brief}\n\n`;

  useEffect(() => {
    const selectProduct = (event: Event) => {
      setProduct((event as CustomEvent<string>).detail);
      setCopyStatus("");
    };
    window.addEventListener("lenana:product-enquiry", selectProduct);
    return () => window.removeEventListener("lenana:product-enquiry", selectProduct);
  }, []);
  useEffect(() => {
    if (showFallback) fallback.current?.focus();
  }, [showFallback]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus("Email address copied.");
      setShowFallback(false);
    } catch {
      setShowFallback(true);
      setCopyStatus("Select and copy the email address.");
    }
  };

  return (
    <div className="project-brief">
      {product && <div className="enquiry-context"><p role="status">Enquiring about <strong>{product}</strong></p><button type="button" onClick={() => {
        setProduct("");
        requestAnimationFrame(() => document.querySelector<HTMLInputElement>('.interest-options input:checked')?.focus());
      }} aria-label={`Remove ${product} from enquiry`}>Remove</button></div>}
      <fieldset hidden={Boolean(product)}><legend>I’d like to discuss</legend><div className="interest-options">{interests.map(item => <label key={item}><input type="radio" name="interest" value={item} checked={interest === item} onChange={() => setInterest(item)} /><span>{item}</span></label>)}</div></fieldset>
      <label className="brief-label" htmlFor="project-summary">A little about your project <span>(optional)</span></label>
      <textarea id="project-summary" aria-describedby="brief-limit" value={brief} onChange={event => setBrief(event.target.value)} maxLength={2000} rows={2} placeholder="Who is it for, and what should it help them do?" />
      <span id="brief-limit" className="sr-only">Maximum 2,000 characters.</span>
      <div className="contact-actions">
        <a className="action action-ink" href={projectEmail(subject, body)}>Continue by email <span aria-hidden="true">↗</span></a>
        <button type="button" className="email-copy-button" onClick={copyEmail} aria-label="Copy email address" title={copyStatus === "Email address copied." ? "Copied" : "Copy email address"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {copyStatus === "Email address copied." ? <path d="m5 12 4 4L19 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>}
          </svg>
        </button>
      </div>
      <p className="sr-only" role="status" id="copy-status">{copyStatus}</p>
      {showFallback && <input ref={fallback} className="copy-fallback" aria-label="Email address to copy" readOnly value={contactEmail} onFocus={event => event.currentTarget.select()} />}
    </div>
  );
}
