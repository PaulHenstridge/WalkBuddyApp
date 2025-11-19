export const RATING_LEVELS = ['GREAT', 'OK', 'NOT_OK'] as const;
export type RatingLevel = typeof RATING_LEVELS[number];

export function isRatingLevel(x: unknown): x is RatingLevel {
  return typeof x === 'string' && (RATING_LEVELS as readonly string[]).includes(x);
}

export function toRatingLevel(x: unknown): RatingLevel | '' {
  return isRatingLevel(x) ? x : '';
}
