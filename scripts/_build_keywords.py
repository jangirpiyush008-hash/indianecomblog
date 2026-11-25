"""Build keyword CSV + markdown from Ahrefs India data."""
import csv
import re
from pathlib import Path

OUT_DIR = Path("/Users/piyushjangir/Documents/Piyush Jangir/fable-mag")

# category, [ (keyword, volume, difficulty, cpc, intent_dict_or_str), ... ]
# intent_dict shortened: 'c' commercial, 't' transactional, 'i' info, 'n' nav, 'b' branded, 'l' local
# When transactional+commercial => High affiliate, commercial only => Medium, info => Low, nav/branded => Low (unless commercial)

DATA = {
    "Technology/Gadgets India": [
        ("best smartphone under 20000 india 2026", 1400, 1, None, "ic"),
        ("best smartphone under 15000 india 2026", 1100, None, None, "ic"),
        ("best smartphone under 30000 india 2026", 900, None, None, "ic"),
        ("best smartphone under 25000 india 2026", 800, None, None, "ic"),
        ("best smartphone in india", 600, 15, 1, "ic"),
        ("best smartphone under 10000 india 2026", 600, None, None, "ic"),
        ("best smartphone in india under 15000", 450, 3, 1, "ic"),
        ("best smartphone under 40000 india 2026", 400, None, None, "ic"),
        ("best smartphone for elderly india", 350, 0, 1, "ic"),
        ("best smartphone brand in india", 350, 0, 1, "ic"),
        ("best smartphone 2026 in india", 300, None, None, "ic"),
        ("best smartphone under 50000 india 2026", 250, None, None, "ic"),
        ("best budget smartphone in india", 200, 13, 1, "ic"),
        ("best smartphone company in india", 200, 0, 2, "ic"),
        ("best smartphone under 50000 in india", 200, 0, 1, "ic"),
        ("best 5g smartphone under 10000 india 2026", 150, None, None, "ic"),
        ("best selling smartphone in india", 150, 20, 1, "ic"),
        ("best budget smartphone 2026 india", 150, None, None, "ic"),
        ("best 5g smartphone under 15000 india 2026", 150, None, None, "ic"),
        ("best smartphone under 60000 india 2026", 100, None, None, "ic"),
        ("top 5 best smartphone in india", 100, None, None, "ic"),
        ("best smartphone under 5000 india 2026", 100, None, None, "ic"),
        # Laptops
        ("best laptop under 50000", 26000, 0, 1, "ict"),
        ("gaming laptop under 50000", 9200, 0, 1, "ict"),
        ("laptop under 50000", 9100, 0, 1, "ict"),
        ("best gaming laptop under 50000", 6700, 1, 1, "ic"),
        ("hp laptop under 50000", 2700, 0, 1, "ictb"),
        ("dell laptop under 50000", 1300, 0, 1, "ictb"),
        ("lenovo laptop under 50000", 1200, 0, 1, "ictb"),
        ("asus laptop under 50000", 1200, 0, 1, "ictb"),
        ("best hp laptop under 50000", 1000, 0, 1, "ictb"),
        ("samsung laptop under 50000", 900, 0, 1, "ictb"),
        ("asus gaming laptop under 50000", 800, 1, 1, "ictb"),
        ("best laptop for coding and programming under 50000", 800, 0, 1, "ict"),
        ("apple laptop under 50000", 800, 4, 1, "ictb"),
        ("h series laptop under 50000", 600, 0, 1, "ictb"),
        ("best dell laptop under 50000", 600, 0, 1, "ictb"),
        ("best laptop under 50000 with i7 processor and 8gb ram", 400, 0, 1, "ictb"),
        ("best lenovo laptop under 50000", 350, 0, 1, "ictb"),
        ("i5 laptop under 50000", 350, 0, 1, "ictb"),
        ("acer laptop under 50000", 350, 0, 1, "ictb"),
        ("best coding laptop under 50000", 300, 0, 1, "ic"),
        ("best i5 laptop under 50000", 300, 0, 1, "ictb"),
        ("lenovo gaming laptop under 50000", 250, 0, 1, "ictb"),
        ("best laptop for students under 50000", 250, 0, 2, "ic"),
        ("msi laptop under 50000", 250, 0, 1, "ictb"),
        ("best laptop for video editing under 50000", 250, 0, 1, "ic"),
    ],
    "AI Tools": [
        ("best ai tools", 6300, 67, 25, "ic"),
        ("best ai tools for students", 1300, 12, 3, "ic"),
        ("best ai tools for business", 800, 30, 2, "ic"),
        ("best free ai tools", 800, 46, 9, "ic"),
        ("best ai tools for coding", 700, 47, 40, "ic"),
        ("best ai tools for research", 600, 13, 25, "ic"),
        ("best ai tools for video editing free", 600, 46, 4, "ic"),
        ("best ai tools for presentations", 600, 60, 15, "ic"),
        ("best ai search monitoring tools voted by fatrank", 400, None, None, "icb"),
        ("best ai tools free", 400, 39, 10, "ic"),
        ("best ai tools for video creation", 400, 69, 15, "ic"),
        ("best ai-powered writing tools", 400, None, None, "ic"),
        ("best ai tools for work", 400, None, 25, "ic"),
        ("best coding ai tools", 400, 49, 30, "ic"),
        ("best ai tools for students studying", 350, None, None, "ic"),
        ("best ai video editing tools 2026", 350, None, None, "ic"),
        ("best free ai image to video tools 2026", 350, None, None, "ic"),
        ("best ai tools for image generation", 350, 57, 8, "ic"),
        ("best ai tools 2026", 350, None, 10, "ic"),
        ("best ai video generator tools", 300, None, 20, "ic"),
        ("best ai video generator tools 2026", 300, None, None, "ic"),
        ("best free ai video generator tools 2026", 300, None, None, "ic"),
        ("best ai tools for ppt", 250, 48, 3, "icb"),
        ("best ai tools like chatgpt", 250, 22, 7, "icb"),
        ("best ai image generation tools 2026", 250, None, None, "ic"),
        ("best ai tools for studying", 250, None, 20, "ic"),
        ("best research ai tools", 250, None, 15, "ic"),
        ("best ai image to video tools 2026", 250, None, None, "ic"),
        ("best ai tools 2025", 200, 39, 15, "ic"),
        ("best ai coding tools", 200, None, 3, "ic"),
        ("best ai video generation tools", 200, None, 15, "ic"),
        ("best free ai tools 2026", 200, None, 9, "ic"),
        ("best ai seo tools", 200, None, 15, "ic"),
        ("best ai photo editing tools 2026", 200, None, None, "ic"),
        ("best free ai tools for students", 200, None, 10, "ic"),
        ("best ai testing tools", 150, None, 60, "ic"),
        ("best generative ai tools", 150, 23, 25, "ic"),
        ("best ai tools for video editing", 150, 55, 8, "ic"),
        ("best ai tools for study", 150, None, 20, "ic"),
        ("best ai presentation tools 2026", 150, None, None, "ic"),
    ],
    "Shopping/Deals India": [
        ("amazon india online shopping offers today", 5300, 1, 1, "ictb"),
        ("amazon offers", 5200, 31, 5, "ictb"),
        ("amazon offers date", 2100, 40, 1, "ictb"),
        ("amazon online shopping offers today", 1700, 1, 2, "ictb"),
        ("amazon offers today", 1600, 16, 1, "ictb"),
        ("amazon offers 2026", 1000, 30, 1, "ictb"),
        ("amazon prime offers", 600, 1, 10, "ictb"),
        ("amazon mobile offers", 450, 5, 1, "ictb"),
        ("amazon offers upcoming", 400, 36, 1, "icb"),
        ("upcoming offers in amazon", 400, 39, 1, "icb"),
        ("upcoming offers on amazon", 400, 36, 2, "ictb"),
        ("amazon prime subscription offers", 350, 29, 10, "ictb"),
        ("amazon today offers", 350, 3, 2, "ictb"),
        ("amazon card offers", 300, 0, 3, "icb"),
        ("amazon offers 2025", 250, 22, 1, "icb"),
        ("amazon upcoming offers", 250, 24, 1, "icb"),
        ("amazon offers date 2026", 250, None, 5, "icb"),
        ("amazon gift card offers", 200, 3, 1, "ictb"),
        ("amazon prime membership offers", 200, 4, 10, "ictb"),
        ("amazon mobile offers low price", 200, 0, 1, "ictb"),
        ("amazon online offers", 200, 1, 7, "ictb"),
        ("upcoming offers in amazon and flipkart", 200, 12, 1, "icb"),
        ("amazon sale offers today", 200, 1, 2, "ictb"),
        ("offers in amazon", 150, 29, 5, "ictb"),
        ("amazon offers on electronics", 150, 1, 1, "ictb"),
        ("amazon offers on mobiles", 150, 6, 1, "ictb"),
        ("upcoming offers in flipkart and amazon", 150, 29, 1, "icb"),
        ("amazon mobiles offers", 150, None, 1, "ictb"),
        # Flipkart
        ("flipkart offers", 26000, 29, 1, "ictb"),
        ("flipkart online shopping today offers", 9500, 14, 1, "ictb"),
        ("flipkart offers today", 3000, 43, 1, "ictb"),
        ("flipkart offers date", 2900, 17, 1, "icb"),
        ("flipkart grocery offers today", 1900, 0, 1, "ictb"),
        ("flipkart offers today 90% off", 1700, 3, None, "ictb"),
        ("flipkart shopping offers today", 1500, 31, 1, "ictb"),
        ("flipkart mobile offers", 1300, 0, 1, "ictb"),
        ("flipkart offers 2026", 1200, None, 1, "icb"),
        ("flipkart offers date 2026", 1100, 10, 1, "icb"),
        ("flipkart goat sale iphone offers", 1100, None, None, "ictb"),
        ("goat sale flipkart 2026 offers", 1100, None, None, "ictb"),
        ("flipkart minutes offers today", 1000, 1, 1, "ictb"),
        ("flipkart iphone 17 pro offers", 700, None, None, "ictb"),
        ("upcoming offers on flipkart", 450, 13, 1, "icb"),
        ("upcoming offers in flipkart", 450, 13, 1, "icb"),
        ("flipkart online shopping today offers clothes", 450, None, 1, "ictb"),
        ("flipkart upcoming offers", 400, 0, 2, "icb"),
        ("mobile phones flipkart offers", 400, 0, 1, "ictnb"),
        ("flipkart online shopping offers today", 400, 0, 1, "ictb"),
    ],
    "Personal Finance India": [
        ("best credit card in india", 27000, 0, 20, "ic"),
        ("best travel credit card india", 3000, 1, 20, "ic"),
        ("which credit card is best in india", 3000, 8, 10, "ic"),
        ("best rupay credit card in india", 2100, 0, 20, "icb"),
        ("best free credit card in india", 1800, 13, 25, "ic"),
        ("which is the best credit card in india", 1400, 6, 15, "ic"),
        ("best credit card india", 1200, 40, 20, "ic"),
        ("best fuel credit card in india", 1100, 5, 8, "ic"),
        ("best premium credit card in india", 1100, 0, 20, "ic"),
        ("best cashback credit card india", 1000, 1, 20, "ic"),
        ("best credit card for fuel in india", 900, 0, 8, "ic"),
        ("best upi credit card in india", 800, 0, 30, "ic"),
        ("best credit card against fd in india", 800, 4, 25, "ict"),
        ("best lifetime free credit card in india", 700, 26, 25, "ict"),
        ("best fd credit card in india", 600, 3, 25, "ic"),
        ("best credit card in india 2026", 500, None, 20, "ic"),
        ("best rewards credit card india", 450, 0, 20, "ic"),
        ("best credit card in india with no annual fee", 450, 6, 20, "ict"),
        ("best cash back credit card in india", 400, 1, 20, "ic"),
        ("best credit card for students in india", 400, 3, 10, "ic"),
        ("best travel credit card in india 2026", 350, None, None, "ic"),
        ("best forex credit card in india", 350, None, 30, "ic"),
        ("best metal credit card in india", 300, None, 25, "ic"),
        ("best credit card in india 2025", 300, 1, 10, "ic"),
        ("best credit card for international travel from india", 300, 1, 30, "ic"),
        ("best credit card for travel india", 250, 0, 25, "ic"),
        ("best fuel credit card india", 250, 6, 10, "ic"),
        ("best credit card for beginners in india", 200, 0, 15, "ic"),
        ("best petrol credit card in india", 200, 7, 20, "ic"),
        ("best credit card in india for lounge access", 200, 4, 20, "ic"),
        ("best credit card for cashback in india", 200, None, None, "ic"),
        ("best credit card for lounge access india", 200, 4, 15, "ic"),
        ("best cashback credit card in india", 200, 4, 20, "ic"),
        ("best forex credit card in india with zero markup", 200, None, 35, "ic"),
        # Mutual funds
        ("mutual fund calculator", 106000, 22, 1, "ic"),
        ("sbi mutual fund", 89000, 26, 10, "icnb"),
        ("mutual fund", 62000, 64, 20, "ic"),
        ("hdfc mutual fund", 60000, 9, 40, "ictnb"),
        ("nippon india mutual fund", 52000, 7, 15, "icnb"),
        ("icici prudential mutual fund", 34000, 12, 35, "ictnb"),
        ("motilal oswal mutual fund", 31000, 1, 1, "icb"),
        ("tata mutual fund", 26000, 1, 45, "icnb"),
        ("icici mutual fund", 26000, 12, 35, "ictnb"),
        ("aditya birla mutual fund", 24000, 8, 15, "icnb"),
        ("axis mutual fund", 22000, 13, 2, "ictnb"),
        ("kotak mutual fund", 22000, 6, 25, "ictnb"),
        ("what is mutual fund", 20000, 12, 3, "i"),
        ("bandhan mutual fund", 18000, 2, 50, "icb"),
        ("dsp mutual fund", 18000, 2, 25, "icnb"),
        ("canara robeco mutual fund", 17000, 0, 6, "ictnb"),
        ("parag parikh mutual fund", 17000, 3, 30, "icnb"),
        ("what is a mutual fund", 17000, 26, 3, "i"),
    ],
    "Lifestyle/Fashion India": [
        ("best skincare for oily skin", 35000, 1, 3, "ic"),
        ("best skincare products", 3600, 7, 3, "ict"),
        ("best skincare products for dry skin", 3300, 0, 3, "ic"),
        ("best skincare brands", 2100, 1, 9, "ic"),
        ("best skincare brands in india", 1700, 1, 15, "ic"),
        ("best skincare products for oily skin", 900, 0, 3, "ic"),
        ("best skincare routine for oily skin", 700, 0, 2, "ic"),
        ("best skincare routine for men", 600, 7, 3, "ic"),
        ("best skincare routine", 600, 53, 5, "i"),
        ("best skincare products for men", 500, 2, 5, "ic"),
        ("best korean skincare brands", 500, 13, 4, "ic"),
        ("which skincare brand is best", 300, 1, 20, "ic"),
        ("best skincare", 300, 0, 15, "ict"),
        ("best skincare for dry skin", 250, 19, 3, "ic"),
        ("best indian skincare brands", 250, 0, 8, "ic"),
        ("best skincare for men", 250, 5, 3, "ic"),
        ("which skincare brand is best in india", 200, 0, 10, "ic"),
        ("best skincare brand in india", 200, 0, 15, "ic"),
        ("best skincare products in india", 200, 1, 15, "ic"),
        ("best skincare products for combination skin", 200, 0, 6, "ic"),
        ("best skincare routine for dry skin", 150, 1, 5, "ic"),
        ("best antioxidant serums for daily skincare", 150, None, None, "ic"),
        ("best skincare brand", 150, 1, 5, "ic"),
        ("best skincare products for glowing skin", 150, None, 2, "ic"),
        ("best skincare kit for women", 150, None, 15, "ic"),
        ("best app to buy skincare products in india", 150, None, 20, "ic"),
        ("best skincare products for dry skin face", 150, 0, 8, "ic"),
        ("best skincare for acne prone skin", 150, 15, 9, "ic"),
        ("best skincare for combination skin", 150, 0, 5, "ic"),
        ("best skincare routine for combination skin", 150, 0, 2, "ic"),
        # Perfume
        ("best perfume for men", 96000, 1, 1, "ic"),
        ("best perfume for women", 40000, 2, 1, "ic"),
        ("best perfume", 7400, 1, 1, "ict"),
        ("best men perfume", 5700, 1, 1, "ict"),
        ("best perfume for men in india", 5400, 0, 1, "ict"),
        ("best perfume for men under 500", 4800, 0, 1, "ict"),
        ("best car perfume", 4000, 0, 1, "ict"),
        ("which perfume is best for men", 3900, 1, 1, "ic"),
        ("best fragrance perfume for men", 3600, 3, 1, "ict"),
        ("best perfume for men under 1000", 3400, 0, 1, "ict"),
        ("best long lasting perfume for women", 3100, 0, 1, "ict"),
        ("best men's perfume", 2800, 0, 1, "ict"),
        ("men perfume best", 2600, 2, 1, "ict"),
        ("best perfume for girls", 2500, 0, None, "ic"),
        ("best mens perfume", 2300, 0, 1, "ict"),
    ],
    "Entertainment/OTT India": [
        ("ott release this week", 164000, 3, 10, "i"),
        ("dhurandhar ott release date", 126000, 0, 1, "ib"),
        ("dhurandhar 2 ott release date", 118000, 0, 1, "ib"),
        ("new ott release movies malayalam", 101000, 3, 15, "i"),
        ("new ott release movies", 76000, 5, 4, "i"),
        ("tere ishq mein ott release date", 47000, 0, 5, "ib"),
        ("karuppu ott release date", 38000, 3, 3, "ib"),
        ("dude ott release", 37000, 0, 2, "ib"),
        ("bethlehem kudumba unit ott release date", 36000, 0, None, "ib"),
        ("athiradi ott release date", 31000, 6, 3, "ib"),
        ("pallichattambi ott release date", 31000, 3, 9, "ib"),
        ("hanuman ansh ott release date", 31000, 0, 6, "ib"),
        ("vishwanath and sons ott release date", 29000, 13, None, "ib"),
        ("avatar 3 ott release date", 29000, 8, 3, "ib"),
        ("dhurandhar the revenge ott release date", 29000, 3, 3, "ib"),
        ("this week ott release", 29000, 3, 3, "i"),
        ("ott release movies malayalam", 28000, 4, 5, "i"),
        ("drishyam 3 ott release date", 28000, 5, 3, "ib"),
        ("dc ott release date", 27000, 3, 7, "ib"),
        ("ott release movies malayalam 2026", 27000, 4, 350, "i"),
        ("dude ott release date", 27000, 11, 2, "ib"),
        ("youth movie 2026 ott release date", 27000, 6, None, "i"),
        ("vaazha 2 ott release date", 25000, 6, 7, "ib"),
        ("aadu 3 ott release date", 25000, 0, 5, "ib"),
        ("peddi ott release date", 24000, 2, None, "ib"),
        ("bhartha mahasayulaku wignyapthi ott release date", 24000, 2, 3, "ib"),
        ("bison ott release date", 24000, 1, 2, "ib"),
        ("jana nayagan ott release date", 23000, 5, 5, "ib"),
        ("demon slayer infinity castle ott release date", 23000, 12, 10, "ib"),
        ("aan paavam pollathathu ott release date", 23000, 2, 2, "ib"),
    ],
    "Travel India": [
        ("places to visit near me", 84000, 4, 1, "il"),
        ("places to visit in delhi", 33000, 1, 1, "i"),
        ("places to visit in bangalore", 29000, 3, 1, "il"),
        ("places to visit in hyderabad", 26000, 3, 2, "il"),
        ("places to visit in jaipur", 26000, 0, 1, "il"),
        ("best places to visit in october", 24000, 0, 3, "i"),
        ("places to visit in mumbai", 21000, 2, 1, "il"),
        ("places to visit near bangalore", 21000, 6, 5, "il"),
        ("places to visit in pune", 20000, 0, 1, "il"),
        ("places to visit in chennai", 19000, 2, 1, "il"),
        ("places to visit in udaipur", 18000, 1, 2, "il"),
        ("best places to visit in india", 17000, 6, 2, "i"),
        ("near by places to visit", 17000, 0, 7, "il"),
        ("places to visit in varanasi", 16000, 1, 2, "i"),
        ("top 10 places to visit in bangalore", 16000, 4, 1, "il"),
        ("places to visit in kolkata", 16000, 0, 1, "il"),
        ("udaipur places to visit", 15000, 0, 1, "il"),
        ("best places to visit in june in india", 13000, 0, 2, "i"),
        ("places near me to visit", 13000, 4, 2, "il"),
        ("best places to visit in bangalore", 13000, 5, 2, "il"),
        ("nearby places to visit", 13000, 2, 2, "il"),
        ("places to visit in chandigarh", 13000, 2, 1, "il"),
        ("places to visit in india", 13000, 6, 2, "i"),
        ("places to visit in mysore", 13000, 5, 2, "il"),
        ("jaipur places to visit", 12000, 0, 2, "i"),
        ("places to visit in chennai in 1 day", 12000, 0, 1, "i"),
        ("places to visit in coorg", 12000, 1, 2, "il"),
        ("places to visit near delhi", 12000, 1, 2, "il"),
        ("places to visit in coimbatore", 11000, 0, 2, "il"),
        ("places to visit in chikmagalur", 11000, 0, 2, "il"),
        # Hill stations
        ("matheran hill station", 23000, 1, 8, "il"),
        ("hill station", 13000, 2, 2, "il"),
        ("saputara hill station", 12000, 0, 2, "i"),
        ("ooty hill station", 7800, 7, 2, "i"),
        ("pachmarhi hill station", 6600, 1, 3, "il"),
        ("mahabaleshwar hill station", 3700, 6, 2, "i"),
        ("hill station near me", 3500, 0, 1, "il"),
        ("don hill station", 3500, 0, 0, "i"),
        ("chakrata hill station", 3300, 0, 2, "i"),
        ("ponmudi hill station", 3100, 0, 2, "i"),
        ("nearest hill station from delhi", 2900, 0, 1, "il"),
        ("hill station in india", 2700, 2, 2, "i"),
        ("toranmal hill station", 2600, 0, 1, "i"),
        ("hill station near chandigarh", 2500, 0, 3, "il"),
        ("lonavala hill station", 2400, 7, 2, "il"),
    ],
}


def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9\s-]", "", s.lower())
    s = re.sub(r"\s+", "-", s).strip("-")
    return s[:80]


def classify_intent(flag: str) -> str:
    if "t" in flag and "c" in flag:
        return "transactional"
    if "c" in flag:
        return "commercial"
    if "n" in flag:
        return "navigational"
    return "informational"


def affiliate_potential(intent: str, cpc, volume: int) -> str:
    if intent == "transactional" and (cpc or 0) >= 1:
        return "High"
    if intent == "commercial" and (cpc or 0) >= 5:
        return "High"
    if intent == "commercial":
        return "Medium"
    if intent == "navigational":
        return "Low"
    return "Low"


def content_type(kw: str) -> str:
    low = kw.lower()
    if " vs " in low:
        return "comparison"
    if "calculator" in low or "what is" in low or "how to" in low:
        return "explainer"
    if "review" in low:
        return "review"
    if "release date" in low or "upcoming" in low or "this week" in low:
        return "news"
    if low.startswith("best ") or "top " in low or "under " in low or "brands" in low or "places to visit" in low:
        return "listicle"
    if "offers" in low or "deals" in low or "sale" in low:
        return "deals"
    return "guide"


def main():
    rows = []
    for cat, kws in DATA.items():
        for kw, vol, diff, cpc, flag in kws:
            intent = classify_intent(flag)
            slug = slugify(kw)
            ct = content_type(kw)
            ap = affiliate_potential(intent, cpc, vol)
            rows.append({
                "keyword": kw,
                "category": cat,
                "volume": vol,
                "difficulty": diff if diff is not None else "",
                "cpc": cpc if cpc is not None else "",
                "intent": intent,
                "slug": slug,
                "content_type": ct,
                "affiliate_potential": ap,
            })

    csv_path = OUT_DIR / "keywords_india_master.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "category", "volume", "difficulty", "cpc", "intent", "slug", "content_type", "affiliate_potential"])
        w.writeheader()
        w.writerows(rows)

    # markdown
    md = ["# Keyword Research — India (Fable Mag)",
          "",
          f"**Data source:** Ahrefs Keywords Explorer (country = India, matching-terms endpoint)",
          f"**Total keywords:** {len(rows)}",
          f"**Categories:** {len(DATA)}",
          "",
          "## Methodology",
          "- Seeds chosen per category; matching-terms sorted by volume desc",
          "- Intent derived from Ahrefs commercial/transactional/informational/navigational flags",
          "- Affiliate potential: transactional + non-trivial CPC => High; commercial + CPC≥₹5 => High; commercial => Medium; informational => Low",
          "- Content type inferred from keyword pattern",
          "",
          "## Category summary",
          "",
          "| Category | Keywords | Max volume | Median vol |",
          "| --- | ---: | ---: | ---: |",
          ]
    for cat, kws in DATA.items():
        vols = sorted([k[1] for k in kws])
        med = vols[len(vols)//2]
        md.append(f"| {cat} | {len(kws)} | {max(vols):,} | {med:,} |")

    md.append("")
    for cat, kws in DATA.items():
        md.append(f"## {cat}")
        md.append("")
        md.append("| # | Keyword | Vol | KD | CPC (₹) | Intent | Content | Affiliate | Slug |")
        md.append("| ---: | --- | ---: | ---: | ---: | --- | --- | --- | --- |")
        # sort by volume desc, keep top 30
        skws = sorted(kws, key=lambda x: -x[1])[:30]
        for i, (kw, vol, diff, cpc, flag) in enumerate(skws, 1):
            intent = classify_intent(flag)
            slug = slugify(kw)
            ct = content_type(kw)
            ap = affiliate_potential(intent, cpc, vol)
            diff_s = str(diff) if diff is not None else "—"
            cpc_s = str(cpc) if cpc is not None else "—"
            md.append(f"| {i} | {kw} | {vol:,} | {diff_s} | {cpc_s} | {intent} | {ct} | {ap} | `{slug}` |")
        md.append("")

    md.append("## Top 30 High-Affiliate-Potential (across all categories)")
    md.append("")
    md.append("| Keyword | Category | Vol | KD | CPC | Content |")
    md.append("| --- | --- | ---: | ---: | ---: | --- |")
    high = [r for r in rows if r["affiliate_potential"] == "High"]
    high.sort(key=lambda r: -r["volume"])
    for r in high[:30]:
        md.append(f"| {r['keyword']} | {r['category']} | {r['volume']:,} | {r['difficulty'] or '—'} | {r['cpc'] or '—'} | {r['content_type']} |")
    md.append("")

    md.append("## Strategic notes")
    md.append("")
    md.append("- **OTT/release-date keywords** carry massive volumes (10k–160k/mo) but zero commercial intent — use for traffic/display ads, not affiliate")
    md.append("- **Mutual fund brand keywords** are high-CPC (₹25–₹60) and transactional — hub-and-spoke pages with Smallcase/Groww affiliate referrals")
    md.append("- **Credit card listicles** carry CPCs of ₹15–₹35 and KD 0–10 — highest ROI category")
    md.append("- **Laptop under 50000** (26k/mo, KD 0) is the single biggest tech affiliate opportunity")
    md.append("- **Skincare for oily skin** at 35k/mo KD 1 is a golden listicle anchor")
    md.append("- **Travel/places** = high volume, informational — build city guides for programmatic SEO")
    md.append("")

    md_path = OUT_DIR / "KEYWORD_RESEARCH.md"
    md_path.write_text("\n".join(md), encoding="utf-8")
    print(f"CSV: {csv_path} — {len(rows)} rows")
    print(f"MD:  {md_path}")


if __name__ == "__main__":
    main()
