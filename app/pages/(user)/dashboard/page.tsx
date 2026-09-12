"use client";

import { UserCheck, ShieldCheck, Activity, ArrowRight, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Visão Geral</h1>
        <p className="text-slate-400 text-sm">
          Bem-vindo ao seu painel restrito.
        </p>
      </div>

      {/* Cards Informativos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Status do Perfil</p>
            <p className="text-sm font-semibold text-slate-100">Ativo / Autenticado</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Sessão</p>
            <p className="text-sm font-semibold text-slate-100">Token Válido</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Serviços</p>
            <p className="text-sm font-semibold text-slate-100">Operacionais</p>
          </div>
        </div>
      </div>

      {/* Banner de Atalho para Planos */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Gerenciar Minha Assinatura</h3>
            <p className="text-xs text-slate-400">Veja seu limite de consultas ou altere o cartão de crédito.</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/pages/dashboard/planos")}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
        >
          <span>Acessar Meus Planos</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}