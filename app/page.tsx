"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Header from "./components/header";
import Footer from "./components/footer";
import {
  MapPin,
  Search,
  X,
  Building2,
  Map,
  Navigation,
  UserCheck,
  ArrowRight,
  Crown,
  Check,
  Zap,
} from "lucide-react";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface Plano {
  nome: string;
  preco: string;
  destaque?: boolean;
  popular?: boolean;
  consultasMinuto: string;
  consultasMesBase: string;
  consultasMesTempoReal: string;
  extras?: string[];
}

const PLANOS: Plano[] = [
  {
    nome: "Grátis",
    preco: "0",
    consultasMinuto: "3",
    consultasMesBase: "130.000",
    consultasMesTempoReal: "0",
  },
  {
    nome: "Bronze",
    preco: "149",
    consultasMinuto: "10",
    consultasMesBase: "150.000",
    consultasMesTempoReal: "0",
  },
  {
    nome: "Prata",
    preco: "249",
    consultasMinuto: "20",
    consultasMesBase: "300.000",
    consultasMesTempoReal: "15.000",
  },
  {
    nome: "Ouro",
    preco: "349",
    popular: true,
    destaque: true,
    consultasMinuto: "50",
    consultasMesBase: "600.000",
    consultasMesTempoReal: "30.000",
  },
  {
    nome: "Esmeralda",
    preco: "699",
    consultasMinuto: "100",
    consultasMesBase: "900.000",
    consultasMesTempoReal: "50.000",
  },
  {
    nome: "Diamante",
    preco: "Consulte",
    consultasMinuto: "Ilimitadas",
    consultasMesBase: "1.200.000+",
    consultasMesTempoReal: "60.000+",
    extras: ["Filas exclusivas", "Suporte Prioritário"],
  },
];

export default function Home() {
  const router = useRouter();

  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cepData, setCepData] = useState<CepData | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Referências para rolagem suave
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const plansSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatCep = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    return value.slice(0, 9);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!cep) {
      toast.error("Informe um CEP");
      return;
    }

    try {
      setLoading(true);
      const cleanCep = cep.replace(/\D/g, "");

      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      setCepData(data);
      setShowModal(true);

      toast.success("CEP encontrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao buscar CEP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Luzes de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-75 h-75 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Header />

      <main className="flex-1 flex flex-col items-center px-6 py-12 relative z-10 gap-16">
        {/* BANNER SE O USUÁRIO ESTIVER LOGADO */}
        {isAuthenticated && (
          <div className="w-full max-w-xl bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between backdrop-blur-xl shadow-lg shadow-emerald-500/5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Sessão Ativa
                </p>
                <p className="text-xs text-slate-400">
                  Você está autenticado no sistema.
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push("/pages/dashboard")}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl font-semibold text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <span>Área do Usuário</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* CARD CONSULTA DE CEP */}
        <div
          ref={searchSectionRef}
          className="w-full max-w-xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10 scroll-mt-24"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <MapPin size={32} className="text-slate-950" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">
              Consulta de CEP
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
              Digite o CEP abaixo para obter instantaneamente o endereço completo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cep"
                className="text-xs font-semibold text-slate-300 tracking-wide uppercase ml-1"
              >
                Código Postal (CEP)
              </label>

              <div className="relative flex items-center">
                <Search
                  size={20}
                  className="absolute left-4 text-slate-500 pointer-events-none"
                />
                <input
                  id="cep"
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(formatCep(e.target.value))}
                  placeholder="00000-000"
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-12 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all font-mono tracking-wider text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold rounded-xl py-3.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <span>Consultando...</span> : <span>Consultar CEP</span>}
            </button>
          </form>
        </div>

        {/* BOTÕES DE NAVEGAÇÃO RÁPIDA (Hero Action Buttons) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection(searchSectionRef)}
            className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Zap size={18} />
            <span>Testar API agora</span>
          </button>

          <button
            onClick={() => scrollToSection(plansSectionRef)}
            className="bg-white hover:bg-slate-200 text-slate-950 font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-md cursor-pointer"
          >
            Ver planos
          </button>
        </div>

        {/* SEÇÃO DE PLANOS DE AUTOMAÇÃO */}
        <section
          ref={plansSectionRef}
          className="w-full max-w-7xl pt-10 pb-16 scroll-mt-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-slate-100 mb-3">
              Conheça nossos planos
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Escolha o plano ideal para seu negócio e comece hoje mesmo
            </p>
          </div>

          {/* GRID DE PLANOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
            {PLANOS.map((plano) => (
              <div
                key={plano.nome}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  plano.destaque
                    ? "bg-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105 z-20"
                    : "bg-slate-900/50 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* SELO DE DESTAQUE */}
                {plano.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full flex items-center gap-1">
                    <Crown size={12} />
                    <span>MAIS ESCOLHIDO</span>
                  </div>
                )}

                <div>
                  {/* TÍTULO & PREÇO */}
                  <div className="text-center mt-2 mb-6">
                    <h3 className="text-lg font-medium text-slate-300 mb-3">
                      {plano.nome}
                    </h3>

                    <div className="flex items-baseline justify-center gap-1">
                      {plano.preco !== "Consulte" ? (
                        <>
                          <span className="text-xs text-slate-400">R$</span>
                          <span className="text-4xl font-extrabold text-slate-100">
                            {plano.preco}
                          </span>
                          <span className="text-xs text-slate-500">/mês</span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-slate-100">
                          Consulte
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BOTAO DE AÇÃO DO CARD */}
                  <button
                    onClick={() => router.push("/register")}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all mb-8 cursor-pointer ${
                      plano.destaque
                        ? "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-500/20"
                        : "bg-white hover:bg-slate-200 text-slate-950"
                    }`}
                  >
                    {plano.nome === "Grátis"
                      ? "Teste grátis"
                      : plano.nome === "Diamante"
                      ? "Fale conosco!"
                      : "Assine agora!"}
                  </button>

                  {plano.destaque && (
                    <p className="text-[11px] text-emerald-400 text-center font-medium -mt-5 mb-6">
                      Melhor custo-benefício
                    </p>
                  )}

                  {/* ESPECIFICAÇÕES TÉCNICAS */}
                  <div className="space-y-5 text-left border-t border-slate-800/80 pt-6">
                    <div>
                      <p className="text-xl font-bold text-slate-100">
                        {plano.consultasMinuto}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Consultas por minuto
                      </p>
                    </div>

                    <div>
                      <p className="text-xl font-bold text-slate-100">
                        {plano.consultasMesBase}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Consultas por mês da base de dados
                      </p>
                    </div>

                    <div>
                      <p className="text-xl font-bold text-slate-100">
                        {plano.consultasMesTempoReal}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Consultas por mês em tempo real
                      </p>
                    </div>

                    {/* RECURSOS EXTRAS */}
                    {plano.extras && (
                      <div className="space-y-2 border-t border-slate-800/80 pt-4">
                        {plano.extras.map((extra) => (
                          <div
                            key={extra}
                            className="flex items-center gap-1.5 text-rose-400 text-[11px] font-medium"
                          >
                            <Check size={12} />
                            <span>{extra}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* MODAL DE RESULTADO DO CEP */}
      {showModal && cepData && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-100 p-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <MapPin size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">
                  Endereço Encontrado
                </h2>
                <p className="text-xs text-slate-400 font-mono">{cepData.cep}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
                  <Navigation size={16} className="text-emerald-400" />
                  <span>Logradouro</span>
                </div>
                <span className="text-sm font-medium text-slate-200 text-right">
                  {cepData.logradouro || "Não informado"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
                  <Building2 size={16} className="text-emerald-400" />
                  <span>Bairro</span>
                </div>
                <span className="text-sm font-medium text-slate-200 text-right">
                  {cepData.bairro || "Não informado"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
                  <Map size={16} className="text-emerald-400" />
                  <span>Cidade / UF</span>
                </div>
                <span className="text-sm font-medium text-slate-200 text-right">
                  {cepData.localidade} / {cepData.uf}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors rounded-xl py-3 text-sm font-medium cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}