'use client';

import { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils/cn';
import styles from './Image.module.css';

export interface ImageProps extends NextImageProps {
  wrapperClassName?: string;
}

/**
 * Image component
 * Wraps next/image with a fade-in animation on load.
 * Defaults to blurring placeholders if blurDataURL is provided.
 */
export function Image({
  className,
  wrapperClassName,
  alt,
  onLoad,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        styles.wrapper,
        isLoading && styles.loading,
        wrapperClassName
      )}
    >
      <NextImage
        className={cn(
          styles.image,
          isLoading ? styles.imageLoading : styles.imageLoaded,
          className
        )}
        alt={alt}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
        }}
        {...props}
      />
    </div>
  );
}
