import Link from "next/link";
import { getDb } from "@/lib/db";
import CityProfessionals from "./components/city-professionals";

// ISR: evita bater no banco a cada visita (preserva a cota de compute do Neon).
export const revalidate = 3600;

const CATEGORIES = {
  "Beleza": [
    { name: "Cabeleireira", slug: "cabeleireira", icon: "💇‍♀️" },
    { name: "Manicure & Pedicure", slug: "manicure", icon: "💅" },
    { name: "Maquiadora", slug: "maquiadora", icon: "💄" },
    { name: "Designer de Sobrancelhas", slug: "sobrancelhas", icon: "✨" },
    { name: "Extensão de Cílios", slug: "cilios", icon: "👁️" },
    { name: "Nail Designer", slug: "nail-designer", icon: "💎" },
    { name: "Penteados & Noivas", slug: "penteados", icon: "👑" },
  ],
  "Estética": [
    { name: "Esteticista", slug: "esteticista", icon: "🌸" },
    { name: "Depilação", slug: "depilacao", icon: "🌿" },
    { name: "Micropigmentação", slug: "micropigmentacao", icon: "🖊️" },
    { name: "Remoção de Tatuagem", slug: "remocao-de-tatuagem", icon: "🔬" },
  ],
  "Bem-Estar": [
    { name: "Massagista", slug: "massagista", icon: "🧘‍♀️" },
    { name: "Drenagem Linfática", slug: "drenagem", icon: "💆‍♀️" },
    { name: "Personal Trainer", slug: "personal-trainer", icon: "💪" },
    { name: "Nutricionista", slug: "nutricionista", icon: "🍎" },
  ],
};

export default async function Home() {
  const sql = getDb();

  const stats = await sql`
    SELECT
      (SELECT count(*) FROM professionals WHERE is_active = true) as total_pros,
      (SELECT count(*) FROM categories) as total_cats
  `;
  const totalPros = stats[0]?.total_pros || 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50 via-pink-50/30 to-white border-b border-rose-100">
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-5">
            A comunidade de beleza feita por nós, para nós
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Beleza e bem-estar<br />indicados por mulheres
          </h1>
          <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Um clique da profissional perfeita pra você.
          </p>

          {/* Search */}
          <form
            action="/buscar"
            method="GET"
            className="max-w-lg mx-auto mt-8 flex gap-2"
          >
            <input
              type="text"
              name="q"
              placeholder="O que você precisa? Ex: manicure, cabeleireira..."
              className="flex-1 px-4 py-3.5 rounded-xl border border-rose-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-sm bg-white shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors text-sm shadow-sm"
            >
              Buscar
            </button>
          </form>

          {totalPros > 0 && (
            <p className="text-xs text-gray-400 mt-3">
              {totalPros} profissionais na comunidade
            </p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Categories */}
        {Object.entries(CATEGORIES).map(([group, cats]) => (
          <section key={group} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{group}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cats.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:border-rose-200 hover:shadow-sm transition-all group"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-rose-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* City-based professionals */}
        <CityProfessionals />

        {/* How it works */}
        <section className="mb-12 mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Como funciona</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Encontre sua profissional",
                desc: "Avaliações reais de outras mulheres. Sem propaganda, sem surpresa.",
              },
              {
                step: "2",
                title: "Chame pelo WhatsApp",
                desc: "Um clique e você já está conversando. Sem cadastro, sem app.",
              },
              {
                step: "3",
                title: "Pronta!",
                desc: "Agende, fique linda e depois conte pra comunidade como foi.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center text-sm font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-100 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Mais que um site. Uma comunidade.
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              No Delas, mulheres indicam profissionais para outras mulheres.
              Aqui não tem propaganda paga — só avaliação real de quem já usou.
              Quando você encontra uma profissional incrível, compartilha. É assim que a gente se ajuda.
            </p>
          </div>
        </section>

        {/* Value props */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Para você</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  Profissionais indicadas por outras mulheres
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  Avaliações reais — sem fake, sem propaganda
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  WhatsApp direto, sem intermediário
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  100% gratuito, sem cadastro
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Para profissionais</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  Faça parte de uma comunidade que valoriza seu trabalho
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  Receba clientes direto no seu WhatsApp
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  Suas avaliações do Google aparecem no perfil
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">✓</span>
                  Grátis pra sempre. Sem taxa, sem mensalidade.
                </li>
              </ul>
              <a
                href="/para-profissionais"
                className="inline-block mt-4 text-sm font-medium text-rose-600 hover:text-rose-700"
              >
                Quero fazer parte →
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-white">
              <h2 className="text-xl sm:text-2xl font-bold">
                Você é profissional de beleza?
              </h2>
              <p className="text-rose-100 mt-2 text-sm leading-relaxed">
                Entre pra comunidade Delas. Milhares de mulheres vão conhecer seu trabalho.
                Grátis, sem burocracia.
              </p>
            </div>
            <a
              href="/para-profissionais"
              className="shrink-0 bg-white text-rose-600 px-6 py-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors text-sm"
            >
              Quero fazer parte
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
