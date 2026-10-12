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
- Reference uploaded media through `.asset.json` pointers; this keeps binary assets out of source control.
- Apply theme presets through semantic CSS tokens and the root theme initializer; this keeps every section consistent when themes change.
