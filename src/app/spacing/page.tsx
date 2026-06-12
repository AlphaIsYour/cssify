"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets, Preset } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, SelectControl } from "@/components/Controls";

const spacingPresets: Preset[] = [
  { name: "4px Base", values: { base: 4, steps: 8, ratio: "linear" } },
  { name: "8px Base", values: { base: 8, steps: 8, ratio: "linear" } },
  { name: "4px Fibonacci", values: { base: 4, steps: 8, ratio: "fibonacci" } },
  { name: "4px Geometric", values: { base: 4, steps: 8, ratio: "geometric" } },
  { name: "Tailwind-like", values: { base: 4, steps: 10, ratio: "linear" } },
];

function generateScale(base: number, steps: number, ratio: string): number[] {
  const values: number[] = [0];
  if (ratio === "linear") {
    for (let i = 1; i <= steps; i++) values.push(base * i);
  } else if (ratio === "fibonacci") {
    let a = 1, b = 1;
    for (let i = 0; i < steps; i++) {
      values.push(Math.round(a * base));
      const temp = a + b;
      a = b;
      b = temp;
    }
  } else if (ratio === "geometric") {
    for (let i = 0; i <= steps; i++) values.push(Math.round(base * Math.pow(1.5, i)));
  }
  return values;
}

export default function SpacingPage() {
  const [base, setBase] = useState(4);
  const [steps, setSteps] = useState(8);
  const [ratio, setRatio] = useState("linear");
  const [activePreset, setActivePreset] = useState<string | null>("4px Base");
  const [previewSize, setPreviewSize] = useState(4);

  const applyPreset = (preset: Preset) => {
    const v = preset.values;
    setBase(v.base as number);
    setSteps(v.steps as number);
    setRatio(v.ratio as string);
    setActivePreset(preset.name);
  };

  const scale = generateScale(base, steps, ratio);

  const cssVars = scale
    .map((v, i) => `  --space-${i}: ${v}px;`)
    .join("\n");
  const cssOutput = `:root {\n${cssVars}\n}`;

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Spacing System Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Design and visualize spacing scales for consistent layout rhythm.
        </p>
      </div>

      <Presets presets={spacingPresets} active={activePreset} onSelect={(p) => {
        const preset = spacingPresets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Scale Settings</h3>
            <SliderControl label="Base unit" value={base} min={2} max={16} unit="px" onChange={(v) => { setBase(v); setActivePreset(null); }} />
            <SliderControl label="Steps" value={steps} min={4} max={16} onChange={(v) => { setSteps(v); setActivePreset(null); }} />
            <SelectControl
              label="Scale type"
              value={ratio}
              options={[
                { label: "Linear (×1)", value: "linear" },
                { label: "Fibonacci", value: "fibonacci" },
                { label: "Geometric (×1.5)", value: "geometric" },
              ]}
              onChange={(v) => { setRatio(v); setActivePreset(null); }}
            />
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Preview Control</h3>
            <SliderControl label="Spacing value" value={previewSize} min={0} max={scale[scale.length - 1]} unit="px" onChange={setPreviewSize} />
            <div className="flex items-end gap-3">
              <div className="w-12 h-12 rounded bg-primary/20 border border-primary/40" />
              <div style={{ width: `${previewSize}px` }} className="h-12 bg-primary/40 rounded transition-all" />
              <div className="w-12 h-12 rounded bg-primary/20 border border-primary/40" />
            </div>
            <div className="text-xs text-muted-foreground text-center">Gap: {previewSize}px</div>
          </div>

          <ExplanationPanel title="Spacing System Design">
            <div className="space-y-2">
              <p><strong>Linear</strong>: Equal increments (4, 8, 12, 16…). Simple and predictable.</p>
              <p><strong>Fibonacci</strong>: Natural growth (4, 4, 8, 12, 20, 32…). Good for visual hierarchy.</p>
              <p><strong>Geometric</strong>: Exponential growth (4, 6, 9, 14, 20…). Dramatic scale.</p>
              <p className="text-xs">💡 The 4px grid is the most common base. It aligns with most display pixel densities and creates visual harmony.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-4">Scale Visualization</h3>
            <div className="space-y-2">
              {scale.map((value, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">{i}</span>
                  <div
                    className="h-8 rounded bg-gradient-to-r from-primary/60 to-primary/30 transition-all flex items-center px-2"
                    style={{ width: `${Math.min(value * 2.5, 100)}%` }}
                  >
                    <span className="text-[10px] font-mono text-white font-medium">{value}px</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-4">Spacing in Action</h3>
            <div className="space-y-4">
              {scale.filter((_, i) => i > 0 && i % 2 === 0).map((value, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground w-12">{value}px</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }, (_, j) => (
                      <div key={j} className="flex items-center">
                        <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40" />
                        <div style={{ width: `${value}px` }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CodeOutput code={cssOutput} />
        </div>
      </div>
    </div>
  );
}
