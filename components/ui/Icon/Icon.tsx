import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import styles from './Icon.module.css';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'inherit';
  className?: string;
  strokeWidth?: number;
}

/**
 * Icon Component
 * Wrapper for lucide-react icons ensuring consistent styling via design tokens.
 */
export function Icon({
  icon: IconComponent,
  size = 'md',
  color = 'inherit',
  className,
  strokeWidth = 2,
}: IconProps) {
  return (
    <IconComponent
      className={cn(
        styles.icon,
        styles[`size-${size}`],
        styles[`color-${color}`],
        className
      )}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
