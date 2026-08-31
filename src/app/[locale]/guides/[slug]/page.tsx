import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, ChevronRight, Landmark } from "lucide-react";
import { getGuide, guides } from "@/data/guides";
import { InlineText, parseInline } from "@/components/guides/InlineText";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { locales } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    guides.map((g) => ({ locale, slug: g.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `${SITE_URL}/zh-TW/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.h1}｜${SITE_NAME}`,
      description: guide.description,
      type: "article",
      url: `${SITE_URL}/zh-TW/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: "2026-08-31",
    inLanguage: "zh-Hant",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/zh-TW/guides/${guide.slug}`,
  };

  const faqSchema =
    guide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: `${SITE_URL}/zh-TW` },
      {
        "@type": "ListItem",
        position: 2,
        name: guide.h1,
        item: `${SITE_URL}/zh-TW/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className="mb-6 flex items-center gap-1 text-sm text-slate-500"
      >
        <Link href="/zh-TW" className="hover:text-emerald-700">
          首頁
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-700">{guide.h1}</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{guide.h1}</h1>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <CalendarClock size={14} />
        知識整理日期：{guide.updated}｜{guide.updatedNote}
      </p>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
        <strong className="flex items-center gap-1.5">
          <Landmark size={15} /> 聲明
        </strong>
        <p className="mt-1">{parseInline(guide.notice)}</p>
      </div>

      <article className="guide-content mt-2">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.blocks.map((block, i) => {
              switch (block.type) {
                case "p":
                  return (
                    <p key={i}>
                      <InlineText text={block.text} />
                    </p>
                  );
                case "h3":
                  return <h3 key={i}>{block.text}</h3>;
                case "ul":
                  return (
                    <ul key={i}>
                      {block.items.map((item, j) => (
                        <li key={j}>
                          <InlineText text={item} />
                        </li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={i}>
                      {block.items.map((item, j) => (
                        <li key={j}>
                          <InlineText text={item} />
                        </li>
                      ))}
                    </ol>
                  );
                case "table":
                  return (
                    <div key={i} className="overflow-x-auto">
                      <table className="data-table">
                        <thead>
                          <tr>
                            {block.headers.map((h, j) => (
                              <th key={j}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, j) => (
                            <tr key={j}>
                              {row.map((cell, k) => (
                                <td key={k}>
                                  <InlineText text={cell} />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
              }
            })}
          </section>
        ))}
      </article>

      {/* FAQ (visible, doubles as GEO content) */}
      {guide.faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 border-l-4 border-emerald-700 pl-3 text-xl font-bold text-slate-900">
            常見問答
          </h2>
          <div className="space-y-3">
            {guide.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-stone-200 bg-white p-4"
                open
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Cross-links */}
      <section className="mt-10 rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="mb-3 text-base font-bold text-slate-900">繼續閱讀</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {guides
            .filter((g) => g.slug !== guide.slug)
            .map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/zh-TW/guides/${g.slug}`}
                  className="text-sm text-emerald-700 hover:underline"
                >
                  {g.cardTitle}
                </Link>
              </li>
            ))}
          <li>
            <Link
              href="/zh-TW/alerts"
              className="text-sm font-semibold text-amber-700 hover:underline"
            >
              到價哨兵：台股到價提醒（工具）
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-8 text-xs leading-5 text-slate-500">
        本頁內容僅供一般資訊與教育目的，不構成投資建議。資料以官方來源為準，投資決策風險自負。
      </p>
    </div>
  );
}
