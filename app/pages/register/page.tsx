"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { HeaderLogin } from "@/app/components/header";
import Footer from "@/app/components/footer";
import { createUsuario } from "@/app/auth/auth-service";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!nome.trim()) {
      toast.error("Informe seu nome");
      return;
    }

    if (!email.trim()) {
      toast.error("Informe seu e-mail");
      return;
    }

    if (!senha) {
      toast.error("Informe uma senha");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);

      // Chamada de API para realizar o cadastro
         await createUsuario({
            nome,
            email,
            senha
        })
      toast.success("Cadastro realizado com sucesso!");
      router.push("/pages/login");

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Glows de fundo suavizados para iluminação ambiente */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-75 h-75 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <HeaderLogin />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <UserPlus size={32} className="text-slate-950" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2">
              Criar sua conta
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
              Cadastre-se para aproveitar todos os recursos do Finder.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NOME */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-slate-400 uppercase tracking-wider block"
              >
                Nome
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="name"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  className="w-full h-12 rounded-2xl bg-slate-950/80 border border-slate-800 px-11 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                />
              </div>
            </div>

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
              <label
                htmlFor="password"
                className="text-xs font-semibold text-slate-400 uppercase tracking-wider block"
              >
                Senha
              </label>

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
                  placeholder="Mínimo de 6 caracteres"
                  autoComplete="new-password"
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

            {/* CONFIRMAR SENHA */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirm-password"
                className="text-xs font-semibold text-slate-400 uppercase tracking-wider block"
              >
                Confirmar senha
              </label>

              <div className="relative">
                <CheckCircle2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="confirm-password"
                  type={mostrarConfirmacao ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Digite a senha novamente"
                  autoComplete="new-password"
                  className="w-full h-12 rounded-2xl bg-slate-950/80 border border-slate-800 px-11 pr-11 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-mono"
                />

                <button
                  type="button"
                  onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                  aria-label={
                    mostrarConfirmacao
                      ? "Ocultar confirmação de senha"
                      : "Mostrar confirmação de senha"
                  }
                >
                  {mostrarConfirmacao ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
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
                    Criando conta...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Criar minha conta
                  </>
                )}
              </button>
            </div>
          </form>

          {/* RODAPÉ DO CARD */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400">
              Já possui uma conta?{" "}
              <a
                href="/pages/login"
                className="text-emerald-400 hover:text-teal-300 font-semibold transition-colors ml-1"
              >
                Fazer login
              </a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function redirect(arg0: string) {
  throw new Error("Function not implemented.");
}
