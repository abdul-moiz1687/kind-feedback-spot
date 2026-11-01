# Fix: images missing on Vercel (abdulmoizdev.vercel.app)

## Problem (verified)
- On Vercel the site itself works: the page, CV and all 6 certificate PDFs return 200.
- But the profile picture and all 9 project screenshots point to Lovable CDN paths
  (`/__l5e/assets-v1/...`). Those paths only exist on Lovable hosting — on Vercel they
  return **404**, so every image is broken there.
- The repo only contains small `.asset.json` pointer files; the real image binaries were
  moved to Lovable CDN when uploaded, so GitHub/Vercel never received them.

## Fix
1. **Restore the real image files into the repo** — download all 10 originals
   (profile picture + 9 project screenshots) from Lovable CDN into `src/assets/`
   (`abdul-moiz.png` and `src/assets/projects/*.jpg`). These get committed to GitHub
   with the project.
2. **Import images directly** in `src/components/site/Projects.tsx` and
   `Portfolio.tsx` (standard Vite image imports) instead of the `.asset.json`
   pointers. Vite bundles them with stable hashed URLs that work on any host
   (Lovable, Vercel, anywhere).
3. Keep the existing `.asset.json` pointer files untouched so the already-published
   Lovable site keeps working until the next publish.
4. Update the architecture note in `AGENTS.md`: portfolio images are real files in
   `src/assets` (self-host friendly); pointer files remain only for CDN history.

## Verification
- Build check (build-errors.log) plus Playwright on the Lovable preview: portrait and
  all 9 project screenshots render, no 404s.
- Confirm the built HTML/asset URLs no longer use `/__l5e/`.
- After you push/sync to GitHub and Vercel redeploys, I'll check
  https://abdulmoizdev.vercel.app/ and confirm every image returns 200
  (this last step needs your redeploy to finish).

## Not affected
- CV and certificate PDFs are already real files in `public/` and work on Vercel.
- Fonts, contact form (Formspree) and animations are remote/inline and work as-is.
