"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  KeyRound,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";

import { HeaderLogin } from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Informe seu e-mail");
      return;
    }

    try {
      setLoading(true);

      // Aqui futuramente entrará a chamada da API
      // para enviar o e-mail de recuperação de senha.

      setEnviado(true);

      toast.success(
        "Se o e-mail estiver cadastrado, você receberá as instruções."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col">

      <HeaderLogin />

      <main className="flex-1 flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10">

          {!enviado ? (
            <>
              {/* HEADER */}
              <div className="text-center mb-8">

                <div className="w-20 h-20 rounded-full mx-auto mb-5 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">

                  <KeyRound
                    size={38}
                    className="text-black"
                  />

                </div>

                <h1 className="text-4xl font-bold mb-3">
                  Recuperar senha
                </h1>

                <p className="text-zinc-300 leading-relaxed">
                  Informe o e-mail associado à sua conta e
                  enviaremos as instruções para redefinir sua senha.
                </p>

              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

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
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
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

                  <Send size={20} />

                  {loading
                    ? "Enviando..."
                    : "Enviar instruções"}

                </button>

              </form>

              {/* VOLTAR PARA LOGIN */}
              <div className="mt-8 pt-6 border-t border-white/10">

                <a
                  href="/pages/login"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-zinc-400
                    hover:text-white
                    transition-colors
                    text-sm
                    font-medium
                  "
                >
                  <ArrowLeft size={18} />
                  Voltar para o login
                </a>

              </div>
            </>
          ) : (
            /* SUCESSO */
            <div className="text-center py-4">

              <div className="w-20 h-20 rounded-full mx-auto mb-6 bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">

                <CheckCircle2
                  size={42}
                  className="text-emerald-400"
                />

              </div>

              <h1 className="text-3xl font-bold mb-4">
                Verifique seu e-mail
              </h1>

              <p className="text-zinc-400 leading-relaxed max-w-md mx-auto">
                Caso exista uma conta associada ao endereço
                <span className="text-white font-medium">
                  {" "}{email}
                </span>
                , você receberá as instruções para redefinir
                sua senha.
              </p>

              <div className="mt-8 bg-zinc-900/70 border border-zinc-700 rounded-2xl p-5 text-left">

                <p className="text-sm text-zinc-400">
                  Não recebeu o e-mail?
                </p>

                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  <li>
                    • Verifique sua caixa de spam.
                  </li>

                  <li>
                    • Confirme se o endereço foi digitado corretamente.
                  </li>

                  <li>
                    • Aguarde alguns minutos e tente novamente.
                  </li>
                </ul>

              </div>

              <div className="mt-8 flex flex-col gap-3">

                <button
                  type="button"
                  onClick={() => setEnviado(false)}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-zinc-700
                    bg-zinc-900/70
                    py-4
                    font-semibold
                    text-zinc-200
                    hover:bg-zinc-800
                    hover:border-zinc-600
                    transition-all
                  "
                >
                  Tentar outro e-mail
                </button>

                <a
                  href="/pages/login"
                  className="
                    w-full
                    rounded-2xl
                    bg-linear-to-r
                    from-emerald-400
                    to-cyan-500
                    py-4
                    text-center
                    font-bold
                    text-black
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all
                  "
                >
                  Voltar para o login
                </a>

              </div>

            </div>
          )}

        </div>

      </main>

      <Footer />

    </div>
  );
}