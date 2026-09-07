"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { HeaderLogin } from "@/app/components/header";
import Footer from "@/app/components/footer";
import { loginUsuario } from "@/app/auth/route";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redireciona para o dashboard se o usuário já estiver logado
  useState(() => {
    const token = Cookies.get("token");
    if (token) {
      redirect("/pages/dashboard");
    }
  });

  async function handleSubmit(event: any) {
    event.preventDefault();


    if (!email.trim()) {
      toast.error("Informe seu e-mail");
      return;
    }

    if (!senha) {
      toast.error("Informe sua senha");
      return;
    }

    try {
      setLoading(true);

      const usuarioAdmin = await loginUsuario(email, senha);

      if (usuarioAdmin.Token) {
        document.cookie = `token=${usuarioAdmin.Token}; path=/; SameSite=Lax`;
        document.cookie = `id=${usuarioAdmin.id}; path=/; SameSite=Lax`;
      }

      toast.success("✅ Login realizado com sucesso");

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (error) {
      toast.error("E-mail ou senha inválidos ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Glows de fundo suavizados */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-75 h-75 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <HeaderLogin />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <LogIn size={32} className="text-slate-950" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2">
              Bem-vindo de volta
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
              Entre na sua conta para continuar navegando no Finder.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-slate-400 uppercase tracking-wider block"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="w-full h-12 rounded-2xl bg-slate-950/80 border border-slate-800 px-11 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                />
              </div>
            </div>

            {/* SENHA */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-400 uppercase tracking-wider block"
                >
                  Senha
                </label>

                <a
                  href="/pages/forgot-password"
                  className="text-xs text-emerald-400 hover:text-teal-300 font-medium transition-colors"
                >
                  Esqueci minha senha
                </a>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full h-12 rounded-2xl bg-slate-950/80 border border-slate-800 px-11 pr-11 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-mono"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* LEMBRAR */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-0 cursor-pointer"
              />

              <label
                htmlFor="remember"
                className="text-xs text-slate-400 cursor-pointer select-none"
              >
                Lembrar de mim neste dispositivo
              </label>
            </div>

            {/* BOTÃO */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Entrando na conta...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Entrar na conta
                  </>
                )}
              </button>
            </div>
          </form>

          {/* RODAPÉ DO CARD */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400">
              Ainda não possui uma conta?
            </p>

            <a
              href="/pages/register"
              className="inline-flex items-center gap-1.5 mt-2 text-xs text-emerald-400 hover:text-teal-300 font-semibold transition-colors"
            >
              <CheckCircle2 size={16} />
              Criar uma conta
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}