
import Footer from "@/app/components/footer";
import { HeaderAbout } from "@/app/components/header";
import {
  ArrowRight,
  Calculator,
  Car,
  CheckCircle2,
  Code2,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function SaibaMais() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-900 text-white flex flex-col">
      <HeaderAbout />

      <main className="flex-1">

        {/* HERO */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-sm font-medium mb-7">
              <Sparkles size={18} />
              Conheça melhor o Finder
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-7">
              Tudo o que você precisa,
              <br />

              <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                em um só lugar.
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
              O Finder reúne ferramentas práticas para consultas,
              cálculos e informações do dia a dia em uma interface
              simples, rápida e moderna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

              <a
                href="/"
                className="
                  w-full
                  sm:w-auto
                  px-7
                  py-4
                  rounded-2xl
                  bg-linear-to-r
                  from-emerald-400
                  to-cyan-500
                  text-black
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:scale-[1.03]
                  active:scale-[0.98]
                  transition-all
                  shadow-lg
                  shadow-emerald-500/20
                "
              >
                Começar agora
                <ArrowRight size={19} />
              </a>

              <a
                href="/pages/about"
                className="
                  w-full
                  sm:w-auto
                  px-7
                  py-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  text-zinc-200
                  font-semibold
                  hover:bg-white/10
                  transition-all
                "
              >
                Conheça o Finder
              </a>

            </div>

          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-14">

              <span className="text-emerald-400 font-semibold uppercase tracking-widest text-sm">
                Simples e rápido
              </span>

              <h2 className="text-4xl md:text-5xl font-black mt-4">
                Como funciona?
              </h2>

              <p className="max-w-2xl mx-auto text-zinc-400 mt-5">
                Desenvolvemos uma experiência direta para que você
                encontre o que precisa sem complicações.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* PASSO 1 */}
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-emerald-400/30 hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-center justify-between mb-7">

                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                    <Search
                      size={28}
                      className="text-emerald-400"
                    />
                  </div>

                  <span className="text-5xl font-black text-white/5">
                    01
                  </span>

                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Escolha uma ferramenta
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Selecione a ferramenta que deseja utilizar,
                  como consulta de CEP, CNPJ ou uma das nossas
                  calculadoras.
                </p>

              </div>

              {/* PASSO 2 */}
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-center justify-between mb-7">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
                    <Zap
                      size={28}
                      className="text-cyan-400"
                    />
                  </div>

                  <span className="text-5xl font-black text-white/5">
                    02
                  </span>

                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Informe os dados
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Preencha os campos necessários de forma simples
                  e intuitiva. A interface foi pensada para facilitar
                  sua utilização.
                </p>

              </div>

              {/* PASSO 3 */}
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-purple-400/30 hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-center justify-between mb-7">

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center">
                    <CheckCircle2
                      size={28}
                      className="text-purple-400"
                    />
                  </div>

                  <span className="text-5xl font-black text-white/5">
                    03
                  </span>

                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Veja o resultado
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Receba as informações de forma organizada e
                  aproveite o resultado da consulta ou cálculo.
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* FERRAMENTAS */}
        <section className="px-6 py-20">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-14">

              <span className="text-cyan-400 font-semibold uppercase tracking-widest text-sm">
                Ferramentas
              </span>

              <h2 className="text-4xl md:text-5xl font-black mt-4">
                O que você encontra no Finder?
              </h2>

              <p className="max-w-2xl mx-auto text-zinc-400 mt-5">
                Um conjunto de ferramentas desenvolvidas para
                resolver diferentes necessidades em poucos cliques.
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* CEP */}
              <a
                href="/"
                className="
                  group
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                  hover:bg-white/10
                  hover:border-emerald-400/30
                  transition-all
                  duration-300
                "
              >

                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center mb-6">
                  <MapPin
                    size={28}
                    className="text-emerald-400"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Consulta de CEP
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Consulte informações de endereço a partir
                  de um CEP de forma rápida.
                </p>

                <div className="flex items-center gap-2 mt-5 text-emerald-400 font-semibold">
                  Acessar
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>

              </a>

              {/* CNPJ */}
              <a
                href="/pages/cnpj-consulta"
                className="
                  group
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                  hover:bg-white/10
                  hover:border-cyan-400/30
                  transition-all
                  duration-300
                "
              >

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center mb-6">
                  <ShieldCheck
                    size={28}
                    className="text-cyan-400"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Consulta de CNPJ
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Consulte informações cadastrais e atividades
                  relacionadas a empresas.
                </p>

                <div className="flex items-center gap-2 mt-5 text-cyan-400 font-semibold">
                  Acessar
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>

              </a>

              {/* CALCULADORA */}
              <a
                href="/pages/calculadora"
                className="
                  group
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                  hover:bg-white/10
                  hover:border-purple-400/30
                  transition-all
                  duration-300
                "
              >

                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-6">
                  <Calculator
                    size={28}
                    className="text-purple-400"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Calculadora
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Realize cálculos de maneira prática utilizando
                  uma calculadora simples e moderna.
                </p>

                <div className="flex items-center gap-2 mt-5 text-purple-400 font-semibold">
                  Acessar
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>

              </a>

              {/* IMC */}
              <a
                href="/pages/calcula-imc"
                className="
                  group
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                  hover:bg-white/10
                  hover:border-pink-400/30
                  transition-all
                  duration-300
                "
              >

                <div className="w-14 h-14 rounded-2xl bg-pink-500/15 flex items-center justify-center mb-6">
                  <Car
                    size={28}
                    className="text-pink-400"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Calculadora de IMC
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Calcule o índice de massa corporal a partir
                  do seu peso e altura.
                </p>

                <div className="flex items-center gap-2 mt-5 text-pink-400 font-semibold">
                  Acessar
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>

              </a>

              {/* MÉDIA */}
              <a
                href="/pages/calcula-media"
                className="
                  group
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                  hover:bg-white/10
                  hover:border-yellow-400/30
                  transition-all
                  duration-300
                "
              >

                <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 flex items-center justify-center mb-6">
                  <GraduationCap
                    size={28}
                    className="text-yellow-400"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Calculadora de Média
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Adicione suas notas e descubra sua média
                  final de maneira rápida.
                </p>

                <div className="flex items-center gap-2 mt-5 text-yellow-400 font-semibold">
                  Acessar
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>

              </a>

              {/* CONSUMO */}
              <a
                href="/pages/consulta-consumo-veiculo"
                className="
                  group
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                  hover:bg-white/10
                  hover:border-orange-400/30
                  transition-all
                  duration-300
                "
              >

                <div className="w-14 h-14 rounded-2xl bg-orange-500/15 flex items-center justify-center mb-6">
                  <Car
                    size={28}
                    className="text-orange-400"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Consumo de Veículo
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Simule seus gastos com combustível de acordo
                  com sua utilização.
                </p>

                <div className="flex items-center gap-2 mt-5 text-orange-400 font-semibold">
                  Acessar
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>

              </a>

            </div>

          </div>

        </section>

        {/* TECNOLOGIA */}
        <section className="px-6 py-20">

          <div className="max-w-6xl mx-auto">

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-10 md:p-16 shadow-2xl">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <div>

                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center mb-6">
                    <Code2
                      size={28}
                      className="text-emerald-400"
                    />
                  </div>

                  <span className="text-emerald-400 font-semibold uppercase tracking-widest text-sm">
                    Tecnologia
                  </span>

                  <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
                    Uma experiência construída para ser simples.
                  </h2>

                  <p className="text-zinc-400 leading-relaxed mb-5">
                    O Finder utiliza uma interface moderna e responsiva
                    para que as ferramentas possam ser utilizadas em
                    computadores, tablets e smartphones.
                  </p>

                  <p className="text-zinc-400 leading-relaxed">
                    O objetivo é reduzir a complexidade e entregar
                    informações de maneira clara, organizada e rápida.
                  </p>

                </div>

                <div className="relative">

                  <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />

                  <div className="relative bg-linear-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10 rounded-4xl p-8">

                    <div className="space-y-4">

                      <div className="flex items-center gap-4 bg-black/30 rounded-2xl p-5">
                        <Zap className="text-emerald-400" />
                        <div>
                          <h3 className="font-bold">
                            Rápido
                          </h3>
                          <p className="text-sm text-zinc-400">
                            Experiência otimizada
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-black/30 rounded-2xl p-5">
                        <ShieldCheck className="text-cyan-400" />
                        <div>
                          <h3 className="font-bold">
                            Confiável
                          </h3>
                          <p className="text-sm text-zinc-400">
                            Informações organizadas
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-black/30 rounded-2xl p-5">
                        <Sparkles className="text-purple-400" />
                        <div>
                          <h3 className="font-bold">
                            Moderno
                          </h3>
                          <p className="text-sm text-zinc-400">
                            Interface intuitiva
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CTA FINAL */}
        <section className="px-6 py-20">

          <div className="max-w-4xl mx-auto text-center">

            <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto mb-7">
              <Sparkles
                size={30}
                className="text-black"
              />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-5">
              Pronto para experimentar?
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
              Acesse o Finder e utilize nossas ferramentas para
              tornar suas consultas e cálculos muito mais simples.
            </p>

            <a
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                px-8
                py-4
                rounded-2xl
                bg-linear-to-r
                from-emerald-400
                to-cyan-500
                text-black
                font-bold
                hover:scale-[1.03]
                active:scale-[0.98]
                transition-all
                shadow-lg
                shadow-emerald-500/20
              "
            >
              Explorar o Finder
              <ArrowRight size={20} />
            </a>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}