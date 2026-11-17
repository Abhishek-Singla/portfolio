"""Regenerates src/content/sql-questions.json and src/content/dashboard.json.

Usage (run from the portfolio folder, after building public/data/payments.db with the repo's make_db.py):
    python scripts/gen_data.py <path to the payments-sql-practice repository>
"""
import json, re, sqlite3, os, sys

REPO = sys.argv[1] if len(sys.argv) > 1 else "../payments-sql-practice"
SITE = os.getcwd()
os.makedirs(SITE + "/src/content", exist_ok=True)

# ---------- 1. Questions + solutions straight from the repo ----------
md = open(REPO + "/questions.md", encoding="utf8").read()
level = ""
questions = []
for line in md.splitlines():
    m = re.match(r"^## (Level \d+:.*)$", line)
    if m:
        level = m.group(1)
        continue
    m = re.match(r"^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*\[q\d+\]", line)
    if m:
        n = int(m.group(1))
        sql = open(f"{REPO}/solutions/q{n:02d}.sql", encoding="utf8").read().strip()
        skills = m.group(3).replace("`", "")
        questions.append({"n": n, "level": level, "q": m.group(2), "skills": skills, "sql": sql})
assert len(questions) == 13, len(questions)
json.dump(questions, open(SITE + "/src/content/sql-questions.json", "w", encoding="utf8"), ensure_ascii=False, indent=1)
print("questions:", len(questions))

# ---------- 2. Dashboard aggregates from the same database ----------
con = sqlite3.connect(SITE + "/public/data/payments.db")
q = lambda s: con.execute(s).fetchall()
total, ok, fail, pend = q("SELECT COUNT(*), SUM(status='SUCCESS'), SUM(status='FAILED'), SUM(status='PENDING') FROM transactions")[0]
settled_cov = q("SELECT COUNT(*) FROM transactions t JOIN settlements s USING(txn_id) WHERE t.status='SUCCESS'")[0][0]
by_channel = [{"channel": c, "txns": n, "failurePct": round(100.0 * f / n, 2)} for c, n, f in q("SELECT channel, COUNT(*), SUM(status='FAILED') FROM transactions GROUP BY channel ORDER BY 3*1.0/2 DESC")]
rows = q("""SELECT t.biller_id, b.category, COUNT(*) n, SUM(t.status='FAILED') f,
            (SELECT COUNT(*) FROM complaints c JOIN transactions x ON x.txn_id=c.txn_id WHERE x.biller_id=t.biller_id) comp
            FROM transactions t JOIN billers b USING(biller_id) GROUP BY t.biller_id ORDER BY 4*1.0/3 DESC""")
overall = fail / total
billers = []
for bid, cat, n, f, comp in rows:
    pct = 100.0 * f / n
    billers.append({"id": bid, "category": cat, "txns": n, "failed": f, "failurePct": round(pct, 2), "complaints": comp, "complaintsPer1000": round(1000.0 * comp / n, 2)})
billers.sort(key=lambda b: -b["failurePct"])
by_channel.sort(key=lambda c: -c["failurePct"])
lag.sort(key=lambda l: -l["avgLagDays"]) if "lag" in dir() else None
print("overall failure %:", round(100 * overall, 2))
print("biller failure %:", [b["failurePct"] for b in billers])
# Tier rule (shown on the page): High reliability under 10% failure, Medium 10-15%, Low above 15%.
for b in billers:
    b["tier"] = "High" if b["failurePct"] < 10 else ("Medium" if b["failurePct"] <= 15 else "Low")
lag = [{"category": c, "avgLagDays": round(v, 2)} for c, v in q("""SELECT b.category, AVG(julianday(s.settled_date) - julianday(date(t.txn_ts)))
        FROM transactions t JOIN settlements s USING(txn_id) JOIN billers b ON b.biller_id=t.biller_id GROUP BY b.category ORDER BY 2 DESC""")]
daily = [{"date": d, "success": s, "failed": f} for d, s, f in q("SELECT date(txn_ts), SUM(status='SUCCESS'), SUM(status='FAILED') FROM transactions GROUP BY date(txn_ts) ORDER BY 1")]
reasons = [{"reason": r, "count": c} for r, c in q("SELECT failure_reason, COUNT(*) FROM transactions WHERE status='FAILED' GROUP BY failure_reason ORDER BY 2 DESC")]
top = billers[0]["id"]
top_reasons = [{"reason": r, "count": c} for r, c in q("SELECT failure_reason, COUNT(*) FROM transactions WHERE status='FAILED' AND biller_id='%s' GROUP BY failure_reason ORDER BY 2 DESC" % top)]
data = {
    "topBiller": top, "topBillerReasons": top_reasons,
    "overall": {"txns": total, "success": ok, "failed": fail, "pending": pend, "failurePct": round(100 * overall, 2), "successNotSettled": ok - settled_cov, "complaints": q("SELECT COUNT(*) FROM complaints")[0][0]},
    "byChannel": by_channel, "billers": billers, "lag": lag, "daily": daily, "reasons": reasons,
}
json.dump(data, open(SITE + "/src/content/dashboard.json", "w", encoding="utf8"), ensure_ascii=False)
print("tiers:", {t: sum(1 for b in billers if b["tier"] == t) for t in ("High", "Medium", "Low")})
print("channel:", by_channel)
print("lag:", lag)
print("daily points:", len(daily), "first", daily[0], "last", daily[-1])
