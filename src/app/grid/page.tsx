"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets, Preset } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, ColorInput } from "@/components/Controls";

const presets: Preset[] = [
  { name: "2 Column", values: { columns: "1fr 1fr", rows: "auto", gap: 16, itemCount: 4 } },
  { name: "3 Column", values: { columns: "1fr 1fr 1fr", rows: "auto", gap: 16, itemCount: 6 } },
  { name: "Sidebar Layout", values: { columns: "250px 1fr", rows: "auto", gap: 20, itemCount: 4 } },
  { name: "Holy Grail", values: { columns: "200px 1fr 200px", rows: "auto 1fr auto", gap: 16, itemCount: 6 } },
  { name: "Auto Fill", values: { columns: "repeat(auto-fill, minmax(150px, 1fr))", rows: "auto", gap: 12, itemCount: 8 } },
  { name: "Auto Fit", values: { columns: "repeat(auto-fit, minmax(200px, 1fr))", rows: "auto", gap: 16, itemCount: 5 } },
];

export default function GridPage() {
  const [columns, setColumns] = useState("1fr 1fr 1fr");
  const [rows, setRows] = useState("auto");
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(6);
  const [activePreset, setActivePreset] = useState<string | null>("3 Column");
  const [bgColor, setBgColor] = useState("#81a6c6");
  const [minHeight, setMinHeight] = useState(80);

  const applyPreset = (preset: Preset) => {
    const v = preset.values;
    setColumns(v.columns as string);
    setRows(v.rows as string);
    setGap(v.gap as number);
    setItemCount(v.itemCount as number);
    setActivePreset(preset.name);
  };

  const containerCSS = `display: grid;
grid-template-columns: ${columns};
grid-template-rows: ${rows};
gap: ${gap}px;`;

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">CSS Grid Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Build grid layouts visually with template columns, rows, and gap controls.
        </p>
      </div>

      <Presets presets={presets} active={activePreset} onSelect={applyPreset} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Grid Properties</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">grid-template-columns</label>
              <input
                type="text"
                value={columns}
                onChange={(e) => { setColumns(e.target.value); setActivePreset(null); }}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
                placeholder="1fr 1fr 1fr"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">grid-template-rows</label>
              <input
                type="text"
                value={rows}
                onChange={(e) => { setRows(e.target.value); setActivePreset(null); }}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
                placeholder="auto"
              />
            </div>
            <SliderControl label="gap" value={gap} min={0} max={48} unit="px" onChange={(v) => { setGap(v); setActivePreset(null); }} />
            <SliderControl label="items" value={itemCount} min={1} max={16} onChange={(v) => { setItemCount(v); setActivePreset(null); }} />
            <SliderControl label="min-height" value={minHeight} min={40} max={200} unit="px" onChange={setMinHeight} />
            <ColorInput label="Item Color" value={bgColor} onChange={setBgColor} />
          </div>

          <ExplanationPanel title="How CSS Grid Works">
            <div className="space-y-3">
              <p><strong>CSS Grid</strong> is a two-dimensional layout system for rows AND columns simultaneously.</p>
              <p><strong>Key concepts:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>grid-template-columns</code> defines column tracks</li>
                <li><code>grid-template-rows</code> defines row tracks</li>
                <li><code>fr</code> unit distributes available space proportionally</li>
                <li><code>repeat()</code> repeats track patterns</li>
                <li><code>auto-fill</code> fills as many items as fit</li>
                <li><code>auto-fit</code> like auto-fill but collapses empty tracks</li>
                <li><code>minmax(min, max)</code> sets responsive track sizes</li>
              </ul>
              <p className="text-xs text-muted-foreground">💡 Use Grid for two-dimensional layouts. Combine with Flexbox for component-level alignment.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div
              className="rounded-lg border border-dashed border-border p-4 preview-checkerboard"
              style={{
                display: "grid",
                gridTemplateColumns: columns,
                gridTemplateRows: rows,
                gap: `${gap}px`,
              }}
            >
              {Array.from({ length: itemCount }, (_, i) => (
                <div
                  key={i}
                  className="rounded-lg text-white text-sm font-medium flex items-center justify-center"
                  style={{ backgroundColor: bgColor, minHeight: `${minHeight}px`, padding: "8px 12px" }}
                >
                  {i + 1}
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
