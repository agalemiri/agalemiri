# Dustink: página de captación

Página de una sola pantalla para vender láminas de control solar a casas y departamentos en Santiago. Next.js (App Router), Supabase para guardar los contactos y Vercel para publicarla.

## Qué hace

- Comparador arrastrable "sin lámina / con lámina" en la portada.
- Selector de problema que recomienda una lámina y la deja escrita en el mensaje de WhatsApp.
- Cotizador que cuenta ventanas, calcula los m² y pide tres datos (nombre, WhatsApp, comuna).
- Guarda cada contacto en Supabase con el origen de la visita (`utm_*`, `gclid`, `fbclid`) y abre WhatsApp con el mensaje listo.
- Eventos en `dataLayer` para medir en Google Ads: `whatsapp_click`, `lead_submit`, `problema_elegido`, `calculadora_usada`, `comparador_usado`.

## Antes de publicar

Todo el contenido está en `src/lib/site.ts`. Los campos en `null` no se muestran:

- `prices`: precio por m² instalado de cada nivel. Con precios, la calculadora muestra un rango.
- `warrantyYears`, `installWithinHours`: años de garantía y plazo de instalación.
- `reviews`: nota, cantidad y enlace de las reseñas de Google.

La sección "No te pedimos que nos creas" promete medir la temperatura frente al cliente y llevar muestras. Dustink tiene que confirmar que lo hará antes de publicar.

La página sale con `noindex`. Para que Google la indexe: `NEXT_PUBLIC_INDEXABLE=1`.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar con el proyecto de Supabase
npm run dev
```

La tabla de contactos está en `supabase/migrations/0001_leads.sql`. La llave pública solo puede insertar; nadie puede leer con ella. Sin variables de Supabase la página funciona igual y el contacto sigue por WhatsApp.
