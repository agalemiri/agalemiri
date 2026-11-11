"use server";

import { createClient } from "@supabase/supabase-js";

export type LeadInput = {
  name: string;
  phone: string;
  comuna: string;
  problem: string | null;
  m2: number | null;
  windows: Record<string, number>;
  attribution: Record<string, string>;
  page: string;
  // Campo trampa: los bots lo llenan, las personas no lo ven.
  company?: string;
};

const clean = (s: unknown, max: number) => String(s ?? "").trim().slice(0, max);

export async function saveLead(input: LeadInput): Promise<{ ok: boolean }> {
  if (input.company) return { ok: true };

  const name = clean(input.name, 80);
  const phone = clean(input.phone, 20).replace(/[^\d+]/g, "");
  const comuna = clean(input.comuna, 60);
  if (name.length < 2 || phone.replace(/\D/g, "").length < 8) return { ok: false };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  // Sin base de datos configurada el contacto igual sigue por WhatsApp.
  if (!url || !key) return { ok: false };

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    comuna: comuna || null,
    problem: input.problem ? clean(input.problem, 30) : null,
    m2: typeof input.m2 === "number" && input.m2 > 0 && input.m2 < 2000 ? input.m2 : null,
    windows: input.windows ?? {},
    attribution: input.attribution ?? {},
    page: clean(input.page, 200),
  });
  if (error) console.error("saveLead", error.message);
  return { ok: !error };
}
