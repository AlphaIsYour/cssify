# Contributing to Eno CSS Playground

Thank you for your interest in contributing to **Eno CSS Playground**! Whether you are fixing a typo, improving documentation, reporting a bug, or building a brand-new visual CSS generator, your help is welcome.

This guide provides everything you need to know to get started smoothly.

---

## Code of Conduct

This project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code and foster an inclusive, welcoming environment for everyone.

---

## Quick Navigation

- [Where Do I Start?](#where-do-i-start)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Coding & Style Standards](#coding--style-standards)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Contributor Ladder](#contributor-ladder)
- [Need Help?](#need-help)

---

## Where Do I Start?

If you are new to the project or looking for ideas to work on:
- Look for issues labeled [`good first issue`](https://github.com/AlphaIsYour/eno-css-playground/labels/good%20first%20issue). These are small, self-contained tasks designed to help you become familiar with the codebase.
- Issues labeled [`help wanted`](https://github.com/AlphaIsYour/eno-css-playground/labels/help%20wanted) are prioritized tasks looking for a contributor.
- You can also suggest enhancements, fix UI bugs, or propose new CSS generators using our [Issue Templates](https://github.com/AlphaIsYour/eno-css-playground/issues/new/choose).

---

## Development Setup

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` LTS or higher (required by Next.js 16)
- **npm**: `v10.x` or higher
- **Git**

### Installation Steps

1. **Fork the repository** on GitHub:
   Click the **Fork** button on the top-right of [AlphaIsYour/eno-css-playground](https://github.com/AlphaIsYour/eno-css-playground).

2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/<your-username>/eno-css-playground.git
   cd eno-css-playground
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your web browser. The app should reload automatically as you modify source files.

---

## Development Workflow

### 1. Create a Topic Branch

Never commit directly to `master`. Always create a new branch from `master` with a descriptive name:

```bash
# For a new feature or generator
git checkout -b feat/animation-generator

# For a bug fix
git checkout -b fix/slider-step-precision

# For documentation updates
git checkout -b docs/readme-clarifications
```

### 2. Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Runs the development server at `http://localhost:3000` |
| `npm run lint` | Lints all TypeScript and React files with ESLint |
| `npm run build` | Builds the production bundle (Turbopack + TypeScript checks) |
| `npm start` | Runs the production server locally |

### 3. Verify Before Committing

Before creating a commit or opening a Pull Request, verify that your code adheres to linting and compilation checks:

```bash
# 1. Run ESLint
npm run lint

# 2. Test full production build
npm run build
```

Both commands **must pass with zero errors** before submitting a PR.

---

## Coding & Style Standards

1. **Tech Stack & Conventions**:
   - Every generator page resides in its own route under `src/app/<generator-name>/page.tsx` and must declare `"use client"` at the top.
   - Shared controls (`SliderControl`, `ColorInput`, `SelectControl`) should be imported from `@/components/Controls`.
   - CSS code output must use `@/components/CodeOutput` to provide one-click copy functionality.
   - Presets must use `@/components/Presets`.
   - Educational explanations should be enclosed within `@/components/ExplanationPanel`.
   - All page views must include `pt-14 md:pt-0` on their top-level container to properly offset the mobile header.

2. **Styling**:
   - Use Tailwind CSS v4 utility classes and CSS variables defined in `src/app/globals.css`.
   - Ensure support for both **Light** and **Dark** modes (`--background`, `--foreground`, `--border`, `--card`, etc.).

3. **Accessibility**:
   - Provide accessible labels, valid semantic HTML elements, and keyboard navigability.
   - Connect `<label>` elements with corresponding input controls.

4. **Commit Messages**:
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add clip-path generator with polygon presets`
   - `fix: resolve mobile navigation backdrop blur issue`
   - `docs: update installation instructions in README`
   - `refactor: extract CSS string formatter to utils`

---

## Pull Request Guidelines

1. **Keep PRs Focused**: One feature or bug fix per Pull Request.
2. **Fill Out the PR Template**: Describe what was changed, why it was changed, and include screenshots or screen recordings for any visual changes.
3. **Reference Related Issues**: In your PR description, link the issue it resolves (e.g., `Closes #12` or `Fixes #34`).
4. **Be Responsive to Feedback**: Maintainers may ask for tweaks or clarifications. We will work with you to get your PR merged!

---

## Contributor Ladder

We believe in supporting contributors at all levels:

```
Level 1: First-Time Contributor
  Fixing typos, updating docs, improving accessibility labels, adding presets.
       │
       ▼
Level 2: Active Contributor
  Fixing UI/UX bugs, improving shared components, adding unit tests.
       │
       ▼
Level 3: Core Contributor
  Authoring new CSS generators, adding major roadmap capabilities, reviewing PRs.
```

---

## Need Help?

- Have a question or stuck during setup? Open an issue with the `question` label or reach out via [GitHub Discussions](https://github.com/AlphaIsYour/eno-css-playground/discussions) (if enabled) or comment on the relevant issue.
- Maintainer: [@AlphaIsYour](https://github.com/AlphaIsYour)

Happy coding, and thank you for building Eno CSS Playground together!
