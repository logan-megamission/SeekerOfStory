/** Local founder headshots in /public/founders/ */
export const FOUNDER_PHOTOS: Record<string, string> = {
  "susy-gordon": "/founders/susy-gordon.jpeg",
  "carrie-carter": "/founders/carrie-carter.jpg",
  "yoel-zehaie": "/founders/yoel-zehaie.png",
  "lena-killion": "/founders/lena-killion.jpg",
};

/** Fallback before image dimensions load */
export const PORTRAIT_DEFAULT_POSITION = "50% 20%";

/**
 * Derive CSS object-position from image aspect ratio so faces stay in frame
 * on wide card crops. Tall portraits → focus upper center; square → upper third.
 */
export function focalPositionFromAspect(width: number, height: number): string {
  if (!width || !height) return PORTRAIT_DEFAULT_POSITION;

  const ratio = width / height;

  // Full-body vertical portraits (Yoel, Lena)
  if (ratio <= 0.68) return "50% 12%";

  // 3:4 portraits with face off-center (Susy)
  if (ratio <= 0.82) return "56% 24%";

  // Square / near-square (Carrie in vehicle)
  if (ratio <= 1.08) return "38% 22%";

  // Mild landscape
  if (ratio <= 1.5) return "50% 24%";

  return "50% 28%";
}

/** Optional manual override (DB or config) beats aspect-ratio detection */
export function resolveFounderPhotoPosition(
  width: number,
  height: number,
  override?: string | null
): string {
  if (override?.trim()) return override.trim();
  return focalPositionFromAspect(width, height);
}
