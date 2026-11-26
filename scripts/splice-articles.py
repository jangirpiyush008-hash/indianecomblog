"""Append article drafts (a snippet of `{ ... },` objects) to src/content/articles/<cc>.ts.

Usage: python3 scripts/splice-articles.py <cc> <snippet.ts>
"""
import sys, pathlib

cc, snippet = sys.argv[1], sys.argv[2]
path = pathlib.Path(__file__).resolve().parent.parent / "src" / "content" / "articles" / f"{cc}.ts"
src = path.read_text()
marker = "];\n\nexport const articles"
assert src.count(marker) == 1, f"marker not found exactly once in {path}"
add = pathlib.Path(snippet).read_text().rstrip() + "\n"
path.write_text(src.replace(marker, add + marker))
print("spliced", cc)
