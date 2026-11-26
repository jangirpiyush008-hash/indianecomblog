import re, urllib.request, html, collections
B="http://localhost:3100"
get=lambda u: urllib.request.urlopen(B+u).read().decode()
idx=get("/sitemap.xml"); urls=[]
for f in re.findall(r"/sitemaps/([^<]+)</loc>",idx):
    for loc in re.findall(r"<loc>([^<]+)</loc>",get("/sitemaps/"+f)):
        p=re.sub(r"^https?://[^/]+","",loc)
        if p.count("/")==3 and "/tag/" not in p: urls.append(p)
probs=collections.defaultdict(list); seqs=collections.Counter()
for u in urls:
    h=get(u)
    hs=[(int(m.group(1)),m.group(2),html.unescape(re.sub(r"<[^>]+>","",m.group(3))).strip()) for m in re.finditer(r"<h([1-6])([^>]*)>(.*?)</h\1>",h,re.S)]
    lv=[x[0] for x in hs]
    if lv.count(1)!=1: probs["h1 count != 1"].append(u)
    if lv and lv[0]!=1: probs["first heading not h1"].append((u,hs[0]))
    for a,b in zip(lv,lv[1:]):
        if b>a+1: probs["skipped level"].append((u,a,b)); break
    ids=re.findall(r'<h2[^>]*id="([^"]+)"',h)
    if len(ids)!=len(set(ids)): probs["duplicate h2 id"].append(u)
    empty=[x for x in hs if not x[2]]
    if empty: probs["empty heading"].append((u,empty[:2]))
    seqs[" ".join(f"h{l}" for l in lv[:4])]+=1
    t=re.search(r"<title>(.*?)</title>",h)
print("pages:",len(urls))
for k,v in probs.items(): print(k,len(v),v[:4])
print("common starts:",seqs.most_common(3))
