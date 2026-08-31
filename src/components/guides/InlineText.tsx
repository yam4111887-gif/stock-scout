import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Minimal inline markup renderer.
 * Supports **bold** and [label](href) where href starting with "/" is an
 * internal link (next/link) and anything else is external (target=_blank).
 */
export function InlineText({ text }: { text: string }) {
  return <>{parseInline(text)}</>;
}

const TOKEN_RE = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;

export function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(TOKEN_RE)) {
    const idx = match.index ?? 0;
    if (idx > last) nodes.push(text.slice(last, idx));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (m) {
        const [, label, href] = m;
        if (href.startsWith("/")) {
          nodes.push(
            <Link key={key++} href={href}>
              {label}
            </Link>,
          );
        } else {
          nodes.push(
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>,
          );
        }
      }
    }
    last = idx + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
