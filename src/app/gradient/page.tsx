"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, ColorInput, SelectControl } from "@/components/Controls";

interface ColorStop {
  color: string;
  position: number;
}

const gradientPresets = [
  { name: "Sunset", type: "linear", angle: 135, stops: [{ color: "#f97316", position: 0 }, { color: "#ec4899", position: 50 }, { color: "#8b5cf6", position: 100 }] },
  { name: "Ocean", type: "linear", angle: 180, stops: [{ color: "#0ea5e9", position: 0 }, { color: "#6366f1", position: 100 }] },
  { name: "Forest", type: "linear", angle: 135, stops: [{ color: "#22c55e", position: 0 }, { color: "#14b8a6", position: 50 }, { color: "#06b6d4", position: 100 }] },
  { name: "Midnight", type: "linear", angle: 135, stops: [{ color: "#1e1b4b", position: 0 }, { color: "#312e81", position: 50 }, { color: "#4c1d95", position: 100 }] },
  { name: "Radial Warm", type: "radial", angle: 0, stops: [{ color: "#fbbf24", position: 0 }, { color: "#f97316", position: 50 }, { color: "#ef4444", position: 100 }] },
  { name: "Conic Rainbow", type: "conic", angle: 0, stops: [{ color: "#ef4444", position: 0 }, { color: "#f59e0b", position: 17 }, { color: "#22c55e", position: 33 }, { color: "#3b82f6", position: 50 }, { color: "#8b5cf6", position: 67 }, { color: "#ec4899", position: 83 }, { color: "#ef4444", position: 100 }] },
];

export default function GradientPage() {
  const [gradientType, setGradientType] = useState("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#81a6c6", position: 0 },
    { color: "#aacddc", position: 50 },
    { color: "#f3e3d0", position: 100 },
  ]);
  const [activePreset, setActivePreset] = useState<string | null>("Sunset");

  const applyPreset = (preset: typeof gradientPresets[0]) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops.map((s) => ({ ...s })));
    setActivePreset(preset.name);
  };

  const updateStop = (index: number, key: keyof ColorStop, value: string | number) => {
    setStops((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next.sort((a, b) => a.position - b.position);
    });
    setActivePreset(null);
  };

  const addStop = () => {
    setStops((prev) => [...prev, { color: "#ffffff", position: 50 }].sort((a, b) => a.position - b.position));
    setActivePreset(null);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
    setActivePreset(null);
  };

  const stopsStr = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
  let gradientCSS = "";
  if (gradientType === "linear") {
    gradientCSS = `linear-gradient(${angle}deg, ${stopsStr})`;
  } else if (gradientType === "radial") {
    gradientCSS = `radial-gradient(circle, ${stopsStr})`;
  } else {
    gradientCSS = `conic-gradient(from ${angle}deg, ${stopsStr})`;
  }

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Gradient Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Build linear, radial, and conic gradients with color stops and angle controls.
        </p>
      </div>

      <Presets presets={gradientPresets.map((p) => ({ name: p.name, values: {} }))} active={activePreset} onSelect={(p) => {
        const preset = gradientPresets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Gradient Settings</h3>
            <SelectControl
              label="Type"
              value={gradientType}
              options={[
                { label: "Linear", value: "linear" },
                { label: "Radial", value: "radial" },
                { label: "Conic", value: "conic" },
              ]}
              onChange={(v) => { setGradientType(v); setActivePreset(null); }}
            />
            <SliderControl label={gradientType === "radial" ? "rotation" : "angle"} value={angle} min={0} max={360} unit="°" onChange={(v) => { setAngle(v); setActivePreset(null); }} />
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-3">
            <h3 className="text-sm font-semibold">Color Stops</h3>
            {stops.map((stop, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <ColorInput label={`Stop ${i + 1}`} value={stop.color} onChange={(v) => updateStop(i, "color", v)} />
                </div>
                <div className="w-20">
                  <label className="text-xs font-medium text-muted-foreground">Position</label>
                  <input
                    type="number"
                    value={stop.position}
                    min={0}
                    max={100}
                    onChange={(e) => updateStop(i, "position", Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm font-mono mt-1"
                  />
                </div>
                {stops.length > 2 && (
                  <button onClick={() => removeStop(i)} className="text-xs text-error hover:underline pb-2">✕</button>
                )}
              </div>
            ))}
            <button onClick={addStop} className="w-full py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:bg-accent transition-colors">
              + Add Color Stop
            </button>
          </div>

          <ExplanationPanel title="Gradient Types">
            <div className="space-y-2">
              <p><strong>linear-gradient()</strong>: Colors transition along a straight line at a given angle.</p>
              <p><strong>radial-gradient()</strong>: Colors radiate outward from a center point.</p>
              <p><strong>conic-gradient()</strong>: Colors rotate around a center point (like a color wheel).</p>
              <p className="text-xs">💡 Color stops define where each color appears. Positions from 0% to 100%.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div
              className="w-full h-[300px] rounded-lg border border-dashed border-border"
              style={{ background: gradientCSS }}
            />
          </div>
          <CodeOutput code={`background: ${gradientCSS};`} />
        </div>
      </div>
    </div>
  );
}
