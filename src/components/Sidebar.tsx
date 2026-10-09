"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  Sun,
  Moon,
  Menu,
  Home,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { getAssetPath } from "@/lib/assets";

const tools = [
  { name: "Flexbox", href: "/flexbox", icon: Columns3, desc: "Layout alignment" },
  { name: "CSS Grid", href: "/grid", icon: LayoutGrid, desc: "Grid architecture" },
  { name: "Box Shadow", href: "/box-shadow", icon: Layers, desc: "Layered elevations" },
  { name: "Text Shadow", href: "/text-shadow", icon: Type, desc: "Typography effects" },
  { name: "Gradient", href: "/gradient", icon: Palette, desc: "Color transitions" },
  { name: "Filter", href: "/filter", icon: Sparkles, desc: "Visual shaders" },
  { name: "Transform", href: "/transform", icon: RotateCw, desc: "2D/3D matrix" },
  { name: "Transition", href: "/transition", icon: Timer, desc: "Easing curves" },
  { name: "Border Radius", href: "/border-radius", icon: Shapes, desc: "Organic shapes" },
  { name: "Typography", href: "/typography", icon: CaseSensitive, desc: "Fluid clamp()" },
  { name: "Spacing", href: "/spacing", icon: Ruler, desc: "Design scale" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const logoUrl = getAssetPath("/cssify.png");

  return (
    <>
      {/* Mobile Header (For Studio pages) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#f3e3d0]/95 dark:bg-[#172330]/95 backdrop-blur-md border-b border-[#d2c4b4] dark:border-[#33485d] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-lg hover:bg-[#aacddc]/30 text-foreground transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#81A6C6] to-[#4F7B9F] p-1.5 flex items-center justify-center shadow-xs border border-[#AACDDC]/40 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="CSSify Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-base tracking-tight text-foreground">CSSify</span>
          </Link>
        </div>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="p-1.5 rounded-lg hover:bg-[#aacddc]/30 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#81A6C6]" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar with Casual Palette */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#f9ede0] dark:bg-[#172330] border-r border-[#d2c4b4] dark:border-[#33485d] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col shadow-xs`}
      >
        {/* Brand Logo Header */}
        <div className="p-4 border-b border-[#d2c4b4]/60 dark:border-[#33485d]">
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#81A6C6] to-[#4F7B9F] p-1.5 flex items-center justify-center shadow-sm border border-[#AACDDC]/50 group-hover:scale-105 transition-transform shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="CSSify Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-bold text-sm text-foreground tracking-tight flex items-center gap-1.5">
                <span>CSSify</span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-[#81A6C6]/20 text-[#305675] dark:text-[#AACDDC] border border-[#81A6C6]/30">
                  STUDIO
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">Visual CSS Engine</div>
            </div>
          </Link>
        </div>

        {/* Back to Landing Page link */}
        <div className="px-3 pt-3 pb-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-[#AACDDC]/25 hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4 shrink-0 text-[#81A6C6]" />
            <span>← Back to Overview</span>
          </Link>
        </div>

        <div className="px-4 pt-3 pb-1 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground font-mono">
          Generators (11)
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {tools.map((tool) => {
            const active = pathname === tool.href;
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                  active
                    ? "bg-[#81A6C6] text-white font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-[#AACDDC]/25 hover:text-foreground"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? "text-white" : "text-[#81A6C6]"}`} />
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <span className="truncate">{tool.name}</span>
                  {active && <span className="text-[10px] font-mono text-white/90">●</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-[#d2c4b4]/60 dark:border-[#33485d] space-y-1.5 bg-[#f3e3d0]/60 dark:bg-[#121c27]">
          <a
            href="https://github.com/AlphaIsYour/eno-css-playground"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-[#AACDDC]/25 hover:text-foreground transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              GitHub Repository
            </span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <button
            onClick={toggle}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-[#AACDDC]/25 hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#81A6C6]" />
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </span>
            <span className="text-[10px] font-mono opacity-60 uppercase">{theme}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
