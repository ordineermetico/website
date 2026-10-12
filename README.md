# ordineermetico.com

The website of **Ordine Ermetico**, a French company based in Reims that brings French houses of Champagne, wine, luxury and beauty to India as their exclusive importer and distributor, and opens France and Europe to selected Indian brands.

Source of truth for all content: `Ordine_Ermetico_Website_Knowledge_Base.md` (v2.0, 11 Oct 2026). Sections 2, 11 and 12 of that file override everything else.

---

## Stack

- **Next.js 16** (App Router, static generation) · **React 19** · **TypeScript** · **Tailwind CSS v4**
- Fonts self-hosted through `next/font`: Cormorant Garamond (display), Tenor Sans (labels), Manrope (body)
- **Resend** (HTTP API, no SDK) for the contact form · **Vercel Web Analytics** (cookie-free)
- No CMS, no database. All copy lives in typed local files.

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

## Structure

```
app/
  [lang]/                 every page, rendered for "en" and "fr"
    layout.tsx            <html lang>, header, footer, Organization + WebSite JSON-LD
    page.tsx              Home
    the-firm/ capabilities/ markets/ approach/ insights/ contact/
    legal-notice/ privacy/ cookies/
    not-found.tsx         branded 404 · [...rest]/ sends unknown paths to it
  api/contact/route.ts    validation, honeypot, rate limit, Resend
  sitemap.ts robots.ts manifest.ts icon.svg apple-icon.png
components/               layout, sections and UI (server components unless marked "use client")
content/
  en.ts                   English copy (British English) — defines the shape
  fr.ts                   French copy — must match en.ts exactly (TypeScript enforces this)
  facts.ts                market figures with sources and dates [VERIFY]
lib/                      i18n, SEO metadata, structured data, fonts, form validation
proxy.ts                  serves English at "/" and French at "/fr"
public/brand  public/partners   supplied logo files, unmodified
public/llms.txt  public/<key>.txt (IndexNow)  public/og.png
scripts/indexnow.mjs      ping IndexNow after a production deploy
```

**Languages.** English is served at `/`, French at `/fr`. Internally both live under `app/[lang]`; `proxy.ts` rewrites English requests to `/en/…` and redirects any public `/en/…` URL to its canonical form. Every page carries `hreflang` alternates (`en`, `fr`, `x-default`) and the sitemap lists both versions.

**Editing copy.** Change `content/en.ts` and `content/fr.ts` together. Every sentence must respect Knowledge Base Sections 3.4 and 11 (no "exclusive" next to a named house until its agreement is signed, no licences claimed, no invented figures, no guarantees).

## Design system

| Token | Value | Use |
|---|---|---|
| `oe-ivory` | `#F4F0E8` | dominant surface |
| `oe-paper` | `#F5EFE3` | alternate warm surface |
| `oe-black` | `#111111` | hero, footer, one feature band per page |
| `oe-ink` | `#1E1A16` | text on ivory |
| `oe-gold` | `#B79A62` | hairlines, numerals, focus rings, accents — never small text on ivory |
| `oe-bronze` | `#7E5A1E` | gold-family small text on ivory (passes AA) |
| `oe-graphite` | `#6E665C` | secondary text |
| `oe-rule` | `#D3C6AE` | hairlines |
| `oe-softwhite` | `#F3EDE2` | text on black |

- **Type scale:** `display-xl` (hero), `display-lg`, `display-md`, `display-sm`, `lede`, `label`, `eyebrow` — see `app/globals.css`.
- **Signature frame:** `<Frame>` — a fine double hairline with small concave corners. Used on the hero emblem, the FTA figure, the structure diagram, the founder portrait, the exclusive-agreement note and the closing call to action only.
- **Section kickers** (`.eyebrow`) are a small italic line in the display face, not uppercase labels; uppercase Tenor Sans is kept for navigation, buttons and metadata.
- **Paper grain:** `.grain`, 3.5% opacity, inline SVG noise (no image request).
- **Motion:** fades and short rises on scroll (`<Reveal>` + one shared `IntersectionObserver`), a slow emblem fade-in, and the corridor lines drawing themselves. Everything is disabled under `prefers-reduced-motion`, and content is never hidden when JavaScript is unavailable.
- **Arrows** are drawn SVG (`<Arrow>`): Tenor Sans has no `→` glyph.
- **Favicon:** a minimal "OE" monogram in a ring (`app/icon.svg`) because the emblem is illegible at 16–32 px. `[PROPOSED]` — replace when an approved monogram exists.

## Contact form

Fields, validation and wording follow Knowledge Base 9.3. Resend is set up for `ordineermetico.com` (EU region) with a sending-only key stored in Vercel as `RESEND_API_KEY` (sensitive). Sending starts once the Resend DNS records at GoDaddy verify. Behaviour:

- Validated on the client and again on the server (`lib/contact.ts`).
- Honeypot field and a best-effort rate limit (5 per IP per 10 minutes per server instance). For a hard limit, add a Vercel WAF rate-limit rule on `/api/contact`.
- If Resend rejects the send because the domain is not yet verified, the visitor gets the same `mailto:` fallback rather than an error.
- **If `RESEND_API_KEY` is not set, the form never pretends to send.** After validation it shows a "write to us directly" panel with a `mailto:` link pre-filled with the enquiry. The contact page reads the variable at build time, so **redeploy after adding the key**.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. Vercel environment variables only — never commit it |
| `RESEND_FROM` | Sender on a domain verified in Resend. Default `Ordine Ermetico <website@ordineermetico.com>` |
| `CONTACT_TO` | Recipient. Default `office@ordineermetico.com` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Default `https://ordineermetico.com` |

## Backend: content, careers and staff accounts

**Supabase** project `ordineermetico-website` (Paris, `eu-west-3`) holds everything staff can edit. The schema lives in `supabase/migrations/`.

| Table | What it holds | Who can change it |
|---|---|---|
| `posts` | News, press releases, announcements, milestones, insights (EN + FR) | Admin, Communications |
| `partners` | Partner houses shown on Home, Markets, The Firm, the FAQ and `llms.txt` | Admin, Communications |
| `people` | Public team profiles: The Firm shows the first four shown profiles (by order), the Team page (`/team`) shows all, with bios and links | Admin, Communications |
| `jobs` | Positions on the Careers page | Admin, HR |
| `applications` | Candidates; CVs sit in the private `cvs` storage bucket | Admin, HR (read/update); written only by the website server |
| `profiles` | One row per staff account, with its role | Admin |
| `audit_log` | Every create/update/delete above, with who and when | Read by Admin; written by triggers |

Row-level security enforces every rule in the database itself, so a person with the public key, or a staff member with the wrong role, cannot read or change what they are not allowed to, even outside the website. Role checks live in a `private` schema that the API does not expose.

**Admin area:** `https://ordineermetico.com/admin` (not indexed). Sign-in is email + password. Sections appear according to role. Staff accounts are personal; Admin creates them under *Team* and gets a one-time temporary password to hand over in person. Suspending a person also blocks sign-in.

**Two-step sign-in.** Required for Admin accounts (TOTP authenticator app); optional for Communications and HR (*My account*). The database enforces it too: admin rights only apply to sessions that completed two-step sign-in (`private.has_role`). A lost phone is handled by another Admin under *Team → Reset two-step*.

**First sign-in.** Accounts created with a temporary password (`profiles.must_change_password`) must choose their own before anything else. Admin-created accounts and password resets set this automatically.

**Admin sign-off for sensitive news.** Any item can be marked *Needs Admin sign-off*; *Partnership announcement* items always need it. Until an Admin approves, the item stays offline whatever its status (enforced by the `posts_signoff` trigger and the public read policy). Only Admins can approve or remove the requirement; editing an approved item sends it back for sign-off. Admins are emailed at `ADMIN_NOTIFY_TO`; authors are emailed when their item is approved or sent back. Everything else publishes directly.

**Press kit** at `/press` (EN/FR): approved descriptions with copy buttons, logo downloads, colours, usage rules, founder portrait, latest press releases, and `public/press/ordine-ermetico-press-kit.zip` (regenerate it if logos or texts change).

**Publishing:** saving in the admin area refreshes the public site immediately (`lib/admin/revalidate.ts`). Public pages also re-read the database every 5 minutes. If the database is unreachable, partner houses fall back to the built-in copy in `content/`.

**Text formatting** for news and job descriptions: `## Heading`, `- bullet`, `1. numbered`, `**bold**`, `*italic*`, `[text](https://…)`, `> quote`. All text is escaped first (`lib/markdown.ts`), so no HTML or script can be injected.

**Applications:** `POST /api/apply` checks the CV's real file type (PDF, DOC, DOCX, max 4 MB), stores it privately, saves the application and emails `HR_NOTIFY_TO` a link to it (never the CV itself). A daily Vercel cron (`vercel.json` → `/api/cron/purge-applications`) deletes applications and CVs past their two-year retention date.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public connection (safe to expose; RLS protects data) |
| `SUPABASE_SECRET_KEY` | **Server only.** Needed to receive job applications and to manage staff accounts from *Team*. Supabase → Project settings → API keys → Secret key. Add in Vercel as *Sensitive* |
| `HR_NOTIFY_TO` | Where application alerts go (join@ordineermetico.com) |
| `ADMIN_NOTIFY_TO` | Where sign-off requests go (it@ordineermetico.com) |
| `CRON_SECRET` | Authorises the daily clean-up job |

Local development against the remote project from a sandbox that needs an HTTP proxy: `NODE_USE_ENV_PROXY=1 npm run dev`.

## Mailboxes (Zoho)

| Address | What it is | What the website sends there |
|---|---|---|
| office@ordineermetico.com | Alias of communications@ for now; becomes its own mailbox when a Zoho licence is free | Contact-form enquiries (`CONTACT_TO`); shown publicly on the site |
| it@ordineermetico.com | Site Admin | Sign-off requests (`ADMIN_NOTIFY_TO`) |
| communications@ordineermetico.com | Communications | Approval / changes-requested notes on their news items |
| join@ordineermetico.com | HR | Job-application alerts (`HR_NOTIFY_TO`); shown on the Careers page for CVs sent by email (`site.careersEmail`) |

When office@ becomes a dedicated mailbox, nothing changes on the website. All mail is sent by Resend from `website@ordineermetico.com`.

## Search and AI-assistant visibility (KB 9.6)

Done in code: server-rendered HTML for every page and language · `robots.txt` explicitly allowing Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot and (by default, `[PROPOSED]`) the training crawlers GPTBot, ClaudeBot, Google-Extended, Applebot-Extended · `sitemap.xml` with `hreflang` · JSON-LD `Organization`, `WebSite`, `BreadcrumbList`, `Service` (×4) and `FAQPage` · unique titles and descriptions, canonical URLs, Open Graph and Twitter cards · manifest and icons · `llms.txt` · IndexNow key file.

After the first production deploy:
1. Google Search Console: verify the domain with a DNS TXT record, submit `https://ordineermetico.com/sitemap.xml`.
2. Bing Webmaster Tools: *Import from Google Search Console*.
3. `npm run indexnow` to notify Bing and other IndexNow engines.
4. Run the Rich Results Test on `/` and `/capabilities`.

Official profiles (username `ordineermetico` everywhere) are listed once in `lib/site.ts` → `socials`; they feed the footer, the Contact page and the `Organization` `sameAs`. Add any further network there.

Off-site credibility (the founder's actions): keep the LinkedIn company page description identical to the website's · the SASU's public registry entry · mentions or links from Duval-Leroy and Abelé 1757 · French and Indian trade-press coverage · real Insights articles over time.

## Placeholders to supply before launch (KB Section 12)

Every one of these is shown on the site as a visible `[[TO BE CONFIRMED: …]]` marker or is listed here because it cannot be shown.

**Ordine Ermetico SASU** (Legal Notice) — exact registered name · share capital · registered address (Reims) · RCS Reims number · SIREN and SIRET · EU VAT number · director of publication. When registered, also add `address` to the `Organization` JSON-LD (`lib/structured-data.ts`) and the "Our structure" sentence with the Indian company's name on The Firm page.

**Hosting** — Vercel Inc.'s current postal address for the Legal Notice.

**Indian subsidiary** — final name, CIN, registered office (currently described only as "our Indian company, being established").

**Privacy** — data-controller details and privacy contact · retention period · legal review of the draft privacy text (the page is marked as a draft) · cookie inventory (currently none).

**Mailboxes** — confirm `office@ordineermetico.com` receives mail.

**Partner houses** — the exact role Ordine Ermetico holds with each, and whether it is exclusive and signed (until then the site never puts "exclusive" next to a house's name) · official logo files (the Duval-Leroy PNG is only 560×280) · approval of the two one-liners · website URLs.

**People and brand** — logo vector (SVG) · approved favicon / monogram · licensed photography (the site currently uses none) · native-speaker review of the French version.

**Market facts `[VERIFY]`** — every figure in `content/facts.ts` is taken from Knowledge Base Section 10 with its source and date. The sources could not be fetched from the build environment, so each must be re-checked before launch and `factsCheckedOn` updated.

## Working method

- Work on branches; every change goes through a pull request with a Vercel preview link for the founder.
- Merging to `main` deploys to production.
- **Ask the founder first** for production deploys, DNS changes, plan or domain purchases and anything that costs money.
- **Before pointing the domain to Vercel,** copy the existing MX, SPF, DKIM and DMARC records for `office@` and `it@`, or email stops.
- Secrets live only in Vercel environment variables.
