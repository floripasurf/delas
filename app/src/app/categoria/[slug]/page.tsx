import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { Professional } from "@/lib/types";
import { canonical, sharedOpenGraph, sharedTwitter } from "@/lib/seo";
import ProfessionalsList from "./professionals-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sql = getDb();

  const categories = await sql`SELECT * FROM categories WHERE slug = ${slug} LIMIT 1`;
  const category = categories[0];

  if (!category) {
    return { title: "Categoria não encontrada | Delas Club" };
  }

  const countRows = await sql`
    SELECT COUNT(*)::int as total FROM professionals
    WHERE category_id = ${category.id} AND is_active = true
  `;
  const total = countRows[0]?.total ?? 0;

  const title = `${category.name} | Delas Club - Profissionais avaliadas`;
  const description = `Encontre as melhores profissionais de ${category.name.toLowerCase()} no Delas Club. ${total} profissionais avaliadas prontas para atender você.`;

  return {
    title,
    description,
    alternates: canonical(`/categoria/${slug}`),
    openGraph: sharedOpenGraph({ title, description, path: `/categoria/${slug}` }),
    twitter: sharedTwitter(title, description),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sql = getDb();

  const categories = await sql`SELECT * FROM categories WHERE slug = ${slug} LIMIT 1`;
  const category = categories[0];

  if (!category) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Categoria não encontrada</h1>
        <Link href="/" className="text-rose-600 mt-4 inline-block">Voltar ao início</Link>
      </div>
    );
  }

  const pros = (await sql`
    SELECT p.*,
      (SELECT row_to_json(r) FROM (
        SELECT author_name, text, rating FROM reviews_imported
        WHERE professional_id = p.id AND text IS NOT NULL
        ORDER BY rating DESC LIMIT 1
      ) r) as top_review
    FROM professionals p
    WHERE p.category_id = ${category.id} AND p.is_active = true
    ORDER BY
      (CASE WHEN p.photo_url IS NOT NULL THEN 0 ELSE 1 END),
      p.google_rating DESC NULLS LAST
    LIMIT 100
  `) as (Professional & { top_review?: { author_name: string | null; text: string | null; rating: number | null } | null })[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    numberOfItems: pros.length,
    itemListElement: pros.map((pro, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://delas.club/profissional/${pro.slug}`,
      name: pro.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div>
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <nav className="text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600">Início</Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-600">{category.name}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {category.name}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {pros.length} profissionais encontrados
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <ProfessionalsList professionals={pros} />

        {/* CTA */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-white">
              <h2 className="text-xl font-bold">Você é {category.name.toLowerCase()}?</h2>
              <p className="text-rose-100 mt-1 text-sm">
                Cadastre-se grátis e receba clientes pelo WhatsApp.
              </p>
            </div>
            <Link
              href="/para-profissionais"
              className="shrink-0 bg-white text-rose-600 px-6 py-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors text-sm"
            >
              Quero receber clientes
            </Link>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
