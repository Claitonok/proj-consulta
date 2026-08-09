"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

import { HeaderLogin } from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

      // Aqui você poderá adicionar a chamada da API
      // para realizar a autenticação do usuário.

      toast.success("Login realizado com sucesso!");

      console.log({
        email,
        senha,
        lembrar,
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">

      <HeaderLogin />

      <main className="flex-1 flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10">

          {/* HEADER */}
          <div className="text-center mb-8">

            <div className="w-20 h-20 rounded-full mx-auto mb-5 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">

              <LogIn
                size={38}
                className="text-black"
              />

            </div>

            <h1 className="text-4xl font-bold mb-3">
              Bem-vindo de volta
            </h1>

            <p className="text-zinc-300">
              Entre na sua conta para continuar.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div className="space-y-2">

              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-200"
              >
                E-mail
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                  "
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="
                    w-full
                    rounded-2xl
                    bg-zinc-900/70
                    border
                    border-zinc-700
                    px-12
                    py-4
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    transition-all
                    focus:border-emerald-400
                    focus:ring-2
                    focus:ring-emerald-400/20
                  "
                />

              </div>

            </div>

            {/* SENHA */}
            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-200"
                >
                  Senha
                </label>

                <a
                  href="/pages/forgot-password"
                  className="
                    text-sm
                    text-emerald-400
                    hover:text-cyan-400
                    transition-colors
                  "
                >
                  Esqueci minha senha
                </a>

              </div>

              <div className="relative">

                <Lock
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                  "
                />

                <input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="
                    w-full
                    rounded-2xl
                    bg-zinc-900/70
                    border
                    border-zinc-700
                    px-12
                    pr-12
                    py-4
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    transition-all
                    focus:border-emerald-400
                    focus:ring-2
                    focus:ring-emerald-400/20
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                    hover:text-white
                    transition-colors
                  "
                  aria-label={
                    mostrarSenha
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {mostrarSenha ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* LEMBRAR */}
            <div className="flex items-center gap-3">

              <input
                id="remember"
                type="checkbox"
                checked={lembrar}
                onChange={(e) =>
                  setLembrar(e.target.checked)
                }
                className="
                  w-4
                  h-4
                  rounded
                  border-zinc-600
                  bg-zinc-900
                  text-emerald-400
                  focus:ring-emerald-400
                "
              />

              <label
                htmlFor="remember"
                className="text-sm text-zinc-400 cursor-pointer"
              >
                Lembrar de mim
              </label>

            </div>

            {/* BOTÃO LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-linear-to-r
                from-emerald-400
                to-cyan-500
                text-black
                font-bold
                py-4
                rounded-2xl
                shadow-lg
                shadow-emerald-500/20
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-emerald-500/30
                active:scale-[0.98]
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <LogIn size={20} />

              {loading
                ? "Entrando..."
                : "Entrar na conta"}

            </button>

          </form>

          {/* SEPARADOR */}
          <div className="flex items-center gap-4 my-8">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-zinc-500 uppercase">
              ou
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* CRIAR CONTA */}
          <div className="text-center">

            <p className="text-sm text-zinc-400">
              Ainda não possui uma conta?
            </p>

            <a
              href="/pages/register"
              className="
                inline-flex
                items-center
                gap-2
                mt-3
                text-emerald-400
                hover:text-cyan-400
                font-semibold
                transition-colors
              "
            >
              <CheckCircle2 size={18} />
              Criar uma conta
            </a>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}