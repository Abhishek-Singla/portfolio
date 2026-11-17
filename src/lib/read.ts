// Counts the words in every string found inside the given values.
export function countWords(...vals: unknown[]): number {
  let n = 0;
  const walk = (v: unknown) => {
    if (typeof v === "string") n += v.trim() ? v.trim().split(/\s+/).length : 0;
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v as Record<string, unknown>).forEach(walk);
  };
  vals.forEach(walk);
  return n;
}

export const readingMinutes = (words: number) => Math.max(1, Math.round(words / 200));
