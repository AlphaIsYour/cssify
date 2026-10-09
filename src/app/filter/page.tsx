"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl } from "@/components/Controls";

interface FilterState {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
}

const defaultFilters: FilterState = {
  blur: 0, brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, invert: 0, opacity: 100, saturate: 100, sepia: 0,
};

const presets = [
  { name: "Normal", values: { ...defaultFilters } },
  { name: "Blur", values: { ...defaultFilters, blur: 4 } },
  { name: "Grayscale", values: { ...defaultFilters, grayscale: 100 } },
  { name: "Sepia", values: { ...defaultFilters, sepia: 80 } },
  { name: "High Contrast", values: { ...defaultFilters, contrast: 150, brightness: 110 } },
  { name: "Saturated", values: { ...defaultFilters, saturate: 200 } },
  { name: "Hue Shift", values: { ...defaultFilters, hueRotate: 90 } },
  { name: "Vintage", values: { ...defaultFilters, sepia: 40, contrast: 120, brightness: 90, saturate: 80 } },
];

export default function FilterPage() {
  const [filters, setFilters] = useState<FilterState>({ ...defaultFilters, saturate: 120, contrast: 110 });
  const [activePreset, setActivePreset] = useState<string | null>("Normal");

  const applyPreset = (preset: typeof presets[0]) => {
    setFilters({ ...preset.values });
    setActivePreset(preset.name);
  };

  const update = (key: keyof FilterState, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  };

  const filterParts: string[] = [];
  if (filters.blur > 0) filterParts.push(`blur(${filters.blur}px)`);
  if (filters.brightness !== 100) filterParts.push(`brightness(${filters.brightness}%)`);
  if (filters.contrast !== 100) filterParts.push(`contrast(${filters.contrast}%)`);
  if (filters.grayscale > 0) filterParts.push(`grayscale(${filters.grayscale}%)`);
  if (filters.hueRotate !== 0) filterParts.push(`hue-rotate(${filters.hueRotate}deg)`);
  if (filters.invert > 0) filterParts.push(`invert(${filters.invert}%)`);
  if (filters.opacity !== 100) filterParts.push(`opacity(${filters.opacity}%)`);
  if (filters.saturate !== 100) filterParts.push(`saturate(${filters.saturate}%)`);
  if (filters.sepia > 0) filterParts.push(`sepia(${filters.sepia}%)`);
  const cssValue = filterParts.length > 0 ? filterParts.join(" ") : "none";

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">CSS Filter Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Apply blur, brightness, contrast, saturate, hue-rotate and more with live preview.
        </p>
      </div>

      <Presets presets={presets.map((p) => ({ name: p.name, values: {} }))} active={activePreset} onSelect={(p) => {
        const preset = presets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Filter Controls</h3>
            <SliderControl label="blur" value={filters.blur} min={0} max={20} step={0.5} unit="px" onChange={(v) => update("blur", v)} />
            <SliderControl label="brightness" value={filters.brightness} min={0} max={300} unit="%" onChange={(v) => update("brightness", v)} />
            <SliderControl label="contrast" value={filters.contrast} min={0} max={300} unit="%" onChange={(v) => update("contrast", v)} />
            <SliderControl label="grayscale" value={filters.grayscale} min={0} max={100} unit="%" onChange={(v) => update("grayscale", v)} />
            <SliderControl label="hue-rotate" value={filters.hueRotate} min={0} max={360} unit="°" onChange={(v) => update("hueRotate", v)} />
            <SliderControl label="invert" value={filters.invert} min={0} max={100} unit="%" onChange={(v) => update("invert", v)} />
            <SliderControl label="opacity" value={filters.opacity} min={0} max={100} unit="%" onChange={(v) => update("opacity", v)} />
            <SliderControl label="saturate" value={filters.saturate} min={0} max={300} unit="%" onChange={(v) => update("saturate", v)} />
            <SliderControl label="sepia" value={filters.sepia} min={0} max={100} unit="%" onChange={(v) => update("sepia", v)} />
          </div>

          <ExplanationPanel title="CSS Filter Functions">
            <div className="space-y-2">
              <p><strong>blur()</strong>: Gaussian blur, higher = more blurry.</p>
              <p><strong>brightness()</strong>: 100% = normal, &gt;100% = brighter.</p>
              <p><strong>contrast()</strong>: 100% = normal, &gt;100% = more contrast.</p>
              <p><strong>grayscale()</strong>: Converts to grayscale (0–100%).</p>
              <p><strong>hue-rotate()</strong>: Shifts the hue wheel (0–360deg).</p>
              <p><strong>saturate()</strong>: 100% = normal, &gt;100% = more vivid.</p>
              <p><strong>sepia()</strong>: Applies a warm sepia tone.</p>
              <p className="text-xs">💡 Combine multiple filters. Order matters — they apply left to right.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div className="min-h-[300px] rounded-lg border border-dashed border-border overflow-hidden">
              <div
                className="w-full h-[300px]"
                style={{
                  filter: cssValue,
                  background: "linear-gradient(135deg, #81a6c6 0%, #aacddc 50%, #d2c4b4 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-center text-white">
                  <div className="text-5xl font-bold mb-2">CSS Filters</div>
                  <div className="text-lg opacity-80">Adjust the sliders to see effects</div>
                  <div className="flex gap-3 justify-center mt-4">
                    <div className="w-12 h-12 rounded-full bg-white/30" />
                    <div className="w-12 h-12 rounded-lg bg-yellow-400/80" />
                    <div className="w-12 h-12 rounded bg-pink-400/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CodeOutput code={`filter: ${cssValue};`} />
        </div>
      </div>
    </div>
  );
}
