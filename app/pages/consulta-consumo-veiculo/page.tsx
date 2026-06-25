"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import {
  Car,
  Fuel,
  Calculator,
  TrendingUp,
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

  function calcularConsumo(e: any) {
    e.preventDefault();

    const km = Number(kmSemana);
    const kmLitro = Number(consumo);
    const preco = Number(precoCombustivel);

    if (
      !km ||
      !kmLitro ||
      !preco
    ) {
      toast.error(
        "Preencha todos os campos"
      );
      return;
    }

    const litrosSemana = km / kmLitro;

    const custoSemanal =
      litrosSemana * preco;

    setResultado({
      semanal: custoSemanal,
      mensal: custoSemanal * 4,
      anual: custoSemanal * 52,
    });

    toast.success(
      "Simulação realizada!"
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">
      <HeaderConsulta />

      <main className="flex-1 flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl p-10">

          {/* HEADER */}
          <div className="text-center mb-10">

            <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Car
                size={40}
                className="text-black"
              />
            </div>

            <h1 className="text-4xl font-black">
              Simulador de Consumo
            </h1>

            <p className="text-zinc-400 mt-3">
              Descubra quanto você gasta
              com combustível.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={calcularConsumo}
            className="space-y-5"
          >

            <div>
              <label className="text-sm text-zinc-300">
                Km rodados por semana
              </label>

              <input
                type="number"
                value={kmSemana}
                onChange={(e) =>
                  setKmSemana(
                    e.target.value
                  )
                }
                placeholder="Ex: 300"
                className="mt-2 w-full rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 py-4 focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">
                Consumo do veículo (km/l)
              </label>

              <input
                type="number"
                value={consumo}
                onChange={(e) =>
                  setConsumo(
                    e.target.value
                  )
                }
                placeholder="Ex: 12"
                className="mt-2 w-full rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 py-4 focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-300">
                Preço combustível
              </label>

              <input
                type="number"
                step="0.01"
                value={precoCombustivel}
                onChange={(e) =>
                  setPrecoCombustivel(
                    e.target.value
                  )
                }
                placeholder="Ex: 6.19"
                className="mt-2 w-full rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 py-4 focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Calculator size={20} />
              Calcular Consumo
            </button>

          </form>

          {/* RESULTADO */}
{resultado && (
  <div className="mt-10">
    <div className="bg-zinc-900/70 border border-zinc-700 rounded-3xl p-8">

      <div className="flex justify-center mb-5">
        <TrendingUp
          size={40}
          className="text-emerald-400"
        />
      </div>

      <h2 className="text-center text-2xl font-bold mb-8">
        Resultado
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-zinc-800 rounded-2xl p-5 text-center">
          <p className="text-zinc-400 text-sm">
            Semanal
          </p>
          <p className="text-2xl font-bold text-emerald-400">
            R$ {resultado.semanal.toFixed(2)}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-5 text-center">
          <p className="text-zinc-400 text-sm">
            Mensal
          </p>
          <p className="text-2xl font-bold text-cyan-400">
            R$ {resultado.mensal.toFixed(2)}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-5 text-center">
          <p className="text-zinc-400 text-sm">
            Anual
          </p>
          <p className="text-2xl font-bold text-yellow-400">
            R$ {resultado.anual.toFixed(2)}
          </p>
        </div>

      </div>

      {/* SHARE */}
      {/* Resultado */}
      <div className="mt-8 pt-6 border-t border-zinc-700">

        <p className="text-center text-zinc-400 mb-4">
          Compartilhe esta simulação
        </p>

        <button
          onClick={async () => {
            if (navigator.share) {
              await navigator.share({
                title: "Simulador de Consumo - Finder",
                text: `Meu gasto estimado com combustível é:
                
Semanal: R$ ${resultado.semanal.toFixed(2)}
Mensal: R$ ${resultado.mensal.toFixed(2)}
Anual: R$ ${resultado.anual.toFixed(2)}`,
                url: window.location.href,
              });
            }
          }}
          className="
            w-full
            py-4
            rounded-2xl
            bg-linear-to-r
            from-emerald-400
            to-cyan-500
            text-black
            font-bold
            hover:scale-[1.02]
            transition-all
          "
        >
          Compartilhar Resultado
        </button>

      </div>

    </div>
  </div>
)}

        </div>

      </main>
    </div>
  );
}