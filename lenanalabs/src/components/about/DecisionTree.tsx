"use client";

import { useState } from "react";
import { decisions } from "@/data/decisions";

export default function DecisionTree() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = decisions.find(decision => decision.id === selected);

  return (
    <figure className="tree">
      <div className="tree-head mono"><span>Fig. 01 — How a problem becomes a build</span><span>Six paths tested · one kept</span></div>
      <div className="tree-scroll">
        <svg viewBox="0 0 1200 420" role="img" aria-labelledby="decision-tree-title decision-tree-description" onPointerLeave={() => setSelected(null)}>
          <title id="decision-tree-title">An illustrative engineering decision tree</title>
          <desc id="decision-tree-description">One problem branches into six possible approaches. Five are rejected; one is built. All outcomes and reasons are available in the disclosure below.</desc>
          {[250, 430, 640].map((x, index) => <g key={x}><line className="axis" x1={x} y1="26" x2={x} y2="402" /><text x={x} y="18">{["Diverge", "Test", "Cut"][index]}</text></g>)}
          <path className="branch" d="M50 210H160" /><circle cx="50" cy="210" r="3.5" fill="var(--ink)" />
          <text className="label-strong" x="50" y="192">The problem</text><text x="50" y="234">as it arrives</text>
          <path className="branch" d="M160 210L250 80M160 210H250M160 210L250 340" />
          <path className="branch" d="M250 80L430 40M250 80L430 120M250 210L430 170M250 210L430 250M250 340L430 300M250 340L430 380" />
          {decisions.filter(decision => !decision.kept).map(decision => (
            <g className={`node term${selected === decision.id ? " selected" : ""}`} key={decision.id}
              onPointerEnter={() => setSelected(decision.id)} onPointerDown={() => setSelected(decision.id)}>
              <rect x="425" y={decision.y - 20} width="440" height="44" fill="transparent" />
              <path className="branch" d={`M430 ${decision.y}H640`} />
              <g className="cut" aria-hidden="true"><path d={`M636 ${decision.y - 6}l9 9M645 ${decision.y - 6}l-9 9`} /></g>
              <text x="656" y={decision.y - 4}>{decision.label.toLowerCase()}</text>
            </g>
          ))}
          <g className="keep" onPointerEnter={() => setSelected("survivor")} onPointerDown={() => setSelected("survivor")}>
            <path className="branch branch--keep" d="M430 250H860" /><circle cx="430" cy="250" r="3" fill="var(--signal)" />
            <text className="label-keep" x="470" y="236">small · testable · honest</text><rect x="860" y="238" width="24" height="24" fill="var(--signal)" />
            <text className="label-strong" x="900" y="246">A decision,</text><text x="900" y="264">not a guarantee</text><text x="900" y="286">build it, then measure it</text>
          </g>
        </svg>
      </div>
      <ol className="tree-list">
        {decisions.map(decision => <li className={decision.kept ? "kept" : ""} key={decision.id}>
          <span className="mark" aria-hidden="true">{decision.kept ? "→" : "×"}</span>
          <div><span>{decision.label}</span><p>{decision.reason}</p></div><span className="tag">{decision.kept ? "Kept" : "Cut"}</span>
        </li>)}
      </ol>
      <p className="tree-list-note mono">One path survives. The rest are recorded, not hidden.</p>
      <figcaption className="tree-foot mono"><span className="tree-readout" role="status">{current ? `${current.kept ? "Kept" : "Cut"} — ${current.reason}` : "Five approaches closed, one kept"}</span><span>Illustrative, not a recorded client decision</span></figcaption>
      <details className="tree-details"><summary>What was cut, and why</summary><ul>
        {decisions.map(decision => <li key={decision.id}><b>{decision.kept ? "Kept: " : ""}{decision.label}</b><span>{decision.reason}</span></li>)}
      </ul></details>
    </figure>
  );
}
