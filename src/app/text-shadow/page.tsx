"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, ColorInput } from "@/components/Controls";

interface TextShadowLayer {
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
}

const defaultLayer: TextShadowLayer = { x: 2, y: 2, blur: 4, color: "#000000", opacity: 30 };

const presets = [
  { name: "Subtle", layers: [{ x: 1, y: 1, blur: 2, color: "#000000", opacity: 15 }] },
  { name: "Sharp", layers: [{ x: 2, y: 2, blur: 0, color: "#000000", opacity: 40 }] },
  { name: "Blurry", layers: [{ x: 0, y: 0, blur: 10, color: "#000000", opacity: 30 }] },
  { name: "Neon", layers: [{ x: 0, y: 0, blur: 10, color: "#6366f1", opacity: 80 }, { x: 0, y: 0, blur: 30, color: "#8b5cf6", opacity: 40 }] },
  { name: "Emboss", layers: [{ x: -1, y: -1, blur: 0, color: "#ffffff", opacity: 50 }, { x: 1, y: 1, blur: 0, color: "#000000", opacity: 30 }] },
  { name: "Fire", layers: [{ x: 0, y: -2, blur: 4, color: "#ff6b35", opacity: 80 }, { x: 0, y: -6, blur: 12, color: "#ff4500", opacity: 40 }] },
];

function shadowToCSS(layers: TextShadowLayer[]): string {
  return layers
    .map((l) => {
      const r = parseInt(l.color.slice(1, 3), 16);
      const g = parseInt(l.color.slice(3, 5), 16);
      const b = parseInt(l.color.slice(5, 7), 16);
      return `${l.x}px ${l.y}px ${l.blur}px rgba(${r}, ${g}, ${b}, ${l.opacity / 100})`;
    })
    .join(", ");
}

export default function TextShadowPage() {
  const [layers, setLayers] = useState<TextShadowLayer[]>([{ ...defaultLayer }]);
  const [activePreset, setActivePreset] = useState<string | null>("Subtle");
  const [text, setText] = useState("Hello World");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#1e293b");

  const applyPreset = (preset: typeof presets[0]) => {
    setLayers(preset.layers.map((l) => ({ ...l })));
    setActivePreset(preset.name);
  };

  const updateLayer = (index: number, key: keyof TextShadowLayer, value: string | number) => {
    setLayers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
    setActivePreset(null);
  };

  const addLayer = () => {
    setLayers((prev) => [...prev, { ...defaultLayer }]);
    setActivePreset(null);
  };

  const removeLayer = (index: number) => {
    if (layers.length <= 1) return;
    setLayers((prev) => prev.filter((_, i) => i !== index));
    setActivePreset(null);
  };

  const cssValue = shadowToCSS(layers);

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Text Shadow Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create text shadow effects with blur, color, and multi-layer support.
        </p>
      </div>

      <Presets presets={presets.map((p) => ({ name: p.name, values: {} }))} active={activePreset} onSelect={(p) => {
        const preset = presets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Text Settings</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <SliderControl label="font-size" value={fontSize} min={16} max={96} unit="px" onChange={setFontSize} />
            <ColorInput label="text color" value={textColor} onChange={setTextColor} />
          </div>

          {layers.map((layer, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Shadow {i + 1}</h3>
                {layers.length > 1 && (
                  <button onClick={() => removeLayer(i)} className="text-xs text-error hover:underline">Remove</button>
                )}
              </div>
              <SliderControl label="x" value={layer.x} min={-30} max={30} unit="px" onChange={(v) => updateLayer(i, "x", v)} />
              <SliderControl label="y" value={layer.y} min={-30} max={30} unit="px" onChange={(v) => updateLayer(i, "y", v)} />
              <SliderControl label="blur" value={layer.blur} min={0} max={50} unit="px" onChange={(v) => updateLayer(i, "blur", v)} />
              <SliderControl label="opacity" value={layer.opacity} min={0} max={100} unit="%" onChange={(v) => updateLayer(i, "opacity", v)} />
              <ColorInput label="color" value={layer.color} onChange={(v) => updateLayer(i, "color", v)} />
            </div>
          ))}
          <button onClick={addLayer} className="w-full py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:bg-accent transition-colors">
            + Add Shadow Layer
          </button>

          <ExplanationPanel title="Text Shadow Tips">
            <div className="space-y-2">
              <p><strong>text-shadow</strong> takes x-offset, y-offset, blur-radius, and color.</p>
              <p>Unlike box-shadow, there is no spread or inset for text-shadow.</p>
              <p>Layer multiple shadows for glow, neon, and emboss effects.</p>
              <p className="text-xs">💡 Use <code>rgba()</code> for opacity control without affecting the text color itself.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div className="min-h-[300px] rounded-lg border border-dashed border-border p-8 flex items-center justify-center preview-checkerboard">
              <div
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: 700,
                  color: textColor,
                  textShadow: cssValue,
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {text}
              </div>
            </div>
          </div>
          <CodeOutput code={`text-shadow: ${cssValue};`} />
        </div>
      </div>
    </div>
  );
}
