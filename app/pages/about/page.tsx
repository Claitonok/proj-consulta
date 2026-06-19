import Footer from "@/app/components/footer";
import { HeaderAbout } from "@/app/components/header";
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock3,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-900 text-white flex flex-col">
      <HeaderAbout />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* HERO */}
          <section className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Sparkles size={18} />
              Plataforma inteligente de localização
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Sobre a{" "}
              <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                CEP Finder
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
              Uma plataforma moderna criada para facilitar consultas de CEP
              com rapidez, precisão e uma experiência elegante para usuários
              e empresas.
            </p>
          </section>

          {/* CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <MapPin className="text-emerald-400" size={28} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Localização Precisa
              </h2>

              <p className="text-zinc-400 leading-relaxed">
                Consultas rápidas e inteligentes com dados detalhados de
                localização para melhorar sua produtividade.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="text-cyan-400" size={28} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Segurança Total
              </h2>

              <p className="text-zinc-400 leading-relaxed">
                Proteção e privacidade em todas as consultas realizadas na
                plataforma com tecnologia moderna.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Clock3 className="text-purple-400" size={28} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Respostas Instantâneas
              </h2>

              <p className="text-zinc-400 leading-relaxed">
                Performance otimizada para entregar resultados em segundos
                com uma interface simples e moderna.
              </p>
            </div>
          </section>

          {/* STORY SECTION */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-10 md:p-16 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <div>
                <span className="text-emerald-400 font-semibold uppercase tracking-widest text-sm">
                  Nossa História
                </span>

                <h2 className="text-4xl font-black mt-4 mb-6">
                  Tecnologia feita para simplificar o dia a dia.
                </h2>

                <p className="text-zinc-400 leading-relaxed mb-6">
                  A CEP Finder nasceu com o objetivo de transformar consultas
                  simples em experiências modernas, rápidas e intuitivas.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                  Desenvolvemos soluções focadas em performance, design e
                  experiência do usuário utilizando tecnologias modernas
                  como Next.js, TailwindCSS e APIs inteligentes.
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>

                <div className="relative bg-linear-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl">
                  <div className="space-y-6">
                    
                    <div>
                      <h3 className="text-5xl font-black text-emerald-400">
                        +120K
                      </h3>
                      <p className="text-zinc-300 mt-2">
                        Consultas realizadas
                      </p>
                    </div>

                    <div>
                      <h3 className="text-5xl font-black text-cyan-400">
                        99.9%
                      </h3>
                      <p className="text-zinc-300 mt-2">
                        Disponibilidade da plataforma
                      </p>
                    </div>

                    <div>
                      <h3 className="text-5xl font-black text-purple-400">
                        24/7
                      </h3>
                      <p className="text-zinc-300 mt-2">
                        Sistema online em tempo real
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}