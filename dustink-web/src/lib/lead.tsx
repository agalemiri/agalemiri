"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { site, problems, type ProblemId } from "./site";

type Attribution = Record<string, string>;

type LeadState = {
  problem: ProblemId | null;
  setProblem: (p: ProblemId | null) => void;
  attribution: Attribution;
};

const Ctx = createContext<LeadState | null>(null);

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [problem, setProblem] = useState<ProblemId | null>(null);
  const [attribution, setAttribution] = useState<Attribution>({});

  useEffect(() => {
    // Guarda de dónde vino la visita para saber qué aviso trajo cada contacto.
    const found: Attribution = {};
    const params = new URLSearchParams(window.location.search);
    for (const k of KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    try {
      if (Object.keys(found).length) {
        sessionStorage.setItem("dk_attr", JSON.stringify(found));
        setAttribution(found);
      } else {
        const saved = sessionStorage.getItem("dk_attr");
        if (saved) setAttribution(JSON.parse(saved));
      }
    } catch {
      setAttribution(found);
    }
  }, []);

  const value = useMemo(() => ({ problem, setProblem, attribution }), [problem, attribution]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLead() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLead fuera de LeadProvider");
  return v;
}

export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}

export function waUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function waMessage(opts: { problem?: ProblemId | null; m2?: number; windows?: string; comuna?: string; name?: string }) {
  const lines = ["Hola Dustink, quiero cotizar láminas de control solar."];
  if (opts.name) lines.push(`Soy ${opts.name}.`);
  if (opts.comuna) lines.push(`Comuna: ${opts.comuna}.`);
  const p = problems.find((x) => x.id === opts.problem);
  if (p) lines.push(`Mi problema: ${p.title.toLowerCase()}.`);
  if (opts.windows) lines.push(`Ventanas: ${opts.windows}.`);
  if (opts.m2) lines.push(`Son unos ${opts.m2.toLocaleString("es-CL", { maximumFractionDigits: 1 })} m² de vidrio.`);
  lines.push("Te mando la foto del ventanal.");
  return lines.join("\n");
}
