"use client";

import { useState, useRef } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, SelectControl } from "@/components/Controls";

const easingPresets = [
  { name: "Linear", value: "linear" },
  { name: "Ease", value: "ease" },
  { name: "Ease In", value: "ease-in" },
  { name: "Ease Out", value: "ease-out" },
  { name: "Ease In Out", value: "ease-in-out" },
  { name: "Snap", value: "cubic-bezier(0, 0.7, 0.3, 1)" },
  { name: "Bounce", value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
  { name: "Smooth", value: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
];

function parseCubicBezier(value: string): [number, number, number, number] {
  const match = value.match(/cubic-bezier\(([^)]+)\)/);
  if (match) {
    const nums = match[1].split(",").map(Number) as [number, number, number, number];
    return nums;
  }
  const builtIn: Record<string, [number, number, number, number]> = {
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
  };
  return builtIn[value] || [0.25, 0.1, 0.25, 1];
}

function cubicBezierPath(p1x: number, p1y: number, p2x: number, p2y: number, steps = 100): string {
  const points: [number, number][] = [];
  for (let t = 0; t <= 1; t += 1 / steps) {
    const x = 3 * (1 - t) * (1 - t) * t * p1x + 3 * (1 - t) * t * t * p2x + t * t * t;
    const y = 3 * (1 - t) * (1 - t) * t * p1y + 3 * (1 - t) * t * t * p2y + t * t * t;
    points.push([x, y]);
  }
  return points.map((p) => `${p[0] * 200},${200 - p[1] * 200}`).join(" L");
}

export default function TransitionPage() {
  const [duration, setDuration] = useState(300);
  const [delay, setDelay] = useState(0);
  const [property, setProperty] = useState("all");
  const [easing, setEasing] = useState("cubic-bezier(0.25, 0.1, 0.25, 1)");
  const [activePreset, setActivePreset] = useState<string | null>("Smooth");
  const [isAnimating, setIsAnimating] = useState(true);
  const ballRef = useRef<HTMLDivElement>(null);

  const applyPreset = (preset: typeof easingPresets[0]) => {
    setEasing(preset.value);
    setActivePreset(preset.name);
  };

  const triggerAnimation = () => {
    setIsAnimating(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });
  };

  const [p1x, p1y, p2x, p2y] = parseCubicBezier(easing);
  const pathData = cubicBezierPath(p1x, p1y, p2x, p2y);

  const cssValue = `transition: ${property} ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ""};`;

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Transition Timing Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visualize easing curves, compare timing functions, and generate transition CSS.
        </p>
      </div>

      <Presets presets={easingPresets.map((p) => ({ name: p.name, values: {} }))} active={activePreset} onSelect={(p) => {
        const preset = easingPresets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Transition Properties</h3>
            <SelectControl
              label="property"
              value={property}
              options={[
                { label: "all", value: "all" },
                { label: "transform", value: "transform" },
                { label: "opacity", value: "opacity" },
                { label: "background-color", value: "background-color" },
                { label: "width", value: "width" },
              ]}
              onChange={setProperty}
            />
            <SliderControl label="duration" value={duration} min={50} max={2000} step={50} unit="ms" onChange={setDuration} />
            <SliderControl label="delay" value={delay} min={0} max={1000} step={50} unit="ms" onChange={setDelay} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Custom cubic-bezier</label>
              <input
                type="text"
                value={easing}
                onChange={(e) => { setEasing(e.target.value); setActivePreset(null); }}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
              />
            </div>
          </div>

          {/* Curve visualization */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Easing Curve</h3>
            <svg viewBox="0 0 200 200" className="w-full aspect-square">
              <rect x="0" y="0" width="200" height="200" fill="none" stroke="var(--border)" strokeWidth="1" />
              {/* Grid */}
              <line x1="50" y1="0" x2="50" y2="200" stroke="var(--border)" strokeWidth="0.5" />
              <line x1="100" y1="0" x2="100" y2="200" stroke="var(--border)" strokeWidth="0.5" />
              <line x1="150" y1="0" x2="150" y2="200" stroke="var(--border)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="200" y2="50" stroke="var(--border)" strokeWidth="0.5" />
              <line x1="0" y1="100" x2="200" y2="100" stroke="var(--border)" strokeWidth="0.5" />
              <line x1="0" y1="150" x2="200" y2="150" stroke="var(--border)" strokeWidth="0.5" />
              {/* Diagonal reference */}
              <line x1="0" y1="200" x2="200" y2="0" stroke="var(--muted-foreground)" strokeWidth="0.5" strokeDasharray="4" opacity="0.3" />
              {/* Control point lines */}
              <line x1="0" y1="200" x2={p1x * 200} y2={200 - p1y * 200} stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
              <line x1="200" y1="0" x2={p2x * 200} y2={200 - p2y * 200} stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
              {/* Curve */}
              <path d={`M0,200 L${pathData}`} fill="none" stroke="var(--primary)" strokeWidth="2.5" />
              {/* Control points */}
              <circle cx={p1x * 200} cy={200 - p1y * 200} r="4" fill="var(--primary)" />
              <circle cx={p2x * 200} cy={200 - p2y * 200} r="4" fill="var(--primary)" />
              {/* Labels */}
              <text x="5" y="195" fontSize="8" fill="var(--muted-foreground)">0,0</text>
              <text x="175" y="12" fontSize="8" fill="var(--muted-foreground)">1,1</text>
            </svg>
            <div className="text-center text-xs text-muted-foreground mt-2">
              cubic-bezier({p1x}, {p1y}, {p2x}, {p2y})
            </div>
          </div>

          <ExplanationPanel title="Timing Functions">
            <div className="space-y-2">
              <p><strong>linear</strong>: Constant speed (boring but predictable).</p>
              <p><strong>ease</strong>: Slow start, fast middle, slow end (default).</p>
              <p><strong>ease-in</strong>: Slow start, accelerates.</p>
              <p><strong>ease-out</strong>: Fast start, decelerates.</p>
              <p><strong>cubic-bezier()</strong>: Custom curve with 2 control points.</p>
              <p className="text-xs">💡 Use ease-out for UI interactions (feels responsive). Use ease-in-out for decorative animations.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div className="space-y-4">
              <button
                onClick={triggerAnimation}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
              >
                Animate
              </button>
              <div className="relative h-[100px] rounded-lg border border-dashed border-border overflow-hidden preview-checkerboard">
                <div
                  ref={ballRef}
                  className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
                  style={{
                    left: isAnimating ? "calc(100% - 60px)" : "12px",
                    transition: `${property} ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ""}`,
                  }}
                />
              </div>
              <div className="relative h-[60px] rounded-lg border border-dashed border-border overflow-hidden preview-checkerboard">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg"
                  style={{
                    left: isAnimating ? "calc(100% - 60px)" : "12px",
                    opacity: isAnimating ? 0.3 : 1,
                    transform: `translateY(-50%) scale(${isAnimating ? 0.6 : 1})`,
                    transition: `all ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ""}`,
                  }}
                />
              </div>
            </div>
          </div>
          <CodeOutput code={cssValue} />
        </div>
      </div>
    </div>
  );
}
