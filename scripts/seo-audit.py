import re, json, urllib.request, html, collections
BASE="http://localhost:3100"
def get(u):
    return urllib.request.urlopen(BASE+u).read().decode()
# collect article URLs from sitemaps
idx=get("/sitemap.xml"); files=re.findall(r"<loc>[^<]*/sitemaps/([^<]+)</loc>",idx)
urls=[]
for f in files:
    sm=get("/sitemaps/"+f)
    for loc in re.findall(r"<loc>([^<]+)</loc>",sm):
        path=re.sub(r"^https?://[^/]+","",loc)
        if path.count("/")==3 and "/tag/" not in path: urls.append(path)
issues=collections.Counter(); bad=collections.defaultdict(list); titles={}; descs={}
for u in urls:
    h=get(u)
    t=html.unescape(re.search(r"<title>(.*?)</title>",h).group(1))
    m=re.search(r'<meta name="description" content="([^"]*)"',h); d=html.unescape(m.group(1)) if m else ""
    canon=re.search(r'<link rel="canonical" href="([^"]+)"',h)
    h1=len(re.findall(r"<h1[\s>]",h)); h2=len(re.findall(r"<h2[\s>]",h))
    lds=[json.loads(x) for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>',h,re.S)]
    types=set()
    for l in lds:
        for o in (l if isinstance(l,list) else [l]):
            ty=o.get("@type"); types.update(ty if isinstance(ty,list) else [ty])
            for g in o.get("@graph",[]): types.add(g.get("@type"))
    lang=re.search(r'<html[^>]*lang="([^"]+)"',h)
    checks={
     "title>65":len(t)>65,"desc missing":not d,"desc>160":len(d)>160,"desc<70":0<len(d)<70,
     "no canonical":not canon,"canonical!=self":canon and not canon.group(1).endswith(u),
     "h1!=1":h1!=1,"h2<3":h2<3,"no Article ld":not ({"Article","NewsArticle","BlogPosting"}&types),
     "no FAQ ld":"FAQPage" not in types,"no Breadcrumb ld":"BreadcrumbList" not in types,
     "no og:image":'property="og:image"' not in h,"no lang":not lang,
     "no author":'rel="author"' not in h and '"author"' not in h,
     "no dateModified":'"dateModified"' not in h,
    }
    for k,v in checks.items():
        if v: issues[k]+=1; bad[k].append((u,len(t) if 'title' in k else len(d)))
    titles.setdefault(t,[]).append(u); descs.setdefault(d,[]).append(u)
print("articles audited:",len(urls))
for k,v in issues.most_common(): print(f"{k}: {v}", bad[k][:3])
print("dup titles:",sum(1 for v in titles.values() if len(v)>1),"dup descs:",sum(1 for v in descs.values() if len(v)>1))
print("sample types:",sorted(t for t in types if t))
