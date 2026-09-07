import Loading from "./components/loading";

export default function LoadingPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden p-4 sm:p-6 selection:bg-emerald-500/30">
      
      {/* Luzes de fundo de tom suave para padrão de identidade Slate */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -top-12 -left-12" />
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -bottom-12 -right-12" />

      {/* Card centralizado com Glassmorphism e adaptação responsiva */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-2xl shadow-2xl max-w-xs sm:max-w-sm w-full text-center">
        
        {/* Container do ícone de carregamento */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-4 shadow-inner">
          <Loading />
        </div>

        {/* Texto de status */}
        <p className="text-sm font-semibold text-slate-200 tracking-wide animate-pulse">
          Carregando...
        </p>

        {/* Subtexto sutil para dar contexto */}
        <span className="text-xs text-slate-400 mt-1">
          Aguarde um momento
        </span>
      </div>
    </div>
  );
}