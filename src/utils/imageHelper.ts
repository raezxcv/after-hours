// Image resolution helper to guarantee images load across all dev, preview, and deployment environments

export const resolveImagePath = (path: string): string => {
  if (!path) return '';
  // Normalize leading slash to work in both root and relative subpaths
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return clean;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  // If relative path failed, try with leading slash as fallback
  if (!target.src.includes('data:image')) {
    const current = target.getAttribute('src') || '';
    if (!current.startsWith('/')) {
      target.src = '/' + current;
    } else {
      // Fallback SVG in case image file is completely missing
      target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23141419"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23e01e2b" font-family="sans-serif" font-size="24" font-weight="bold">AFTERHOURS ARCHIVE</text></svg>';
    }
  }
};
