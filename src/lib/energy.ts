export function computeEnergyScore(
  age: number,
  lifeStatus: string,
  seed: number
): number {
  // Base score: deterministic pseudo-random between 20–80 using seed
  const base = 20 + (((seed * 9301 + 49297) % 233280) / 233280) * 60;
  let score = Math.round(base);

  const status = lifeStatus.toLowerCase();

  if (status === "married") score += 5;
  if (status === "single" && age > 30) score -= 10;
  if (status === "student") score += 10;
  if (status === "hustling") score -= 5;

  // Clamp 0–100
  return Math.max(0, Math.min(100, score));
}
