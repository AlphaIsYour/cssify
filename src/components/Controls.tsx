"use client";

import { useId } from "react";

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-muted-foreground cursor-pointer">
          {label}
        </label>
        <span className="text-xs font-mono text-primary">
          {value}{unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const colorPickerId = useId();
  const textInputId = useId();

  return (
    <div className="space-y-1.5">
      <label htmlFor={colorPickerId} className="text-xs font-medium text-muted-foreground cursor-pointer">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={colorPickerId}
          type="color"
          value={value}
          aria-label={`${label} color picker`}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-lg border border-border cursor-pointer shrink-0"
        />
        <input
          id={textInputId}
          type="text"
          value={value}
          aria-label={`${label} hex code`}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm font-mono"
        />
      </div>
    </div>
  );
}

export function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground cursor-pointer">
        {label}
      </label>
      <select
        id={id}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
