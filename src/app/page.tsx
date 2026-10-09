"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Columns3,
  LayoutGrid,
  Layers,
  Type,
  Palette,
  Sparkles,
  RotateCw,
  Timer,
  Shapes,
  CaseSensitive,
  Ruler,
  Search,
  ArrowRight,
  Copy,
  Check,
  Coffee,
  Code2,
  Zap,
  BookOpen,
  SlidersHorizontal,
  Sun,
  Moon,
  LucideIcon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { getAssetPath } from "@/lib/assets";

interface ToolItem {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  desc: string;
  category: "Layout" | "Effects" | "Motion" | "Shapes" | "Typography" | "Systems";
  badge?: string;
  accent: string;
}

const tools: ToolItem[] = [
  {
    id: "flexbox",
    name: "Flexbox Studio",
    href: "/flexbox",
    icon: Columns3,
    desc: "1D layout alignment with direction, distribution, wrapping, and responsive gaps.",
    category: "Layout",
    badge: "Popular",
    accent: "#81A6C6",
  },
  {
    id: "grid",
    name: "CSS Grid Architect",
    href: "/grid",
    icon: LayoutGrid,
    desc: "2D track matrix with template columns, repeat() patterns, and auto-fit tracks.",
    category: "Layout",
    accent: "#AACDDC",
  },
  {
    id: "box-shadow",
    name: "Box Shadow Stacker",
    href: "/box-shadow",
    icon: Layers,
    desc: "Multi-layer elevations with inset toggle, blur diffusion, and spread depth.",
    category: "Effects",
    badge: "Essential",
    accent: "#81A6C6",
  },
  {
    id: "text-shadow",
    name: "Text Shadow Crafter",
    href: "/text-shadow",
    icon: Type,
    desc: "Typographic depth, multi-color ambient glows, and retro embossed effects.",
    category: "Effects",
    accent: "#D2C4B4",
  },
  {
    id: "gradient",
    name: "Gradient Synthesizer",
    href: "/gradient",
    icon: Palette,
    desc: "Linear, radial, and conic color ramps with draggable stops and exact angles.",
    category: "Effects",
    accent: "#AACDDC",
  },
  {
    id: "filter",
    name: "CSS Filter Shaders",
    href: "/filter",
    icon: Sparkles,
    desc: "Realtime graphic filters: blur, hue-rotate, saturation, contrast, and sepia.",
    category: "Effects",
    accent: "#81A6C6",
  },
  {
    id: "transform",
    name: "Transform Matrix (2D/3D)",
    href: "/transform",
    icon: RotateCw,
    desc: "Translate, scale, skew, and perspective 3D tilting with live specimen.",
    category: "Motion",
    accent: "#81A6C6",
  },
  {
    id: "transition",
    name: "Transition & Easing Curves",
    href: "/transition",
    icon: Timer,
    desc: "Cubic-bezier curves visualization with ball runner and timing comparison.",
    category: "Motion",
    accent: "#AACDDC",
  },
  {
    id: "border-radius",
    name: "Organic Border Radius",
    href: "/border-radius",
    icon: Shapes,
    desc: "Asymmetrical 4-corner styling for modern pill, blob, and ticket silhouettes.",
    category: "Shapes",
    accent: "#D2C4B4",
  },
  {
    id: "typography",
    name: "Fluid Typography Clamp()",
    href: "/typography",
    icon: CaseSensitive,
    desc: "Viewport-responsive typography scales with smooth clamp(min, val, max) math.",
    category: "Typography",
    badge: "Math Engine",
    accent: "#81A6C6",
  },
  {
    id: "spacing",
    name: "Spacing Scale Generator",
    href: "/spacing",
    icon: Ruler,
    desc: "Design token spacing scales using linear, Fibonacci, or geometric increments.",
    category: "Systems",
    accent: "#AACDDC",
  },
];

const categories = ["All", "Layout", "Effects", "Motion", "Shapes", "Typography", "Systems"] as const;

// The requested casual palette tokens
const paletteColors = [
  { name: "Steel Blue", hex: "#81A6C6", desc: "Primary brand & active states" },
  { name: "Soft Sky", hex: "#AACDDC", desc: "Secondary accent & glow" },
  { name: "Warm Cream", hex: "#F3E3D0", desc: "Warm canvas & surfaces" },
  { name: "Muted Taupe", hex: "#D2C4B4", desc: "Borders & structure" },
];

export default function HomePage() {
  const { theme, toggle } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Hero specimen interactive state
  const [activeSpecimen, setActiveSpecimen] = useState<"shadow" | "gradient" | "radius">("shadow");
  const [shadowBlur, setShadowBlur] = useState(24);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [cornerRound, setCornerRound] = useState(12);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const heroCode = useMemo(() => {
    if (activeSpecimen === "shadow") {
      return `box-shadow: 0 12px ${shadowBlur}px -4px rgba(129, 166, 198, 0.45);`;
    }
    if (activeSpecimen === "gradient") {
      return `background: linear-gradient(${gradientAngle}deg, #81a6c6 0%, #aacddc 50%, #f3e3d0 100%);`;
    }
    return `border-radius: ${cornerRound}px ${Math.max(2, cornerRound / 2)}px ${cornerRound}px 4px;`;
  }, [activeSpecimen, shadowBlur, gradientAngle, cornerRound]);

  const handleCopyHeroCode = async () => {
    try {
      await navigator.clipboard.writeText(heroCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 1800);
    } catch {
      // fallback
    }
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const logoUrl = getAssetPath("/cssify.png");

  return (
    <div className="w-full min-h-screen text-foreground space-y-16 pb-20">
      {/* 1. Full-Width SaaS Floating Navigation Header */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <nav className="glass-panel rounded-xl px-4 py-2.5 flex items-center justify-between border border-[#D2C4B4]/40 shadow-sm">
          {/* Brand with contrasting Steel Blue container for white logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#81A6C6] to-[#4F7B9F] p-1.5 flex items-center justify-center shadow-md border border-[#AACDDC]/40 group-hover:scale-105 transition-transform shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="CSSify Logo"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-foreground tracking-tight leading-none">
                CSSify
              </span>
              <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
                Visual Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <a href="#tools" className="hover:text-foreground transition-colors">
              Generators (11)
            </a>
            <a href="#specimen" className="hover:text-foreground transition-colors">
              Live Specimen
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#palette" className="hover:text-foreground transition-colors">
              Palette
            </a>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggle}
              aria-label="Toggle light or dark theme"
              className="p-2 rounded-xl glass-panel hover:bg-[#AACDDC]/20 text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-[#D2C4B4]/30"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#81A6C6]" />
              )}
            </button>

            <a
              href="https://github.com/AlphaIsYour/eno-css-playground"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel text-xs text-muted-foreground hover:text-foreground hover:bg-[#AACDDC]/15 transition-colors border border-[#D2C4B4]/30"
            >
              <svg className="w-3.5 h-3.5 fill-current" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>

            <Link
              href="/flexbox"
              className="px-4 py-2 rounded-xl bg-[#81A6C6] hover:bg-[#6A93B7] text-white font-medium text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium glass-pill text-foreground border border-[#D2C4B4]/50 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#81A6C6] animate-pulse" />
          <span className="font-semibold text-[#81A6C6]">CSSify Studio</span>
          <span className="text-muted-foreground">• 11 Visual Generators</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
          Craft Production CSS Visually. <br />
          <span className="gradient-text">Zero Guesswork.</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Stop wrestling with box-shadow blur, guessing flexbox alignment, or calculating fluid
          typography clamp scales. CSSify is a developer-first visual CSS laboratory with instant
          production code.
        </p>

        {/* Hero CTAs (Max 12px rounded) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/flexbox"
            className="px-6 py-3 rounded-xl bg-[#81A6C6] hover:bg-[#6A93B7] text-white font-medium text-sm transition-all shadow-md shadow-[#81A6C6]/20 flex items-center gap-2"
          >
            <span>Launch Studio Engine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#tools"
            className="px-6 py-3 rounded-xl glass-panel text-foreground font-medium text-sm hover:bg-[#AACDDC]/20 transition-all border border-[#D2C4B4]/50 flex items-center gap-2"
          >
            <span>Explore 11 Tools ↓</span>
          </a>
        </div>
      </section>

      {/* 3. Interactive Hero Specimen (Max 12px rounded) */}
      <section id="specimen" className="max-w-5xl mx-auto px-4">
        <div className="glass-panel glass-glow rounded-xl p-5 sm:p-7 shadow-lg border border-[#D2C4B4]/60">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D2C4B4]/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-muted-foreground ml-2">Live Interactive Specimen</span>
            </div>

            {/* Specimen Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-background/60 border border-[#D2C4B4]/40 text-xs">
              <button
                onClick={() => setActiveSpecimen("shadow")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSpecimen === "shadow"
                    ? "bg-[#81A6C6] text-white font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Elevation
              </button>
              <button
                onClick={() => setActiveSpecimen("gradient")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSpecimen === "gradient"
                    ? "bg-[#81A6C6] text-white font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Gradient
              </button>
              <button
                onClick={() => setActiveSpecimen("radius")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSpecimen === "radius"
                    ? "bg-[#81A6C6] text-white font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Radius
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 items-center">
            {/* Specimen Visual Area */}
            <div className="min-h-[220px] rounded-xl border border-dashed border-[#D2C4B4]/70 p-6 flex items-center justify-center preview-checkerboard relative overflow-hidden">
              <div
                className="w-44 h-44 sm:w-48 sm:h-48 transition-all duration-200 flex flex-col items-center justify-center text-center p-4"
                style={{
                  backgroundColor: activeSpecimen === "gradient" ? undefined : "#ffffff",
                  background:
                    activeSpecimen === "gradient"
                      ? `linear-gradient(${gradientAngle}deg, #81a6c6 0%, #aacddc 50%, #f3e3d0 100%)`
                      : "#ffffff",
                  boxShadow:
                    activeSpecimen === "shadow"
                      ? `0 12px ${shadowBlur}px -4px rgba(129, 166, 198, 0.5)`
                      : "0 2px 8px rgba(0,0,0,0.06)",
                  borderRadius:
                    activeSpecimen === "radius"
                      ? `${cornerRound}px ${Math.max(2, cornerRound / 2)}px ${cornerRound}px 4px`
                      : "12px",
                }}
              >
                {/* Contrasting dark/steel pill for white logo */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#81A6C6] to-[#4F7B9F] p-2 flex items-center justify-center shadow-md border border-[#AACDDC]/50 mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl} alt="CSSify" className="w-full h-full object-contain filter drop-shadow-sm" />
                </div>
                <div className="text-xs font-bold text-slate-800">CSSify Specimen</div>
                <div className="text-[10px] text-slate-500 font-mono">Realtime CSS Canvas</div>
              </div>
            </div>

            {/* Specimen Sliders & Code */}
            <div className="space-y-4">
              <div className="space-y-2.5 p-4 rounded-xl bg-background/60 border border-[#D2C4B4]/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">
                    {activeSpecimen === "shadow" && "Shadow Blur Diffusion"}
                    {activeSpecimen === "gradient" && "Gradient Angle Rotation"}
                    {activeSpecimen === "radius" && "Corner Asymmetry"}
                  </span>
                  <span className="font-mono text-[#81A6C6] font-semibold">
                    {activeSpecimen === "shadow" && `${shadowBlur}px`}
                    {activeSpecimen === "gradient" && `${gradientAngle}°`}
                    {activeSpecimen === "radius" && `${cornerRound}px`}
                  </span>
                </div>
                {activeSpecimen === "shadow" && (
                  <input
                    type="range"
                    min={0}
                    max={60}
                    value={shadowBlur}
                    onChange={(e) => setShadowBlur(Number(e.target.value))}
                  />
                )}
                {activeSpecimen === "gradient" && (
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={gradientAngle}
                    onChange={(e) => setGradientAngle(Number(e.target.value))}
                  />
                )}
                {activeSpecimen === "radius" && (
                  <input
                    type="range"
                    min={0}
                    max={36}
                    value={cornerRound}
                    onChange={(e) => setCornerRound(Number(e.target.value))}
                  />
                )}
              </div>

              {/* Code Output Strip */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs flex items-center justify-between gap-3 border border-slate-800">
                <code className="truncate text-[#AACDDC] select-all">{heroCode}</code>
                <button
                  onClick={handleCopyHeroCode}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-sans flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy CSS"}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Want to edit all parameters?</span>
                <Link
                  href={
                    activeSpecimen === "shadow"
                      ? "/box-shadow"
                      : activeSpecimen === "gradient"
                      ? "/gradient"
                      : "/border-radius"
                  }
                  className="text-[#81A6C6] font-medium hover:underline inline-flex items-center gap-1"
                >
                  Open Full Studio →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Casual Palette Design Tokens Showcase */}
      <section id="palette" className="max-w-5xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Casual Palette Tokens</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              The harmonious color palette powering CSSify&apos;s interface and theme tokens. Click any hex to copy.
            </p>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Tailwind & CSS Variables</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {paletteColors.map((color) => (
            <button
              key={color.hex}
              onClick={() => handleCopyColor(color.hex)}
              className="p-3.5 rounded-xl glass-panel text-left hover:border-[#81A6C6] transition-all cursor-pointer border border-[#D2C4B4]/40 group"
            >
              <div
                className="w-full h-12 rounded-lg mb-2.5 shadow-inner border border-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground">{color.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground group-hover:text-[#81A6C6]">
                  {copiedColor === color.hex ? "Copied!" : color.hex}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{color.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Bento Grid: Core Value Propositions (Max 12px rounded) */}
      <section id="features" className="max-w-5xl mx-auto px-4 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Built for Daily Frontend Productivity</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Eliminate trial-and-error by visualising complex CSS mechanics before copying to code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl glass-panel space-y-2.5 border border-[#D2C4B4]/40">
            <div className="w-9 h-9 rounded-xl bg-[#81A6C6]/15 text-[#81A6C6] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Instant Live Canvas</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every slider and color change renders in milliseconds on transparent alpha checkerboard canvases.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel space-y-2.5 border border-[#D2C4B4]/40">
            <div className="w-9 h-9 rounded-xl bg-[#AACDDC]/25 text-[#4F7B9F] dark:text-[#AACDDC] flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Standard CSS Output</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strictly compliant with W3C specifications. No proprietary wrappers, ready for vanilla CSS or Tailwind.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel space-y-2.5 border border-[#D2C4B4]/40">
            <div className="w-9 h-9 rounded-xl bg-[#81A6C6]/15 text-[#81A6C6] flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Curated Presets</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Skip blank canvases with battle-tested presets for holy grail grids, neumorphism, and smooth timing curves.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel space-y-2.5 border border-[#D2C4B4]/40">
            <div className="w-9 h-9 rounded-xl bg-[#AACDDC]/25 text-[#4F7B9F] dark:text-[#AACDDC] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Mini Concept Lessons</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every tool provides collapsible conceptual notes explaining axes, stacking contexts, and clamp math.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Tools Directory Section with Live Search & Filter */}
      <section id="tools" className="max-w-5xl mx-auto px-4 space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Visual Generators Directory</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Choose from 11 specialized tools to generate clean, production-ready styling.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter generators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs glass-panel text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#81A6C6] border border-[#D2C4B4]/40"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#81A6C6] text-white shadow-xs font-semibold"
                  : "glass-pill text-muted-foreground hover:text-foreground border border-[#D2C4B4]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid (Max 12px rounded cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group p-5 rounded-xl glass-panel hover:border-[#81A6C6] hover:shadow-md transition-all flex flex-col justify-between border border-[#D2C4B4]/40"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                      style={{ backgroundColor: `${tool.accent}25`, color: tool.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-[#81A6C6]/15 text-[#81A6C6] border border-[#81A6C6]/30">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-[#81A6C6] transition-colors flex items-center justify-between">
                      <span>{tool.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#81A6C6]" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-[#D2C4B4]/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>{tool.category}</span>
                  <span className="group-hover:text-foreground transition-colors">Launch Tool →</span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-xl space-y-2 border border-[#D2C4B4]/40">
            <p className="text-sm font-medium text-foreground">No generators found matching &quot;{searchQuery}&quot;</p>
            <p className="text-xs text-muted-foreground">Try clearing the search query or selecting &quot;All&quot;.</p>
          </div>
        )}
      </section>

      {/* 7. Community & Open Source CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel rounded-xl p-6 sm:p-8 space-y-5 border border-[#D2C4B4]/50 text-center max-w-3xl mx-auto shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#81A6C6]/15 text-[#81A6C6]">
            <span>🤝 100% Free & Open Source</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Built by Developers, for Developers</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            CSSify is an active open-source project. Want to add a new visual generator, report an edge case,
            or submit a preset? Check our contribution guide on GitHub.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/flexbox"
              className="px-5 py-2.5 rounded-xl bg-[#81A6C6] hover:bg-[#6A93B7] text-white font-medium text-xs transition-colors shadow-xs"
            >
              Start Crafting CSS
            </Link>
            <a
              href="https://github.com/AlphaIsYour/eno-css-playground/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl glass-panel text-foreground font-medium text-xs hover:bg-[#AACDDC]/20 transition-colors flex items-center gap-2 border border-[#D2C4B4]/40"
            >
              <Code2 className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Contribution Guide</span>
            </a>
            <a
              href="https://buymeacoffee.com/enoalph"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl glass-panel text-foreground font-medium text-xs hover:bg-[#AACDDC]/20 transition-colors flex items-center gap-2 border border-[#D2C4B4]/40"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-500" />
              <span>Support Developer</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. SaaS Footer */}
      <footer className="max-w-5xl mx-auto px-4 pt-12 border-t border-[#D2C4B4]/40 text-center space-y-3">
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#81A6C6] to-[#4F7B9F] p-1 flex items-center justify-center shadow-xs border border-[#AACDDC]/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="CSSify Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm text-foreground">CSSify Studio</span>
          <span className="text-xs text-muted-foreground font-mono">• MIT License</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Crafted with Next.js 16, TypeScript, Tailwind CSS & Lucide React. Casual palette: #81A6C6, #AACDDC, #F3E3D0, #D2C4B4.
        </p>
      </footer>
    </div>
  );
}
