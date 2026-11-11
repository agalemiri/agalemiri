import { Comparator } from "@/components/Comparator";
import { ProblemPicker } from "@/components/ProblemPicker";
import { Quote } from "@/components/Quote";
import { StickyBar, WaButton, WaIcon } from "@/components/Wa";
import { LeadProvider } from "@/lib/lead";
import { faqs, site, tiers } from "@/lib/site";

const clp = (n: number) => "$" + n.toLocaleString("es-CL");

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <LeadProvider>
      <a href="#cotizar" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-chalk">
        Ir a cotizar
      </a>

      {/* Cabecera */}
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-baseline gap-2.5">
            <span className="display text-2xl tracking-tight sm:text-[1.7rem]">DUSTINK</span>
            <span className="hidden text-sm font-semibold text-ink/60 sm:inline">{site.tagline} · {site.city}</span>
          </a>
          <nav className="flex items-center gap-5">
            <a href="#laminas" className="hidden text-[0.95rem] font-semibold underline-offset-4 hover:underline md:inline">Láminas</a>
            <a href="#como" className="hidden text-[0.95rem] font-semibold underline-offset-4 hover:underline md:inline">Cómo funciona</a>
            <a href="#dudas" className="hidden text-[0.95rem] font-semibold underline-offset-4 hover:underline md:inline">Dudas</a>
            <WaButton where="cabecera" className="btn btn-wa !min-h-11 !px-4 text-[0.95rem]">
              <WaIcon size={20} /> <span className="hidden sm:inline">Cotizar por</span> WhatsApp
            </WaButton>
          </nav>
        </div>
      </header>

      <main className="pb-24 sm:pb-0">
        {/* Portada */}
        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:pb-20">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ambar px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-brasa" /> Control solar para tu casa
            </p>
            <h1 className="display mt-6 text-[clamp(3rem,8.6vw,5.3rem)]">
              El sol se queda afuera.
              <span className="serif mt-2 block text-[0.86em] leading-none text-sol">La luz, no.</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-snug sm:text-[1.4rem]">
              Láminas que bajan el calor de tu living sin cambiar los vidrios ni vivir con la cortina cerrada.
              Instaladas en un día, en {site.city}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WaButton where="portada">
                <WaIcon /> Cotizar con una foto
              </WaButton>
              <a href="#cotizar" className="btn btn-ghost">
                Calcular mis ventanas
              </a>
            </div>
            <p className="mt-3 text-[0.95rem] text-ink/65">Mandas la foto del ventanal, te respondemos el mismo día.</p>

            <dl className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t-2 border-ink pt-6 sm:grid-cols-4">
              {[
                [site.claims.heat, "en tu living"],
                [site.claims.uv, "para muebles y pisos"],
                [site.claims.install, "sin obra ni polvo"],
                [site.warrantyYears ? `${site.warrantyYears} años` : "Garantía", "por escrito"],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="text-lg font-extrabold leading-tight">{a}</dt>
                  <dd className="text-sm leading-tight text-ink/60">{b}</dd>
                </div>
              ))}
            </dl>

            {site.reviews && (
              <a href={site.reviews.url} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 font-semibold underline underline-offset-4">
                {site.reviews.rating.toLocaleString("es-CL")} de 5 en Google · {site.reviews.count} reseñas
              </a>
            )}
          </div>

          <Comparator />
        </section>

        {/* Cinta de comunas */}
        <div className="overflow-hidden border-y-2 border-ink bg-ink py-3 text-chalk" aria-hidden="true">
          <div className="cinta flex w-max gap-8 whitespace-nowrap text-lg font-bold">
            {[...site.comunas.slice(0, -1), ...site.comunas.slice(0, -1)].map((c, i) => (
              <span key={i} className="flex items-center gap-8">
                {c} <span className="text-ambar">☼</span>
              </span>
            ))}
          </div>
        </div>

        {/* Problemas */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-sol">Parte por el problema</p>
            <h2 className="display mt-3 text-[clamp(2.3rem,6vw,4.2rem)]">
              ¿Qué te tiene <span className="serif text-sol">chato</span> de tu ventanal?
            </h2>
          </div>
          <div className="mt-10">
            <ProblemPicker />
          </div>
        </section>

        {/* Cotizador */}
        <section id="cotizar" className="border-y-2 border-ink bg-fresco py-16 text-chalk sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="display max-w-2xl text-[clamp(2.3rem,6vw,4.2rem)]">
                Cuenta tus ventanas. <span className="serif text-menta">Nosotros medimos.</span>
              </h2>
              <p className="max-w-sm text-lg leading-snug text-chalk/80">
                En un minuto sabes cuánto vidrio tienes y te llega la cotización al WhatsApp.
              </p>
            </div>
            <div className="mt-10 text-ink">
              <Quote />
            </div>
          </div>
        </section>

        {/* Láminas */}
        <section id="laminas" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-sol">Siempre cotizamos las tres</p>
            <h2 className="display mt-3 text-[clamp(2.3rem,6vw,4.2rem)]">
              Tres láminas, <span className="serif text-sol">tú eliges</span> cuánto invertir.
            </h2>
            <p className="mt-4 text-xl leading-snug text-ink/75">
              No te empujamos la más cara. Te mostramos las tres en tu ventana y decides mirando.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-end">
            {tiers.map((t) => {
              const price = site.prices[t.id];
              const featured = "featured" in t && t.featured;
              return (
                <article
                  key={t.id}
                  className={`card relative p-6 sm:p-7 ${featured ? "bg-ambar shadow-[var(--shadow-hard)] lg:pb-10 lg:pt-9" : ""}`}
                >
                  {featured && (
                    <p className="eyebrow absolute -top-3.5 left-6 rounded-full border-2 border-ink bg-ink px-3 py-1 text-chalk">
                      La más elegida
                    </p>
                  )}
                  <p className="serif text-2xl text-brasa">{t.name}</p>
                  <h3 className="display mt-1 text-4xl">{t.film}</h3>
                  <p className="mt-2 font-semibold">{t.line}</p>
                  {price && (
                    <p className="mt-4 text-lg">
                      Desde <strong className="text-2xl font-extrabold">{clp(price)}</strong> + IVA el m² instalado
                    </p>
                  )}
                  <ul className="mt-5 grid gap-2.5 border-t-2 border-ink/15 pt-5">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 leading-snug">
                        <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-ink" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-snug">
            <strong>¿Buscas privacidad?</strong> La Silver espejada funciona como espejo hacia afuera de día y es la
            que más calor rechaza. <strong>¿Seguridad?</strong> Sumamos lámina de 4, 8 o 12 micras en el mismo
            ventanal, para que el vidrio no se desarme con un golpe.
          </p>
        </section>

        {/* Cómo funciona */}
        <section id="como" className="border-y-2 border-ink bg-ambar py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="display max-w-3xl text-[clamp(2.3rem,6vw,4.2rem)]">
              De la foto al living fresco, <span className="serif">en tres pasos.</span>
            </h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                ["Nos mandas una foto", "Del ventanal y tu comuna, por WhatsApp. Si tienes las medidas, mejor; si no, las sacamos nosotros."],
                ["Te mandamos tres opciones", "El mismo día, con precio cerrado e instalación incluida. Si quieres, vamos con las muestras para que las veas puestas."],
                [
                  "Instalamos en un día",
                  site.installWithinHours
                    ? `Dentro de ${site.installWithinHours} horas desde que apruebas. Sin sacar vidrios, sin obra y sin polvo.`
                    : "Sin sacar vidrios, sin obra y sin polvo. Coordinamos el día que te acomode.",
                ],
              ].map(([t, d], i) => (
                <li key={t} className="card relative bg-chalk p-6 pt-12 sm:p-7 sm:pt-14">
                  <span className="display absolute -top-5 left-5 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-sol text-3xl text-chalk">
                    {i + 1}
                  </span>
                  <h3 className="text-2xl font-extrabold leading-tight">{t}</h3>
                  <p className="mt-2 leading-snug text-ink/75">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Por qué Dustink */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-sol">Lo que no vas a encontrar en otro lado</p>
              <h2 className="display mt-3 text-[clamp(2.3rem,6vw,4.2rem)]">
                No te pedimos que <span className="serif text-sol">nos creas.</span>
              </h2>
              <p className="mt-4 text-xl leading-snug text-ink/75">
                Cualquiera pone un porcentaje en una ficha técnica. Nosotros te lo mostramos en tu vidrio.
              </p>
            </div>
            <ul className="grid gap-0 border-t-2 border-ink">
              {[
                ["Medimos el calor frente a ti", "Termómetro en el vidrio antes y después de instalar. El número lo ves tú, no una ficha."],
                ["Las muestras van a tu ventana", "Eliges el tono viendo cómo queda con tu luz y tu vista, no en una foto de catálogo."],
                ["La garantía se explica antes", "Certificado por escrito con cada instalación. Te contamos qué cubre antes de que apruebes."],
                ["Lámina propia, en tres niveles", "Nanocarbono, Dual Sputtered y Nanocerámica. Una opción para cada presupuesto, sin letra chica."],
              ].map(([t, d]) => (
                <li key={t} className="grid gap-1 border-b-2 border-ink py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <h3 className="text-xl font-extrabold leading-tight">{t}</h3>
                  <p className="leading-snug text-ink/75">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dudas */}
        <section id="dudas" className="border-t-2 border-ink bg-chalk py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="display text-[clamp(2.3rem,6vw,4.2rem)]">
                Lo que todos <span className="serif text-sol">preguntan.</span>
              </h2>
              <p className="mt-4 text-lg text-ink/70">¿Tu duda no está? Escríbenos y la respondemos hoy.</p>
              <div className="mt-6">
                <WaButton where="dudas">
                  <WaIcon /> Preguntar por WhatsApp
                </WaButton>
              </div>
            </div>
            <div className="border-t-2 border-ink">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b-2 border-ink">
                  <summary className="flex items-center justify-between gap-6 py-5 text-xl font-bold leading-tight sm:text-2xl">
                    {f.q}
                    <span className="mas grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink text-2xl font-normal leading-none transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 text-lg leading-snug text-ink/80">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="border-t-2 border-ink bg-sol py-16 text-chalk sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="display max-w-4xl text-[clamp(2.6rem,8vw,5.6rem)]">
              Este verano, <span className="serif text-ink">con la cortina abierta.</span>
            </h2>
            <p className="mt-5 max-w-xl text-xl leading-snug">
              Manda la foto de tu ventanal ahora y hoy mismo tienes tres opciones con precio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WaButton where="cierre" className="btn bg-ink text-chalk">
                <WaIcon /> Cotizar con una foto
              </WaButton>
              <a href="#cotizar" className="btn btn-ghost">
                Calcular mis ventanas
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink py-12 text-chalk">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="display text-3xl">DUSTINK</p>
            <p className="mt-2 max-w-xs text-chalk/65">
              Láminas de control solar, seguridad y empavonado para casas, departamentos y oficinas.
            </p>
          </div>
          <div>
            <p className="eyebrow text-ambar">Contacto</p>
            <p className="mt-3 text-lg font-semibold">WhatsApp {site.whatsappDisplay}</p>
            <p className="text-chalk/65">{site.base}</p>
          </div>
          <div>
            <p className="eyebrow text-ambar">También hacemos</p>
            <ul className="mt-3 grid gap-1 text-chalk/80">
              <li>Láminas de seguridad</li>
              <li>Empavonado para oficinas</li>
              <li>Gráfica e impresión sobre vidrio</li>
            </ul>
          </div>
        </div>
      </footer>

      <StickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </LeadProvider>
  );
}
