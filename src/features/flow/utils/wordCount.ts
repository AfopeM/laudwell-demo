type Bucket = 'empty' | 'short' | 'good' | 'great';

export function wordCount(text: string): Bucket {
  const count = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  if (count === 0) return 'empty';
  if (count < 20) return 'short';
  if (count <= 40) return 'good';
  return 'great';
}
