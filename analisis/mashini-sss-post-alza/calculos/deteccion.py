import datetime as dt, re
src=open('weekly.py').read()
def parse(name):
    blk=re.search(name+r' = """(.*?)"""',src,re.S).group(1); d={}
    for l in blk.strip().splitlines():
        a,b,c=l.split(); d[dt.date.fromisoformat(a)]=(float(b),float(c))
    return d
C=parse('cy'); L=parse('ly')
days=sorted(C)
print("fecha       dia  v26   v25(-364) Δdía   Δ7d   Δacum desde 12-10")
for d in days:
    if d<dt.date(2026,9,21): continue
    ly=L.get(d-dt.timedelta(364))
    if not ly: continue
    w=[d-dt.timedelta(i) for i in range(7)]
    a=sum(C.get(x,(0,0))[0] for x in w); b=sum(L.get(x-dt.timedelta(364),(0,0))[0] for x in w)
    print(f"{d} {d.strftime('%a')} {C[d][0]/1e6:6.1f} {ly[0]/1e6:6.1f} {(C[d][0]/ly[0]-1)*100:6.1f}% {(a/b-1)*100:6.1f}%")
for start in [dt.date(2026,10,12),dt.date(2026,10,13),dt.date(2026,10,17),dt.date(2026,10,19)]:
    a=sum(C[x][0] for x in C if start<=x<=dt.date(2026,11,8)); b=sum(L[x][0] for x in L if start-dt.timedelta(364)<=x<=dt.date(2026,11,8)-dt.timedelta(364))
    print(start, f"{(a/b-1)*100:.1f}%")
