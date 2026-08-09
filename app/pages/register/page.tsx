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
} from "lucide-react";

import { HeaderLogin } from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

      // Aqui você poderá adicionar a chamada da API
      // para realizar o cadastro do usuário.

      toast.success("Cadastro realizado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
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
              <UserPlus
                size={38}
                className="text-black"
              />
            </div>

            <h1 className="text-4xl font-bold mb-3">
              Criar sua conta
            </h1>

            <p className="text-zinc-300">
              Cadastre-se para aproveitar todos os recursos do Finder.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NOME */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-200"
              >
                Nome
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="name"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  autoComplete="name"
                  className="
                    w-full
                    rounded-2xl
                    bg-zinc-900/70
                    border border-zinc-700
                    px-12 py-4
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
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
                    border border-zinc-700
                    px-12 py-4
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
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-200"
              >
                Senha
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  autoComplete="new-password"
                  className="
                    w-full
                    rounded-2xl
                    bg-zinc-900/70
                    border border-zinc-700
                    px-12 pr-12 py-4
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
                  onClick={() => setMostrarSenha(!mostrarSenha)}
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

            {/* CONFIRMAR SENHA */}
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-zinc-200"
              >
                Confirmar senha
              </label>

              <div className="relative">
                <CheckCircle2
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="confirm-password"
                  type={
                    mostrarConfirmacao
                      ? "text"
                      : "password"
                  }
                  value={confirmarSenha}
                  onChange={(e) =>
                    setConfirmarSenha(e.target.value)
                  }
                  placeholder="Digite a senha novamente"
                  autoComplete="new-password"
                  className="
                    w-full
                    rounded-2xl
                    bg-zinc-900/70
                    border border-zinc-700
                    px-12 pr-12 py-4
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
                    setMostrarConfirmacao(
                      !mostrarConfirmacao
                    )
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
                    mostrarConfirmacao
                      ? "Ocultar confirmação de senha"
                      : "Mostrar confirmação de senha"
                  }
                >
                  {mostrarConfirmacao ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* BOTÃO */}
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
              <UserPlus size={20} />

              {loading
                ? "Criando conta..."
                : "Criar minha conta"}
            </button>

          </form>

          {/* RODAPÉ DO CARD */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-zinc-400">
              Já possui uma conta?
            </p>

            <a
              href="/pages/login"
              className="
                inline-block
                mt-2
                text-emerald-400
                hover:text-cyan-400
                font-semibold
                transition-colors
              "
            >
              Fazer login
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}