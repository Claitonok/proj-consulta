"use client";

import Footer from "@/app/components/footer";
import { HeaderContact } from "@/app/components/header";
import {
  Search,
  HelpCircle,
  ShieldCheck,
  User,
  ChevronDown,
  Mail,
  BookOpen,
  Sparkles,
  ArrowRight,
  MapPin,
  Calculator,
  Activity,
  GraduationCap,
  Fuel,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Mapeamento dos tópicos solicitados
const topicos = [
  { id: "todos", label: "Todos", icon: HelpCircle },
  { id: "1", label: "Consulta de CEP", icon: MapPin },
  { id: "2", label: "Calculadora", icon: Calculator },
  { id: "3", label: "Calculadora IMC", icon: Activity },
  { id: "4", label: "Calculadora de Média", icon: GraduationCap },
  { id: "5", label: "Consumo de Veículo", icon: Fuel },
];

const faqs = [
  // Tópico 1: Consulta de CEP
  {
    topico: "1",
    pergunta: "Como faço uma consulta de CEP?",
    resposta:
      "Digite o CEP que deseja consultar no campo de pesquisa principal e clique no botão de consulta. O sistema apresentará as informações de endereço, bairro, cidade e estado.",
    data: "20/08/2026",
  },
  {
    topico: "1",
    pergunta: "O que faço se o CEP não for encontrado?",
    resposta:
      "Verifique se digitou os 8 números corretamente, sem traços ou espaços. Se o CEP for muito recente, pode levar um tempo até ser atualizado na base de dados.",
    data: "18/08/2026",
  },

  // Tópico 2: Calculadora
  {
    topico: "2",
    pergunta: "Como funcionam as calculadoras da plataforma?",
    resposta:
      "Nossa plataforma oferece ferramentas para cálculos rápidos do dia a dia. Basta selecionar a calculadora desejada, preencher os valores requeridos e o resultado será gerado instantaneamente.",
    data: "22/08/2026",
  },
  {
    topico: "2",
    pergunta: "Os resultados das calculadoras são salvos no meu histórico?",
    resposta:
      "Os cálculos são processados diretamente no seu navegador. Caso esteja conectado à sua conta, é possível salvar os dados para consultas futuras.",
    data: "15/08/2026",
  },

  // Tópico 3: Calculadora IMC
  {
    topico: "3",
    pergunta: "Como é feito o cálculo do IMC?",
    resposta:
      "O IMC (Índice de Massa Corporal) é calculado dividindo o seu peso (em kg) pela sua altura ao quadrado (em metros). A ferramenta já exibe sua classificação conforme a tabela da OMS.",
    data: "21/08/2026",
  },
  {
    topico: "3",
    pergunta: "A calculadora de IMC substitui uma avaliação médica?",
    resposta:
      "Não. O IMC é apenas um indicador geral e não considera massa muscular ou estrutura óssea. Para uma avaliação detalhada, consulte um profissional de saúde.",
    data: "10/08/2026",
  },

  // Tópico 4: Calculadora de Média
  {
    topico: "4",
    pergunta: "Qual a diferença entre média simples e ponderada?",
    resposta:
      "A média simples soma todos os valores e divide pela quantidade de itens. A média ponderada aplica pesos diferentes para cada valor antes de calcular o resultado final.",
    data: "19/08/2026",
  },
  {
    topico: "4",
    pergunta: "Posso calcular a média de quantas notas/valores?",
    resposta:
      "Você pode adicionar múltiplos campos dinamicamente conforme sua necessidade para realizar o cálculo escolar ou acadêmico.",
    data: "12/08/2026",
  },

  // Tópico 5: Consumo de Veículo
  {
    topico: "5",
    pergunta: "Como calcular o consumo médio de combustível do meu veículo?",
    resposta:
      "Divida a distância percorrida (em km) pela quantidade de litros consumida para abastecer. A nossa calculadora faz essa conta e projeta o custo estimado da viagem.",
    data: "23/08/2026",
  },
  {
    topico: "5",
    pergunta: "Como saber se vale mais a pena abastecer com Álcool ou Gasolina?",
    resposta:
      "Utilize a nossa regra de proporção na calculadora: em geral, se o preço do etanol for até 70% do preço da gasolina, o etanol é a opção mais vantajosa.",
    data: "17/08/2026",
  },
];

const categorias = [
  {
    titulo: "Primeiros passos",
    descricao: "Aprenda a utilizar as principais funcionalidades da plataforma.",
    icon: BookOpen,
  },
  {
    titulo: "Consultas & Ferramentas",
    descricao: "Encontre respostas sobre CEPs, calculadoras e consumo.",
    icon: Search,
  },
  {
    titulo: "Conta e perfil",
    descricao: "Informações sobre sua conta e configurações do usuário.",
    icon: User,
  },
  {
    titulo: "Segurança",
    descricao: "Saiba mais sobre privacidade e segurança dos seus dados.",
    icon: ShieldCheck,
  },
];

export default function Ajuda() {
  const [search, setSearch] = useState("");
  const [topicoAtivo, setTopicoAtivo] = useState("todos");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filtra por texto de pesquisa e pelo tópico selecionado
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.pergunta.toLowerCase().includes(search.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(search.toLowerCase());

    const matchesTopico =
      topicoAtivo === "todos" || faq.topico === topicoAtivo;

    return matchesSearch && matchesTopico;
  });

  function toggleFaq(index: number) {
    setOpenFaq(openFaq === index ? null : index);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-900 text-white flex flex-col">
      <HeaderContact />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* HERO */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Sparkles size={18} />
              Central de ajuda
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Como podemos{" "}
              <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ajudar?
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
              Encontre respostas para suas dúvidas sobre CEP, calculadoras e
              aproveite o melhor da nossa plataforma.
            </p>
          </section>

          {/* CATEGORIAS */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-7">
              <div>
                <span className="text-emerald-400 font-semibold uppercase tracking-widest text-sm">
                  Navegue pela ajuda
                </span>
                <h2 className="text-3xl md:text-4xl font-black mt-2">
                  Encontre o que precisa
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categorias.map((categoria) => {
                const Icon = categoria.icon;

                return (
                  <div
                    key={categoria.titulo}
                    className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:bg-white/10 hover:border-emerald-400/30 hover:-translate-y-1 transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon size={27} className="text-emerald-400" />
                    </div>

                    <h3 className="text-lg font-bold mb-2">
                      {categoria.titulo}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {categoria.descricao}
                    </p>

                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mt-5">
                      Ver informações
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl mb-12">
            <div className="text-center mb-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-5">
                <HelpCircle size={28} className="text-cyan-400" />
              </div>

              <span className="text-cyan-400 font-semibold uppercase tracking-widest text-sm">
                Perguntas frequentes
              </span>

              <h2 className="text-4xl font-black mt-3 mb-4">
                Dúvidas organizadas por tópico
              </h2>

              <p className="text-zinc-400 max-w-2xl mx-auto">
                Selecione um tópico abaixo para filtrar as perguntas mais comuns.
              </p>
            </div>

            {/* BOTÕES DE FILTRO DE TÓPICOS */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {topicos.map((topico) => {
                const Icon = topico.icon;
                const isSelected = topicoAtivo === topico.id;

                return (
                  <button
                    key={topico.id}
                    onClick={() => setTopicoAtivo(topico.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20"
                        : "bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <Icon size={18} />
                    {topico.label}
                  </button>
                );
              })}
            </div>

            {/* LISTA DE FAQS */}
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.pergunta}
                      className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:border-white/20"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between gap-5 p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <HelpCircle
                              size={19}
                              className="text-emerald-400"
                            />
                          </div>

                          <span className="font-semibold">{faq.pergunta}</span>
                        </div>

                        <ChevronDown
                          size={20}
                          className={`text-zinc-500 shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5">
                          <div className="ml-14 pt-1 border-t border-white/5">
                            <p className="text-zinc-400 leading-relaxed pt-4">
                              {faq.resposta}
                            </p>

                            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-4 pt-3 border-t border-white/5">
                              <Calendar size={14} />
                              <span>Atualizado em {faq.data}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10">
                  <Search
                    size={40}
                    className="mx-auto text-zinc-600 mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">
                    Nenhuma dúvida encontrada
                  </h3>
                  <p className="text-zinc-500">
                    Tente selecionar outro tópico ou pesquisar utilizando outras palavras.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CONTACT CTA */}
          <section className="relative overflow-hidden rounded-[40px] border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-cyan-500/5 to-purple-500/10 p-8 md:p-12">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-emerald-400 font-semibold">
                    Ainda precisa de ajuda?
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  Não encontrou sua resposta?
                </h2>

                <p className="text-zinc-400 leading-relaxed">
                  Nossa equipe está pronta para ajudar. Envie uma mensagem
                  contando o que aconteceu e entraremos em contato.
                </p>
              </div>

              <Link
                href="/pages/contact"
                className="shrink-0 h-14 px-7 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-emerald-500/10"
              >
                <Mail size={20} />
                Falar com suporte
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}