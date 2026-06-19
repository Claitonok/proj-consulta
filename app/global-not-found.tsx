
import type { Metadata } from "next";
import Link from "next/link";
import { SearchX, ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Página não encontrada",
  description: "A página que você está procurando não existe.",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white">
        <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

          {/* GRID */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* ORBS */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/30 blur-[120px] rounded-full animate-pulse" />

          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/30 blur-[120px] rounded-full animate-pulse" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-purple-500/10 blur-[180px] rounded-full" />

          {/* CARD */}
          <div className="relative z-10 w-full max-w-3xl">

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-[0_0_60px_rgba(16,185,129,0.15)] p-10 md:p-16 text-center">

              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">
                <SearchX size={16} />
                Erro de Navegação
              </div>

              {/* ICON */}
              <div className="relative mx-auto mb-10">
                <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-40 rounded-full"></div>

                <div className="relative mx-auto w-32 h-32 rounded-full bg-linear-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.4)]">
                  <SearchX size={64} className="text-black" />
                </div>
              </div>

              {/* 404 */}
              <h1 className="text-8xl md:text-[10rem] font-black leading-none bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                404
              </h1>

              <h2 className="text-4xl font-bold mt-6 mb-5">
                Página não encontrada
              </h2>

              <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
                Parece que você encontrou um endereço perdido.
                A página que procura não existe, foi removida
                ou mudou para outro local.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 mt-10 mb-10">

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-2xl font-bold text-emerald-400">
                    99.9%
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Disponível
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-2xl font-bold text-cyan-400">
                    120K+
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Consultas
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-2xl font-bold text-purple-400">
                    24/7
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Online
                  </p>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col md:flex-row justify-center gap-4">

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <Home size={20} />
                  Ir para Home
                </Link>

                <Link
                  href="/pages/about"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <ArrowLeft size={20} />
                  Conhecer o Projeto
                </Link>

              </div>

              {/* FOOTER */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-zinc-500">
                  CEP Finder • Sistema inteligente de localização
                </p>
              </div>

            </div>

          </div>
        </main>

      </body>
    </html>
  );
}