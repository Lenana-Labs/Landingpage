export type Brief = {
    name: string;
    email: string;
    focus: string;
    brief: string;
};
export function validateBrief(data: Brief) {
    const errors: Partial<Record<keyof Brief, string>> = {};
    if (!data.name.trim())
        errors.name = 'Enter your name.';
    else if (data.name.length > 100)
        errors.name = 'Use 100 characters or fewer.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
        errors.email = 'Enter a valid email address.';
    if (!data.brief.trim())
        errors.brief = 'Tell us a little about the problem.';
    else if (data.brief.length > 2000)
        errors.brief = 'Use 2,000 characters or fewer.';
    return errors;
}
export function briefMailto(email: string, data: Brief) { return `mailto:${email}?subject=${encodeURIComponent(`Project enquiry — ${data.focus}`)}&body=${encodeURIComponent(`Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nFocus: ${data.focus}\n\nBrief:\n${data.brief.trim()}`)}`; }
