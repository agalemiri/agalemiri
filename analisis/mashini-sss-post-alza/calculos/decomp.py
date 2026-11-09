# BI oficial (ventas_tiendas) post-alza 12-10 a 08-11 2026 vs 12-10 a 08-11 2025, venta neta
post = { # tienda: (venta26, venta25, entradas26, entradas25, boletas26, docs25)
 "Alameda":(45641647,52516165,8015,9345,2267,2720),
 "La Fabrica":(44832001,55786827,8872,7146,1899,2159),
 "Vivo Maipu":(39637060,44595165,6794,8157,1452,1654),
 "Rancagua Outlet":(38549152,41754665,6374,8207,1447,1519),
 "Antof Espacio Urbano":(35861486,38638818,4537,5298,1259,1462),
 "Buenaventura":(34998560,45449108,5741,6460,1248,1485),
 "Vivo La Florida":(34604226,46555267,6443,8873,1563,2026),
 "Liquidacion Mackenna":(34201667,18025720,4617,4208,1081,1096),
 "Curauma":(32692815,38405539,6988,6562,1532,1703),
 "Easton":(32531128,55279683,None,None,1293,2151),
 "Rancagua":(26180605,25875455,4491,4414,1098,967),
 "Viña Outlet Park":(25838011,35805740,5071,5799,1115,1434),
 "Plaza Egaña":(24646939,29899276,3841,4731,1116,1335),
}
cat_mack_ly = 13069180  # Catalogo Mackenna 2025 (cerrada jul-2026; su venta migró a Liquidación Mackenna)
# pre-alza Q3 (01-07 a 28-09) BI
pre = {"Alameda":(162923042,169390828),"La Fabrica":(161247411,149219484),"Vivo Maipu":(139893570,152574901),
 "Vivo La Florida":(139837613,156799830),"Curauma":(133788696,109683158),"Buenaventura":(127027460,138645470),
 "Antof Espacio Urbano":(116702189,126820680),"Rancagua":(108833920,103467904),"Viña Outlet Park":(102829383,105618645),
 "Plaza Egaña":(90740557,93554032),"Liquidacion Mackenna":(83148934,69107453),"Easton":(116457272,160738260)}
cat_mack_q3_ly=50197261
cyber = {"Alameda":(38266748,43460784),"Rancagua Outlet":(34953214,36009272),"La Fabrica":(31041966,29929530),
 "Antof Espacio Urbano":(30162961,26445467),"Vivo Maipu":(29338795,33263156),"Vivo La Florida":(28819088,30378226),
 "Viña Outlet Park":(25984056,16473273),"Rancagua":(25880880,14022653),"Buenaventura":(24486391,22805216),
 "Plaza Egaña":(24050975,26926576),"Curauma":(23694178,21036720),"Easton":(21885277,34738289),"Liquidacion Mackenna":(15158908,10027638)}
g=lambda a,b:(a/b-1)*100
v26=sum(v[0] for v in post.values()); v25=sum(v[1] for v in post.values())
print(f"SSS oficial 13 tiendas post: {g(v26,v25):.1f}%  ({v26/1e6:.1f} vs {v25/1e6:.1f} MM, brecha {(v26-v25)/1e6:.1f} MM)")
v25m=v25+cat_mack_ly
print(f"SSS ajustado Mackenna (suma Catálogo Mackenna LY): {g(v26,v25m):.1f}%  brecha {(v26-v25m)/1e6:.1f} MM")
ex=[k for k in post if k not in("Liquidacion Mackenna","Easton")]
a=sum(post[k][0] for k in ex); b=sum(post[k][1] for k in ex)
print(f"SSS 11 tiendas (sin Mackenna ni Easton): {g(a,b):.1f}%")
# pre
a=sum(v[0] for v in pre.values()); b=sum(v[1] for v in pre.values())
print(f"Q3 pre 12 tiendas: {g(a,b):.1f}% ; ajustado Mackenna: {g(a,b+cat_mack_q3_ly):.1f}%")
ex2=[k for k in pre if k not in("Liquidacion Mackenna","Easton")]
print(f"Q3 pre 10 tiendas (sin Mackenna ni Easton): {g(sum(pre[k][0] for k in ex2),sum(pre[k][1] for k in ex2)):.1f}%")
ex3=[k for k in cyber if k not in("Liquidacion Mackenna","Easton")]
print(f"Cyber 11 tiendas: {g(sum(cyber[k][0] for k in ex3),sum(cyber[k][1] for k in ex3)):.1f}%")
# traffic/conv/ticket (sin Easton por contador)
ks=[k for k in post if post[k][2]]
T26=sum(post[k][2] for k in ks);T25=sum(post[k][3] for k in ks)
B26=sum(post[k][4] for k in ks);B25=sum(post[k][5] for k in ks)
V26=sum(post[k][0] for k in ks);V25=sum(post[k][1] for k in ks)
print(f"\n12 tiendas c/contador: venta {g(V26,V25):.1f}% | tráfico {g(T26,T25):.1f}% | boletas {g(B26,B25):.1f}% | conv {B26/T26*100:.1f}% vs {B25/T25*100:.1f}% | ticket neto {V26/B26:,.0f} vs {V25/B25:,.0f} ({g(V26/B26,V25/B25):.1f}%)")
print(f"\n{'tienda':<22}{'Q3 pre':>8}{'Cyber':>8}{'Post':>8}{'Δ pts':>7}{'tráf':>7}{'bol':>7}{'ticket':>8}{'brecha MM':>10}")
rows=[]
for k,(a,b,t6,t5,bo6,bo5) in post.items():
    p=g(*pre[k]) if k in pre else None; c=g(*cyber[k]) if k in cyber else None
    rows.append((k,p,c,g(a,b),t6,t5,bo6,bo5,a,b))
for k,p,c,po,t6,t5,bo6,bo5,a,b in sorted(rows,key=lambda r:r[8]-r[9]):
    ps=f"{p:7.1f}%" if p is not None else "    n/a "
    cs=f"{c:7.1f}%" if c is not None else "    n/a "
    tr=f"{g(t6,t5):6.1f}%" if t6 else "   n/a"
    d=f"{po-p:6.1f}" if p is not None else "   n/a"
    print(f"{k:<22}{ps}{cs}{po:7.1f}%{d}{tr}{g(bo6,bo5):6.1f}%{g(a/bo6,b/bo5):7.1f}%{(a-b)/1e6:10.1f}")
