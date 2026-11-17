"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";

type Field = "name" | "email" | "message";
const fields: { name: Field; label: string; placeholder: string }[] = [
  { name: "name", label: "Your name", placeholder: "Jane Doe" },
  { name: "email", label: "Email address", placeholder: "jane@example.com" },
  { name: "message", label: "What's on your mind?", placeholder: "Tell us a little about what you're thinking, building, or trying to solve." },
];

export default function InquiryForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const invalid: Partial<Record<Field, string>> = {};
    if (!name) invalid.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid.email = "Enter a valid email address.";
    if (!message) invalid.message = "Please enter a message.";
    setErrors(invalid);
    const first = fields.find(field => invalid[field.name]);
    if (first) {
      setStatus("Please check the highlighted fields.");
      form.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("An inquiry for LenanaLabs")}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app has been requested. Review and send the draft there. If it didn't open, use the email address below. Your text is still here.");
  }

  return <form className="inquiry-form" ref={form} action={`mailto:${site.email}`} method="post" encType="text/plain" noValidate onSubmit={submit} aria-describedby="inquiry-note">
    {fields.map(({ name, label, placeholder }) => {
      const attributes = { id: `inquiry-${name}`, name, required: true, placeholder,
        "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `inquiry-${name}-error` : undefined };
      return <div className="inquiry-field" key={name}>
        <label htmlFor={attributes.id}>{label}</label>
        {name === "message" ? <textarea {...attributes} rows={6} /> : <input {...attributes} type={name === "email" ? "email" : "text"} autoComplete={name} />}
        {errors[name] && <p className="inquiry-error" id={`inquiry-${name}-error`}>{errors[name]}</p>}
      </div>;
    })}
    <button className="inquiry-submit" type="submit">Open email draft <ArrowUpRight size={20} aria-hidden="true" /></button>
    <p id="inquiry-note" className="inquiry-note">Opens your email app. Review and send your message there.</p>
    <p className="inquiry-status" role="status">{status}</p>
    <noscript><p>To contact the studio without JavaScript, <a href={`mailto:${site.email}`}>email {site.email}</a>.</p></noscript>
  </form>;
}
