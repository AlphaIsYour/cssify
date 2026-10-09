# Eno CSS Playground

[![CI](https://github.com/AlphaIsYour/eno-css-playground/actions/workflows/ci.yml/badge.svg)](https://github.com/AlphaIsYour/eno-css-playground/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A practical, interactive CSS toolkit for frontend developers and students learning layout and styling. Visual generators with live preview, copy-ready CSS, presets, and mini lessons — your CSS laboratory.

---

## Features

### 11 Visual Generators

| Generator | Route | Description |
|---|---|---|
| **Flexbox** | `/flexbox` | Visual flex container and item controls with alignment, direction, wrapping, and gap presets |
| **CSS Grid** | `/grid` | Build grid layouts with template columns, rows, gaps, and area placement |
| **Box Shadow** | `/box-shadow` | Layered box shadows with inset toggle, spread controls, and multi-layer support |
| **Text Shadow** | `/text-shadow` | Text shadow effects with blur, color, and multi-layer support |
| **Gradient** | `/gradient` | Linear, radial, and conic gradients with color stops and angle controls |
| **Filter** | `/filter` | Blur, brightness, contrast, saturate, hue-rotate, and more |
| **Transform** | `/transform` | Translate, rotate, scale, skew with 2D/3D preview |
| **Transition Timing** | `/transition` | Easing curve visualization and transition CSS generation |
| **Border Radius** | `/border-radius` | Individual corner controls with shape presets |
| **Typography Scale** | `/typography` | Fluid typography using `clamp()` for responsive font sizing |
| **Spacing System** | `/spacing` | Spacing scale generator with linear, Fibonacci, and geometric ratios |

### Every Generator Includes

- **Live Preview** — See changes instantly on a checkerboard canvas as you adjust controls
- **Code Output** — Production-ready CSS with one-click copy to clipboard
- **Presets** — Curated starter presets to learn and iterate quickly
- **Explanation Panel** — Built-in lessons explaining underlying CSS concepts
- **Dark Mode** — Seamless light and dark mode switching with system preference detection

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **View Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Native CSS variables
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/AlphaIsYour/eno-css-playground.git
cd eno-css-playground

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar navigation & fonts
│   ├── page.tsx            # Homepage with categorized tool directory
│   ├── globals.css         # CSS design tokens & dark/light theme variables
│   ├── flexbox/            # Flexbox generator
│   ├── grid/               # CSS Grid generator
│   ├── box-shadow/         # Box shadow generator
│   ├── text-shadow/        # Text shadow generator
│   ├── gradient/           # Linear, radial & conic gradient generator
│   ├── filter/             # CSS filter generator
│   ├── transform/          # 2D & 3D transform generator
│   ├── transition/         # Transition timing curve visualizer
│   ├── border-radius/      # Border radius & organic shape generator
│   ├── typography/         # Fluid clamp() typography scale generator
│   └── spacing/            # Spacing scale generator (Linear/Fibonacci/Geometric)
├── components/
│   ├── Sidebar.tsx         # Responsive navigation sidebar
│   ├── ThemeProvider.tsx   # Light/dark mode provider with localStorage
│   ├── CodeOutput.tsx      # Formatted code block with copy button
│   ├── Controls.tsx        # Slider, color picker, and select controls
│   ├── Presets.tsx         # Preset selector buttons
│   └── ExplanationPanel.tsx # Collapsible educational concept panel
└── lib/
    └── (pure utilities and CSS formatters)
```

---

## Deploy to Vercel

You can deploy your own instance of Eno CSS Playground to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AlphaIsYour/eno-css-playground)

---

## Roadmap

### Completed
- [x] 11 Core visual CSS generators with live preview
- [x] Preset selector for fast experimentation
- [x] Code output block with one-click clipboard copy
- [x] Built-in educational explanation panels
- [x] Light & dark mode theme support

### In Progress
- [ ] GitHub Community Standards and CI automated validation
- [ ] Accessibility (WCAG) improvements across form controls and panels
- [ ] Lucide icons across sidebar and tool cards

### Planned & Help Wanted
- [ ] **CSS Animation Keyframe Generator** — Visual `@keyframes` timeline builder
- [ ] **Unit Tests & Utility Extraction** — Extract mathematical and string helpers to `src/lib/` with Vitest
- [ ] **Shareable URL State** — Encode generator state in URL parameters to share setups
- [ ] **Command Palette (`Cmd + K`)** — Quick search and navigation across all tools
- [ ] **Export Options** — One-click export to CodePen and CSS custom property files

### Future Ideas
- [ ] CSS Custom Property Manager (Theme token builder)
- [ ] Responsive Breakpoint Visualizer
- [ ] CSS Snippet Library

---

## Contributing

Contributions are warmly welcome! We appreciate help with new features, bug fixes, preset additions, and documentation improvements.

- Check out our **[CONTRIBUTING.md](CONTRIBUTING.md)** guide to get started.
- Browse issues tagged with [**`good first issue`**](https://github.com/AlphaIsYour/eno-css-playground/labels/good%20first%20issue) for beginner-friendly contributions.
- Please adhere to our **[Code of Conduct](CODE_OF_CONDUCT.md)** in all interactions.
- For security-related concerns, review our **[Security Policy](SECURITY.md)**.

---

## Contributors

Thank you to everyone who takes the time to contribute to Eno CSS Playground!

Check out our [contributors graph](https://github.com/AlphaIsYour/eno-css-playground/graphs/contributors) to see all contributors.

---

## Support

If you find this project useful for learning CSS or building your web layouts, you can optionally support its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-Support-orange?logo=buy-me-a-coffee)](https://buymeacoffee.com/enoalph)

---

## License

This project is licensed under the [MIT License](LICENSE).
