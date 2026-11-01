export const peaks = [
  { x: 214, y: 196, spread: 1, rings: 11, seed: .7 },
  { x: 118, y: 322, spread: .52, rings: 7, seed: 2.1 },
  { x: 312, y: 344, spread: .4, rings: 6, seed: 4.3 },
] as const;

export function ringPath(cx: number, cy: number, radius: number, seed: number) {
  return 'M' + Array.from({ length: 110 }, (_, i) => {
    const t = i / 110 * Math.PI * 2;
    const r = radius * (1 + .11 * Math.sin(3*t+seed) + .05 * Math.sin(5*t+seed*1.7) + .022 * Math.sin(9*t+seed*.6));
    return `${(cx+Math.cos(t)*r*1.16).toFixed(1)} ${(cy+Math.sin(t)*r*.84).toFixed(1)}`;
  }).join('L') + 'Z';
}

export function sampleElevation(x: number, y: number) {
  return Math.round(2400 + peaks.reduce((sum, p) => {
    const dx = (x-p.x)/(168*p.spread), dy = (y-p.y)/(128*p.spread);
    return sum + Math.exp(-(dx*dx+dy*dy)*2.1)*p.spread;
  }, 0)*2600);
}

export function clampPoint(x: number, y: number) {
  return { x: Math.max(0, Math.min(400, Number.isFinite(x) ? x : 214)), y: Math.max(0, Math.min(470, Number.isFinite(y) ? y : 196)) };
}

export const contours = peaks.flatMap((p, family) => Array.from({ length: p.rings }, (_, i) => ({
  id: `${family}-${i}`, d: ringPath(p.x, p.y, (14+(i+1)*15.5)*p.spread, p.seed),
  className: `contour${(i+1)%4 === 0 ? ' contour--index' : ''}${family === 0 && i === 6 ? ' contour--signal' : ''}`,
})));
