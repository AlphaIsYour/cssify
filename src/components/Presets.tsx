"use client";

export interface Preset<T = Record<string, unknown>> {
  name: string;
  values: T;
}

export function Presets<T = Record<string, unknown>>({
  presets,
  active,
  onSelect,
}: {
  presets: Preset<T>[];
  active: string | null;
  onSelect: (preset: Preset<T>) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Preset options">
      {presets.map((preset) => (
        <button
          key={preset.name}
          type="button"
          onClick={() => onSelect(preset)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            active === preset.name
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}
