import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSSify — The Visual CSS Studio for Modern Frontend Developers",
  description:
    "Design production-ready CSS visually with live interactive preview and instant copy-ready code. 11 production-grade generators for Flexbox, Grid, 3D Transforms, Box Shadows, Gradients, and Fluid Typography.",
  keywords: [
    "CSS",
    "CSSify",
    "Visual CSS Generator",
    "Flexbox Studio",
    "CSS Grid Builder",
    "Box Shadow Generator",
    "Fluid Typography clamp",
    "Tailwind CSS",
    "SaaS CSS Tool",
  ],
  icons: {
    icon: [
      { url: "favicon.ico" },
      { url: "favicon.ico", sizes: "any" },
    ],
    shortcut: "favicon.ico",
    apple: "favicon.ico",
  },
  openGraph: {
    title: "CSSify — The Visual CSS Studio",
    description:
      "Interactive studio for Flexbox, CSS Grid, 3D Transforms, Box Shadows, Gradients, and Fluid Typography with live preview and production-ready code output.",
    type: "website",
    siteName: "CSSify",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSSify — The Visual CSS Studio",
    description:
      "Design production-ready CSS visually with live interactive preview and instant code generation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased saas-grid-bg">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
