import Link from "next/link";
import Image from "next/image";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Plus, RefreshCw } from "lucide-react";
import { everyProduct } from "@/lib/content";
const allProducts = everyProduct();
import { formatRelativeTime } from "@/lib/utils";
import { formatPrice } from "@/config/countries";

export const metadata = { title: "Products — Admin" };

export default function AdminProductsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Commerce"
        title="Products"
        description="Verified products featured in articles and buying guides."
        actions={
          <>
            <Button variant="soft" size="md" shape="soft">
              <RefreshCw className="h-4 w-4" />
              Re-verify prices
            </Button>
            <Button variant="primary" size="md" shape="soft">
              <Plus className="h-4 w-4" />
              Add product
            </Button>
          </>
        }
      />

      <div className="p-6 lg:p-10">
        <div className="bg-paper border border-line overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-line bg-cream-100">
              <tr>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Product</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 hidden md:table-cell">Category</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">Price</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 hidden lg:table-cell">Merchant</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60 hidden lg:table-cell">Verified</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {allProducts.map((p) => (
                <tr key={p.id} className="hover:bg-cream-100 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 bg-cream-100 flex-shrink-0">
                        <Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover p-1" />
                      </div>
                      <div>
                        <div className="font-medium text-sm line-clamp-1">{p.name}</div>
                        <div className="text-xs text-ink-40 mt-0.5">{p.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-sm text-ink-60">{p.category}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="font-semibold text-sm">{p.price != null ? formatPrice(p.price, p.country) : "—"}</div>
                    {p.originalPrice != null && (
                      <div className="text-xs text-ink-40 line-through">{formatPrice(p.originalPrice, p.country)}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] bg-cream-100 px-2 py-1 text-ink-60">
                      {p.merchantName}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell text-xs text-ink-60">
                    {formatRelativeTime(p.verifiedAt)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-xs text-accent hover:text-accent-dark font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
