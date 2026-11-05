// Every content MDX file exports `meta`, validated by lib/content.ts at import.
declare module "*.mdx" {
  export const meta: unknown;
}
