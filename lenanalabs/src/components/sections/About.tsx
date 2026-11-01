export default function About() {
    return (<section className="band" id="about" aria-labelledby="about-heading">
    <div className="shell about-grid">
      <div className="about-head reveal">
        <p className="section-label mono">01 / About</p>
        <h2 className="h2" id="about-heading">Curiosity meets engineering.</h2>
      </div>
      <div className="about-body">
        <p className="body reveal">We are an early-stage studio, which is a constraint and an advantage: fewer layers, more attention, and the freedom to try something properly before committing to it.</p>
        <p className="body reveal">We explore practical engineering, product ideas, and emerging technology. Our aim is to test assumptions early and build useful systems with care. Based in Nairobi, open to working with teams wherever they are.</p>
        <ul className="focus reveal">
          <li>
    <span>Focus 01</span>
    <span>Applied AI where it earns its place, not where it makes a good slide.</span>
    </li>
          <li>
    <span>Focus 02</span>
    <span>Systems that keep working when the network, the budget or the team is smaller than hoped.</span>
    </li>
          <li>
    <span>Focus 03</span>
    <span>Tools we would use ourselves, built the way we would want to inherit them.</span>
    </li>
        </ul>
      </div>
    </div>
  </section>);
}
