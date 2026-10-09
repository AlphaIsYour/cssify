"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl, ColorInput } from "@/components/Controls";

interface RadiusState {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

const presets = [
  { name: "None", values: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 } },
  { name: "Small", values: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 } },
  { name: "Medium", values: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 } },
  { name: "Large", values: { topLeft: 32, topRight: 32, bottomRight: 32, bottomLeft: 32 } },
  { name: "Pill", values: { topLeft: 9999, topRight: 9999, bottomRight: 9999, bottomLeft: 9999 } },
  { name: "Blob", values: { topLeft: 60, topRight: 40, bottomRight: 70, bottomLeft: 30 } },
  { name: "Leaf", values: { topLeft: 0, topRight: 50, bottomRight: 50, bottomLeft: 0 } },
  { name: "Ticket", values: { topLeft: 24, topRight: 4, bottomRight: 4, bottomLeft: 24 } },
];

export default function BorderRadiusPage() {
  const [radius, setRadius] = useState<RadiusState>({ topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 });
  const [activePreset, setActivePreset] = useState<string | null>("Medium");
  const [bgColor, setBgColor] = useState("#81a6c6");
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(240);

  const applyPreset = (preset: typeof presets[0]) => {
    setRadius({ ...preset.values });
    setActivePreset(preset.name);
  };

  const update = (key: keyof RadiusState, value: number) => {
    setRadius((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  };

  const allSame = radius.topLeft === radius.topRight && radius.topRight === radius.bottomRight && radius.bottomRight === radius.bottomLeft;
  const cssValue = allSame
    ? `border-radius: ${radius.topLeft}px;`
    : `border-radius: ${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px;`;

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Border Radius Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Craft complex border-radius shapes with individual corner controls and presets.
        </p>
      </div>

      <Presets presets={presets.map((p) => ({ name: p.name, values: {} }))} active={activePreset} onSelect={(p) => {
        const preset = presets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">Corner Radius</h3>
            <SliderControl label="top-left" value={radius.topLeft} min={0} max={150} unit="px" onChange={(v) => update("topLeft", v)} />
            <SliderControl label="top-right" value={radius.topRight} min={0} max={150} unit="px" onChange={(v) => update("topRight", v)} />
            <SliderControl label="bottom-right" value={radius.bottomRight} min={0} max={150} unit="px" onChange={(v) => update("bottomRight", v)} />
            <SliderControl label="bottom-left" value={radius.bottomLeft} min={0} max={150} unit="px" onChange={(v) => update("bottomLeft", v)} />
            <ColorInput label="Background" value={bgColor} onChange={setBgColor} />
            <SliderControl label="width" value={width} min={80} max={400} unit="px" onChange={setWidth} />
            <SliderControl label="height" value={height} min={80} max={400} unit="px" onChange={setHeight} />
          </div>

          <ExplanationPanel title="Border Radius Syntax">
            <div className="space-y-2">
              <p><code>border-radius: 10px;</code> — all corners equal</p>
              <p><code>border-radius: 10px 20px;</code> — top-left/right, bottom-left/right</p>
              <p><code>border-radius: 10px 20px 30px 40px;</code> — each corner (clockwise)</p>
              <p><code>border-radius: 50%;</code> — perfect circle (on square element)</p>
              <p className="text-xs">💡 Use very large values (9999px) for pill shapes. Combine with aspect-ratio for consistent shapes.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div className="min-h-[350px] rounded-lg border border-dashed border-border flex items-center justify-center preview-checkerboard">
              <div
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  backgroundColor: bgColor,
                  borderRadius: `${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px`,
                  transition: "border-radius 0.2s ease",
                }}
              />
            </div>
          </div>
          <CodeOutput code={cssValue} />
        </div>
      </div>
    </div>
  );
}
