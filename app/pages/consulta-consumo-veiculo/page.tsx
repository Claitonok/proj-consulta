"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import {
  Car,
  Fuel,
  Calculator,
  TrendingUp,
  Share2,
  RotateCcw,
  Gauge,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

export default function ConsultaConsumoVeiculo() {
  const [kmSemana, setKmSemana] = useState("");
  const [consumo, setConsumo] = useState("");
  const [precoCombustivel, setPrecoCombustivel] = useState("");

  const [resultado, setResultado] = useState<{
    semanal: number;
    mensal: number;
    anual: number;
  } | null>(null);

  function calcularConsumo(e: React.FormEvent) {
    e.preventDefault();

    const km = Number(kmSemana);
    const kmLitro = Number(consumo);
    const preco = Number(precoCombustivel);

    if (!km || !kmLitro || !preco) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    if (km <= 0 || kmLitro <= 0 || preco <= 0) {
      toast.error("Informe valores maiores que zero.");
      return;
    }

    const litrosSemana = km / kmLitro;
    const custoSemanal = litrosSemana * preco;

    setResultado({
      semanal: custoSemanal,
      mensal: custoSemanal * 4,
      anual: custoSemanal * 52,
    });

    toast.success("Simulação realizada com sucesso!");
  }

  const limpar = () => {
    setKmSemana("");
    setConsumo("");
    setPrecoCombustivel("");
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Glows de fundo estilo Neon/Glass */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <HeaderConsulta />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16 relative z-10">
        <div className="w-full max-w-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
          
          {/* HEADER */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Car size={32} className="text-slate-950" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-2">
              Simulador de Consumo
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Descubra quanto você gasta semanalmente, mensalmente e anualmente com combustível.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={calcularConsumo} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Gauge size={14} className="text-emerald-400" />
                Km rodados por semana
              </label>
              <input
                type="number"
                step="any"
                value={kmSemana}
                onChange={(e) => setKmSemana(e.target.value)}
                placeholder="Ex: 300"
                className="w-full h-14 rounded-2xl bg-slate-950/80 border border-slate-800 px-5 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Fuel size={14} className="text-emerald-400" />
                Consumo do veículo (km/l)
              </label>
              <input
                type="number"
                step="any"
                value={consumo}
                onChange={(e) => setConsumo(e.target.value)}
                placeholder="Ex: 12"
                className="w-full h-14 rounded-2xl bg-slate-950/80 border border-slate-800 px-5 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <DollarSign size={14} className="text-emerald-400" />
                Preço do combustível (R$/litro)
              </label>
              <input
                type="number"
                step="0.01"
                value={precoCombustivel}
                onChange={(e) => setPrecoCombustivel(e.target.value)}
                placeholder="Ex: 6.19"
                className="w-full h-14 rounded-2xl bg-slate-950/80 border border-slate-800 px-5 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            {/* AÇÕES (CALCULAR / LIMPAR) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Calculator size={20} />
                Calcular Consumo
              </button>

              <button
                type="button"
                onClick={limpar}
                className="h-14 rounded-2xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <RotateCcw size={19} />
                Limpar
              </button>
            </div>
          </form>

          {/* RESULTADO */}
          {resultado && (
            <section className="mt-10 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                
                {/* ÍCONE DE TENDÊNCIA */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp size={24} className="text-emerald-400" />
                  </div>
                </div>

                <h2 className="text-center text-xl font-bold text-slate-100 mb-6">
                  Estimativa de Gastos
                </h2>

                {/* CARDS DE ESTIMATIVA */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                      Semanal
                    </p>
                    <p className="text-2xl font-bold text-emerald-400 font-mono">
                      R$ {resultado.semanal.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                      Mensal
                    </p>
                    <p className="text-2xl font-bold text-teal-400 font-mono">
                      R$ {resultado.mensal.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                      Anual
                    </p>
                    <p className="text-2xl font-bold text-amber-400 font-mono">
                      R$ {resultado.anual.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* COMPARTILHAR */}
                <div className="mt-8 pt-6 border-t border-slate-800/80">
                  <p className="text-center text-xs text-slate-400 uppercase tracking-wider font-semibold mb-4">
                    Compartilhe esta simulação
                  </p>

                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: "Simulador de Consumo",
                            text: `Meu gasto estimado com combustível é:\n\nSemanal: R$ ${resultado.semanal.toFixed(
                              2
                            )}\nMensal: R$ ${resultado.mensal.toFixed(
                              2
                            )}\nAnual: R$ ${resultado.anual.toFixed(2)}`,
                            url: window.location.href,
                          });
                        } catch (err) {
                          // Usuário cancelou o compartilhamento
                        }
                      } else {
                        navigator.clipboard.writeText(
                          `Meu gasto estimado com combustível:\nSemanal: R$ ${resultado.semanal.toFixed(
                            2
                          )}\nMensal: R$ ${resultado.mensal.toFixed(
                            2
                          )}\nAnual: R$ ${resultado.anual.toFixed(2)}`
                        );
                        toast.success("Resultado copiado para a área de transferência!");
                      }
                    }}
                    className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <Share2 size={19} className="text-emerald-400" />
                    Compartilhar Resultado
                  </button>
                </div>

              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}