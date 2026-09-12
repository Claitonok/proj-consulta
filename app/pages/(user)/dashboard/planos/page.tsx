"use client";

import { useState } from "react";
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Plus,
  X,
  Lock,
  Crown,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Cartao {
  ultimosDigitos: string;
  validade: string;
  bandeira: string;
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

export default function PlanosPage() {
  const [planoAtual, setPlanoAtual] = useState<string>("Ouro");
  const [showCardModal, setShowCardModal] = useState(false);
  const [cartaoAtivo, setCartaoAtivo] = useState<Cartao | null>({
    ultimosDigitos: "4242",
    validade: "12/28",
    bandeira: "Visa",
  });

  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSalvarCartao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroCartao || !nomeCartao || !validade || !cvv) {
      toast.error("Preencha todos os campos do cartão");
      return;
    }

    const ultimos = numeroCartao.replace(/\D/g, "").slice(-4) || "8888";
    setCartaoAtivo({
      ultimosDigitos: ultimos,
      validade,
      bandeira: "Mastercard",
    });

    toast.success("Cartão de crédito salvo com sucesso!");
    setShowCardModal(false);
    setNumeroCartao("");
    setNomeCartao("");
    setValidade("");
    setCvv("");
  };

  const handleSelecionarPlano = (nomePlano: string) => {
    if (nomePlano === planoAtual) {
      toast.info("Você já está utilizando este plano.");
      return;
    }

    if (nomePlano === "Diamante") {
      const phone = "5511999999999";
      const message = encodeURIComponent(
        "Olá! Tenho interesse no Plano Diamante e gostaria de uma cotação personalizada."
      );
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
      return;
    }

    if (!cartaoAtivo && nomePlano !== "Grátis") {
      toast.error("Adicione um cartão de crédito para assinar um plano pago.");
      setShowCardModal(true);
      return;
    }

    setPlanoAtual(nomePlano);
    toast.success(`Plano alterado para ${nomePlano} com sucesso!`);
  };

  return (
    <div className="space-y-10 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">
          Meus Planos & Assinatura
        </h1>
        <p className="text-slate-400 text-sm">
          Gerencie sua assinatura ativa e altere seu plano conforme a necessidade do seu negócio.
        </p>
      </div>

      {/* PAINEL SUPERIOR: PLANO ATIVO & CARTÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <Zap size={24} />
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Plano Ativo
                </span>
                <h2 className="text-xl font-bold text-slate-100">
                  Plano {planoAtual}
                </h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              Status: Ativo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400">Consultas/Minuto</p>
              <p className="text-xl font-bold text-slate-100">
                {PLANOS.find((p) => p.nome === planoAtual)?.consultasMinuto} req/min
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400">Consultas Base de Dados</p>
              <p className="text-xl font-bold text-slate-100">
                {PLANOS.find((p) => p.nome === planoAtual)?.consultasMesBase} / mês
              </p>
            </div>
          </div>
        </div>

        {/* CARTÃO DE CRÉDITO */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-100 font-bold text-base">
              <CreditCard size={20} className="text-emerald-400" />
              <span>Cartão Cadastrado</span>
            </div>

            {cartaoAtivo ? (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{cartaoAtivo.bandeira}</span>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>
                <p className="text-lg font-mono font-bold text-slate-200">
                  •••• •••• •••• {cartaoAtivo.ultimosDigitos}
                </p>
                <p className="text-xs text-slate-400">
                  Validade: {cartaoAtivo.validade}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Nenhum cartão cadastrado para cobrança.
              </p>
            )}
          </div>

          <button
            onClick={() => setShowCardModal(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>{cartaoAtivo ? "Alterar Cartão" : "Adicionar Cartão"}</span>
          </button>
        </div>
      </div>

      {/* SEÇÃO DE ESCOLHA DE PLANOS */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Trocar de Plano</h2>
          <p className="text-xs text-slate-400">
            Selecione o plano ideal para suas requisições. A cobrança é atualizada no próximo ciclo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLANOS.map((plano) => {
            const isAtual = plano.nome === planoAtual;

            return (
              <div
                key={plano.nome}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isAtual
                    ? "bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10"
                    : "bg-slate-900/50 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {plano.popular && !isAtual && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full flex items-center gap-1">
                    <Crown size={12} />
                    <span>MAIS ESCOLHIDO</span>
                  </div>
                )}

                {isAtual && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                    PLANO ATUAL
                  </div>
                )}

                <div>
                  <div className="text-center mt-2 mb-6">
                    <h3 className="text-lg font-medium text-slate-300 mb-3">
                      {plano.nome}
                    </h3>

                    <div className="flex items-baseline justify-center gap-1">
                      {plano.preco !== "Consulte" ? (
                        <>
                          <span className="text-xs text-slate-400">R$</span>
                          <span className="text-3xl font-extrabold text-slate-100">
                            {plano.preco}
                          </span>
                          <span className="text-xs text-slate-500">/mês</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-slate-100">
                          Consulte
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelecionarPlano(plano.nome)}
                    disabled={isAtual}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all mb-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      isAtual
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white hover:bg-slate-200 text-slate-950"
                    }`}
                  >
                    {isAtual
                      ? "Plano em uso"
                      : plano.nome === "Diamante"
                      ? "Falar com vendas"
                      : "Selecionar Plano"}
                  </button>

                  <div className="space-y-3 text-left border-t border-slate-800/80 pt-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-100">
                        {plano.consultasMinuto}
                      </span>{" "}
                      <span className="text-slate-400">consultas / min</span>
                    </div>

                    <div>
                      <span className="font-bold text-slate-100">
                        {plano.consultasMesBase}
                      </span>{" "}
                      <span className="text-slate-400">consultas base/mês</span>
                    </div>

                    <div>
                      <span className="font-bold text-slate-100">
                        {plano.consultasMesTempoReal}
                      </span>{" "}
                      <span className="text-slate-400">consultas tempo real</span>
                    </div>

                    {plano.extras && (
                      <div className="space-y-1 border-t border-slate-800/80 pt-3">
                        {plano.extras.map((extra) => (
                          <div
                            key={extra}
                            className="flex items-center gap-1.5 text-rose-400 font-medium"
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
            );
          })}
        </div>
      </div>

      {/* MODAL ADICIONAR CARTÃO */}
      {showCardModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowCardModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-100 p-2 rounded-full hover:bg-slate-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <Lock size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100">
                  Cartão de Crédito
                </h2>
                <p className="text-xs text-slate-400">
                  Insira seus dados para renovação do plano
                </p>
              </div>
            </div>

            <form onSubmit={handleSalvarCartao} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  maxLength={19}
                  placeholder="0000 0000 0000 0000"
                  value={numeroCartao}
                  onChange={(e) => setNumeroCartao(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-emerald-500/60 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">
                  Nome impresso no cartão
                </label>
                <input
                  type="text"
                  placeholder="NOME COMO NO CARTAO"
                  value={nomeCartao}
                  onChange={(e) => setNomeCartao(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-emerald-500/60 outline-none uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">
                    Validade
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="MM/AA"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-emerald-500/60 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">
                    CVV
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-emerald-500/60 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl py-3 text-xs transition-all cursor-pointer"
              >
                Salvar Cartão
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}