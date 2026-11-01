"use client";
import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { clampPoint, contours, sampleElevation } from "@/lib/terrain";
const initial = { x: 214, y: 196 };
export default function TerrainVisualization() {
    const [point, setPoint] = useState(initial);
    const latest = useRef(initial);
    const frame = useRef<number | null>(null);
    const cancel = () => {
        if (frame.current !== null)
            cancelAnimationFrame(frame.current);
        frame.current = null;
    };
    useEffect(() => () => cancel(), []);
    const update = (next: typeof initial) => {
        latest.current = clampPoint(next.x, next.y);
        if (typeof requestAnimationFrame !== 'function') {
            setPoint(latest.current);
            return;
        }
        if (frame.current === null)
            frame.current = requestAnimationFrame(() => {
                frame.current = null;
                setPoint(previous => previous.x === latest.current.x && previous.y === latest.current.y ? previous : latest.current);
            });
    };
    const sample = (event: PointerEvent<SVGSVGElement>) => {
        const svg = event.currentTarget;
        const matrix = svg.getScreenCTM();
        if (!matrix)
            return;
        const position = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
        update(position);
    };
    const reset = () => { cancel(); latest.current = initial; setPoint(initial); };
    const keyboard = (event: KeyboardEvent<SVGSVGElement>) => {
        const directions: Record<string, [
            number,
            number
        ]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
        if (event.key === 'Home' || event.key === 'Escape') {
            event.preventDefault();
            reset();
            return;
        }
        const delta = directions[event.key];
        if (delta) {
            event.preventDefault();
            update({ x: latest.current.x + delta[0], y: latest.current.y + delta[1] });
        }
    };
    return <figure className="plate plate-engaged">
    <div className="plate-head mono">
    <span>Survey plate / 01</span>
    <span>Synthetic terrain</span>
    </div>
    <svg viewBox="0 0 400 470" role="img" tabIndex={0} aria-labelledby="terrain-title terrain-description" onPointerMove={sample} onPointerDown={sample} onPointerLeave={event => { if (event.pointerType !== "touch")
        reset(); }} onPointerCancel={reset} onKeyDown={keyboard}>
      <title id="terrain-title">An imagined summit, plotted in contours</title>
      <desc id="terrain-description">Illustrative terrain with a route to a summit. Move a pointer, tap, or use arrow keys to sample local X and Y coordinates and synthetic elevation. Home resets the sample. These are not geographical measurements.</desc>
      <g className="grid" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <g key={i}>
        <line x1={i * 40} y1="0" x2={i * 40} y2="470"/>
        <line x1="0" y1={i * 40} x2="400" y2={i * 40}/>
        </g>)}</g>
      <g aria-hidden="true">{contours.map(contour => <path key={contour.id} d={contour.d} className={contour.className}/>)}
        <path className="route" d="M42 428 L96 392 L128 348 L150 300 L186 250 L214 196"/>
        <circle cx="42" cy="428" r="3" fill="var(--signal)"/>
    <circle cx="214" cy="196" r="4" fill="var(--signal)"/>
        <text x="226" y="185">MODEL SUMMIT</text>
    <text x="12" y="458">ILLUSTRATIVE / NOT TO SCALE</text>
      </g>
      <g className="cross" aria-hidden="true">
    <line x1={point.x} y1="0" x2={point.x} y2="470"/>
    <line x1="0" y1={point.y} x2="400" y2={point.y}/>
    <circle cx={point.x} cy={point.y} r="7"/>
    </g>
    </svg>
    <figcaption className="plate-foot mono">
    <span>X {Math.round(point.x).toString().padStart(3, '0')}</span>
    <span>Y {Math.round(point.y).toString().padStart(3, '0')}</span>
    <span>Model {sampleElevation(point.x, point.y).toLocaleString('en-US')} m</span>
    </figcaption>
    <p className="terrain-help">Move, tap, or use arrow keys to explore. Synthetic values.</p>
  </figure>;
}
