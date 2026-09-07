"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import { Calculator as CalculatorIcon, Delete } from "lucide-react";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const handleClick = (value: string) => {
    if (value === "C") {
      setDisplay("");
      return;
    }

    if (value === "←") {
      setDisplay((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      try {
        let expression = display
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
          .replace(/π/g, "Math.PI")
          .replace(/e/g, "Math.E")
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/log\(/g, "Math.log10(")
          .replace(/ln\(/g, "Math.log(")
          .replace(/√\(/g, "Math.sqrt(")
          .replace(/\^/g, "**");

        // Avaliação segura da expressão matemática
        const result = Function(`"use strict"; return (${expression})`)();
        
        // Trata resultados decimais extensos
        const formattedResult = Number.isInteger(result)
          ? String(result)
          : String(Number(result.toFixed(8)));

        setDisplay(formattedResult);
      } catch {
        setDisplay("Erro");
      }
      return;
    }

    if (display === "Erro") {
      setDisplay(value);
      return;
    }

    setDisplay((prev) => prev + value);
  };

  // Botões Científicos + Numéricos (Grid 5 colunas)
  const buttons = [
    "sin(", "cos(", "tan(", "C", "←",
    "log(", "ln(", "√(", "(", ")",
    "^", "π", "e", "÷", "×",
    "7", "8", "9", "−", "+",
    "4", "5", "6", "0", ".",
    "1", "2", "3", "=", ""
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Glows de fundo estilo Neon/Glass */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <HeaderConsulta />

      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
          
          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CalculatorIcon size={28} className="text-slate-950" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-100 mb-1">
              Calculadora Científica
            </h1>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
              Realize cálculos avançados, trigonométricos e logarítmicos.
            </p>
          </div>

          {/* DISPLAY */}
          <div className="mb-6">
            <div className="h-20 rounded-2xl bg-slate-950/80 border border-slate-800 px-5 flex items-center justify-end text-slate-100 text-2xl sm:text-3xl font-bold font-mono tracking-wider overflow-x-auto custom-scrollbar shadow-inner">
              {display || "0"}
            </div>
          </div>

          {/* GRID DE BOTÕES (5 Colunas) */}
          <div className="grid grid-cols-5 gap-2.5">
            {buttons.map((btn, idx) => {
              if (btn === "") return <div key={idx} className="hidden sm:block" />;

              let style =
                "bg-slate-950/60 hover:bg-slate-800 border-slate-800/80 text-slate-200 hover:text-slate-100";

              // Estilização das funções científicas
              if (
                ["sin(", "cos(", "tan(", "log(", "ln(", "√(", "^", "π", "e", "(", ")"].includes(btn)
              ) {
                style =
                  "bg-slate-900/90 border-slate-700/60 text-teal-400 hover:bg-slate-800 hover:text-teal-300 font-mono text-sm";
              }

              // Estilização do Botão Limpar
              if (btn === "C") {
                style =
                  "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300";
              }

              // Estilização das Operações Básicas
              if (["÷", "×", "−", "+"].includes(btn)) {
                style =
                  "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 font-bold";
              }

              // Estilização do Botão Igual
              if (btn === "=") {
                style =
                  "col-span-2 sm:col-span-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 border-none";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleClick(btn)}
                  className={`
                    h-12
                    rounded-xl
                    text-base
                    font-medium
                    border
                    transition-all
                    duration-200
                    active:scale-95
                    cursor-pointer
                    flex
                    items-center
                    justify-center
                    ${style}
                  `}
                >
                  {btn === "←" ? <Delete size={18} /> : btn}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}