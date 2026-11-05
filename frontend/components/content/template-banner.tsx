/** Shown on pages whose meta has `template: true` (legal texts that need owner review before launch). */
export function TemplateBanner() {
  return (
    <div role="note" className="border-y border-risk-medium/40 bg-risk-medium/10">
      <p className="mx-auto max-w-3xl px-4 py-3 text-sm sm:px-6">
        <strong className="font-semibold">Template.</strong> This text has placeholders in [brackets] and must be
        completed and checked before launch. It is not legal advice.
      </p>
    </div>
  );
}
