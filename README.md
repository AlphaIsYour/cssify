# Eno CSS Playground

A practical CSS toolkit for frontend developers and students learning layout and styling. Visual generators with live preview, code output, presets, and mini lessons — your CSS laboratory.

## Features

### 11 Visual Generators

| Generator | Description |
|-----------|-------------|
| **Flexbox** | Visual flex container and item controls with alignment, direction, wrapping, and gap presets |
| **CSS Grid** | Build grid layouts with template columns, rows, gaps, and area placement |
| **Box Shadow** | Layered box shadows with inset toggle, spread controls, and multi-layer support |
| **Text Shadow** | Text shadow effects with blur, color, and multi-layer support |
| **Gradient** | Linear, radial, and conic gradients with color stops and angle controls |
| **Filter** | Blur, brightness, contrast, saturate, hue-rotate, and more |
| **Transform** | Translate, rotate, scale, skew with 2D/3D preview |
| **Transition Timing** | Easing curve visualization and transition CSS generation |
| **Border Radius** | Individual corner controls with shape presets |
| **Typography Scale** | Fluid typography using clamp() for responsive font sizing |
| **Spacing System** | Spacing scale generator with linear, Fibonacci, and geometric ratios |

### Every Generator Includes

- **Live Preview** — See changes instantly as you adjust controls
- **Code Output** — Production-ready CSS with one-click copy
- **Presets** — Common patterns to get started quickly
- **Explanation Panel** — Built-in lessons explaining the CSS concepts
- **Dark Mode** — Full dark mode support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Custom components with CSS variables
- **Deployment**: Vercel-ready

## Getting Started

```bash
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

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Homepage with tool grid
│   ├── globals.css         # Global styles and CSS variables
│   ├── flexbox/            # Flexbox generator
│   ├── grid/               # CSS Grid generator
│   ├── box-shadow/         # Box shadow generator
│   ├── text-shadow/        # Text shadow generator
│   ├── gradient/           # Gradient generator
│   ├── filter/             # CSS filter generator
│   ├── transform/          # Transform generator
│   ├── transition/         # Transition timing generator
│   ├── border-radius/      # Border radius generator
│   ├── typography/         # Typography scale generator
│   └── spacing/            # Spacing system generator
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── ThemeProvider.tsx   # Dark/light mode context
│   ├── CodeOutput.tsx      # Code block with copy button
│   ├── Controls.tsx        # Slider, color, select controls
│   ├── Presets.tsx         # Preset button group
│   └── ExplanationPanel.tsx # Collapsible lesson panel
└── lib/
    └── (utilities)
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/eno-css-playground)

## Roadmap

- [ ] CSS animation keyframe generator
- [ ] CSS custom property manager
- [ ] Responsive breakpoint visualizer
- [ ] CSS snippet library
- [ ] Export to CodePen/JSFiddle
- [ ] Shareable URL state

## License

MIT
