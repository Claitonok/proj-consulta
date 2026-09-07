'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthRecover, RecoverEmail } from "../../auth/route";
import {
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Loader2,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { HeaderLogin } from "@/app/components/header";
import Footer from "@/app/components/footer";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // E-mail recebido via Query Parameter (?email=...)
  const email = searchParams.get("email") || "";

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tokenState, setTokenState] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Estados para o temporizador de reenvio (5 minutos = 300 segundos)
  const TEMPO_PADRAO_SEGUNDOS = 300;
  const [countdown, setCountdown] = useState(TEMPO_PADRAO_SEGUNDOS);
  const [loadingResend, setLoadingResend] = useState(false);

  // Efeito da contagem regressiva
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Formata os segundos em MM:SS
  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // Função para reenviar o token
  async function handleResendCode() {
    if (!email) {
      toast.error("E-mail não encontrado para reenvio.");
      return;
    }

    try {
      setLoadingResend(true);
      await RecoverEmail(email);
      toast.success("Novo token enviado para seu e-mail 📩");

      // Reinicia a contagem de 5 minutos
      setCountdown(TEMPO_PADRAO_SEGUNDOS);
    } catch (error) {
      toast.error("Erro ao reenviar o código. Tente novamente.");
    } finally {
      setLoadingResend(false);
    }
  }

  async function handleReset(e: any) {
    e.preventDefault();

    if (!tokenState || tokenState.length !== 6) {
      toast.error("Informe um token de 6 dígitos válido");
      return;
    }

    if (!senha || !confirmarSenha) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      await AuthRecover(tokenState, senha);
      toast.success("Senha redefinida com sucesso 🎉");

      setTimeout(() => {
        router.push("/pages/login");
      }, 1500);
    } catch (error) {
      toast.error("Token inválido ou expirado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
      {/* HEADER DO CARD */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <ShieldCheck size={32} className="text-slate-950" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2">
          Criar nova senha
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
          {email ? (
            <>
              Enviamos o token para{" "}
              <span className="text-emerald-400 font-medium">{email}</span>
            </>
          ) : (
            "Informe o token enviado para o seu e-mail e defina suas novas credenciais."
          )}
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
        {/* INPUT DO TOKEN */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Token de 6 dígitos
          </label>

          <div className="relative">
            <KeyRound
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              value={tokenState}
              onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor) && valor.length <= 6) {
                  setTokenState(valor);
                }
              }}
              inputMode="numeric"
              className="w-full h-12 rounded-2xl bg-slate-950/80 border border-slate-800 px-11 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm tracking-widest font-mono text-center"
            />
          </div>
        </div>

        {/* NOVA SENHA */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Nova senha
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full h-12 rounded-2xl bg-slate-950/80 border border-slate-800 pl-11 pr-11 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
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
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Confirmar nova senha
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full h-12 rounded-2xl bg-slate-950/80 border border-slate-800 pl-11 pr-11 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
            />
          </div>
        </div>

        {/* BOTÃO SUBMIT */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                <span>Redefinir senha</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* SEÇÃO DO BOTÃO DE REENVIAR CÓDIGO */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
        {countdown > 0 ? (
          <p className="text-xs text-slate-400">
            Não recebeu o código? Reenvie em{" "}
            <span className="font-mono text-emerald-400 font-semibold">
              {formatTime(countdown)}
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendCode}
            disabled={loadingResend}
            className="inline-flex items-center justify-center gap-2 text-xs text-emerald-400 hover:text-teal-300 font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {loadingResend ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RotateCcw size={14} />
            )}
            <span>Reenviar código</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Glows de fundo suavizados */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-75 h-75 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <HeaderLogin />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <Suspense
          fallback={
            <div className="flex items-center justify-center text-slate-400 gap-2">
              <Loader2 className="animate-spin" size={24} />
              <span>Carregando formulário...</span>
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}