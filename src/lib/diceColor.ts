export const generateDiceColor = (existingHues: number[]): number => {
  if (existingHues.length === 0) return Math.random() * 360;

  let bestHue = 0;
  let bestMinDistance = -1;

  for (let candidate = 0; candidate < 360; candidate++) {
    const minDistance = Math.min(
      ...existingHues.map((hue) => {
        const diff = Math.abs(candidate - hue);
        return Math.min(diff, 360 - diff);
      }),
    );

    if (minDistance > bestMinDistance) {
      bestMinDistance = minDistance;
      bestHue = candidate;
    }
  }

  return bestHue;
};
