type BriefFieldProps = {
  name: "name" | "email" | "brief";
  label: string;
  error?: string;
};

/** Shared labels, error association, and limits for the project brief. */
export default function BriefField({ name, label, error }: BriefFieldProps) {
  const id = `brief-${name}`;
  const errorId = `${name}-error`;
  const description = [name === "brief" ? "message-limit" : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined;
  const attributes = {
    id, name, required: true,
    "aria-invalid": Boolean(error),
    "aria-describedby": description,
  };

  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {name === "brief" ? (
        <textarea {...attributes} rows={4} maxLength={2000}
          placeholder="The situation, the constraint, what you have tried." />
      ) : (
        <input {...attributes} type={name === "email" ? "email" : "text"}
          autoComplete={name} maxLength={name === "name" ? 100 : 254} />
      )}
      {name === "brief" && <small id="message-limit">Up to 2,000 characters. All text fields are required.</small>}
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </label>
  );
}
