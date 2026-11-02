export default function ExplorationDiagram() {return (
<section className="band" id="explore" aria-labelledby="explore-heading">
    <div className="shell explore-grid">
      <figure className="triangle">
        <svg viewBox="0 0 640 560" role="img" aria-label="Three activities — client work, internal products and research — arranged in a loop, each feeding the next.">
          <defs>
            <marker id="exploration-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0l10 5-10 5z" fill="#4E4839"/>
            </marker>
          </defs>
          <circle className="ring" cx="320" cy="300" r="212"/>
          <circle className="ring" cx="320" cy="300" r="150" strokeDasharray="1 8"/>

          <path className="arc" d="M272 132Q170 220 148 372" markerEnd="url(#exploration-arrow)"/>
          <path className="arc" d="M196 462Q320 508 444 462" markerEnd="url(#exploration-arrow)"/>
          <path className="arc" d="M492 372Q470 220 368 132" markerEnd="url(#exploration-arrow)"/>

          <text className="edge-label" x="146" y="252">exposes harder problems</text>
          <text className="edge-label" x="356" y="516">makes it real</text>
          <text className="edge-label" x="440" y="252">proves it in the open</text>

          <circle className="node" cx="320" cy="96" r="66"/>
          <text x="320" y="92" textAnchor="middle">CLIENT</text>
          <text x="320" y="106" textAnchor="middle">WORK</text>

          <circle className="node node--signal" cx="120" cy="440" r="66"/>
          <text x="120" y="436" textAnchor="middle">RESEARCH</text>
          <text x="120" y="450" textAnchor="middle">&amp; EXPERIMENTS</text>

          <circle className="node" cx="520" cy="440" r="66"/>
          <text x="520" y="436" textAnchor="middle">INTERNAL</text>
          <text x="520" y="450" textAnchor="middle">PRODUCTS</text>

          <text className="core" x="320" y="290" textAnchor="middle">One practice</text>
          <text x="320" y="310" textAnchor="middle">three activities, deliberately touching</text>
        </svg>
        <figcaption className="mono exploration-caption">
          <span>Fig. 02 — The working loop</span><span>Nothing runs in isolation</span>
        </figcaption>
      </figure>

      <div className="explore-side">
        <p className="section-label mono">04 / What we explore</p>
        <h2 className="h2" id="explore-heading">Three activities, one loop.</h2>
        <p className="body">Client engineering, internal products and research are not separate departments. What we learn in one changes how we work in the others — a method, a pattern, a way of testing. Skills travel between them; client code, data and confidential detail do not travel without permission.</p>
        <div className="explore-list">
          <article><span className="n mono">01</span><div><h3>Client engineering</h3><p>Solutions shaped by somebody else&apos;s constraint — which is usually the most useful constraint available.</p></div></article>
          <article><span className="n mono">02</span><div><h3>Internal products</h3><p>Software and tools we own, which means living with every decision we make in them.</p></div></article>
          <article><span className="n mono">03</span><div><h3>Research &amp; experiments</h3><p>Technical questions pursued far enough to produce a verdict, not just a demo.</p></div></article>
        </div>
      </div>
    </div>
  </section>
);}
