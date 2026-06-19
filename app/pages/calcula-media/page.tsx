"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import {
    GraduationCap,
    Plus,
    Trash2,
    Trophy,
} from "lucide-react";
import { toast } from "sonner";

export default function CalculaMedia() {
    const [notas, setNotas] = useState<number[]>([0]);
    const [media, setMedia] = useState<number | null>(null);
    const [status, setStatus] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();

        if (notas.length === 0) {
            toast.error("Adicione pelo menos uma nota");
            return;
        }

        if (notas.some((nota) => nota < 0 || nota > 10)) {
            toast.error("As notas devem estar entre 0 e 10");
            return;
        }

        const soma = notas.reduce(
            (acc, nota) => acc + nota,
            0
        );

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
            toast.error(
                "É necessário pelo menos uma nota"
            );
            return;
        }

        setNotas(
            notas.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">
            <HeaderConsulta />

            <main className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl p-10">

                    {/* HEADER */}
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                            <GraduationCap
                                size={40}
                                className="text-black"
                            />
                        </div>

                        <h1 className="text-4xl font-black">
                            Calculadora de Média
                        </h1>

                        <p className="text-zinc-400 mt-3">
                            Adicione quantas notas desejar e
                            descubra sua média final.
                        </p>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {notas.map((nota, index) => (
                            <div
                                key={index}
                                className="flex gap-3"
                            >
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={nota}
                                    onChange={(e) => {
                                        const novasNotas = [...notas];

                                        novasNotas[index] =
                                            Number(e.target.value);

                                        setNotas(novasNotas);
                                    }}
                                    className="
                    flex-1
                    rounded-2xl
                    bg-zinc-900/70
                    border
                    border-zinc-700
                    px-5
                    py-4
                    text-white
                    text-lg
                    outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                    focus:border-emerald-400
                  "
                                    placeholder={`Nota ${index + 1}`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        removerNota(index)
                                    }
                                    className="
                    w-14
                    rounded-2xl
                    bg-red-500
                    hover:bg-red-600
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                  "
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={adicionarNota}
                            className="
                w-full
                rounded-2xl
                border
                border-dashed
                border-emerald-400
                py-4
                flex
                items-center
                justify-center
                gap-2
                hover:bg-emerald-400/10
                transition-all
              "
                        >
                            <Plus size={18} />
                            Adicionar Nota
                        </button>

                        <button
                            type="submit"
                            className="
                w-full
                bg-linear-to-r
                from-emerald-400
                to-cyan-500
                text-black
                font-bold
                py-4
                rounded-2xl
                hover:scale-[1.02]
                transition-all
                duration-300
              "
                        >
                            Calcular Média
                        </button>
                    </form>

                    {/* RESULTADO */}
                    {media !== null && (
                        <div className="mt-8">
                            <div
                                className="
                  bg-zinc-900/70
                  border
                  border-zinc-700
                  rounded-3xl
                  p-8
                  animate-in
                  fade-in
                  zoom-in-95
                  duration-300
                "
                            >
                                <div className="flex justify-center mb-4">
                                    <Trophy
                                        size={42}
                                        className="text-yellow-400"
                                    />
                                </div>

                                <h2 className="text-center text-zinc-400 mb-2">
                                    Média Final
                                </h2>

                                <p className="text-center text-7xl md:text-8xl font-black bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    {media.toFixed(2)}
                                </p>

                                <div
                                    className={`
                    mt-6
                    py-3
                    rounded-2xl
                    text-center
                    text-lg
                    font-bold
                    ${status === "Aprovado"
                                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                            : status === "Recuperação"
                                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                                        }
                  `}
                                >
                                    {status}
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="bg-zinc-800 rounded-2xl p-5 text-center">
                                        <p className="text-zinc-400 text-sm">
                                            Quantidade de Notas
                                        </p>

                                        <p className="text-3xl font-bold mt-1">
                                            {notas.length}
                                        </p>
                                    </div>

                                    <div className="bg-zinc-800 rounded-2xl p-5 text-center">
                                        <p className="text-zinc-400 text-sm">
                                            Soma Total
                                        </p>

                                        <p className="text-3xl font-bold mt-1">
                                            {notas
                                                .reduce(
                                                    (a, b) => a + b,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </p>
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