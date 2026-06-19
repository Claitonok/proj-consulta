"use client";

import { useState } from "react";
import { toast } from "sonner";
import Header from "./components/header";
import Footer from "./components/footer";
import { MapPin } from "lucide-react";

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

  const formatCep = (value: string) => {
    value = value.replace(/\D/g, "");

    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    return value.slice(0, 9);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!cep) {
      toast.error("Informe um CEP");
      return;
    }

    try {
      setLoading(true);

      const cleanCep = cep.replace(/\D/g, "");

      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

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

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">
            <MapPin size={38} className="text-black" />
          </div>
            <h1 className="text-4xl font-bold mb-3">
              Consulta de CEP
            </h1>

            <p className="text-zinc-300">
              Digite um CEP para consultar os dados do endereço.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cep"
                className="text-sm font-medium text-zinc-200"
              >
                CEP
              </label>

              <input
                id="cep"
                type="text"
                value={cep}
                onChange={(e) => setCep(formatCep(e.target.value))}
                placeholder="00000-000"
                className="w-full rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 py-4 text-lg outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 rounded-2xl py-4 text-lg font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
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
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Resultado da Consulta
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">CEP</p>
                <p className="text-lg font-semibold">{cepData.cep}</p>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Logradouro</p>
                <p className="text-lg font-semibold">
                  {cepData.logradouro || "Não informado"}
                </p>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Bairro</p>
                <p className="text-lg font-semibold">
                  {cepData.bairro || "Não informado"}
                </p>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Cidade</p>
                <p className="text-lg font-semibold">
                  {cepData.localidade}
                </p>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Estado</p>
                <p className="text-lg font-semibold">{cepData.uf}</p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 transition-all rounded-2xl py-3 font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}