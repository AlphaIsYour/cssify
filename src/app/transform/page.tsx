"use client";

import { useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { Presets } from "@/components/Presets";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { SliderControl } from "@/components/Controls";

interface TransformState {
  translateX: number;
  translateY: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
  perspective: number;
  rotateX: number;
  rotateY: number;
}

const defaultTransforms: TransformState = {
  translateX: 0, translateY: 0, rotate: 0, scaleX: 100, scaleY: 100, skewX: 0, skewY: 0, perspective: 0, rotateX: 0, rotateY: 0,
};

const presets = [
  { name: "Normal", values: { ...defaultTransforms } },
  { name: "Scale Up", values: { ...defaultTransforms, scaleX: 120, scaleY: 120 } },
  { name: "Rotate 45°", values: { ...defaultTransforms, rotate: 45 } },
  { name: "Skew", values: { ...defaultTransforms, skewX: 15, skewY: -5 } },
  { name: "3D Tilt", values: { ...defaultTransforms, perspective: 500, rotateX: 15, rotateY: -15 } },
  { name: "Flip", values: { ...defaultTransforms, scaleX: -100 } },
  { name: "Float Up", values: { ...defaultTransforms, translateY: -20, scaleX: 105, scaleY: 105 } },
];

export default function TransformPage() {
  const [transforms, setTransforms] = useState<TransformState>({ ...defaultTransforms });
  const [activePreset, setActivePreset] = useState<string | null>("Normal");
  const [show3D, setShow3D] = useState(false);

  const applyPreset = (preset: typeof presets[0]) => {
    setTransforms({ ...preset.values });
    setActivePreset(preset.name);
    if (preset.values.perspective > 0 || preset.values.rotateX !== 0 || preset.values.rotateY !== 0) {
      setShow3D(true);
    }
  };

  const update = (key: keyof TransformState, value: number) => {
    setTransforms((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  };

  const parts: string[] = [];
  if (transforms.perspective > 0) parts.push(`perspective(${transforms.perspective}px)`);
  if (transforms.translateX !== 0) parts.push(`translateX(${transforms.translateX}px)`);
  if (transforms.translateY !== 0) parts.push(`translateY(${transforms.translateY}px)`);
  if (transforms.rotateX !== 0) parts.push(`rotateX(${transforms.rotateX}deg)`);
  if (transforms.rotateY !== 0) parts.push(`rotateY(${transforms.rotateY}deg)`);
  if (transforms.rotate !== 0) parts.push(`rotate(${transforms.rotate}deg)`);
  if (transforms.scaleX !== 100 || transforms.scaleY !== 100) parts.push(`scale(${transforms.scaleX / 100}, ${transforms.scaleY / 100})`);
  if (transforms.skewX !== 0) parts.push(`skewX(${transforms.skewX}deg)`);
  if (transforms.skewY !== 0) parts.push(`skewY(${transforms.skewY}deg)`);
  const cssValue = parts.length > 0 ? parts.join(" ") : "none";

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold">Transform Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Combine translate, rotate, scale, and skew transforms with 2D/3D preview.
        </p>
      </div>

      <Presets presets={presets.map((p) => ({ name: p.name, values: {} }))} active={activePreset} onSelect={(p) => {
        const preset = presets.find((pr) => pr.name === p.name);
        if (preset) applyPreset(preset);
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-sm font-semibold">2D Transforms</h3>
            <SliderControl label="translateX" value={transforms.translateX} min={-200} max={200} unit="px" onChange={(v) => update("translateX", v)} />
            <SliderControl label="translateY" value={transforms.translateY} min={-200} max={200} unit="px" onChange={(v) => update("translateY", v)} />
            <SliderControl label="rotate" value={transforms.rotate} min={-180} max={180} unit="°" onChange={(v) => update("rotate", v)} />
            <SliderControl label="scaleX" value={transforms.scaleX} min={0} max={300} unit="%" onChange={(v) => update("scaleX", v)} />
            <SliderControl label="scaleY" value={transforms.scaleY} min={0} max={300} unit="%" onChange={(v) => update("scaleY", v)} />
            <SliderControl label="skewX" value={transforms.skewX} min={-45} max={45} unit="°" onChange={(v) => update("skewX", v)} />
            <SliderControl label="skewY" value={transforms.skewY} min={-45} max={45} unit="°" onChange={(v) => update("skewY", v)} />
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">3D Transforms</h3>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={show3D} onChange={(e) => setShow3D(e.target.checked)} className="rounded" />
                Enable 3D
              </label>
            </div>
            {show3D && (
              <>
                <SliderControl label="perspective" value={transforms.perspective} min={0} max={1000} unit="px" onChange={(v) => update("perspective", v)} />
                <SliderControl label="rotateX" value={transforms.rotateX} min={-180} max={180} unit="°" onChange={(v) => update("rotateX", v)} />
                <SliderControl label="rotateY" value={transforms.rotateY} min={-180} max={180} unit="°" onChange={(v) => update("rotateY", v)} />
              </>
            )}
          </div>

          <ExplanationPanel title="Transform Functions">
            <div className="space-y-2">
              <p><strong>translate()</strong>: Moves element on X/Y axis.</p>
              <p><strong>rotate()</strong>: Rotates element (positive = clockwise).</p>
              <p><strong>scale()</strong>: Scales element (1 = normal size).</p>
              <p><strong>skew()</strong>: Shears element along X/Y axis.</p>
              <p><strong>perspective()</strong>: Sets the 3D viewing distance.</p>
              <p className="text-xs">💡 Transform functions are applied in order. Place perspective() first for 3D effects.</p>
            </div>
          </ExplanationPanel>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
            <div className="min-h-[350px] rounded-lg border border-dashed border-border flex items-center justify-center preview-checkerboard" style={{ perspective: show3D ? "1000px" : undefined }}>
              <div
                className="w-[160px] h-[160px] rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-200"
                style={{ transform: cssValue, transformStyle: show3D ? "preserve-3d" : undefined }}
              >
                Transform
              </div>
            </div>
          </div>
          <CodeOutput code={`transform: ${cssValue};`} />
        </div>
      </div>
    </div>
  );
}
