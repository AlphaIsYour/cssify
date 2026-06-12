"use client";

export interface Preset {
  name: string;
  values: Record<string, string | number | boolean>;
}

export function Presets({
  presets,
  active,
  onSelect,
}: {
  presets: Preset[];
  active: string | null;
  onSelect: (preset: Preset) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => (
        <button
          key={preset.name}
          onClick={() => onSelect(preset)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
