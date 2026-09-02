// Kept in its own module (no "next/server" import) so client components like
// the language switcher can reference the cookie name without pulling
// server-only code into the client bundle.
export const LOCALE_COOKIE = "next-locale";
