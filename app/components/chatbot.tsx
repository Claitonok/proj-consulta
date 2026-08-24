"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot, User, RefreshCw } from "lucide-react";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

// Base de conhecimento local das opções pré-definidas
const FAQ_DATA: Record<string, string> = {
  "O que é a Finder?":
    "A Finder é uma plataforma completa focada em conectar soluções e facilitar buscas inteligentes para o seu negócio.",
  "Como funciona?":
    "Você pode cadastrar seus serviços, explorar oportunidades em tempo real e gerenciar suas interações diretamente pelo nosso painel.",
  "Planos e Preços":
    "Oferecemos um plano gratuito para começar e planos Pro com recursos avançados de automação e destaque.",
  "Falar com Suporte":
    "Para suporte direto, você pode nos enviar um e-mail para contato@finder.com ou deixar sua dúvida por mensagem.",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"ask_name" | "menu" | "custom_input">("ask_name");
  const [userName, setUserName] = useState("");
  const [tempName, setTempName] = useState("");
  const [customText, setCustomText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Olá! Seja bem-vindo à Finder. Qual é o seu nome?",
    },
  ]);

  // Captura o nome do usuário
  const handleNameSubmit = (e: any) => {
    e.preventDefault();
    if (!tempName.trim()) return;

    const name = tempName.trim();
    setUserName(name);
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: name },
      {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `Prazer em te conhecer, ${name}! Como posso te ajudar hoje? Escolha uma das opções abaixo:`,
      },
    ]);

    setStep("menu");
  };

  // Trata o clique nos botões de dúvida pré-definida
  const handleOptionClick = (question: string) => {
    const answer = FAQ_DATA[question] || "Desculpe, não encontrei essa informação.";

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: question },
      { id: (Date.now() + 1).toString(), sender: "bot", text: answer },
      {
        id: (Date.now() + 2).toString(),
        sender: "bot",
        text: `Posso te ajudar com mais alguma dúvida, ${userName}?`,
      },
    ]);
  };

  // Envio de texto livre quando o usuário digita algo manualmente
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const userMsg = customText;
    setCustomText("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: userMsg },
      {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `Obrigado pela mensagem, ${userName}! Nossa equipe responderá em breve ou escolha uma opção do menu.`,
      },
    ]);
  };

  // Reinicia a conversa
  const handleReset = () => {
    setUserName("");
    setStep("ask_name");
    setMessages([
      {
        id: Date.now().toString(),
        sender: "bot",
        text: "Olá! Seja bem-vindo à Finder. Qual é o seu nome?",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl flex flex-col h-125 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Topo do Chat */}
          <div className="bg-zinc-800/80 border-b border-zinc-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Finder Atendimento</h3>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                title="Reiniciar conversa"
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0 mt-1">
                    <Bot size={14} />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-emerald-500 text-black font-medium rounded-br-none"
                      : "bg-zinc-800 text-zinc-200 border border-zinc-700/60 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-zinc-700 text-zinc-300 flex items-center justify-center text-xs shrink-0 mt-1">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {/* Menu de Opções Rápidas (Botoes) */}
            {step === "menu" && (
              <div className="pt-2 space-y-2 animate-in fade-in duration-300">
                {Object.keys(FAQ_DATA).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className="w-full text-left bg-zinc-800 hover:bg-zinc-700/80 text-emerald-400 border border-zinc-700/80 hover:border-emerald-500/50 p-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="text-zinc-500">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rodapé / Controles de Entrada */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/90">
            {step === "ask_name" && (
              <form onSubmit={handleNameSubmit} className="flex gap-2">
                <input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Seu nome completo..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2 outline-none focus:border-emerald-400 transition-all placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  disabled={!tempName.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black p-2 rounded-xl transition-all cursor-pointer"
                >
                  <Send size={18} />
                </button>
              </form>
            )}

            {step === "menu" && (
              <form onSubmit={handleCustomSubmit} className="flex gap-2">
                <input
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ou digite sua pergunta..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2 outline-none focus:border-emerald-400 transition-all placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  disabled={!customText.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black p-2 rounded-xl transition-all cursor-pointer"
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}