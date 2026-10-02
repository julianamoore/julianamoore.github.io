import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/** Ambient background: drifting pink/violet light, film grain, and a cursor-following halo. */
export function Atmosphere() {
  const haloRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const halo = haloRef.current;
    if (!halo) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      halo.style.opacity = '1';
    };

    const tick = () => {
      x += (targetX - x) * 0.085;
      y += (targetY - y) * 0.085;
      halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="halo" ref={haloRef} style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
