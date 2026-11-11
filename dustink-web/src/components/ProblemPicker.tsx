"use client";

import { problems } from "@/lib/site";
import { track, useLead } from "@/lib/lead";
import { WaButton, WaIcon } from "./Wa";

export function ProblemPicker() {
  const { problem, setProblem } = useLead();
  const active = problems.find((p) => p.id === problem);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
      <ul className="grid gap-3">
        {problems.map((p, i) => {
          const on = p.id === problem;
          return (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setProblem(on ? null : p.id);
                  if (!on) track("problema_elegido", { problem: p.id });
                }}
                className={`group flex w-full items-start gap-4 rounded-2xl border-2 border-ink p-4 text-left transition-[background-color,transform,box-shadow] duration-150 sm:p-5 ${
                  on
                    ? "translate-x-1 bg-ink text-chalk shadow-[4px_4px_0_0_var(--color-sol)]"
                    : "bg-chalk hover:-translate-y-0.5 hover:shadow-[var(--shadow-hard-sm)]"
                }`}
              >
                <span className={`serif mt-0.5 text-3xl leading-none ${on ? "text-ambar" : "text-sol"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-xl font-bold leading-tight sm:text-2xl">{p.title}</span>
                  <span className={`mt-1 block text-[0.95rem] ${on ? "text-chalk/75" : "text-ink/65"}`}>{p.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
        {active ? (
          <div className="card bg-menta p-6 shadow-[var(--shadow-hard)] sm:p-8">
            <p className="eyebrow text-fresco">Para tu caso recomendamos</p>
            <p className="display mt-3 text-4xl sm:text-5xl">{active.film}</p>
            <p className="mt-4 text-lg leading-snug">{active.why}</p>
            <p className="mt-4 text-[0.95rem] text-ink/70">
              Igual te mandamos tres opciones para que compares. Tu elección ya va escrita en el mensaje.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <WaButton where="recomendacion">
                <WaIcon /> Cotizar esta lámina
              </WaButton>
              <a href="#cotizar" className="btn btn-ghost">
                Calcular mis ventanas
              </a>
            </div>
          </div>
        ) : (
          <div className="rounded-[1.25rem] border-2 border-dashed border-ink/40 p-6 sm:p-8">
            <p className="serif text-3xl leading-tight sm:text-4xl">Elige el que más se parece a tu casa.</p>
            <p className="mt-3 text-ink/70">
              Te decimos qué lámina lo resuelve y por qué. Sin tecnicismos: el nombre raro de la lámina lo ponemos
              nosotros.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
