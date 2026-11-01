<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep portfolio content in central data modules and page sections in `src/components/site`; the home route composes the portfolio to keep content separate from presentation.
- Submit the contact form directly to the configured Formspree endpoint from the browser; the existing external form service handles delivery without a separate backend.
- Keep portfolio images (portrait, project screenshots) as real files in `src/assets` imported directly through Vite; hashed bundle URLs make them work on any host, including self-hosted/Vercel deploys where Lovable's `/__l5e` CDN paths don't resolve. Legacy `.asset.json` pointer files stay only so the previously published build keeps serving.
- Apply theme presets through semantic CSS tokens and the root theme initializer; this keeps every section consistent when themes change.
- Share skill-brand rendering and social links through the site icon module, with skill content in the central data module; this keeps recognizable icons and accessible link labels consistent across sections.
- Keep skills and footer presentation in dedicated site section modules and brand colors in global CSS tokens; this keeps the portfolio composition lean and brand styling theme-safe.
- Keep hero typing in a browser-effect-driven site component with a stable full-text footprint and reduced-motion fallback; this prevents hydration and layout shifts while retaining accessible text.
- Keep decorative motion and scroll progress in the shared Effects module, and section entrances in Reveal; use theme tokens and reduced-motion fallbacks to keep animation consistent and accessible.
