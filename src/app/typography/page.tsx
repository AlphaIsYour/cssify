"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets, Preset } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl } from "@/components/Controls";

const typographyPresets: Preset[] = [
  { name: "Compact", values: { minSize: 14, maxSize: 20, minViewport: 320, maxViewport: 1200, scaleRatio: 1.2 } },
  { name: "Normal", values: { minSize: 16, maxSize: 24, minViewport: 320, maxViewport: 1200, scaleRatio: 1.25 } },
  { name: "Large", values: { minSize: 18, maxSize: 32, minViewport: 320, maxViewport: 1200, scaleRatio: 1.333 } },
  { name: "Dramatic", values: { minSize: 16, maxSize: 48, minViewport: 320, maxViewport: 1200, scaleRatio: 1.5 } },
  { name: "Subtle", values: { minSize: 15, maxSize: 18, minViewport: 320, maxViewport: 1200, scaleRatio: 1.2 } },
];

interface ScaleStep {
  name: string;
  level: number;
}

const scaleSteps: ScaleStep[] = [
  { name: "xs", level: -2 },
  { name: "sm", level: -1 },
  { name: "base", level: 0 },
  { name: "lg", level: 1 },
  { name: "xl", level: 2 },
  { name: "2xl", level: 3 },
  { name: "3xl", level: 4 },
  { name: "4xl", level: 5 },
];

export default function TypographyPage() {
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(24);
  const [minViewport, setMinViewport] = useState(320);
  const [maxViewport, setMaxViewport] = useState(1200);
  const [scaleRatio, setScaleRatio] = useState(1.25);
  const [activePreset, setActivePreset] = useState<string | null>("Normal");

  const applyPreset = (preset: Preset) => {
    const v = preset.values;
    setMinSize(v.minSize as number);
    setMaxSize(v.maxSize as number);
    setMinViewport(v.minViewport as number);
    setMaxViewport(v.maxViewport as number);
    setScaleRatio(v.scaleRatio as number);
    setActivePreset(preset.name);
  };

  const generateClamp = (level: number): string => {
    const min = minSize * Math.pow(scaleRatio, level);
    const max = maxSize * Math.pow(scaleRatio, level);
    const slope = (max - min) / (maxViewport - minViewport);
    const intercept = min - slope * minViewport;
    const vw = slope * 100;
    return `clamp(${min.toFixed(2)}px, ${intercept.toFixed(2)}px + ${vw.toFixed(2)}vw, ${max.toFixed(2)}px)`;
  };

  const cssVars = scaleSteps
    .map((step) => `  --font-${step.name}: ${generateClamp(step.level)};`)
    .join("\n");
  const cssOutput = `:root {\n${cssVars}\n}`;

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Typography Scale Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generate fluid typography scales using clamp() for responsive font sizing.
        </p>
      </div>

      <Presets presets={typographyPresets} active={activePreset} onSelect={(p) => {
        const preset = typographyPresets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Scale Settings</h3>
            <SliderControl label="Base min size" value={minSize} min={10} max={24} unit="px" onChange={(v) => { setMinSize(v); setActivePreset(null); }} />
            <SliderControl label="Base max size" value={maxSize} min={16} max={48} unit="px" onChange={(v) => { setMaxSize(v); setActivePreset(null); }} />
            <SliderControl label="Min viewport" value={minViewport} min={280} max={640} step={10} unit="px" onChange={(v) => { setMinViewport(v); setActivePreset(null); }} />
            <SliderControl label="Max viewport" value={maxViewport} min={768} max={1920} step={10} unit="px" onChange={(v) => { setMaxViewport(v); setActivePreset(null); }} />
            <SliderControl label="Scale ratio" value={scaleRatio} min={1.1} max={1.618} step={0.01} onChange={(v) => { setScaleRatio(v); setActivePreset(null); }} />
          </div>

          <ExplanationPanel title="How clamp() Works">
            <div className="space-y-2">
              <p><code>clamp(min, preferred, max)</code> sets a value that scales between min and max.</p>
              <p>The preferred value uses <code>vw</code> units to scale with viewport width.</p>
              <p><strong>Scale ratio</strong>: Each step multiplies by this factor. Common ratios:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>1.2 — Minor Third (compact)</li>
                <li>1.25 — Major Third (balanced)</li>
                <li>1.333 — Perfect Fourth (classic)</li>
                <li>1.5 — Perfect Fifth (dramatic)</li>
                <li>1.618 — Golden Ratio (bold)</li>
              </ul>
              <p className="text-xs">💡 Fluid typography eliminates breakpoint jumps. Font sizes scale smoothly between viewport sizes.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-4">Scale Preview</h3>
            <div className="space-y-3">
              {scaleSteps.map((step) => {
                const level = step.level;
                const min = minSize * Math.pow(scaleRatio, level);
                const max = maxSize * Math.pow(scaleRatio, level);
                return (
                  <div key={step.name} className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-10 shrink-0">{step.name}</span>
                    <div
                      className="font-medium truncate"
                      style={{ fontSize: generateClamp(level), lineHeight: 1.3 }}
                    >
                      The quick brown fox
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0 ml-auto">
                      {min.toFixed(0)}–{max.toFixed(0)}px
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <CodeOutput code={cssOutput} />
        </div>
      </div>
    </div>
  );
}
