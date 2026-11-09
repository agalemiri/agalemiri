# Noviembre 1-8 2026 vs 1-8 nov 2025 (BI oficial, fechas calendario)
g=lambda a,b:(a/b-1)*100
# tienda: venta26, venta25, entr26, entr25, bol26, docs25, meta
M={"La Fabrica":(15133841,19261541,2212,2417,601,722,22.2e6),
"Alameda":(13358175,17090939,2346,2519,664,851,21.6e6),
"Vivo Maipu":(12228778,13775270,2084,2651,454,515,19.5e6),
"Vivo La Florida":(11738785,15729728,2010,2890,493,663,19.1e6),
"Easton":(11089486,19968453,2025,2931,418,764,25.2e6),
"Antof Espacio Urbano":(10510019,13616041,1307,1906,375,499,16.1e6),
"Rancagua Outlet":(10337406,12525810,1760,1731,393,406,16.7e6),
"21 de Mayo":(10305564,11048225,2759,3361,619,586,15.3e6),
"Buenaventura":(10174384,13724055,1855,2021,359,498,16.7e6),
"Curauma":(9764223,13979145,2170,1749,468,614,18.4e6),
"Viña Outlet Park":(7794115,13722592,1421,2076,305,535,15.4e6),
"Liquidacion Mackenna":(7437832,5530545,1300,1073,321,315,10.4e6),
"Rancagua":(7182298,8475656,1232,1215,303,313,14.5e6),
"Plaza Egaña":(6722475,9947898,1055,1476,306,444,13.5e6)}
v26=sum(x[0] for x in M.values()); v25=sum(x[1] for x in M.values())
print(f"SSS 14: {g(v26,v25):.1f}%  {v26/1e6:.1f} vs {v25/1e6:.1f}  brecha {(v26-v25)/1e6:.1f}")
# ajuste: LY 21 de Mayo + Outlet 21 Mayo (6.15MM mes nov-25 completo -> no tenemos 1-8), Catalogo Mackenna
ks=[k for k in M]
T6=sum(M[k][2] for k in ks);T5=sum(M[k][3] for k in ks);B6=sum(M[k][4] for k in ks);B5=sum(M[k][5] for k in ks)
print(f"tráfico {g(T6,T5):.1f}% boletas {g(B6,B5):.1f}% conv {B6/T6*100:.1f} vs {B5/T5*100:.1f} ticket {g(v26/B6,v25/B5):.1f}% ({v26/B6:,.0f} vs {v25/B5:,.0f})")
print(f"{'tienda':<22}{'venta26':>8}{'Δ':>8}{'tráf':>8}{'bol':>8}{'conv25':>7}{'conv26':>7}{'ticket':>8}{'brecha':>8}{'meta%':>7}")
for k,(a,b,t6,t5,b6,b5,m) in sorted(M.items(),key=lambda r:r[1][0]-r[1][1]):
    print(f"{k:<22}{a/1e6:8.1f}{g(a,b):7.1f}%{g(t6,t5):7.1f}%{g(b6,b5):7.1f}%{b5/t5*100:7.1f}{b6/t6*100:7.1f}{g(a/b6,b/b5):7.1f}%{(a-b)/1e6:8.1f}{a/m*100:6.0f}%")
# octubre 12-31 = post(12-oct a 8-nov) - nov(1-8) para las 13 tiendas sin 21 de Mayo
post={"Alameda":(45641647,52516165),"La Fabrica":(44832001,55786827),"Vivo Maipu":(39637060,44595165),"Rancagua Outlet":(38549152,41754665),"Antof Espacio Urbano":(35861486,38638818),"Buenaventura":(34998560,45449108),"Vivo La Florida":(34604226,46555267),"Liquidacion Mackenna":(34201667,18025720),"Curauma":(32692815,38405539),"Easton":(32531128,55279683),"Rancagua":(26180605,25875455),"Viña Outlet Park":(25838011,35805740),"Plaza Egaña":(24646939,29899276)}
o6=sum(post[k][0]-M[k][0] for k in post); o5=sum(post[k][1]-M[k][1] for k in post)
print(f"Oct 12-31 (13 tiendas): {g(o6,o5):.1f}%  ; Nov 1-8 mismas 13: {g(sum(M[k][0] for k in post),sum(M[k][1] for k in post)):.1f}%")
# Fabrics mismos malls nov
F={"Plaza Egaña":(15465066,13997361,1542,1410,386,363),"Buenaventura":(26759878,23828027,3342,3079,574,441),"La Fabrica":(11375176,10004393,1661,1885,306,267),"Easton":(15127491,12224321,1859,2031,355,271),"Rancagua Outlet":(12357519,11661236,None,2421,319,285)}
mm={"Plaza Egaña":"Plaza Egaña","Buenaventura":"Buenaventura","La Fabrica":"La Fabrica","Easton":"Easton","Rancagua Outlet":"Rancagua Outlet"}
print("\nMall: Fabrics venta, Δ, tráf, conv25->26 | Mashini venta, Δ, tráf, conv")
fa=fb=ma=mb=0
for k,(a,b,t6,t5,b6,b5) in F.items():
    x=M[mm[k]]
    tf=f"{g(t6,t5):.1f}%" if t6 else "s/d"; cf=f"{b5/t5*100:.1f}->{b6/t6*100:.1f}" if t6 else "s/d"
    print(f"{k:<16} F {a/1e6:5.1f} {g(a,b):6.1f}% {tf:>7} {cf:>11} | M {x[0]/1e6:5.1f} {g(x[0],x[1]):6.1f}% {g(x[2],x[3]):6.1f}% {x[5]/x[3]*100:.1f}->{x[4]/x[2]*100:.1f}")
    if k!="Rancagua Outlet": fa+=a;fb+=b;ma+=x[0];mb+=x[1]
print(f"4 malls: F {fa/1e6:.1f} {g(fa,fb):.1f}% | M {ma/1e6:.1f} {g(ma,mb):.1f}%")
k3=["Plaza Egaña","Buenaventura","La Fabrica","Easton"]
print(f"tráfico 4 malls: F {g(sum(F[k][2] for k in k3),sum(F[k][3] for k in k3)):.1f}% | M {g(sum(M[k][2] for k in k3),sum(M[k][3] for k in k3)):.1f}%")
# categorías
C26={"Sábanas":(39156636,2411),"Quilts":(27473238,1831),"Toallas":(12216088,1675),"Cortinas Blackout":(10481149,526),"Almohadas":(9802362,915),"Plumones":(7747919,365),"Toallas de Playa":(6895948,1128),"Cojines":(4331503,808),"Cortinas de Velo":(3977218,423),"Cortinas de Pieza":(2459093,142),"Mantas":(2211973,241),"Cubrecolchones":(2162189,137),"Sets Cama":(1765820,77),"Frazadas":(1636171,160),"Manteles":(1031441,185),"Poncho Playa":(465180,47),"Frisee":(328578,20),"Capuchas":(616134,116),"Aromatizadores":(1728455,290),"Alfombras":(1361996,212)}
C25={"Sábanas":(56087193,3696),"Quilts":(42906887,2912),"Toallas de Playa":(16947291,2989),"Toallas":(13631372,2341),"Almohadas":(9963320,1179),"Plumones":(8369083,439),"Cortinas Blackout":(7580477,304),"Cojines":(6146845,1312),"Cortinas de Pieza":(5807891,360),"Cortinas de Velo":(4228166,438),"Cubrecolchones":(3196431,231),"Manteles":(2345575,436),"Poncho Playa":(2216550,222),"Frisee":(2031344,177),"Capuchas":(1657381,359),"Mantas":(898197,222),"Frazadas":(871573,123),"Sets Cama":(374387,49),"Aromatizadores":(0,0),"Alfombras":(0,0)}
print()
for c in sorted(C26,key=lambda c:C26[c][0]-C25[c][0]):
    a,ua=C26[c];b,ub=C25[c]
    d=f"{g(a,b):6.1f}%" if b else "  nuevo"; du=f"{g(ua,ub):6.1f}%" if ub else ""
    print(f"{c:<20}{a/1e6:6.1f}{b/1e6:6.1f}{(a-b)/1e6:7.1f} {d} uni {du}  p/u {a/ua:,.0f} vs {(b/ub if ub else 0):,.0f}")
