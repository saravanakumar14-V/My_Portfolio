/**
 * cn — Class Name Utility
 * Merges class names, filtering falsy values.
 * Works similarly to clsx without an external dependency for simple cases.
 * 
 * Usage:
 *   cn('base-class', condition && 'conditional-class', className)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
