import { capabilities } from "@/data/capabilities";
import EngineeringGlyph from "@/components/visuals/EngineeringGlyph";
export default function Capabilities() {
    return <section className="band" id="capabilities" aria-labelledby="capabilities-heading">
    <div className="shell cap-grid">
    <div className="cap-intro">
    <p className="section-label mono">02 / Capabilities</p>
    <h2 className="h2" id="capabilities-heading">Three ways<br />to move forward.</h2>
    <p className="cap-note">Areas of practice, not a fixed menu. When a problem sits between them, that is usually where it gets interesting.</p>
    </div>
    <div className="cap-list">{capabilities.map((item, index) => <article className="cap-row" key={item.id}>
        <span className="num">{item.id}</span>
        <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <ul className="cap-tags">{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
        <EngineeringGlyph index={index}/>
        </article>)}</div>
    </div>
    </section>;
}
