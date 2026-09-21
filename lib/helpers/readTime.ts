/**
 * Estimate reading time for blog post content.
 * Average reading speed: 200 words per minute.
 * Minimum: 1 minute.
 */
export function calculateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  // Remove MDX/markdown syntax and count words
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '')        // Remove inline code
    .replace(/#{1,6} /g, '')        // Remove headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links → text
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, '$1') // Remove bold/italic
    .replace(/\n+/g, ' ')           // Normalize newlines
    .trim();

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/**
 * Format reading time for display.
 * Output: "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
