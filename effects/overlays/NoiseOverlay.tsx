import { cn } from '@/lib/utils/cn';
import styles from './NoiseOverlay.module.css';

interface NoiseOverlayProps {
  className?: string;
  opacity?: number;
}

/**
 * NoiseOverlay
 * Adds a subtle film grain texture over the UI to prevent banding
 * in gradients and give a more organic, premium feel.
 */
export function NoiseOverlay({ className, opacity = 0.03 }: NoiseOverlayProps) {
  return (
    <div
      className={cn(styles.noise, className)}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
