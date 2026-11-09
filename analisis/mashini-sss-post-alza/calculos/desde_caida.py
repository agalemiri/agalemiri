# 19-oct a 08-nov 2026 vs 19-oct a 08-nov 2025 (BI oficial)
g=lambda a,b:(a/b-1)*100
# tienda: venta26, venta25, entr26, entr25, bol26, docs25, meta
M={"Alameda":(34777226,39941314,6230,6685,1720,2046,54.4e6),
"La Fabrica":(31819975,41742659,5762,5391,1313,1606,43.6e6),
"Antof Espacio Urbano":(28473011,29916993,3240,4110,913,1101,32.2e6),
"Vivo Maipu":(28353911,33159774,4687,6167,1029,1206,41.2e6),
"Liquidacion Mackenna":(28276726,12640449,3741,3101,862,791,21.5e6),
"Rancagua Outlet":(27597893,29977744,4619,5093,1053,1039,38.4e6),
"Vivo La Florida":(25249386,35553242,4551,6545,1095,1523,40.5e6),
"Easton":(24349487,41044335,None,6845,981,1630,48.4e6),
"Buenaventura":(24164626,33354655,4099,4765,866,1086,33.0e6),
"Curauma":(21746168,29945534,4816,4682,1039,1329,33.0e6),
"Rancagua":(17791707,19683361,3145,3273,751,747,25.8e6),
"Viña Outlet Park":(17379987,26800322,3369,4331,743,1079,28.9e6),
"Plaza Egaña":(17048405,21929153,2646,3407,765,934,29.1e6)}
v26=sum(x[0] for x in M.values()); v25=sum(x[1] for x in M.values())
print(f"SSS 13: {g(v26,v25):.1f}% {v26/1e6:.1f} vs {v25/1e6:.1f} brecha {(v26-v25)/1e6:.1f}; meta {v26/sum(x[6] for x in M.values())*100:.0f}%")
ex=[k for k in M if k!="Liquidacion Mackenna"]
print(f"sin Mackenna: {g(sum(M[k][0] for k in ex),sum(M[k][1] for k in ex)):.1f}%")
ks=[k for k in M if M[k][2]]
T6=sum(M[k][2] for k in ks);T5=sum(M[k][3] for k in ks);B6=sum(M[k][4] for k in ks);B5=sum(M[k][5] for k in ks);V6=sum(M[k][0] for k in ks);V5=sum(M[k][1] for k in ks)
print(f"12 c/contador: venta {g(V6,V5):.1f}% tráfico {g(T6,T5):.1f}% boletas {g(B6,B5):.1f}% conv {B5/T5*100:.1f}->{B6/T6*100:.1f} ticket {g(V6/B6,V5/B5):.1f}%")
for k,(a,b,t6,t5,b6,b5,m) in sorted(M.items(),key=lambda r:r[1][0]-r[1][1]):
    tr=f"{g(t6,t5):6.1f}%" if t6 else "   s/d"; cv=f"{b5/t5*100:.1f}->{b6/t6*100:.1f}" if t6 else "s/d"
    print(f"{k:<22}{a/1e6:6.1f}{g(a,b):7.1f}%{tr}{g(b6,b5):7.1f}% {cv:>12}{g(a/b6,b/b5):7.1f}%{(a-b)/1e6:7.1f}{a/m*100:5.0f}%")
F={"Plaza Egaña":(35391863,31349535,3643,3945,869,768),"Buenaventura":(56110615,54918870,7276,7072,1204,980),"La Fabrica":(25967475,19991296,3876,4456,721,558),"Easton":(36820832,30446906,4542,5097,826,634),"Rancagua Outlet":(27913552,23281279,None,5948,744,560)}
fa=fb=ma=mb=0
for k,(a,b,t6,t5,b6,b5) in F.items():
    x=M[k]; tf=f"{g(t6,t5):.1f}%" if t6 else "s/d"; cf=f"{b5/t5*100:.1f}->{b6/t6*100:.1f}" if t6 else "s/d"
    mt=f"{g(x[2],x[3]):.1f}%" if x[2] else "s/d"; mc=f"{x[5]/x[3]*100:.1f}->{x[4]/x[2]*100:.1f}" if x[2] else "s/d"
    print(f"{k:<16} F {a/1e6:5.1f} {g(a,b):6.1f}% {tf:>7} {cf:>11} | M {x[0]/1e6:5.1f} {g(x[0],x[1]):6.1f}% {mt:>7} {mc}")
    if k!="Rancagua Outlet": fa+=a;fb+=b;ma+=x[0];mb+=x[1]
print(f"4 malls: F {fa/1e6:.1f} {g(fa,fb):.1f}% | M {ma/1e6:.1f} {g(ma,mb):.1f}%")
k3=["Plaza Egaña","Buenaventura","La Fabrica"]
print(f"tráfico 3 malls: F {g(sum(F[k][2] for k in k3),sum(F[k][3] for k in k3)):.1f}% | M {g(sum(M[k][2] for k in k3),sum(M[k][3] for k in k3)):.1f}%")
C26={"Sábanas":(91456664,5603),"Quilts":(59038180,3888),"Toallas":(36316518,4466),"Cortinas Blackout":(21987899,1095),"Almohadas":(20731691,1912),"Plumones":(17693746,826),"Toallas de Playa":(11364902,1831),"Cojines":(10331441,1985),"Cortinas de Velo":(8599483,992),"Sets Cama":(6240163,260),"Mantas":(5961139,653),"Cubrecolchones":(5060399,353),"Frazadas":(4776418,448),"Cortinas de Pieza":(4730189,285),"Aromatizadores":(3976577,616),"Alfombras":(3552553,562),"Manteles":(2191304,388),"Capuchas":(1135356,203),"Poncho Playa":(744918,70),"Frisee":(667143,40),"Pisos de Baño":(746417,205)}
C25={"Sábanas":(118911378,7446),"Quilts":(91364809,5969),"Toallas de Playa":(31918971,5345),"Toallas":(29502607,4974),"Almohadas":(20289487,2314),"Plumones":(17715634,893),"Cortinas Blackout":(15577571,594),"Cojines":(13469254,2590),"Cortinas de Pieza":(11496692,669),"Cortinas de Velo":(9123454,935),"Cubrecolchones":(6375858,453),"Manteles":(4224805,695),"Poncho Playa":(3591453,344),"Frisee":(3439651,287),"Capuchas":(3069906,694),"Frazadas":(1586655,186),"Mantas":(1310021,327),"Sets Cama":(619036,80),"Aromatizadores":(0,0),"Alfombras":(0,0),"Pisos de Baño":(1851525,480)}
tot=0
for c in sorted(C26,key=lambda c:C26[c][0]-C25[c][0]):
    a,ua=C26[c];b,ub=C25[c]; tot+=a-b
    print(f"{c:<20}{a/1e6:6.1f}{b/1e6:6.1f}{(a-b)/1e6:7.1f} {g(a,b) if b else 0:6.1f}% uni {g(ua,ub) if ub else 0:6.1f}% pu {g(a/ua,b/ub) if ub else 0:5.1f}%")
print("total listado",tot/1e6)
