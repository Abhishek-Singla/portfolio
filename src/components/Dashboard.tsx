import data from "@/content/dashboard.json";

// A read-only dashboard over the synthetic payments database used by the SQL playground.
const tierOf = (pct: number) => (pct < 4 ? "High" : pct <= 8 ? "Medium" : "Low");
const tierNote: Record<string, string> = { High: "under 4% failures", Medium: "4% to 8%", Low: "over 8%" };
const nf = (n: number) => n.toLocaleString("en-IN");

function Bars({ rows, max, unit = "%", mark }: { rows: { label: string; value: number; extra?: string }[]; max: number; unit?: string; mark?: (r: { label: string; value: number }) => boolean }) {
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[9rem_1fr_auto]">
          <span className="truncate">{r.label}</span>
          <span className="h-3 rounded bg-[var(--line)]/60" aria-hidden>
            <span className={`block h-full rounded ${mark?.(r) ? "bg-[var(--accent)]" : "bg-[var(--ink)]/55"}`} style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }} />
          </span>
          <span className="w-28 text-right tabular-nums">{r.value}{unit}{r.extra ? <span className="text-[var(--muted)]"> {r.extra}</span> : null}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-[var(--line)] p-5 sm:p-6">
      <h2 className="serif text-xl font-semibold">{title}</h2>
      {sub && <p className="mt-1 text-sm text-[var(--muted)]">{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function Dashboard() {
  const o = data.overall;
  const top = data.billers[0];
  const shareFail = (100 * top.failed) / o.failed;
  const shareTxn = (100 * top.txns) / o.txns;
  const timeouts = data.topBillerReasons.find((r) => r.reason === "BILLER_TIMEOUT")?.count ?? 0;
  const maxDaily = Math.max(...data.daily.map((d) => d.success + d.failed));
  const W = 720, H = 180, bw = W / data.daily.length;

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Transactions", nf(o.txns)],
          ["Failure rate", `${o.failurePct}%`],
          ["Successful, not yet settled", nf(o.successNotSettled)],
          ["Complaints per 1,000", ((1000 * o.complaints) / o.txns).toFixed(1)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-[var(--line)] p-4"><dt className="text-xs text-[var(--muted)]">{k}</dt><dd className="serif mt-1 text-3xl font-semibold">{v}</dd></div>
        ))}
      </dl>

      <section className="rounded-3xl bg-[var(--accent)]/10 p-5 sm:p-6" aria-labelledby="read">
        <h2 id="read" className="serif text-xl font-semibold">What the dashboard says</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
          <li><strong>{top.id}</strong> fails {top.failurePct}% of the time, against {Math.min(...data.billers.slice(1).map((b) => b.failurePct))}% to {Math.max(...data.billers.slice(1).map((b) => b.failurePct))}% for the other billers.</li>
          <li>It carries {shareTxn.toFixed(1)}% of transactions but {shareFail.toFixed(1)}% of all failures ({top.failed} of {o.failed}).</li>
          <li>{timeouts} of its {top.failed} failures are biller timeouts, so the fix is on the fetch and timeout side, not in the app.</li>
          <li>Channels look alike ({data.byChannel.map((c) => `${c.channel} ${c.failurePct}%`).join(", ")}), so channel is not the lever here. This is why you drill down before you prioritise.</li>
        </ul>
      </section>

      <Card title="Failure rate by biller, with reliability tier" sub="Tier rule: High is under 4% failures, Medium 4% to 8%, Low over 8%. The tier is also written next to each biller, so colour is not the only signal.">
        <Bars max={30} mark={(r) => r.label.includes("Low")} rows={data.billers.map((b) => ({ label: `${b.id} · ${tierOf(b.failurePct)}`, value: b.failurePct, extra: `(${b.txns})` }))} />
        <p className="mt-3 text-xs text-[var(--muted)]">Number in brackets is transactions. Tiers: {Object.entries(tierNote).map(([k, v]) => `${k} = ${v}`).join("; ")}.</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Failure rate by channel"><Bars max={10} rows={data.byChannel.map((c) => ({ label: c.channel, value: c.failurePct, extra: `(${nf(c.txns)})` }))} /></Card>
        <Card title="Why transactions fail" sub="All billers"><Bars unit="" max={Math.max(...data.reasons.map((r) => r.count))} rows={data.reasons.map((r) => ({ label: r.reason.replace(/_/g, " ").toLowerCase(), value: r.count }))} /></Card>
        <Card title="Complaints per 1,000 transactions" sub="By biller"><Bars unit="" max={Math.max(...data.billers.map((b) => b.complaintsPer1000))} rows={[...data.billers].sort((a, b) => b.complaintsPer1000 - a.complaintsPer1000).map((b) => ({ label: b.id, value: b.complaintsPer1000 }))} /></Card>
        <Card title="Average settlement lag" sub="Days from transaction to settlement, by category. It is about the same everywhere in this data, which is itself a finding.">
          <Bars unit=" d" max={2} rows={data.lag.map((l) => ({ label: l.category, value: l.avgLagDays }))} />
        </Card>
      </div>

      <Card title="Daily volume and failures" sub="Each bar is one day over 90 days. The darker part is failed transactions.">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Daily transactions over ${data.daily.length} days, from ${data.daily[0].date} to ${data.daily[data.daily.length - 1].date}. Daily totals range up to ${maxDaily}.`} className="h-auto w-full">
          {data.daily.map((d, i) => {
            const th = ((d.success + d.failed) / maxDaily) * (H - 10);
            const fh = (d.failed / maxDaily) * (H - 10);
            return (
              <g key={d.date}>
                <rect x={i * bw + 0.5} y={H - th} width={bw - 1} height={th - fh} fill="currentColor" opacity="0.28" />
                <rect x={i * bw + 0.5} y={H - fh} width={bw - 1} height={fh} fill="var(--accent)" />
              </g>
            );
          })}
        </svg>
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-[var(--accent)]">Show the data as a table</summary>
          <div className="mt-2 max-h-64 overflow-auto rounded-xl border border-[var(--line)]">
            <table className="w-full text-left text-xs"><caption className="sr-only">Daily successful and failed transactions</caption>
              <thead><tr><th scope="col" className="p-2">Date</th><th scope="col" className="p-2">Successful</th><th scope="col" className="p-2">Failed</th></tr></thead>
              <tbody>{data.daily.map((d) => <tr key={d.date}><td className="p-2">{d.date}</td><td className="p-2">{d.success}</td><td className="p-2">{d.failed}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
      </Card>
    </div>
  );
}
