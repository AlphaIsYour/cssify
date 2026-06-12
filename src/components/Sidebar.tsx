"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const tools = [
  { name: "Flexbox", href: "/flexbox", icon: "⊞", desc: "Layout generator" },
  { name: "CSS Grid", href: "/grid", icon: "⊞", desc: "Grid builder" },
  { name: "Box Shadow", href: "/box-shadow", icon: "□", desc: "Shadow designer" },
  { name: "Text Shadow", href: "/text-shadow", icon: "A", desc: "Text effects" },
  { name: "Gradient", href: "/gradient", icon: "◆", desc: "Color gradients" },
  { name: "Filter", href: "/filter", icon: "◎", desc: "CSS filters" },
  { name: "Transform", href: "/transform", icon: "⟲", desc: "2D/3D transforms" },
  { name: "Transition", href: "/transition", icon: "→", desc: "Timing functions" },
  { name: "Border Radius", href: "/border-radius", icon: "◔", desc: "Shape maker" },
  { name: "Typography", href: "/typography", icon: "T", desc: "Clamp scale" },
  { name: "Spacing", href: "/spacing", icon: "⊞", desc: "Spacing system" },
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
          className="p-2 rounded-lg hover:bg-accent"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/" className="font-bold text-lg gradient-text">Eno CSS Playground</Link>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
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
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            <div>
              <div className="font-bold text-sm gradient-text">Eno CSS Playground</div>
              <div className="text-[10px] text-muted-foreground">Visual CSS Generators</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {tools.map((tool) => {
            const active = pathname === tool.href;
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
                <span className="w-6 text-center text-base">{tool.icon}</span>
                <div>
                  <div>{tool.name}</div>
                  <div className="text-[10px] opacity-70">{tool.desc}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <span className="w-6 text-center">{theme === "dark" ? "☀" : "🌙"}</span>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>
    </>
  );
}
