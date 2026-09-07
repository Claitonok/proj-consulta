"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Header from "./components/header";
import Footer from "./components/footer";
import {
  MapPin,
  Search,
  X,
  Building2,
  Map,
  Navigation,
  UserCheck,
  ArrowRight,
} from "lucide-react";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function Home() {
  const router = useRouter();

  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cepData, setCepData] = useState<CepData | null>(null);

  // Estado para armazenar a presença do token
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verifica o cookie no lado do cliente
  useEffect(() => {
    const token = Cookies.get("token");
    // const id = Cookies.get("id");
    if (token) {
      // console.log("Token encontrado:", token);
      // console.log("ID encontrado:", id);
      setIsAuthenticated(true);
    }
  }, []);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Luzes de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-75 h-75 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10 gap-6">
        {/* BANNER SE O USUÁRIO ESTIVER LOGADO */}
        {isAuthenticated && (
          <div className="w-full max-w-xl bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between backdrop-blur-xl shadow-lg shadow-emerald-500/5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Sessão Ativa
                </p>
                <p className="text-xs text-slate-400">
                  Você está autenticado no sistema.
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push("/pages/dashboard")} // Ajuste para a rota da sua área de usuário
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl font-semibold text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <span>Área do Usuário</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <MapPin size={32} className="text-slate-950" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">
              Consulta de CEP
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
              Digite o CEP abaixo para obter instantaneamente o endereço completo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cep"
                className="text-xs font-semibold text-slate-300 tracking-wide uppercase ml-1"
              >
                Código Postal (CEP)
              </label>

              <div className="relative flex items-center">
                <Search
                  size={20}
                  className="absolute left-4 text-slate-500 pointer-events-none"
                />
                <input
                  id="cep"
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(formatCep(e.target.value))}
                  placeholder="00000-000"
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-12 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all font-mono tracking-wider text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold rounded-xl py-3.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <span>Consultando...</span> : <span>Consultar CEP</span>}
            </button>
          </form>
        </div>
      </main>

      <Footer />

      {/* Modal Redesenhado */}
      {showModal && cepData && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-100 p-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <MapPin size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">
                  Endereço Encontrado
                </h2>
                <p className="text-xs text-slate-400 font-mono">{cepData.cep}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
                  <Navigation size={16} className="text-emerald-400" />
                  <span>Logradouro</span>
                </div>
                <span className="text-sm font-medium text-slate-200 text-right">
                  {cepData.logradouro || "Não informado"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
                  <Building2 size={16} className="text-emerald-400" />
                  <span>Bairro</span>
                </div>
                <span className="text-sm font-medium text-slate-200 text-right">
                  {cepData.bairro || "Não informado"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
                  <Map size={16} className="text-emerald-400" />
                  <span>Cidade / UF</span>
                </div>
                <span className="text-sm font-medium text-slate-200 text-right">
                  {cepData.localidade} / {cepData.uf}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors rounded-xl py-3 text-sm font-medium cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}