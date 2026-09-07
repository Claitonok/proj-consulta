"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut, LayoutDashboard, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { deleteUsuario } from "@/app/auth/route";


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = useState(false);

  function handleLogout() {
    // Remove o cookie do token
    Cookies.remove("token");
    Cookies.remove("id");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/pages/login");
  }

  useEffect(() => {
    const id = Cookies.get("id");
    if (!id) {
      toast.error("Sessão inválida. Faça login novamente.");
      router.push("/pages/login");
    }
  }, []);

  async function handleExcluirConta() {

    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.")) {
      return;
    }

    const token = Cookies.get("token");
    const id = Cookies.get("id");

    if (!token) {
      toast.error("Sessão inválida. Faça login novamente.");
      handleLogout();
      return;
    }

    try {
      setLoadingDelete(true);

      if (!id && !token) {
        toast.error("Não foi possível identificar o ID do usuário no token.");
        return;
      }

      // Executa a requisição de deleção
      await deleteUsuario(id || "");

      toast.success("Sua conta foi excluída com sucesso.");
      
      // Limpa os dados de sessão e redireciona para a tela de login
      handleLogout();
    } catch (error) {
      toast.error("Ocorreu um erro ao tentar excluir a conta. Tente novamente.");
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col sm:flex-row">
      {/* Sidebar Restrita */}
      <aside className="w-full sm:w-64 bg-slate-900/80 border-b sm:border-b-0 sm:border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              ÁU
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Área do Usuário</h2>
              <p className="text-xs text-slate-400">Painel Geral</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold cursor-pointer transition-all hover:bg-emerald-500/20"
            >
              <LayoutDashboard size={18} />
              <span>Home</span>
            </button>
          </nav>
        </div>

        {/* Grupo de Ações Inferiores */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
         <button
            onClick={handleExcluirConta}
            disabled={loadingDelete}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/60 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 border border-slate-700/60 text-slate-300 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingDelete ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Excluindo...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Excluir Conta</span>
              </>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/60 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 border border-slate-700/60 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo das páginas filhas */}
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}