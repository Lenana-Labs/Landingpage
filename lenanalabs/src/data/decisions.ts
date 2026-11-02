export const decisions = [
  { id: "volume", label: "Too slow at volume", reason: "It would not survive the traffic it would see.", y: 40, kept: false },
  { id: "operations", label: "Needs a 24/7 team", reason: "It would need an operations team we do not have.", y: 120, kept: false },
  { id: "maintenance", label: "Clever, unmaintainable", reason: "Elegant today, impossible to hand over in a year.", y: 170, kept: false },
  { id: "need", label: "Nobody has this problem", reason: "The need was assumed, not observed.", y: 300, kept: false },
  { id: "cost", label: "Costs more than it saves", reason: "The build outweighed the problem it solved.", y: 380, kept: false },
  { id: "survivor", label: "Small, testable, honest", reason: "Built, then measured against the original problem — not assumed to work.", y: 250, kept: true },
] as const;
