'use client';

import { ReactNode } from 'react';
import { CursorDot } from '@/effects/cursor/CursorDot';

/**
 * CursorProvider
 * Mounts the refined Precision Atmospheric Cursor at root level.
 * Replaced legacy fluid rainbow simulation with precision atmospheric interaction model.
 */
export function CursorProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CursorDot />
    </>
  );
}
