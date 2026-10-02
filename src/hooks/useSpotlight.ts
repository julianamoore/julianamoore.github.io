import { useCallback } from 'react';
import type { PointerEvent } from 'react';

/**
 * Tracks the pointer inside a card and exposes it as --mx/--my custom properties
 * so the CSS radial highlight can follow the cursor without re-rendering React.
 */
export function useSpotlight() {
  return useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
}
