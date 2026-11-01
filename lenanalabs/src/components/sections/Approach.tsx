const stages = [
    { title: "Understand", heading: "Read the situation", text: "The process, the constraint, the people who will actually use it. Before proposing anything." },
    { title: "Experiment", heading: "Test the assumption", text: "Build the smallest thing that could disprove the idea. Find the hard part while it is still small." },
    { title: "Engineer", heading: "Build it properly", text: "Clear interfaces, meaningful tests, and decisions the next person can maintain." },
    { title: "Refine", heading: "Learn from use", text: "Watch it work. Measure what changed. Improve what matters and remove what does not." }
];
export default function Approach() {
    return <section className="band approach" id="approach" aria-labelledby="approach-heading">
    <div className="shell">
    <div className="approach-head">
    <p className="section-label mono">03 / Approach</p>
    <h2 className="h2" id="approach-heading">A clear route.<br />Room to rethink.</h2>
    </div>
    <ol className="process-route">{stages.map((stage, index) => <li key={stage.title}>
        <div className="process-node" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
        <p className="mono process-label">{stage.title}</p>
        <h3>{stage.heading}</h3>
        <p>{stage.text}</p>
        </li>)}</ol>
    <p className="approach-foot mono">Stages overlap. Learning brings us back around.</p>
    </div>
    </section>;
}
