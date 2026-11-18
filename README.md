# Abhishek Singla: portfolio

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit things

| To change | Edit |
|---|---|
| Bio, stats, projects, writing, quotes, glossary, updates, press kit | `src/data.ts` |
| Resume content shown on `/resume` | `src/resume.ts` |
| Learn hub chapters | `src/content/learn/*.md` |
| Resume PDFs | `public/resume.pdf`, `public/resume-relevant.pdf` |
| Headshot | `public/portrait.jpg` (used by About and the press kit) |
| PM templates | `public/templates/` |
| SQL playground and dashboard data | `public/data/payments.db`, `src/content/*.json`; rebuild with `scripts/gen_data.py` |
| Diagrams on the visuals page | `public/visuals/` and `visuals` in `src/data.ts` (set `published: true` only once the matching post is live) |
| Social share images | `public/og*.png` |

## Optional features (set in your hosting provider, never in the repo)

See `.env.example`. Anything left unset keeps that feature off:

- `NEXT_PUBLIC_SITE_URL`: your real site address (sitemap, canonical links, share previews, RSS).
- `ANTHROPIC_API_KEY` (and optionally `ASK_MODEL`): the "Ask about my work" assistant.
- `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`: the contact form.
- `RESEND_AUDIENCE_ID`: the newsletter sign-up box.

## Notes

- The SQL playground runs SQLite in the browser (sql.js). Its engine files are copied into `public/sqljs/` from `node_modules/sql.js/dist/`.
- Never put real biller, client or partner names in the site content or the demo data. The demo data uses made-up IDs only.
- `restrictedExplainersLive` in `src/data.ts` switches the biller-types and settlement-history pages on or off everywhere.
- `public/resume*.pdf` contain a phone number. Keep this repository private unless you replace them.
- The Learn hub text comes from the public `bbps-explained` repository and is released under the MIT licence.

## Tests and CI

```bash
npm run build && npm start -- -p 3000   # in one terminal
npm test                                 # in another: smoke tests on every page, link, file and header
npm run check:links                      # external links (LinkedIn and similar are reported as skipped)
```

Set `BLOCKED_TERMS="term one,term two"` in your environment to make the tests fail if any of those words ever appear on a page. Keep that list out of the repository.

`docs/ci-workflow.yml` is a GitHub Actions workflow that runs type-checking, the build and the smoke tests on every push, plus a weekly link check. GitHub only accepts workflow files from a login that has the `workflow` permission. To switch it on, run `gh auth refresh -s workflow`, then copy the file to `.github/workflows/ci.yml` and push.
