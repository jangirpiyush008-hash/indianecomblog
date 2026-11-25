import { AdminPageHeader } from "@/components/admin/AdminShell";
import { AdminCountryPicker } from "@/components/admin/AdminCountryPicker";
import { AFFILIATE_PROGRAMS, STATUS_LABEL } from "@/config/affiliate-programs";
import { ALL_COUNTRIES, COUNTRIES, isCountryCode } from "@/config/countries";
import { productsFor } from "@/lib/content";

export const metadata = { title: "Affiliate programmes — Admin" };

export default async function AffiliateProgramsPage({ searchParams }: { searchParams: Promise<{ country?: string }> }) {
  const { country } = await searchParams;
  const active = isCountryCode(country) ? country : undefined;
  const editions = active ? [COUNTRIES[active]] : ALL_COUNTRIES;
  const connected = AFFILIATE_PROGRAMS.filter((p) => p.status === "integration_connected").length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Global admin · Commerce"
        title="Affiliate programmes by country"
        description={`${AFFILIATE_PROGRAMS.length} programmes across ${ALL_COUNTRIES.length} editions · ${connected} connected and tested. Registration links were confirmed reachable; programme terms still need reviewing before you apply.`}
      />
      <div className="p-6 lg:p-10 space-y-10">
        <AdminCountryPicker basePath="/admin/affiliate-programs" active={active} />
        {editions.map((c) => {
          const programs = AFFILIATE_PROGRAMS.filter((p) => p.country === c.code);
          return (
            <section key={c.code} className="bg-paper border border-line">
              <header className="p-5 border-b border-line flex items-center justify-between gap-4">
                <h2 className="font-editorial text-xl font-semibold">{c.flag} {c.name}</h2>
                <span className="text-xs text-ink-60">{productsFor(c.code).length} live products · {c.currency}</span>
              </header>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[760px]">
                  <thead>
                    <tr className="text-left font-mono text-[10px] uppercase tracking-[0.15em] text-ink-40 border-b border-line">
                      <th className="p-4">Programme</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Link generation</th>
                      <th className="p-4">Notes</th>
                      <th className="p-4">Checked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((p) => (
                      <tr key={p.network} className="border-b border-line last:border-0 align-top">
                        <td className="p-4">
                          <a href={p.registrationUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent underline">{p.name}</a>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs font-medium ${p.status === "integration_connected" ? "bg-success/15 text-success" : p.status === "needs_attention" ? "bg-danger/10 text-danger" : "bg-cream-100 text-ink-60"}`}>
                            {STATUS_LABEL[p.status]}
                          </span>
                        </td>
                        <td className="p-4 text-ink-60">{p.linkMethod}</td>
                        <td className="p-4 text-ink-60">{p.notes ?? "—"}</td>
                        <td className="p-4 text-ink-40 whitespace-nowrap">{p.lastChecked}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
