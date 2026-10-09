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
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const tools = [
  { name: "Flexbox", href: "/flexbox", icon: Columns3, desc: "Layout generator" },
  { name: "CSS Grid", href: "/grid", icon: LayoutGrid, desc: "Grid builder" },
  { name: "Box Shadow", href: "/box-shadow", icon: Layers, desc: "Shadow designer" },
  { name: "Text Shadow", href: "/text-shadow", icon: Type, desc: "Text effects" },
  { name: "Gradient", href: "/gradient", icon: Palette, desc: "Color gradients" },
  { name: "Filter", href: "/filter", icon: Sparkles, desc: "CSS filters" },
  { name: "Transform", href: "/transform", icon: RotateCw, desc: "2D/3D transforms" },
  { name: "Transition", href: "/transition", icon: Timer, desc: "Timing functions" },
  { name: "Border Radius", href: "/border-radius", icon: Shapes, desc: "Shape maker" },
  { name: "Typography", href: "/typography", icon: CaseSensitive, desc: "Clamp scale" },
  { name: "Spacing", href: "/spacing", icon: Ruler, desc: "Spacing system" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border flex items-center px-4 gap-3">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        <Link href="/" className="font-bold text-lg gradient-text">
          Eno CSS Playground
        </Link>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              E
            </div>
            <div>
              <div className="font-bold text-sm gradient-text">Eno CSS Playground</div>
              <div className="text-[10px] text-muted-foreground">Visual CSS Laboratory</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {tools.map((tool) => {
            const active = pathname === tool.href;
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-primary" : "opacity-70"}`} />
                <div className="min-w-0">
                  <div className="truncate">{tool.name}</div>
                  <div className="text-[10px] opacity-70 truncate">{tool.desc}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 shrink-0" />
            )}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
