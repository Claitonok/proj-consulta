"use client";

import { HeaderConsulta } from "@/app/components/header";
import { Calculator as CalculatorIcon } from "lucide-react";
import { useState } from "react";

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
                const expression = display
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-");

                setDisplay(eval(expression).toString());
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

    const buttons = [
        "C",
        "(",
        ")",
        "÷",
        "7",
        "8",
        "9",
        "×",
        "4",
        "5",
        "6",
        "−",
        "1",
        "2",
        "3",
        "+",
        "0",
        ".",
        "←",
        "=",
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">
            <HeaderConsulta />

            <main className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10">

                    {/* HEADER */}
                    <div className="text-center mb-8">

                        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                            <CalculatorIcon
                                size={40}
                                className="text-black"
                            />
                        </div>

                        <h1 className="text-4xl font-bold mb-3">
                            Calculadora
                        </h1>

                        <p className="text-zinc-300">
                            Realize cálculos rápidos de forma simples e prática.
                        </p>

                    </div>

                    {/* DISPLAY */}
                    <div className="mb-6">

                        <div className="
        h-24
        rounded-3xl
        bg-zinc-900/70
        border
        border-zinc-700
        px-6
        flex
        items-center
        justify-end
        text-white
        text-4xl
        font-bold
        overflow-hidden
      ">
                            {display || "0"}
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-4 gap-3">

                        {buttons.map((btn) => {

                            let style =
                                "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white";

                            if (btn === "C") {
                                style =
                                    "bg-red-500 hover:bg-red-600 text-white";
                            }

                            if (["÷", "×", "−", "+"].includes(btn)) {
                                style =
                                    "bg-cyan-500 hover:bg-cyan-600 text-black font-bold";
                            }

                            if (btn === "=") {
                                style =
                                    "bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold";
                            }

                            return (
                                <button
                                    key={btn}
                                    onClick={() => handleClick(btn)}
                                    className={`
              h-16
              rounded-2xl
              text-2xl
              font-semibold
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
              ${style}
            `}
                                >
                                    {btn}
                                </button>
                            );
                        })}

                    </div>

                </div>
            </main>
        </div>

    );
}