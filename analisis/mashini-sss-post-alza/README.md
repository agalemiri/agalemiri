# Mashini — SSS de tiendas físicas, noviembre 2026 (1 al 8)

Corte de datos: 08-11-2026, desde el BI del grupo (DW Corp).

- `informe.html`: informe ejecutivo completo (diagnóstico, tiendas, categorías, precio, inventario y plan de acción).
- `calculos/weekly.py`: curva semanal de venta, unidades y precio por unidad en 11 tiendas comparables (comparativo, lunes con lunes).
- `calculos/decomp.py`: SSS oficial y ajustado (Mackenna), descomposición en tráfico, conversión y ticket por tienda.
- `calculos/noviembre.py`: SSS, tráfico, conversión y ticket de noviembre por tienda, control Fabrics por mall y categorías.

## Resumen

- SSS 1 al 8 de noviembre: **−23,7%** (14 tiendas; −$44,6 MM netos). Tendencia: jul–sep −0,6%, Cyber +2,4%, 12–31 oct −9,8%, 1–8 nov −24,7%.
- Fallan tráfico (−14,9%), conversión (25,7% → 23,8%) y ticket (−3%). El online de Mashini también cae (−28%).
- Fabrics en los mismos 4 malls: +14,4% con tráfico plano; Mashini −31,4% con tráfico −19,2%.
- Sábanas, Quilts y Toallas de Playa explican −$42 MM de −$47 MM. Hay 27.800 unidades de playa en el CD.
- 291 SKUs en quiebre ($67,7 MM de venta mensual), entre ellos Sábana 144H Colores Lisos y los quilts nuevos. Al mismo tiempo, ≈$430 MM a costo en sábanas y toallas superan los 130 días de cobertura.

## Informe con pestañas (`caida-sss.html`)

- **Desde la caída · 19-oct:** fecha de detección y análisis del 19-oct al 08-nov. La primera señal es el sábado 17-oct; desde el lunes 19-oct el SSS móvil de 7 días es negativo. SSS −17,4% (13 tiendas, −$68,7 MM). Fabrics +13,5%.
- **Solo noviembre:** 1 al 8 de noviembre (SSS −23,7%).
- Cálculos: `calculos/deteccion.py` (SSS diario y móvil 7 días) y `calculos/desde_caida.py`.
- **Equipos:** dotación contra la recomendada por tráfico, cobertura de jefatura, ausencias, venta por hora trabajada, unidades por boleta y cumplimiento de metas por vendedor (31-ago a 27-sep vs. 19-oct a 08-nov de 2026). Cálculos en `calculos/equipos.py`.
