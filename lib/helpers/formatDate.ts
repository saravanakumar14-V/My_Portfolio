/**
 * Format a date string for display
 * Input: ISO date string (YYYY-MM or YYYY-MM-DD)
 * Output: "January 2024" or "Jan 2024" (short)
 */
export function formatDate(
  dateString: string,
  style: 'long' | 'short' = 'long'
): string {
  // Normalize YYYY-MM to YYYY-MM-01 to avoid timezone issues
  const normalized = dateString.length === 7 ? `${dateString}-01` : dateString;
  const date = new Date(normalized);

  return date.toLocaleDateString('en-US', {
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  });
}

/**
 * Format a date range (e.g., "Jan 2022 – Present" or "Jan 2022 – Dec 2024")
 */
export function formatDateRange(
  startDate: string,
  endDate?: string,
  style: 'long' | 'short' = 'long'
): string {
  const start = formatDate(startDate, style);
  const end = endDate ? formatDate(endDate, style) : 'Present';
  return `${start} – ${end}`;
}

/**
 * Calculate duration between two dates in a human-readable format.
 * Returns strings like "1 year 3 months" or "8 months"
 */
export function formatDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate.length === 7 ? `${startDate}-01` : startDate);
  const end = endDate
    ? new Date(endDate.length === 7 ? `${endDate}-01` : endDate)
    : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
}

/**
 * Format a full ISO date for display in blog posts
 * Output: "January 15, 2024"
 */
export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get relative time (e.g., "3 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year',   seconds: 31536000 },
    { label: 'month',  seconds: 2592000 },
    { label: 'week',   seconds: 604800 },
    { label: 'day',    seconds: 86400 },
    { label: 'hour',   seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}
