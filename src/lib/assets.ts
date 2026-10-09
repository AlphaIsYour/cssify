/**
 * Utility to resolve asset paths reliably across both local development (/)
 * and GitHub Pages subpath deployment (/eno-css-playground/).
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
