import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { LogoFull, LogoIcon } from "./components/logo";
import InstallButton from "./components/install-button";
import { CityProvider } from "./components/city-detector";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Delas Club — Beleza e bem-estar indicados por mulheres",
  description:
    "A comunidade feminina de beleza e bem-estar. Profissionais avaliadas por mulheres de verdade. WhatsApp direto. Grátis.",
  keywords:
    "manicure perto de mim, cabeleireira, maquiadora, esteticista, nail designer, depilação, beleza, bem-estar, comunidade feminina",
  openGraph: {
    title: "Delas Club — Beleza indicada por mulheres",
    description:
      "A comunidade feminina de beleza e bem-estar. Profissionais avaliadas de verdade. WhatsApp direto. Grátis.",
    url: "https://delas.club",
    siteName: "Delas Club",
    locale: "pt_BR",
    type: "website",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4CEJN3RXNX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4CEJN3RXNX');
            `,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E11D48" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Delas" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Delas Club",
              url: "https://delas.club",
              description:
                "Comunidade feminina de beleza e bem-estar. Profissionais avaliadas por mulheres.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://delas.club/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} ${spaceGrotesk.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/">
              <LogoFull />
            </a>
            <nav className="flex items-center gap-3">
              <a
                href="/para-profissionais"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
              >
                Para Profissionais
              </a>
              <a
                href="/blog"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
              >
                Blog
              </a>
              <a
                href="/para-profissionais"
                className="bg-rose-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
              >
                Quero fazer parte
              </a>
            </nav>
          </div>
        </header>

        <main className="min-h-screen">
          <CityProvider>{children}</CityProvider>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LogoIcon size={22} />
                  <span className="font-semibold text-gray-900 text-sm font-display">delas<span className="text-rose-600">.club</span></span>
                </div>
                <p className="text-xs text-gray-400 max-w-xs">
                  A comunidade feminina de beleza e bem-estar do Brasil.
                  Feita por nós, para nós.
                </p>
              </div>
              <div className="flex gap-8 text-xs text-gray-500">
                <div className="space-y-2">
                  <p className="font-medium text-gray-700 uppercase tracking-wider text-[10px]">Para você</p>
                  <a href="/categoria/cabeleireira" className="block hover:text-gray-700">Cabeleireiras</a>
                  <a href="/categoria/manicure" className="block hover:text-gray-700">Manicures</a>
                  <a href="/categoria/maquiadora" className="block hover:text-gray-700">Maquiadoras</a>
                  <a href="/categoria/esteticista" className="block hover:text-gray-700">Esteticistas</a>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-700 uppercase tracking-wider text-[10px]">Comunidade</p>
                  <a href="/para-profissionais" className="block hover:text-gray-700">Para Profissionais</a>
                  <a href="/para-profissionais#cadastro" className="block hover:text-gray-700">Fazer parte</a>
                  <a href="/blog" className="block hover:text-gray-700">Blog</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-8 pt-6 text-[11px] text-gray-400">
              delas.club — Brasil
            </div>
          </div>
        </footer>
        <InstallButton />
      </body>
    </html>
  );
}
