import { RotateCcw } from "lucide-react";
import { engineeringSteps } from "@/data/method";
import DecisionTree from "./DecisionTree";

export default function Method() {
  return <section className="band method" id="method" aria-labelledby="method-heading"><div className="shell">
    <div className="method-head"><div><p className="section-label mono">03 / How we think and work</p><h2 className="h2" id="method-heading">Most of the work is the cutting.</h2></div>
      <p className="body">A normal week is six approaches, five rejections and one build. The five steps below are the ones we actually repeat; the plate shows what the deciding looks like when it is written down.</p></div>
    <div className="method-visual"><DecisionTree /></div>
    <ol className="method-steps">{engineeringSteps.map(step => <li className="step" key={step.label}><span className="n">{step.label}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
    <p className="method-link mono">Most branches die between steps 02 and 03. The rest of the work is deciding which one deserves the build.</p>
    <p className="loop-note mono"><RotateCcw size={20} aria-hidden="true" />…and then again, usually with a better question</p>
  </div></section>;
}
