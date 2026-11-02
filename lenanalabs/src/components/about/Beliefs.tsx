import { principles } from "@/data/principles";

export default function Beliefs() {
  return <section className="band beliefs" id="beliefs" aria-labelledby="beliefs-heading"><div className="shell">
    <div className="beliefs-head"><div><p className="section-label mono">02 / What we believe</p><h2 className="h2" id="beliefs-heading">Four positions we keep returning to.</h2></div></div>
    <ol className="belief-list">{principles.map((principle, index) => <li className="belief" key={principle.title}>
      <span className="b-num">{String(index + 1).padStart(2, "0")}</span><h3>{principle.title}</h3><p>{principle.description}</p>
    </li>)}</ol>
  </div></section>;
}
