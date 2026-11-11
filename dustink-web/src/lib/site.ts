// Todo lo que cambia sin tocar el diseño vive acá.
// Los campos en null son datos que solo Dustink puede confirmar: mientras
// estén en null la página no los muestra (no inventa precios ni reseñas).

export const site = {
  brand: "Dustink",
  tagline: "Láminas para vidrios",
  city: "Santiago",
  base: "Ñuñoa, Santiago",
  whatsapp: "56981550949",
  whatsappDisplay: "+56 9 8155 0949",

  // Promesas publicadas hoy en dustink.cl
  claims: {
    heat: "Hasta 5 °C menos",
    uv: "Protección UV",
    warranty: "Certificado de garantía",
    install: "Instalado en un día",
  },

  // Por confirmar con Dustink antes de publicar. null = no se muestra.
  warrantyYears: null as number | null,
  installWithinHours: null as number | null,
  reviews: null as { rating: number; count: number; url: string } | null,
  // Precio por m² instalado, + IVA. null = la calculadora no muestra montos.
  prices: {
    esencial: null as number | null,
    confort: null as number | null,
    premium: null as number | null,
  },

  comunas: [
    "Las Condes",
    "Vitacura",
    "Lo Barnechea",
    "Providencia",
    "Ñuñoa",
    "La Reina",
    "Peñalolén",
    "Santiago Centro",
    "Macul",
    "La Florida",
    "Huechuraba",
    "Colina / Chicureo",
    "Maipú",
    "San Miguel",
    "Otra comuna",
  ],
} as const;

export type ProblemId = "calor" | "reflejo" | "privacidad" | "luz";

export const problems: {
  id: ProblemId;
  title: string;
  detail: string;
  film: string;
  why: string;
}[] = [
  {
    id: "calor",
    title: "Mi living es un horno en la tarde",
    detail: "Sol poniente, ventanal grande, aire acondicionado que no da abasto.",
    film: "Dual Sputtered 25 / 35",
    why: "Su capa exterior rechaza el calor y la interior mantiene la vista limpia hacia afuera. Es la que más instalamos en ventanales al poniente.",
  },
  {
    id: "reflejo",
    title: "No veo la tele ni el computador",
    detail: "Encandila a ciertas horas y terminas con la cortina cerrada todo el día.",
    film: "Reflectivo 25",
    why: "Corta el brillo sin oscurecer la pieza. Sigues con la cortina abierta y la pantalla se ve.",
  },
  {
    id: "privacidad",
    title: "Me ven desde el edificio del frente",
    detail: "Quieres mirar hacia afuera sin que te miren hacia adentro.",
    film: "Silver espejado 20 / 35",
    why: "De día funciona como espejo hacia afuera y tú sigues viendo. Además es la que más calor rechaza.",
  },
  {
    id: "luz",
    title: "Quiero la luz, pero no el calor",
    detail: "No quieres vidrios oscuros ni espejados. Que no se note.",
    film: "Nanocerámica 70",
    why: "Casi invisible. Deja pasar la luz natural y frena calor y rayos UV, que son los que destiñen muebles y pisos.",
  },
];

export const tiers = [
  {
    id: "esencial" as const,
    name: "Esencial",
    film: "Nanocarbono",
    line: "Buena relación precio-calidad.",
    points: ["Baja el calor y el brillo", "El carbono no se decolora con los años", "Tono neutro"],
  },
  {
    id: "confort" as const,
    name: "Confort",
    film: "Dual Sputtered",
    line: "El equilibrio. La más elegida.",
    points: ["Más rechazo de calor", "Vista limpia desde adentro", "Menos reflejo interior de noche"],
    featured: true,
  },
  {
    id: "premium" as const,
    name: "Premium",
    film: "Nanocerámica",
    line: "Máximo rendimiento, sin metales.",
    points: ["El mayor rendimiento térmico", "Alta transmisión de luz natural", "Casi no se nota en el vidrio"],
  },
];

export const windowTypes = [
  { id: "ventanal", label: "Ventanal de living", hint: "2,4 × 2,1 m", m2: 5.0 },
  { id: "puerta", label: "Puerta-ventana", hint: "1,6 × 2,1 m", m2: 3.4 },
  { id: "dormitorio", label: "Ventana de dormitorio", hint: "1,2 × 1,2 m", m2: 1.4 },
  { id: "chica", label: "Ventana chica", hint: "0,6 × 1,0 m", m2: 0.6 },
] as const;

export const faqs = [
  {
    q: "¿Me va a oscurecer la casa?",
    a: "Depende de la lámina que elijas. La nanocerámica casi no se nota; la espejada oscurece más y a cambio da privacidad. Por eso llevamos muestras: la decides mirándola en tu propia ventana.",
  },
  {
    q: "¿De noche me ven desde afuera?",
    a: "La lámina espejada da privacidad de día. De noche, con la luz encendida adentro, se ve hacia el interior, igual que en cualquier vidrio. Si necesitas privacidad a toda hora, la solución es el empavonado.",
  },
  {
    q: "¿Sirve en termopanel?",
    a: "En la mayoría de los casos sí, pero no cualquier lámina va con cualquier vidrio. Lo revisamos con tu foto antes de cotizar y te decimos cuáles son aptas para el tuyo.",
  },
  {
    q: "¿Cuánto demora y cuánto ensucia?",
    a: "Una casa o departamento se instala en un día. No se sacan los vidrios, no hay obra ni polvo. Solo necesitamos despejar el frente de las ventanas.",
  },
  {
    q: "Vivo en departamento, ¿necesito permiso?",
    a: "Las láminas neutras no cambian la fachada. Para las espejadas conviene mirar el reglamento de copropiedad; te ayudamos a hacer la consulta a la administración antes de instalar.",
  },
  {
    q: "¿Y si arriendo?",
    a: "La lámina se puede retirar sin dañar el vidrio. Muchos arrendatarios la instalan en el ventanal principal y listo.",
  },
  {
    q: "¿Qué cubre la garantía?",
    a: "Cada instalación se entrega con certificado de garantía por escrito. Te explicamos qué cubre antes de que apruebes la cotización, no después.",
  },
  {
    q: "¿Cómo cotizo sin que vayan a mi casa?",
    a: "Con una foto del ventanal y la comuna nos basta para mandarte opciones el mismo día. Si prefieres que vayamos con las muestras, también.",
  },
];
