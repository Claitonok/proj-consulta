"use client";

import { HeaderConsulta } from "@/app/components/header";
import { useState } from "react";
import { Scale, Ruler, Activity } from "lucide-react";
import { toast } from "sonner";


export default function CalculaIMC() {

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState("");

    const formatPeso = (value: string) => {
      return value.replace(/[^0-9.]/g, "");
    };
    const formatAltura = (value: string) => {
      return value.replace(/[^0-9.]/g, "");
    };

    const calcularIMC = () => {
        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);

        if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum === 0) {
            toast.error("Informe peso e altura válidos");
            return;
        }
        
        const imcCalculado = pesoNum / (alturaNum * alturaNum);
        setImc(imcCalculado);
        
        if (imcCalculado < 18.5) {
            setClassificacao("Abaixo do peso");
        } else if (imcCalculado < 24.9) {
            setClassificacao("Peso normal");
        } else if (imcCalculado < 29.9) {
            setClassificacao("Sobrepeso");
        } else {
            setClassificacao("Obesidade");
        }
    };

    return (
  <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">
    <HeaderConsulta />

    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl p-8 md:p-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Activity size={38} className="text-black" />
          </div>

          <h1 className="text-4xl font-black">
            Calculadora de IMC
          </h1>

          <p className="text-zinc-400 mt-3">
            Descubra rapidamente seu Índice de Massa Corporal.
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          <div>
            <label
              htmlFor="peso"
              className="flex items-center gap-2 text-zinc-300 mb-2"
            >
              <Scale size={18} />
              Peso (kg)
            </label>

            <input
              id="peso"
              type="text"
              value={peso}
              onChange={(e) =>
                setPeso(formatPeso(e.target.value))
              }
              placeholder="Ex: 75"
              className="w-full h-14 rounded-2xl bg-zinc-800 border border-zinc-700 px-5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label
              htmlFor="altura"
              className="flex items-center gap-2 text-zinc-300 mb-2"
            >
              <Ruler size={18} />
              Altura (m)
            </label>

            <input
              id="altura"
              type="text"
              value={altura}
              onChange={(e) =>
                setAltura(formatAltura(e.target.value))
              }
              placeholder="Ex: 1.75"
              className="w-full h-14 rounded-2xl bg-zinc-800 border border-zinc-700 px-5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            onClick={calcularIMC}
            className="w-full h-14 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold hover:scale-[1.02] transition-all duration-300"
          >
            Calcular IMC
          </button>
        </div>

        {/* RESULTADO */}
        {imc !== null && (
          <div className="mt-8">

            <div className="bg-zinc-800/80 border border-zinc-700 rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-5 text-center">
                Resultado
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-zinc-900 rounded-2xl p-5 text-center">
                  <p className="text-zinc-400 text-sm">
                    Seu IMC
                  </p>

                  <p className="text-4xl font-black text-emerald-400">
                    {imc.toFixed(2)}
                  </p>
                </div>

                <div className="bg-zinc-900 rounded-2xl p-5 text-center">
                  <p className="text-zinc-400 text-sm">
                    Classificação
                  </p>

                  <p
                    className={`text-xl font-bold ${
                      classificacao === "Peso normal"
                        ? "text-emerald-400"
                        : classificacao === "Abaixo do peso"
                        ? "text-yellow-400"
                        : classificacao === "Sobrepeso"
                        ? "text-orange-400"
                        : "text-red-400"
                    }`}
                  >
                    {classificacao}
                  </p>
                </div>

              </div>

              {/* Barra visual */}
              <div className="mt-6">
                <div className="h-3 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-yellow-400 via-emerald-400 to-red-500"
                    style={{
                      width: `${Math.min(
                        (imc / 40) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>18.5</span>
                  <span>24.9</span>
                  <span>29.9</span>
                  <span>40+</span>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </main>
  </div>
);
}