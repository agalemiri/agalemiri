// Un living con ventanal, dibujado dos veces: con el sol entrando entero
// y con la lámina puesta. El comparador superpone ambas.

type Props = { variant: "sin" | "con" };

const palette = {
  sin: {
    wall: "#f3b25a",
    wallShade: "#e98f33",
    sky: "#ffd46b",
    sun: "#fff3c4",
    halo: "#ffb02e",
    glass: "#ffe39a",
    beam: "#ffcf5c",
    floor: "#c9661f",
    floorLight: "#ffb347",
    sofa: "#9c3d12",
    sofaDark: "#7a2c0a",
    plant: "#7d6b22",
    frame: "#17130f",
    hills: "#e9973a",
  },
  con: {
    wall: "#cfe2da",
    wallShade: "#b5d0c6",
    sky: "#bfe0ea",
    sun: "#fff8dc",
    halo: "#ffe9a8",
    glass: "#8fbfc0",
    beam: "#e6f1ea",
    floor: "#6f8f86",
    floorLight: "#9db9ae",
    sofa: "#0e3d3b",
    sofaDark: "#0a2c2b",
    plant: "#2f6b4a",
    frame: "#17130f",
    hills: "#7fa8a6",
  },
};

export function Scene({ variant }: Props) {
  const c = palette[variant];
  const hot = variant === "sin";
  return (
    <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden="true">
      {/* muro */}
      <rect width="400" height="480" fill={c.wall} />
      <rect y="0" width="400" height="60" fill={c.wallShade} opacity="0.5" />

      {/* ventanal: cielo, cordillera y sol */}
      <g>
        <rect x="46" y="54" width="308" height="250" fill={c.sky} />
        <circle cx="262" cy="128" r={hot ? 74 : 44} fill={c.halo} opacity={hot ? 0.55 : 0.35} />
        <circle cx="262" cy="128" r={hot ? 48 : 30} fill={c.halo} opacity={hot ? 0.8 : 0.5} />
        <circle cx="262" cy="128" r="26" fill={c.sun} />
        <path d="M46 262 L96 206 L128 236 L176 178 L226 244 L268 210 L314 250 L354 222 L354 304 L46 304 Z" fill={c.hills} />
        {/* la lámina: un velo parejo sobre el vidrio */}
        {!hot && <rect x="46" y="54" width="308" height="250" fill={c.glass} opacity="0.5" />}
        {!hot && (
          <g stroke="#ffffff" strokeWidth="3" opacity="0.35" strokeLinecap="round">
            <path d="M70 110 L120 70" />
            <path d="M82 138 L156 78" />
          </g>
        )}
      </g>

      {/* marco */}
      <g fill="none" stroke={c.frame} strokeWidth="7" strokeLinejoin="round">
        <rect x="46" y="54" width="308" height="250" />
        <path d="M200 54 V304" />
      </g>

      {/* piso */}
      <rect y="352" width="400" height="128" fill={c.floor} />
      <rect y="352" width="400" height="5" fill={c.frame} opacity="0.85" />

      {/* luz que entra y cae al piso */}
      <path d="M58 304 L342 304 L400 430 L400 480 L8 480 Z" fill={c.floorLight} opacity={hot ? 0.9 : 0.28} />
      <path d="M58 304 L342 304 L372 352 L28 352 Z" fill={c.beam} opacity={hot ? 0.75 : 0.25} />

      {/* sofá */}
      <g>
        <rect x="22" y="330" width="196" height="64" rx="14" fill={c.sofa} />
        <rect x="14" y="356" width="212" height="56" rx="12" fill={c.sofaDark} />
        <rect x="34" y="344" width="80" height="34" rx="9" fill={c.sofa} />
        <rect x="124" y="344" width="80" height="34" rx="9" fill={c.sofa} />
        <rect x="26" y="408" width="10" height="16" fill={c.frame} />
        <rect x="204" y="408" width="10" height="16" fill={c.frame} />
      </g>

      {/* planta */}
      <g>
        <path d="M318 408 h44 l-6 46 h-32 z" fill={c.frame} />
        <g fill={c.plant}>
          <path d="M340 408 C 318 372 302 352 292 322 C 322 340 338 372 342 408 Z" />
          <path d="M340 408 C 344 364 358 340 384 318 C 378 356 364 384 346 408 Z" />
          <path d="M340 408 C 334 368 338 340 344 306 C 356 344 352 376 344 408 Z" />
        </g>
        {hot && (
          <path d="M292 322 C 300 332 306 342 312 352" stroke="#5a4a12" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
      </g>

      {/* calima: solo cuando el sol entra entero */}
      {hot && (
        <g className="calima" fill="none" stroke="#fff6d6" strokeWidth="4" strokeLinecap="round" opacity="0.8">
          <path d="M86 318 q8 -10 0 -20 q-8 -10 0 -20" />
          <path d="M150 326 q8 -10 0 -20 q-8 -10 0 -20" />
          <path d="M252 322 q8 -10 0 -20 q-8 -10 0 -20" />
          <path d="M306 330 q8 -10 0 -20 q-8 -10 0 -20" />
        </g>
      )}
    </svg>
  );
}
