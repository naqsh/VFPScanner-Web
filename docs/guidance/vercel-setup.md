# Vercel setup — VFPScanner Web (VW-006)

One-time steps for the owner (needs your Vercel login).

1. Go to vercel.com → **Add New… → Project** → import `naqsh/VFPScanner-Web`.
2. **Root Directory:** `frontend`. Framework preset: Next.js (auto). Build command and output: leave default.
3. **Node.js version:** 22.x (Project Settings → General).
4. **Environment variables:** none needed for VW-E1. Later add the names from `.env.example` (Production + Preview) as each feature ships. Never put secret values in `NEXT_PUBLIC_*` vars.
5. **Git:** Production Branch = `main` (no production traffic until VW-E7). Every other branch and PR gets a Preview URL automatically.
6. Open the Preview URL of `epic/VW-E1-foundation` and check: page loads, response headers include `content-security-policy` and `strict-transport-security`.

Do NOT set `output: "standalone"` in `next.config.ts`.

Domain and production go-live happen in VW-040.
