export default function EngineeringGlyph({ index }: {
    index: number;
}) {
    return <span className="cap-glyph" aria-hidden="true">{[(<svg key="glyph-0" viewBox="0 0 108 64" fill="none">
              <path d="M2 2v60h104" strokeWidth="1"/>
              <path d="M2 46h20v-14h20v-12h20V8" strokeWidth="1.2" className="lit"/>
              <circle cx="62" cy="8" r="3" fill="none" strokeWidth="1.2"/>
            </svg>), (<svg key="glyph-1" viewBox="0 0 108 64" fill="none">
              <rect x="6" y="14" width="52" height="46" strokeWidth="1.2"/>
              <rect x="18" y="6" width="52" height="46" strokeWidth="1.2" className="lit"/>
              <path d="M28 28h32M28 38h20" strokeWidth="1"/>
            </svg>), (<svg key="glyph-2" viewBox="0 0 108 64" fill="none">
              <path d="M54 32c0-10 8-18 18-18s18 8 18 18-8 18-18 18" strokeWidth="1.2" className="lit"/>
              <path d="M54 32c0 10-8 18-18 18S18 42 18 32s8-18 18-18" strokeWidth="1.2"/>
              <circle cx="54" cy="32" r="4" fill="none" strokeWidth="1.2"/>
            </svg>)][index]}</span>;
}
