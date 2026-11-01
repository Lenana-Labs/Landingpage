"use client";
import { ArrowUpRight } from "lucide-react";

import { useRef, useState, type FormEvent } from "react";
import BriefField from "@/components/ui/BriefField";
import { site } from "@/config/site";
import { briefMailto, validateBrief, type Brief } from "@/lib/contact";
export default function ContactForm() {
    const [errors, setErrors] = useState<Partial<Record<keyof Brief, string>>>({});
    const [status, setStatus] = useState('');
    const form = useRef<HTMLFormElement>(null);
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const brief: Brief = { name: String(data.get('name') || ''), email: String(data.get('email') || '').trim(), focus: String(data.get('focus') || 'Not sure yet'), brief: String(data.get('brief') || '') };
        const invalid = validateBrief(brief);
        setErrors(invalid);
        if (Object.keys(invalid).length) {
            setStatus('Please check the highlighted fields.');
            form.current?.querySelector<HTMLElement>(`[name="${Object.keys(invalid)[0]}"]`)?.focus();
            return;
        }
        window.location.href = briefMailto(site.email, brief);
        setStatus('Your email app has been requested. Review and send the draft there. If it did not open, use the email link alongside this form.');
    };
    return <form className="brief" ref={form} noValidate onSubmit={submit} aria-describedby="form-note">
    <div className="field-row">
    <BriefField name="name" label="Your name" error={errors.name}/>
    <BriefField name="email" label="Email" error={errors.email}/>
    </div>
    <fieldset className="chips">
    <legend>What is this about?</legend>
    <div className="chip-row">{['Engineering', 'Product', 'Research', 'Not sure yet'].map((focus, index) => <label className="chip" key={focus}>
        <input type="radio" name="focus" value={focus} defaultChecked={index === 0}/>
        <span>{focus}</span>
        </label>)}</div>
    </fieldset>
    <BriefField name="brief" label="What are you working on?" error={errors.brief}/>
    <div className="form-actions">
    <button className="btn" type="submit">Open email draft <ArrowUpRight size={18} aria-hidden="true" />
    </button>
    <p className="form-note" id="form-note">Opens your email application. You review and send the message there. Nothing is submitted to this site.</p>
    </div>
    <p role="status" className="form-status">{status}</p>
    <noscript>
    <p>Use the email address alongside this form to contact the studio.</p>
    </noscript>
    </form>;
}
