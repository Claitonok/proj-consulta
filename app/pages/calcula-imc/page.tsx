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

  const calcularIMC = (event: any) => {
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
          bg: "bg-emerald-400/10",
          border: "border-emerald-400/20",
        };

      case "Abaixo do peso":
        return {
          text: "text-yellow-400",
          bg: "bg-yellow-400/10",
          border: "border-yellow-400/20",
        };

      case "Sobrepeso":
        return {
          text: "text-orange-400",
          bg: "bg-orange-400/10",
          border: "border-orange-400/20",
        };

      default:
        return {
          text: "text-red-400",
          bg: "bg-red-400/10",
          border: "border-red-400/20",
        };
    }
  };

  const classificationStyle = getClassificacaoStyle();

  const percentualBarra = imc
    ? Math.min(Math.max((imc / 40) * 100, 0), 100)
    : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">
      <HeaderConsulta />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-8 sm:mb-10">

            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full" />

              <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <Activity
                  size={40}
                  className="text-black"
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Calculadora de IMC
            </h1>

            <p className="text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
              Informe seu peso e sua altura para descobrir seu
              Índice de Massa Corporal.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={calcularIMC}
            className="space-y-5"
          >

            {/* PESO */}
            <div>
              <label
                htmlFor="peso"
                className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
              >
                <Scale
                  size={18}
                  className="text-emerald-400"
                />
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
                  className="w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 pr-16 text-white placeholder:text-zinc-600 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  kg
                </span>
              </div>
            </div>

            {/* ALTURA */}
            <div>
              <label
                htmlFor="altura"
                className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
              >
                <Ruler
                  size={18}
                  className="text-cyan-400"
                />
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
                  className="w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 pr-16 text-white placeholder:text-zinc-600 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  m
                </span>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">

              <button
                type="submit"
                className="h-14 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Calculator size={20} />
                Calcular IMC
              </button>

              <button
                type="button"
                onClick={limpar}
                className="h-14 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold flex items-center justify-center gap-2 hover:bg-zinc-700 hover:text-white active:scale-[0.98] transition-all"
              >
                <RotateCcw size={19} />
                Limpar
              </button>

            </div>
          </form>

          {/* RESULTADO */}
          {imc !== null && (
            <section className="mt-10">

              <div className="bg-zinc-900/70 border border-zinc-700 rounded-3xl p-5 sm:p-7 shadow-xl">

                {/* TÍTULO */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <HeartPulse
                    size={22}
                    className="text-emerald-400"
                  />

                  <h2 className="text-xl sm:text-2xl font-bold">
                    Resultado
                  </h2>
                </div>

                {/* IMC PRINCIPAL */}
                <div className="text-center mb-6">

                  <p className="text-sm text-zinc-500 mb-2">
                    Seu IMC
                  </p>

                  <p className="text-5xl sm:text-6xl font-black bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {imc.toFixed(2)}
                  </p>

                </div>

                {/* CLASSIFICAÇÃO */}
                <div
                  className={`rounded-2xl border ${classificationStyle.border} ${classificationStyle.bg} p-5 text-center`}
                >
                  <p className="text-sm text-zinc-500 mb-1">
                    Classificação
                  </p>

                  <p
                    className={`text-xl sm:text-2xl font-black ${classificationStyle.text}`}
                  >
                    {classificacao}
                  </p>
                </div>

                {/* BARRA */}
                <div className="mt-7">

                  <div className="flex justify-between text-xs text-zinc-500 mb-2">
                    <span>Abaixo</span>
                    <span>Normal</span>
                    <span>Sobrepeso</span>
                    <span>Obesidade</span>
                  </div>

                  <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">

                    <div
                      className="absolute inset-y-0 left-0 bg-linear-to-r from-yellow-400 via-emerald-400 to-red-500 rounded-full transition-all duration-700"
                      style={{
                        width: `${percentualBarra}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between text-xs text-zinc-600 mt-2">
                    <span>18.5</span>
                    <span>24.9</span>
                    <span>29.9</span>
                    <span>40+</span>
                  </div>

                </div>

                {/* TABELA DE REFERÊNCIA */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">

                  <div className="bg-zinc-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mb-2" />

                    <p className="text-xs text-zinc-500">
                      Abaixo
                    </p>

                    <p className="text-sm font-semibold text-zinc-300 mt-1">
                      &lt; 18.5
                    </p>
                  </div>

                  <div className="bg-zinc-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto mb-2" />

                    <p className="text-xs text-zinc-500">
                      Normal
                    </p>

                    <p className="text-sm font-semibold text-zinc-300 mt-1">
                      18.5–24.9
                    </p>
                  </div>

                  <div className="bg-zinc-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mx-auto mb-2" />

                    <p className="text-xs text-zinc-500">
                      Sobrepeso
                    </p>

                    <p className="text-sm font-semibold text-zinc-300 mt-1">
                      25–29.9
                    </p>
                  </div>

                  <div className="bg-zinc-800/80 rounded-2xl p-4 text-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mx-auto mb-2" />

                    <p className="text-xs text-zinc-500">
                      Obesidade
                    </p>

                    <p className="text-sm font-semibold text-zinc-300 mt-1">
                      ≥ 30
                    </p>
                  </div>

                </div>

                {/* AVISO */}
                <div className="mt-6 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700">
                  <p className="text-xs sm:text-sm text-zinc-500 text-center leading-relaxed">
                    O IMC é uma estimativa e não substitui uma
                    avaliação profissional. Para uma análise
                    completa da sua saúde, procure um profissional
                    qualificado.
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