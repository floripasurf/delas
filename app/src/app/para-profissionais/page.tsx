import type { Metadata } from "next";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Para Profissionais | Glow - Receba Clientes pelo WhatsApp",
  description:
    "Cadastre-se no Glow e receba clientes direto no seu WhatsApp. Cabeleireiras, manicures, maquiadoras, esteticistas e mais. Sem mensalidade, sem taxa.",
};

export default function ParaProfissionais() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50 to-white border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
          <div className="inline-block bg-rose-100 text-rose-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            100% gratuito
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Receba clientes pelo WhatsApp
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            O Glow conecta você a clientes no Brasil que buscam serviços de beleza e bem-estar.
            Eles enviam mensagem direto no seu WhatsApp. Sem intermediário, sem taxa.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Categories available */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Profissionais que aceitamos
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider text-xs">
                Beleza
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Cabeleireira", "Manicure & Pedicure", "Maquiadora",
                  "Designer de Sobrancelhas", "Extensão de Cílios",
                  "Nail Designer", "Penteados & Noivas",
                ].map((s) => (
                  <span key={s} className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider text-xs">
                Estética & Corpo
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Esteticista", "Depilação", "Massagista",
                  "Micropigmentação", "Drenagem Linfática",
                ].map((s) => (
                  <span key={s} className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider text-xs">
                Bem-Estar
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Remoção de Tatuagem", "Personal Trainer", "Nutricionista",
                ].map((s) => (
                  <span key={s} className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "💰",
                title: "Zero custo",
                desc: "Sem mensalidade, sem taxa por lead. Você não paga nada pra receber clientes.",
              },
              {
                icon: "📱",
                title: "Direto no WhatsApp",
                desc: "A cliente encontra seu perfil e envia mensagem no seu WhatsApp. Sem app, sem painel.",
              },
              {
                icon: "⭐",
                title: "Comece com reputação",
                desc: "Importamos suas avaliações do Google. Você já aparece com histórico e credibilidade.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="text-2xl mb-2">{b.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{b.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Como funciona</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Cadastre-se",
                desc: "Preencha seus dados abaixo. Se você tem perfil no Google Maps, nós encontramos automaticamente.",
              },
              {
                step: "2",
                title: "Melhore seu perfil",
                desc: "Adicione WhatsApp, especialidades, fotos do seu trabalho e descrição. Perfil completo = mais clientes.",
              },
              {
                step: "3",
                title: "Receba clientes",
                desc: "Seu perfil aparece para quem busca beleza e bem-estar na sua região. A cliente manda WhatsApp e você agenda.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signup Form */}
        <section id="cadastro" className="mb-12">
          <SignupForm />
        </section>
      </div>
    </div>
  );
}
