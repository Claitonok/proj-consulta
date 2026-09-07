"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import {
  Activity,
  Scale,
  Ruler,
  Calculator,
  RotateCcw,
  HeartPulse,
} from "lucide-react";
import { toast } from "sonner";

export default function CalculaIMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState("");

  const formatNumero = (value: string) => {
    return value
      .replace(",", ".")
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  const calcularIMC = (event: React.FormEvent) => {
    event.preventDefault();

    const pesoNum = parseFloat(peso.replace(",", "."));
    const alturaNum = parseFloat(altura.replace(",", "."));

    if (
      isNaN(pesoNum) ||
      isNaN(alturaNum) ||
      pesoNum <= 0 ||
      alturaNum <= 0
    ) {
      toast.error("Informe peso e altura válidos.");
      return;
    }

    if (pesoNum > 500) {
      toast.error("Informe um peso válido.");
      return;
    }

    if (alturaNum < 0.5 || alturaNum > 2.5) {
      toast.error("Informe uma altura válida em metros.");
      return;
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum);

    setImc(imcCalculado);

    if (imcCalculado < 18.5) {
      setClassificacao("Abaixo do peso");
    } else if (imcCalculado < 25) {
      setClassificacao("Peso normal");
    } else if (imcCalculado < 30) {
      setClassificacao("Sobrepeso");
    } else {
      setClassificacao("Obesidade");
    }

    toast.success("IMC calculado com sucesso!");
  };

  const limpar = () => {
    setPeso("");
    setAltura("");
    setImc(null);
    setClassificacao("");
  };

  const getClassificacaoStyle = () => {
    switch (classificacao) {
      case "Peso normal":
        return {
          text: "text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
        };

      case "Abaixo do peso":
        return {
          text: "text-amber-400",
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
        };

      case "Sobrepeso":
        return {
          text: "text-orange-400",
          bg: "bg-orange-500/10",
          border: "border-orange-500/20",
        };

      default:
        return {
          text: "text-rose-400",
          bg: "bg-rose-500/10",
          border: "border-rose-500/20",
        };
    }
  };

  const classificationStyle = getClassificacaoStyle();

  const percentualBarra = imc
    ? Math.min(Math.max((imc / 40) * 100, 0), 100)
    : 0;

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
              <Activity size={32} className="text-slate-950" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-2">
              Calculadora de IMC
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Informe seu peso e sua altura para descobrir seu Índice de Massa Corporal.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={calcularIMC} className="space-y-6">
            
            {/* PESO */}
            <div>
              <label
                htmlFor="peso"
                className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2"
              >
                <Scale size={18} className="text-emerald-400" />
                Peso
              </label>

              <div className="relative">
                <input
                  id="peso"
                  type="text"
                  inputMode="decimal"
                  value={peso}
                  onChange={(e) =>
                    setPeso(formatNumero(e.target.value))
                  }
                  placeholder="Ex: 75"
                  className="w-full h-14 rounded-2xl bg-slate-950/80 border border-slate-800 px-5 pr-16 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">
                  kg
                </span>
              </div>
            </div>

            {/* ALTURA */}
            <div>
              <label
                htmlFor="altura"
                className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2"
              >
                <Ruler size={18} className="text-cyan-400" />
                Altura
              </label>

              <div className="relative">
                <input
                  id="altura"
                  type="text"
                  inputMode="decimal"
                  value={altura}
                  onChange={(e) =>
                    setAltura(formatNumero(e.target.value))
                  }
                  placeholder="Ex: 1.75"
                  className="w-full h-14 rounded-2xl bg-slate-950/80 border border-slate-800 px-5 pr-16 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">
                  m
                </span>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Calculator size={20} />
                Calcular IMC
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
          {imc !== null && (
            <section className="mt-10">
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                
                {/* TÍTULO */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <HeartPulse size={22} className="text-emerald-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                    Resultado
                  </h2>
                </div>

                {/* IMC PRINCIPAL */}
                <div className="text-center mb-6">
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">
                    Seu IMC
                  </p>

                  <p className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    {imc.toFixed(2)}
                  </p>
                </div>

                {/* CLASSIFICAÇÃO */}
                <div
                  className={`rounded-2xl border ${classificationStyle.border} ${classificationStyle.bg} p-5 text-center`}
                >
                  <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                    Classificação
                  </p>

                  <p
                    className={`text-xl sm:text-2xl font-black ${classificationStyle.text}`}
                  >
                    {classificacao}
                  </p>
                </div>

                {/* BARRA */}
                <div className="mt-8">
                  <div className="flex justify-between text-xs text-slate-400 font-medium mb-2">
                    <span>Abaixo</span>
                    <span>Normal</span>
                    <span>Sobrepeso</span>
                    <span>Obesidade</span>
                  </div>

                  <div className="relative h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-emerald-400 to-rose-500 rounded-full transition-all duration-700"
                      style={{
                        width: `${percentualBarra}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
                    <span>18.5</span>
                    <span>24.9</span>
                    <span>29.9</span>
                    <span>40+</span>
                  </div>
                </div>

                {/* TABELA DE REFERÊNCIA */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Abaixo</p>
                    <p className="text-sm font-semibold text-slate-200 mt-1 font-mono">
                      &lt; 18.5
                    </p>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Normal</p>
                    <p className="text-sm font-semibold text-slate-200 mt-1 font-mono">
                      18.5–24.9
                    </p>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Sobrepeso</p>
                    <p className="text-sm font-semibold text-slate-200 mt-1 font-mono">
                      25–29.9
                    </p>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Obesidade</p>
                    <p className="text-sm font-semibold text-slate-200 mt-1 font-mono">
                      ≥ 30
                    </p>
                  </div>
                </div>

                {/* AVISO */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <p className="text-xs text-slate-400 text-center leading-relaxed">
                    O IMC é uma estimativa e não substitui uma avaliação profissional. Para uma análise completa da sua saúde, procure um profissional qualificado.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}