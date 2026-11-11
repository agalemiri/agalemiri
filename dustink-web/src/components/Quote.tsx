"use client";

import { useMemo, useState, useTransition } from "react";
import { saveLead } from "@/app/actions";
import { site, windowTypes } from "@/lib/site";
import { track, useLead, waMessage, waUrl } from "@/lib/lead";
import { WaIcon } from "./Wa";

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
const fmt = (n: number) => n.toLocaleString("es-CL", { maximumFractionDigits: 1 });

export function Quote() {
  const { problem, attribution } = useLead();
  const [counts, setCounts] = useState<Record<string, number>>({ ventanal: 1 });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comuna, setComuna] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  const m2 = useMemo(
    () => windowTypes.reduce((sum, w) => sum + (counts[w.id] ?? 0) * w.m2, 0),
    [counts],
  );
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const summary = windowTypes
    .filter((w) => counts[w.id])
    .map((w) => `${counts[w.id]} ${w.label.toLowerCase()}`)
    .join(", ");

  const { esencial, premium } = site.prices;
  const range = esencial && premium && m2 > 0 ? [esencial * m2, premium * m2] : null;

  const step = (id: string, d: number) => {
    setCounts((c) => ({ ...c, [id]: Math.max(0, Math.min(20, (c[id] ?? 0) + d)) }));
    track("calculadora_usada");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Escribe tu nombre para saber a quién le respondemos.");
    if (digits.length < 8) return setError("Revisa el número de WhatsApp: faltan dígitos.");
    setError("");

    const url = waUrl(waMessage({ problem, m2, windows: summary, comuna, name: name.trim() }));
    track("lead_submit", { m2, problem, comuna });
    start(async () => {
      // Guardamos el contacto y seguimos a WhatsApp aunque el guardado falle.
      await Promise.race([
        saveLead({
          name,
          phone,
          comuna,
          problem,
          m2: m2 > 0 ? Number(m2.toFixed(1)) : null,
          windows: counts,
          attribution,
          page: window.location.pathname,
          company,
        }).catch(() => ({ ok: false })),
        new Promise((r) => setTimeout(r, 2500)),
      ]);
      window.location.href = url;
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
      {/* 1. ventanas */}
      <div className="card p-5 sm:p-8 lg:rounded-r-none lg:border-r-0">
        <p className="eyebrow text-sol">Paso 1</p>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">¿Qué ventanas quieres cubrir?</h3>
        <p className="mt-1 text-ink/65">No midas nada. Cuenta las que más se parezcan.</p>

        <ul className="mt-6 divide-y-2 divide-ink/10">
          {windowTypes.map((w) => {
            const n = counts[w.id] ?? 0;
            return (
              <li key={w.id} className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="text-lg font-bold leading-tight">{w.label}</p>
                  <p className="text-sm text-ink/60">{w.hint}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => step(w.id, -1)}
                    disabled={n === 0}
                    aria-label={`Quitar ${w.label}`}
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink text-2xl font-bold leading-none disabled:opacity-25"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-2xl font-extrabold tabular-nums" aria-live="polite">
                    {n}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(w.id, 1)}
                    aria-label={`Agregar ${w.label}`}
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-ink text-2xl font-bold leading-none text-chalk"
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex items-end justify-between gap-4 rounded-2xl bg-ink px-5 py-4 text-chalk">
          <div>
            <p className="eyebrow text-ambar">Tu vidrio</p>
            <p className="display mt-1 text-5xl tabular-nums">
              {fmt(m2)} <span className="text-2xl font-bold tracking-normal">m²</span>
            </p>
          </div>
          <p className="max-w-[11rem] text-right text-sm leading-snug text-chalk/80">
            {range ? (
              <>
                Entre <strong className="text-chalk">{clp(range[0])}</strong> y{" "}
                <strong className="text-chalk">{clp(range[1])}</strong> + IVA, instalado.
              </>
            ) : total === 0 ? (
              "Agrega al menos una ventana."
            ) : (
              "Aproximado. Lo afinamos con tu foto y te mandamos tres opciones con precio."
            )}
          </p>
        </div>
      </div>

      {/* 2. datos */}
      <form onSubmit={submit} noValidate className="card bg-sol p-5 text-chalk sm:p-8 lg:rounded-l-none">
        <p className="eyebrow text-ink">Paso 2</p>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">¿A quién le mandamos la cotización?</h3>
        <p className="mt-1 text-chalk/85">Tres datos. Respondemos el mismo día por WhatsApp.</p>

        <div className="mt-6 grid gap-4">
          <Field label="Nombre">
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              autoComplete="given-name"
              className="input"
              placeholder="Cómo te llamas"
            />
          </Field>
          <Field label="WhatsApp">
            <input
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError(""); }}
              inputMode="tel"
              autoComplete="tel"
              className="input"
              placeholder="+56 9 1234 5678"
            />
          </Field>
          <Field label="Comuna">
            <select value={comuna} onChange={(e) => setComuna(e.target.value)} className="input">
              <option value="">Elige tu comuna</option>
              {site.comunas.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <input
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            name="company"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border-2 border-ink bg-chalk px-4 py-2.5 font-semibold text-ink">
            {error}
          </p>
        )}

        <button type="submit" disabled={pending} className="btn mt-6 w-full bg-ink text-chalk disabled:opacity-70">
          <WaIcon /> {pending ? "Abriendo WhatsApp…" : "Recibir mis tres opciones"}
        </button>
        <p className="mt-3 text-sm leading-snug text-chalk/85">
          Se abre WhatsApp con tu mensaje ya escrito. Solo te falta adjuntar la foto del ventanal.
        </p>
      </form>

      <style>{`
        .input {
          width: 100%;
          min-height: 3.25rem;
          border: 2px solid var(--color-ink);
          border-radius: 0.9rem;
          background: var(--color-chalk);
          color: var(--color-ink);
          padding: 0.6rem 0.95rem;
          font: inherit;
          font-weight: 600;
        }
        .input::placeholder { color: color-mix(in srgb, var(--color-ink) 45%, transparent); font-weight: 500; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-bold uppercase tracking-wider text-ink">{label}</span>
      {children}
    </label>
  );
}
