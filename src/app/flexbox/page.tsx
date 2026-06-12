"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets, Preset } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, SelectControl, ColorInput } from "@/components/Controls";

const presets: Preset[] = [
  { name: "Center All", values: { justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 16 } },
  { name: "Space Between", values: { justifyContent: "space-between", alignItems: "center", flexDirection: "row", flexWrap: "nowrap", gap: 16 } },
  { name: "Column Stack", values: { justifyContent: "flex-start", alignItems: "stretch", flexDirection: "column", flexWrap: "nowrap", gap: 12 } },
  { name: "Wrap Grid", values: { justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 12 } },
  { name: "Nav Layout", values: { justifyContent: "space-between", alignItems: "center", flexDirection: "row", flexWrap: "nowrap", gap: 8 } },
  { name: "Card Grid", values: { justifyContent: "flex-start", alignItems: "stretch", flexDirection: "row", flexWrap: "wrap", gap: 16 } },
];

export default function FlexboxPage() {
  const [justifyContent, setJustifyContent] = useState("center");
  const [alignItems, setAlignItems] = useState("center");
  const [flexDirection, setFlexDirection] = useState("row");
  const [flexWrap, setFlexWrap] = useState("wrap");
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(6);
  const [activePreset, setActivePreset] = useState<string | null>("Center All");
  const [bgColor, setBgColor] = useState("#6366f1");

  const applyPreset = (preset: Preset) => {
    const v = preset.values;
    setJustifyContent(v.justifyContent as string);
    setAlignItems(v.alignItems as string);
    setFlexDirection(v.flexDirection as string);
    setFlexWrap(v.flexWrap as string);
    setGap(v.gap as number);
    setActivePreset(preset.name);
  };

  const containerCSS = `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap}px;`;

  const items = Array.from({ length: itemCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Flexbox Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Design flex layouts visually with live preview and instant CSS output.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Presets presets={presets} active={activePreset} onSelect={applyPreset} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Container Properties</h3>
            <SelectControl
              label="flex-direction"
              value={flexDirection}
              options={[
                { label: "row", value: "row" },
                { label: "row-reverse", value: "row-reverse" },
                { label: "column", value: "column" },
                { label: "column-reverse", value: "column-reverse" },
              ]}
              onChange={(v) => { setFlexDirection(v); setActivePreset(null); }}
            />
            <SelectControl
              label="justify-content"
              value={justifyContent}
              options={[
                { label: "flex-start", value: "flex-start" },
                { label: "flex-end", value: "flex-end" },
                { label: "center", value: "center" },
                { label: "space-between", value: "space-between" },
                { label: "space-around", value: "space-around" },
                { label: "space-evenly", value: "space-evenly" },
              ]}
              onChange={(v) => { setJustifyContent(v); setActivePreset(null); }}
            />
            <SelectControl
              label="align-items"
              value={alignItems}
              options={[
                { label: "flex-start", value: "flex-start" },
                { label: "flex-end", value: "flex-end" },
                { label: "center", value: "center" },
                { label: "stretch", value: "stretch" },
                { label: "baseline", value: "baseline" },
              ]}
              onChange={(v) => { setAlignItems(v); setActivePreset(null); }}
            />
            <SelectControl
              label="flex-wrap"
              value={flexWrap}
              options={[
                { label: "nowrap", value: "nowrap" },
                { label: "wrap", value: "wrap" },
                { label: "wrap-reverse", value: "wrap-reverse" },
              ]}
              onChange={(v) => { setFlexWrap(v); setActivePreset(null); }}
            />
            <SliderControl label="gap" value={gap} min={0} max={48} unit="px" onChange={(v) => { setGap(v); setActivePreset(null); }} />
            <SliderControl label="items" value={itemCount} min={1} max={12} onChange={setItemCount} />
            <ColorInput label="Item Color" value={bgColor} onChange={setBgColor} />
          </div>

          <ExplanationPanel title="How Flexbox Works">
            <div className="space-y-3">
              <p><strong>Flexbox</strong> is a one-dimensional layout method for arranging items in rows or columns.</p>
              <p><strong>Key concepts:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>display: flex</code> creates a flex container</li>
                <li><code>flex-direction</code> sets the main axis (row or column)</li>
                <li><code>justify-content</code> aligns items on the main axis</li>
                <li><code>align-items</code> aligns items on the cross axis</li>
                <li><code>flex-wrap</code> allows items to wrap to new lines</li>
                <li><code>gap</code> adds space between items</li>
              </ul>
              <p className="text-xs text-muted-foreground">💡 Use Flexbox for one-dimensional layouts (row OR column). For two-dimensional layouts, use CSS Grid.</p>
            </div>
          </ExplanationPanel>
        </div>

        {/* Preview & Code */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div
              className="min-h-[300px] rounded-lg border border-dashed border-border p-4 preview-checkerboard"
              style={{
                display: "flex",
                flexDirection: flexDirection as "row" | "row-reverse" | "column" | "column-reverse",
                justifyContent: justifyContent,
                alignItems: alignItems,
                flexWrap: flexWrap as "nowrap" | "wrap" | "wrap-reverse",
                gap: `${gap}px`,
              }}
            >
              {items.map((i) => (
                <div
                  key={i}
                  className="rounded-lg text-white text-sm font-medium flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: bgColor,
                    width: flexDirection.startsWith("column") ? "100%" : "60px",
                    height: flexDirection.startsWith("column") ? "40px" : "60px",
                    maxWidth: flexDirection.startsWith("column") ? "100%" : "120px",
                    minWidth: flexDirection.startsWith("column") ? undefined : "40px",
                    padding: "8px 12px",
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          <CodeOutput code={containerCSS} />
        </div>
      </div>
    </div>
  );
}
