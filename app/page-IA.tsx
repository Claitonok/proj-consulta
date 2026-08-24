"use client";

import { useState } from "react";
import { toast } from "sonner";
import Header from "./components/header";
import Footer from "./components/footer";
import { MapPin, Sparkles, Loader2 } from "lucide-react";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function Home() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cepData, setCepData] = useState<CepData | null>(null);

  // Estados para a OpenAI
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const formatCep = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    return value.slice(0, 9);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!cep) {
      toast.error("Informe um CEP");
      return;
    }

    try {
      setLoading(true);
      setAiInsight(null); // Reseta insight anterior

      const cleanCep = cep.replace(/\D/g, "");
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      setCepData(data);
      setShowModal(true);
      toast.success("CEP encontrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao buscar CEP");
    } finally {
      setLoading(false);
    }
  }

  // Função para chamar a API Route da OpenAI
  async function handleGenerateInsight() {
    if (!cepData) return;

    try {
      setLoadingAi(true);
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cepData }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setAiInsight(data.insight);
      toast.success("Análise inteligente gerada!");
    } catch (error) {
      toast.error("Erro ao conectar com o serviço de IA.");
    } finally {
      setLoadingAi(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <MapPin size={38} className="text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Consulta de CEP</h1>
            <p className="text-zinc-300">
              Digite um CEP para consultar os dados do endereço com análise de IA.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="cep" className="text-sm font-medium text-zinc-200">
                CEP
              </label>
              <input
                id="cep"
                type="text"
                value={cep}
                onChange={(e) => setCep(formatCep(e.target.value))}
                placeholder="00000-000"
                className="w-full rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 py-4 text-lg outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 transition-all text-white placeholder-zinc-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 rounded-2xl py-4 text-lg font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Consultando..." : "Consultar CEP"}
            </button>
          </form>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {showModal && cepData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Resultado da Consulta</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-white text-2xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/50">
                <p className="text-zinc-400 text-xs uppercase tracking-wider">CEP</p>
                <p className="text-lg font-semibold text-emerald-400">{cepData.cep}</p>
              </div>

              <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/50">
                <p className="text-zinc-400 text-xs uppercase tracking-wider">Logradouro</p>
                <p className="text-lg font-semibold">
                  {cepData.logradouro || "Não informado"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/50">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider">Bairro</p>
                  <p className="text-base font-semibold">
                    {cepData.bairro || "Não informado"}
                  </p>
                </div>

                <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/50">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider">Cidade / UF</p>
                  <p className="text-base font-semibold">
                    {cepData.localidade} - {cepData.uf}
                  </p>
                </div>
              </div>

              {/* CARD DA OPENAI */}
              <div className="mt-6 pt-4 border-t border-zinc-800">
                {!aiInsight ? (
                  <button
                    onClick={handleGenerateInsight}
                    disabled={loadingAi}
                    className="w-full bg-linear-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/30 text-emerald-300 rounded-2xl py-3 px-4 font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loadingAi ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Analisando Região com IA...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="text-cyan-400" />
                        Gerar Análise Inteligente do Local
                      </>
                    )}
                  </button>
                ) : (
                  <div className="bg-linear-to-br from-emerald-950/40 to-cyan-950/40 border border-emerald-500/30 rounded-2xl p-5 text-zinc-200">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-3 text-sm">
                      <Sparkles size={16} />
                      Insights do CEP Finder AI
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-line text-zinc-300 space-y-2">
                      {aiInsight}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 transition-all rounded-2xl py-3 font-semibold text-zinc-300 hover:text-white cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}