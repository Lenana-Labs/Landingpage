"use client";

export default function ProductEnquiryLink({ name }: { name: string }) {
  return (
    <a href="#contact" className="inline-link" onClick={() => {
      window.dispatchEvent(new CustomEvent("lenana:product-enquiry", { detail: name }));
    }}>
      Ask about {name}<span aria-hidden="true">↗</span>
    </a>
  );
}
