import type { Metadata, Viewport } from "next";
import "./globals.css";

// La página queda oculta para Google hasta que Dustink apruebe los textos:
// se publica poniendo NEXT_PUBLIC_INDEXABLE=1 en Vercel.
const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "1";

export const metadata: Metadata = {
  title: "Láminas de control solar en Santiago, instaladas y con garantía | Dustink",
  description:
    "Baja el calor de tu casa o departamento sin cambiar los vidrios. Láminas de control solar instaladas en un día en Santiago, con certificado de garantía. Cotiza por WhatsApp con una foto.",
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: "El sol se queda afuera. La luz, no.",
    description: "Láminas de control solar instaladas en Santiago. Cotiza por WhatsApp con una foto.",
    locale: "es_CL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4eee3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
