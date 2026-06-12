import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
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
  title: "Eno CSS Playground — Visual CSS Generators & Learning Lab",
  description:
    "A practical toolkit for frontend developers and students. Visual generators for Flexbox, Grid, shadows, gradients, transforms, and more with live preview and code output.",
  keywords: [
    "CSS",
    "Flexbox",
    "Grid",
    "box-shadow",
    "gradient",
    "generator",
    "playground",
    "frontend",
    "learning",
  ],
  openGraph: {
    title: "Eno CSS Playground — Visual CSS Generators & Learning Lab",
    description:
      "A practical toolkit for frontend developers and students. Visual generators for Flexbox, Grid, shadows, gradients, transforms, and more with live preview and code output.",
    type: "website",
    siteName: "Eno CSS Playground",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eno CSS Playground — Visual CSS Generators & Learning Lab",
    description:
      "A practical toolkit for frontend developers and students. Visual generators with live preview and code output.",
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
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-64 transition-all duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
