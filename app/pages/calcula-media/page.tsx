"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import {
  GraduationCap,
  Plus,
  Trash2,
  Trophy,
  Calculator,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

export default function CalculaMedia() {
  const [notas, setNotas] = useState<number[]>([0]);
  const [media, setMedia] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (notas.length === 0) {
      toast.error("Adicione pelo menos uma nota.");
      return;
    }

    if (notas.some((nota) => isNaN(nota) || nota < 0 || nota > 10)) {
      toast.error("As notas devem estar entre 0 e 10.");
      return;
    }

    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    const resultado = soma / notas.length;

    setMedia(resultado);

    if (resultado >= 7) {
      setStatus("Aprovado");
    } else if (resultado >= 5) {
      setStatus("Recuperação");
    } else {
      setStatus("Reprovado");
    }

    toast.success("Média calculada com sucesso!");
  }

  const adicionarNota = () => {
    setNotas((prev) => [...prev, 0]);
  };

  const removerNota = (index: number) => {
    if (notas.length <= 1) {
      toast.error("É necessário ter pelo menos uma nota.");
      return;
    }

    setNotas(notas.filter((_, i) => i !== index));
  };

  const limpar = () => {
    setNotas([0]);
    setMedia(null);
    setStatus("");
  };

  const getStatusStyle = () => {
    switch (status) {
      case "Aprovado":
        return {
          text: "text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
        };
      case "Recuperação":
        return {
          text: "text-amber-400",
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
        };
      default:
        return {
          text: "text-rose-400",
          bg: "bg-rose-500/10",
          border: "border-rose-500/20",
        };
    }
  };

  const statusStyle = getStatusStyle();

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
              <GraduationCap size={32} className="text-slate-950" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-2">
              Calculadora de Média
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Adicione quantas notas desejar e descubra sua média final e seu status de aprovação.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* CAMPOS DE NOTAS */}
            <div className="space-y-3">
              {notas.map((nota, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={nota}
                      onChange={(e) => {
                        const novasNotas = [...notas];
                        novasNotas[index] = Number(e.target.value);
                        setNotas(novasNotas);
                      }}
                      placeholder={`Nota ${index + 1}`}
                      className="w-full h-14 rounded-2xl bg-slate-950/80 border border-slate-800 px-5 pr-14 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      #{index + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removerNota(index)}
                    className="w-14 h-14 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                    title="Remover nota"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* BOTAO ADICIONAR NOTA */}
            <button
              type="button"
              onClick={adicionarNota}
              className="w-full h-12 rounded-2xl border border-dashed border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-400 hover:text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
            >
              <Plus size={18} />
              Adicionar Nota
            </button>

            {/* AÇÕES (CALCULAR / LIMPAR) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Calculator size={20} />
                Calcular Média
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
          {media !== null && (
            <section className="mt-10 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                
                {/* ÍCONE DE TROFÉU */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Trophy size={24} className="text-amber-400" />
                  </div>
                </div>

                {/* MÉDIA PRINCIPAL */}
                <div className="text-center mb-6">
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">
                    Média Final
                  </p>

                  <p className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-mono">
                    {media.toFixed(2)}
                  </p>
                </div>

                {/* STATUS DE APROVAÇÃO */}
                <div
                  className={`rounded-2xl border ${statusStyle.border} ${statusStyle.bg} p-4 text-center`}
                >
                  <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                    Status
                  </p>

                  <p className={`text-xl sm:text-2xl font-black ${statusStyle.text}`}>
                    {status}
                  </p>
                </div>

                {/* ESTATÍSTICAS */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Quantidade de Notas
                    </p>
                    <p className="text-2xl font-bold text-slate-200 mt-1 font-mono">
                      {notas.length}
                    </p>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Soma Total
                    </p>
                    <p className="text-2xl font-bold text-slate-200 mt-1 font-mono">
                      {notas.reduce((a, b) => a + b, 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* REGRAS / LEGENDA */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex justify-around text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ≥ 7.0 Aprovado
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    5.0 – 6.9 Recuperação
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    &lt; 5.0 Reprovado
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}