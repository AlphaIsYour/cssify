"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, ColorInput } from "@/components/Controls";

interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const defaultShadow: ShadowLayer = { x: 0, y: 4, blur: 12, spread: 0, color: "#000000", opacity: 25, inset: false };

const presets = [
  { name: "Subtle", layers: [{ ...defaultShadow, x: 0, y: 1, blur: 3, spread: 0, opacity: 10 }] },
  { name: "Medium", layers: [{ ...defaultShadow, x: 0, y: 4, blur: 12, spread: 0, opacity: 15 }] },
  { name: "Large", layers: [{ ...defaultShadow, x: 0, y: 10, blur: 30, spread: 0, opacity: 20 }] },
  { name: "Neumorphism", layers: [{ ...defaultShadow, x: -5, y: -5, blur: 10, spread: 0, color: "#ffffff", opacity: 50 }, { ...defaultShadow, x: 5, y: 5, blur: 10, spread: 0, opacity: 25 }] },
  { name: "Inset", layers: [{ ...defaultShadow, x: 0, y: 2, blur: 8, spread: 0, opacity: 15, inset: true }] },
  { name: "Neon Glow", layers: [{ ...defaultShadow, x: 0, y: 0, blur: 20, spread: 5, color: "#6366f1", opacity: 60 }] },
  { name: "Layered", layers: [{ ...defaultShadow, x: 0, y: 1, blur: 2, spread: 0, opacity: 10 }, { ...defaultShadow, x: 0, y: 4, blur: 8, spread: 0, opacity: 10 }, { ...defaultShadow, x: 0, y: 12, blur: 24, spread: 0, opacity: 10 }] },
];

function shadowToCSS(layers: ShadowLayer[]): string {
  return layers
    .map((l) => {
      const r = parseInt(l.color.slice(1, 3), 16);
      const g = parseInt(l.color.slice(3, 5), 16);
      const b = parseInt(l.color.slice(5, 7), 16);
      const alpha = l.opacity / 100;
      return `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(${r}, ${g}, ${b}, ${alpha})`;
    })
    .join(",\n  ");
}

export default function BoxShadowPage() {
  const [layers, setLayers] = useState<ShadowLayer[]>([{ ...defaultShadow }]);
  const [activePreset, setActivePreset] = useState<string | null>("Medium");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [borderRadius, setBorderRadius] = useState(12);
  const [elementWidth, setElementWidth] = useState(200);
  const [elementHeight, setElementHeight] = useState(200);

  const applyPreset = (preset: typeof presets[0]) => {
    setLayers(preset.layers.map((l) => ({ ...l })));
    setActivePreset(preset.name);
  };

  const updateLayer = (index: number, key: keyof ShadowLayer, value: string | number | boolean) => {
    setLayers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
    setActivePreset(null);
  };

  const addLayer = () => {
    setLayers((prev) => [...prev, { ...defaultShadow }]);
    setActivePreset(null);
  };

  const removeLayer = (index: number) => {
    if (layers.length <= 1) return;
    setLayers((prev) => prev.filter((_, i) => i !== index));
    setActivePreset(null);
  };

  const cssValue = shadowToCSS(layers);
  const fullCSS = `box-shadow: ${cssValue};`;

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Box Shadow Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Design layered box shadows with live preview, inset toggle, and spread controls.
        </p>
      </div>

      <Presets presets={presets.map((p) => ({ name: p.name, values: {} }))} active={activePreset} onSelect={(p) => {
        const preset = presets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Element Settings</h3>
            <ColorInput label="Background" value={bgColor} onChange={setBgColor} />
            <SliderControl label="border-radius" value={borderRadius} min={0} max={50} unit="px" onChange={setBorderRadius} />
            <SliderControl label="width" value={elementWidth} min={80} max={400} unit="px" onChange={setElementWidth} />
            <SliderControl label="height" value={elementHeight} min={80} max={400} unit="px" onChange={setElementHeight} />
          </div>

          {layers.map((layer, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Shadow Layer {i + 1}</h3>
                {layers.length > 1 && (
                  <button onClick={() => removeLayer(i)} className="text-xs text-error hover:underline">Remove</button>
                )}
              </div>
              <SliderControl label="x offset" value={layer.x} min={-50} max={50} unit="px" onChange={(v) => updateLayer(i, "x", v)} />
              <SliderControl label="y offset" value={layer.y} min={-50} max={50} unit="px" onChange={(v) => updateLayer(i, "y", v)} />
              <SliderControl label="blur" value={layer.blur} min={0} max={100} unit="px" onChange={(v) => updateLayer(i, "blur", v)} />
              <SliderControl label="spread" value={layer.spread} min={-50} max={50} unit="px" onChange={(v) => updateLayer(i, "spread", v)} />
              <SliderControl label="opacity" value={layer.opacity} min={0} max={100} unit="%" onChange={(v) => updateLayer(i, "opacity", v)} />
              <ColorInput label="color" value={layer.color} onChange={(v) => updateLayer(i, "color", v)} />
              <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={layer.inset}
                  onChange={(e) => updateLayer(i, "inset", e.target.checked)}
                  className="rounded border-border"
                />
                inset
              </label>
            </div>
          ))}
          <button onClick={addLayer} className="w-full py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:bg-accent transition-colors">
            + Add Shadow Layer
          </button>

          <ExplanationPanel title="Box Shadow Properties">
            <div className="space-y-2">
              <p><strong>offset-x</strong> / <strong>offset-y</strong>: Horizontal and vertical position of the shadow.</p>
              <p><strong>blur-radius</strong>: Higher values = more blurred, larger shadow.</p>
              <p><strong>spread-radius</strong>: Positive grows, negative shrinks the shadow.</p>
              <p><strong>inset</strong>: Shadow appears inside the element.</p>
              <p className="text-xs">💡 Stack multiple shadows with commas for layered depth effects.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div className="min-h-[350px] rounded-lg border border-dashed border-border p-8 flex items-center justify-center preview-checkerboard">
              <div
                style={{
                  width: `${elementWidth}px`,
                  height: `${elementHeight}px`,
                  backgroundColor: bgColor,
                  borderRadius: `${borderRadius}px`,
                  boxShadow: cssValue,
                }}
              />
            </div>
          </div>
          <CodeOutput code={fullCSS} />
        </div>
      </div>
    </div>
  );
}
