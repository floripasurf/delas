import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const articles = [
  {
    title: "Como encontrar uma manicure boa perto de você (sem depender de indicação)",
    slug: "como-encontrar-manicure-boa",
    category_slug: "manicure",
    tags: ["manicure", "unhas", "dicas", "como encontrar"],
    excerpt:
      "Cansou de manicure que estraga a cutícula, atrasa e não dura nem uma semana? Veja como encontrar uma profissional de confiança sem precisar perguntar no grupo da família.",
    content: `
<h2>A gente sabe como é</h2>
<p>Você marca a manicure pra sábado. Ela desmarca. Remarca pra terça. Você vai, ela capricha na conversa mas esquece de caprichar na unha. No dia seguinte, o esmalte já lascou. Soa familiar?</p>

<p>Encontrar uma manicure boa parece simples — até você perceber que já tentou umas dez e nenhuma ficou. O problema não é falta de profissional. É falta de informação. Você não sabe quem é boa, quem é pontual, quem realmente cuida da higiene dos materiais.</p>

<h3>Por que indicação nem sempre funciona</h3>
<p>A manicure da sua amiga pode ser incrível — pra sua amiga. Mas ela mora do outro lado da cidade, só atende terça e quinta, e cobra R$80 a unha. Indicação é um ponto de partida, não garantia.</p>

<p>Outro problema: você pergunta no grupo do WhatsApp e recebe 15 nomes diferentes, sem contexto nenhum. "A Cida é ótima!" — tá, mas ótima em quê? Faz alongamento? Aceita Pix? Atende em domicílio?</p>

<h3>O que procurar numa manicure</h3>
<ul>
  <li><strong>Avaliações de outras clientes:</strong> Não basta alguém dizer "é boa". Veja o que outras mulheres escreveram sobre ela — pontualidade, acabamento, higiene.</li>
  <li><strong>Fotos de trabalho:</strong> Unha é visual. Se a profissional não tem portfólio pra mostrar, desconfie.</li>
  <li><strong>Especialidade:</strong> Manicure tradicional, esmaltação em gel, nail art, fibra de vidro — cada uma tem sua especialidade. Procure quem faz o que você precisa.</li>
  <li><strong>Proximidade:</strong> Não adianta a melhor do mundo ficar a 40 minutos de distância. Você vai desistir na terceira vez.</li>
  <li><strong>Comunicação:</strong> Responde rápido no WhatsApp? Confirma horário? Profissional organizada é profissional que respeita seu tempo.</li>
</ul>

<h3>Quanto custa em 2026?</h3>
<p>Os preços variam bastante dependendo da cidade e do tipo de serviço:</p>
<ul>
  <li><strong>Manicure simples (mão):</strong> R$ 25 a R$ 50</li>
  <li><strong>Pedicure:</strong> R$ 30 a R$ 60</li>
  <li><strong>Esmaltação em gel:</strong> R$ 60 a R$ 120</li>
  <li><strong>Alongamento em fibra ou gel:</strong> R$ 100 a R$ 250</li>
  <li><strong>Nail art (por unha):</strong> R$ 5 a R$ 30</li>
</ul>
<p>Dica: preço muito abaixo do mercado pode significar material de baixa qualidade ou falta de esterilização dos instrumentos. Sua saúde vale mais que R$20 de economia.</p>

<h3>Como o Delas te ajuda</h3>
<p>No <a href="https://delas.club/categoria/manicure">Delas</a>, você encontra manicures avaliadas por outras mulheres, vê quem está perto de você e chama direto pelo WhatsApp. Sem baixar app, sem preencher formulário, sem esperar retorno. É de mulher pra mulher.</p>
`,
  },
  {
    title: "Extensão de cílios: tudo o que você precisa saber antes de fazer",
    slug: "extensao-de-cilios-guia-completo",
    category_slug: "cilios",
    tags: ["cílios", "extensão de cílios", "lash", "beleza", "guia"],
    excerpt:
      "Volume russo, fio a fio, clássico, mega volume... parece outro idioma? Calma. A gente te explica tudo sobre extensão de cílios — o que é, quanto custa, quanto dura e como não cair numa cilada.",
    content: `
<h2>Extensão de cílios: vale a pena?</h2>
<p>Se você já acordou, se olhou no espelho e pensou "queria ter essa cara de arrumada sem fazer nada" — extensão de cílios é pra você. É tipo um atalho visual: seus olhos ficam mais expressivos, o rosto ganha destaque e você pode pular a máscara de cílios na rotina.</p>

<p>Mas antes de sair marcando com a primeira lash designer que aparecer, vale entender o que tá envolvido.</p>

<h3>Tipos de extensão</h3>
<ul>
  <li><strong>Fio a fio (clássica):</strong> Um fio de extensão colado em cada cílio natural. Resultado mais discreto e natural. Ideal pra quem nunca fez e quer testar.</li>
  <li><strong>Volume russo:</strong> Leques de 2 a 6 fios ultrafinos por cílio natural. Dá mais volume sem pesar. É o mais popular no Brasil.</li>
  <li><strong>Mega volume:</strong> Leques de 6 a 16 fios. Efeito dramático, cheio. Pra quem quer aquele olhar de diva mesmo.</li>
  <li><strong>Volume híbrido:</strong> Mistura de fio a fio com volume russo. Combina naturalidade com volume.</li>
  <li><strong>Efeito wet look:</strong> Fios agrupados que imitam o visual de cílios molhados. Tendência forte em 2026.</li>
</ul>

<h3>Quanto custa?</h3>
<ul>
  <li><strong>Fio a fio:</strong> R$ 120 a R$ 250</li>
  <li><strong>Volume russo:</strong> R$ 150 a R$ 350</li>
  <li><strong>Mega volume:</strong> R$ 200 a R$ 400</li>
  <li><strong>Manutenção (a cada 15-20 dias):</strong> R$ 80 a R$ 180</li>
</ul>
<p>Sim, tem manutenção. Os cílios naturais caem e levam a extensão junto — isso é normal. A manutenção repõe os fios que caíram.</p>

<h3>Quanto dura?</h3>
<p>Uma aplicação dura de 3 a 4 semanas. Com manutenção regular (a cada 15-20 dias), você mantém o visual cheio o tempo todo. Sem manutenção, os fios vão caindo gradualmente até sumirem — não fica feio de uma hora pra outra.</p>

<h3>Cuidados importantes</h3>
<ul>
  <li>Nas primeiras 24h, não molhe os cílios</li>
  <li>Evite coçar os olhos (a gente sabe que é difícil)</li>
  <li>Não use rímel à prova d'água — o removedor danifica a cola</li>
  <li>Penteie com escovinha própria pela manhã</li>
  <li>Evite dormir de bruços (o travesseiro amassa os fios)</li>
</ul>

<h3>Red flags da profissional</h3>
<p>Fuja se:</p>
<ul>
  <li>Usa cola de unha postiça (a cola profissional é específica pra extensão)</li>
  <li>Não higieniza os instrumentos entre clientes</li>
  <li>Cola vários fios naturais juntos (isso puxa e pode causar queda)</li>
  <li>Não faz mapeamento do olho antes de começar</li>
  <li>Não tem portfólio com fotos reais do trabalho dela</li>
</ul>

<h3>Encontre uma lash designer de confiança</h3>
<p>No <a href="https://delas.club/categoria/cilios">Delas</a>, você encontra profissionais de extensão de cílios avaliadas por outras mulheres. Vê o trabalho, lê as avaliações e chama pelo WhatsApp. Sem risco, sem surpresa.</p>
`,
  },
  {
    title: "Depilação: qual método é melhor pra você? Comparamos todos",
    slug: "depilacao-metodos-comparacao",
    category_slug: "depilacao",
    tags: ["depilação", "cera", "laser", "estética", "comparação"],
    excerpt:
      "Cera, laser, lâmina, creme, linha... cada método tem seus prós e contras. Comparamos todos pra você decidir sem arrependimento (e sem pelo encravado).",
    content: `
<h2>O dilema da depilação</h2>
<p>Todo mundo que se depila já passou por isso: escolhe um método, sofre, jura que nunca mais, e no mês seguinte tá lá de novo. A verdade é que não existe método perfeito — existe o método certo <em>pra você</em>.</p>

<p>Vamos comparar os principais pra você decidir com informação, não na base da dor.</p>

<h3>Comparação completa</h3>

<p><strong>Cera quente</strong></p>
<ul>
  <li>Dor: média a alta (diminui com o tempo)</li>
  <li>Duração: 3 a 4 semanas</li>
  <li>Preço: R$ 30 a R$ 80 por região</li>
  <li>Prós: arranca o pelo pela raiz, pelo nasce mais fino com o tempo</li>
  <li>Contras: pode encravar, pele sensível pode irritar, precisa esperar o pelo crescer pra refazer</li>
</ul>

<p><strong>Cera fria</strong></p>
<ul>
  <li>Dor: alta (puxa mais)</li>
  <li>Duração: 2 a 3 semanas</li>
  <li>Preço: R$ 20 a R$ 50</li>
  <li>Prós: pode fazer em casa</li>
  <li>Contras: menos eficiente, quebra mais pelos, mais dolorida</li>
</ul>

<p><strong>Laser / Luz pulsada</strong></p>
<ul>
  <li>Dor: leve a média (parece um estalo quente)</li>
  <li>Duração: redução permanente após 8-12 sessões</li>
  <li>Preço: R$ 80 a R$ 300 por sessão, por região</li>
  <li>Prós: resultado duradouro, pele lisa, sem encravamento</li>
  <li>Contras: investimento alto, precisa de várias sessões, funciona melhor em pele clara com pelo escuro</li>
</ul>

<p><strong>Lâmina</strong></p>
<ul>
  <li>Dor: nenhuma</li>
  <li>Duração: 1 a 3 dias</li>
  <li>Preço: custo da lâmina (R$ 5 a R$ 30)</li>
  <li>Prós: rápido, indolor, faz em casa</li>
  <li>Contras: pelo volta rápido e grosso (mito — mas parece mais grosso), risco de corte e encravamento</li>
</ul>

<p><strong>Linha (threading)</strong></p>
<ul>
  <li>Dor: média</li>
  <li>Duração: 2 a 3 semanas</li>
  <li>Preço: R$ 15 a R$ 40</li>
  <li>Prós: precisa, boa pra rosto (buço, sobrancelha)</li>
  <li>Contras: demora mais que cera, poucos profissionais dominam a técnica</li>
</ul>

<h3>Qual escolher?</h3>
<ul>
  <li><strong>Orçamento apertado + praticidade:</strong> lâmina ou cera em casa</li>
  <li><strong>Pele sensível:</strong> laser (a longo prazo agride menos) ou linha</li>
  <li><strong>Quer parar de se preocupar:</strong> laser — o investimento compensa em 1-2 anos</li>
  <li><strong>Depilação esporádica (praia, evento):</strong> cera quente com profissional</li>
  <li><strong>Rosto:</strong> linha ou laser</li>
</ul>

<h3>Encontre sua depiladora</h3>
<p>No <a href="https://delas.club/categoria/depilacao">Delas</a>, você encontra profissionais de depilação avaliadas por outras mulheres na sua região. Compara, lê as avaliações e chama pelo WhatsApp. Porque ninguém merece ir na depiladora errada.</p>
`,
  },
  {
    title: "Drenagem linfática: o que é, pra que serve e quando NÃO fazer",
    slug: "drenagem-linfatica-guia",
    category_slug: "drenagem",
    tags: ["drenagem linfática", "bem-estar", "estética", "saúde", "pós-parto"],
    excerpt:
      "Drenagem linfática não é só massagem — é técnica. Entenda quando ela realmente ajuda, quando é furada e como encontrar uma profissional que saiba o que está fazendo.",
    content: `
<h2>Drenagem linfática: muito além da massagem relaxante</h2>
<p>Se você já ouviu que drenagem "desinfla", "elimina toxinas" e "emagrece" — calma. Tem verdade aí, tem exagero e tem mentira. Vamos separar o que funciona do que é marketing.</p>

<h3>O que é, de verdade</h3>
<p>A drenagem linfática é uma técnica de massagem com movimentos leves, rítmicos e específicos que estimulam o sistema linfático — responsável por drenar líquidos e resíduos do corpo. Não é massagem de pressão forte. Se dói, não é drenagem.</p>

<p>Foi criada nos anos 1930 por um fisioterapeuta dinamarquês e tem respaldo médico pra diversas situações.</p>

<h3>Quando realmente funciona</h3>
<ul>
  <li><strong>Inchaço e retenção de líquido:</strong> Sim, funciona. É uma das indicações mais comprovadas. Se você acorda inchada, sente as pernas pesadas ou retém líquido no período menstrual, drenagem ajuda de verdade.</li>
  <li><strong>Pós-operatório de cirurgias plásticas:</strong> Essencial. Cirurgiões recomendam sessões após lipo, abdominoplastia e mamoplastia pra reduzir edema e melhorar a cicatrização.</li>
  <li><strong>Gravidez e pós-parto:</strong> Muito indicada pra aliviar o inchaço nas pernas e pés. No pós-parto, ajuda o corpo a se recuperar. Mas precisa de profissional experiente com gestantes.</li>
  <li><strong>Sensação de bem-estar:</strong> Relaxa, diminui tensão e melhora a qualidade do sono. Isso não é placebo — é efeito real da estimulação do sistema parassimpático.</li>
</ul>

<h3>O que NÃO faz</h3>
<ul>
  <li><strong>Não emagrece:</strong> Drenagem não queima gordura. Se você "perdeu medidas" depois da sessão, perdeu líquido — que volta em 24-48h.</li>
  <li><strong>Não "elimina toxinas":</strong> Seu fígado e rins fazem isso. A drenagem ajuda o sistema linfático a funcionar melhor, mas não é detox.</li>
  <li><strong>Não substitui exercício:</strong> Se o objetivo é emagrecer ou tonificar, drenagem sozinha não resolve.</li>
</ul>

<h3>Quando NÃO fazer</h3>
<ul>
  <li>Infecções ativas (febre, inflamação)</li>
  <li>Trombose venosa profunda (risco grave)</li>
  <li>Insuficiência cardíaca descompensada</li>
  <li>Câncer ativo sem orientação médica</li>
  <li>Feridas abertas na área</li>
</ul>
<p>Na dúvida, pergunte ao seu médico antes de fazer.</p>

<h3>Quanto custa?</h3>
<ul>
  <li><strong>Sessão avulsa:</strong> R$ 80 a R$ 200</li>
  <li><strong>Pacote 10 sessões:</strong> R$ 600 a R$ 1.500</li>
  <li><strong>Pós-cirúrgico (sessão):</strong> R$ 100 a R$ 250</li>
</ul>

<h3>Como saber se a profissional é boa</h3>
<p>Drenagem mal feita não faz efeito. Pior: pressão forte demais pode machucar. Procure profissionais com formação (fisioterapia ou estética), peça indicações e leia avaliações de outras clientes.</p>

<p>No <a href="https://delas.club/categoria/drenagem">Delas</a>, você encontra profissionais de drenagem linfática avaliadas por mulheres da sua região. Sem arriscar, sem cair em promessa milagrosa.</p>
`,
  },
];

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    let inserted = 0;

    for (const article of articles) {
      const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${article.slug}`;
      if (existing.length === 0) {
        await sql`
          INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, category_slug, tags, author, published, published_at)
          VALUES (
            ${article.title},
            ${article.slug},
            ${article.excerpt},
            ${article.content},
            ${null},
            ${article.category_slug},
            ${article.tags},
            ${"Delas"},
            ${true},
            ${new Date().toISOString()}
          )
        `;
        inserted++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seed complete. ${inserted} new articles inserted, ${articles.length - inserted} already existed.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
