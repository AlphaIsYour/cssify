import Link from "next/link";

const tools = [
  {
    name: "Flexbox Generator",
    href: "/flexbox",
    icon: "⊞",
    desc: "Visual flex container and item controls with alignment, direction, wrapping, and gap presets.",
    color: "from-blue-500 to-cyan-500",
    category: "Layout",
  },
  {
    name: "CSS Grid Generator",
    href: "/grid",
    icon: "⊞",
    desc: "Build grid layouts visually with template columns, rows, gaps, and area placement.",
    color: "from-violet-500 to-purple-500",
    category: "Layout",
  },
  {
    name: "Box Shadow Generator",
    href: "/box-shadow",
    icon: "□",
    desc: "Design layered box shadows with live preview, inset toggle, and spread controls.",
    color: "from-orange-500 to-red-500",
    category: "Effects",
  },
  {
    name: "Text Shadow Generator",
    href: "/text-shadow",
    icon: "A",
    desc: "Create text shadow effects with blur, color, and multi-layer support.",
    color: "from-pink-500 to-rose-500",
    category: "Effects",
  },
  {
    name: "Gradient Generator",
    href: "/gradient",
    icon: "◆",
    desc: "Build linear, radial, and conic gradients with color stops and angle controls.",
    color: "from-emerald-500 to-teal-500",
    category: "Effects",
  },
  {
    name: "CSS Filter Generator",
    href: "/filter",
    icon: "◎",
    desc: "Apply blur, brightness, contrast, saturate, hue-rotate and more with live preview.",
    color: "from-amber-500 to-yellow-500",
    category: "Effects",
  },
  {
    name: "Transform Generator",
    href: "/transform",
    icon: "⟲",
    desc: "Combine translate, rotate, scale, and skew transforms with 2D/3D preview.",
    color: "from-indigo-500 to-blue-500",
    category: "Motion",
  },
  {
    name: "Transition Timing",
    href: "/transition",
    icon: "→",
    desc: "Visualize easing curves, compare timing functions, and generate transition CSS.",
    color: "from-fuchsia-500 to-pink-500",
    category: "Motion",
  },
  {
    name: "Border Radius",
    href: "/border-radius",
    icon: "◔",
    desc: "Craft complex border-radius shapes with individual corner controls and presets.",
    color: "from-lime-500 to-green-500",
    category: "Shapes",
  },
  {
    name: "Typography Scale",
    href: "/typography",
    icon: "T",
    desc: "Generate fluid typography scales using clamp() for responsive font sizing.",
    color: "from-sky-500 to-blue-500",
    category: "Typography",
  },
  {
    name: "Spacing System",
    href: "/spacing",
    icon: "⊞",
    desc: "Design and visualize spacing scales for consistent layout rhythm.",
    color: "from-slate-500 to-gray-500",
    category: "Systems",
  },
];

const categories = ["Layout", "Effects", "Motion", "Shapes", "Typography", "Systems"];

export default function HomePage() {
  return (
    <div className="space-y-12 pt-14 md:pt-0">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          11 Visual Generators
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="gradient-text">Eno CSS Playground</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A practical toolkit for frontend developers and students. Visual generators with live
          preview, code output, presets, and mini lessons — your CSS laboratory.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/flexbox"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Start Building →
          </Link>
          <a
            href="#tools"
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
          >
            Browse Tools
          </a>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Live Preview", desc: "See changes instantly as you adjust controls", icon: "👁" },
          { title: "Copy-Ready Code", desc: "Production CSS output with one-click copy", icon: "📋" },
          { title: "Learn by Doing", desc: "Built-in explanations and preset examples", icon: "📚" },
        ].map((f) => (
          <div key={f.title} className="p-4 rounded-xl border border-border bg-card">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="font-medium text-sm">{f.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Tools grid */}
      <div id="tools" className="space-y-6">
        <h2 className="text-2xl font-bold">All Generators</h2>
        {categories.map((cat) => {
          const catTools = tools.filter((t) => t.category === cat);
          if (catTools.length === 0) return null;
          return (
            <div key={cat} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {cat}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-white text-lg shrink-0`}
                      >
                        {tool.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">
                          {tool.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {tool.desc}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Built with Next.js, TypeScript & Tailwind CSS. Open source and free.
        </p>
      </div>
    </div>
  );
}
