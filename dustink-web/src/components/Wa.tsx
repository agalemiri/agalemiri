"use client";

import { useEffect, useState } from "react";
import { track, useLead, waMessage, waUrl } from "@/lib/lead";

export function WaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 8.5c-.4 2.9 3.6 6.9 6.5 6.5l.9-1.7-2-1.2-.9.8c-1-.5-1.9-1.4-2.4-2.4l.8-.9-1.2-2L9 8.5Z" fill="currentColor" />
    </svg>
  );
}

export function WaButton({
  children,
  where,
  className = "btn btn-wa",
}: {
  children: React.ReactNode;
  where: string;
  className?: string;
}) {
  const { problem } = useLead();
  return (
    <a
      href={waUrl(waMessage({ problem }))}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() => track("whatsapp_click", { where, problem })}
    >
      {children}
    </a>
  );
}

export function StickyBar() {
  // Aparece cuando los botones de la portada ya quedaron arriba.
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 640);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper/95 p-3 backdrop-blur transition-transform duration-200 sm:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex gap-2">
        <a href="#cotizar" className="btn btn-ghost flex-1 !min-h-12 !px-3 text-[0.95rem]">
          Calcular
        </a>
        <WaButton where="barra_movil" className="btn btn-wa flex-[1.6] !min-h-12 !px-3 text-[0.95rem]">
          <WaIcon size={20} /> Cotizar con una foto
        </WaButton>
      </div>
    </div>
  );
}
