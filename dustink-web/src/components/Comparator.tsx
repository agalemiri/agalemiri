"use client";

import { useCallback, useRef, useState } from "react";
import { Scene } from "./Scene";
import { site } from "@/lib/site";
import { track } from "@/lib/lead";

export function Comparator() {
  const [pos, setPos] = useState(46); // % del ancho que queda "sin lámina"
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const first = () => {
    if (!touched) {
      setTouched(true);
      track("comparador_usado");
    }
  };

  return (
    <figure className="relative">
      <div
        ref={box}
        className="relative aspect-[5/6] w-full touch-none select-none overflow-hidden rounded-[1.75rem] border-2 border-ink shadow-[var(--shadow-hard)] sm:aspect-[4/5] lg:aspect-[5/6]"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          first();
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="absolute inset-0">
          <Scene variant="con" />
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Scene variant="sin" />
        </div>

        <span className="eyebrow absolute left-3 top-3 rounded-full border-2 border-ink bg-ambar px-3 py-1.5 text-ink">
          Sin lámina
        </span>
        <span className="eyebrow absolute right-3 top-3 rounded-full border-2 border-ink bg-menta px-3 py-1.5 text-ink">
          Con Dustink
        </span>

        {/* la lámina: el borde que arrastras */}
        <div className="absolute inset-y-0 w-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-[2px] w-1 bg-ink" />
          <button
            type="button"
            role="slider"
            aria-label="Mover la lámina sobre el ventanal"
            aria-valuemin={4}
            aria-valuemax={96}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(100 - pos)} % del ventanal con lámina`}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") { first(); setPos((p) => Math.max(4, p - 4)); }
              if (e.key === "ArrowRight") { first(); setPos((p) => Math.min(96, p + 4)); }
            }}
            className={`absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-ink bg-chalk shadow-[var(--shadow-hard-sm)] ${touched ? "" : "pista"}`}
          >
            <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden="true">
              <path d="M7 1 1 7l6 6M19 1l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
          <p className="max-w-[9.5rem] rounded-xl border-2 border-ink bg-chalk/95 px-3 py-2 text-[0.8rem] font-semibold leading-tight">
            El sol entra entero: calor, brillo y muebles desteñidos.
          </p>
          <p className="max-w-[9.5rem] rounded-xl border-2 border-ink bg-fresco px-3 py-2 text-right text-[0.8rem] font-semibold leading-tight text-chalk">
            {site.claims.heat}. La luz sigue entrando.
          </p>
        </div>
      </div>
      <figcaption className="mt-4 flex items-center gap-2 text-sm font-medium text-ink/70">
        <span aria-hidden="true">←</span> Arrastra la lámina sobre el ventanal <span aria-hidden="true">→</span>
      </figcaption>
    </figure>
  );
}
