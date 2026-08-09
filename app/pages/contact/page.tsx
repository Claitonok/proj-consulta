"use client";

import Footer from "@/app/components/footer";
import { HeaderContact } from "@/app/components/header";
import {
  Send,
  Mail,
  MessageCircle,
  Headphones,
  User,
  AtSign,
  FileText,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: any
  ) {
    e.preventDefault();

    if (
      !form.nome ||
      !form.email ||
      !form.assunto ||
      !form.mensagem
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      // Aqui você poderá futuramente enviar os dados
      // para uma API, Resend, Nodemailer etc.
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      toast.success(
        "Mensagem enviada com sucesso!"
      );

      setForm({
        nome: "",
        email: "",
        assunto: "",
        mensagem: "",
      });
    } catch {
      toast.error(
        "Não foi possível enviar sua mensagem."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-900 text-white flex flex-col">
      <HeaderContact />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto">

          {/* HERO */}
          <section className="text-center mb-16">

            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Sparkles size={18} />
              Estamos aqui para ajudar
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Entre em{" "}
              <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                contato
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
              Tem alguma dúvida, sugestão ou encontrou algum
              problema? Envie uma mensagem para nossa equipe.
            </p>

          </section>

          {/* CONTACT CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {/* EMAIL */}
            <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-7 hover:bg-white/10 hover:border-emerald-400/30 hover:-translate-y-1 transition-all duration-300 shadow-xl">

              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Mail
                  size={28}
                  className="text-emerald-400"
                />
              </div>

              <h2 className="text-xl font-bold mb-2">
                E-mail
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Envie sua dúvida ou sugestão através
                do nosso canal de atendimento.
              </p>

              <p className="text-emerald-400 mt-4 text-sm font-medium">
                contato@cepfinder.com
              </p>

            </div>

            {/* WHATSAPP */}
            <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-7 hover:bg-white/10 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300 shadow-xl">

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle
                  size={28}
                  className="text-cyan-400"
                />
              </div>

              <h2 className="text-xl font-bold mb-2">
                WhatsApp
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Fale diretamente conosco para obter
                uma resposta rápida.
              </p>

              <p className="text-cyan-400 mt-4 text-sm font-medium">
                Atendimento rápido
              </p>

            </div>

            {/* SUPORTE */}
            <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-7 hover:bg-white/10 hover:border-purple-400/30 hover:-translate-y-1 transition-all duration-300 shadow-xl">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Headphones
                  size={28}
                  className="text-purple-400"
                />
              </div>

              <h2 className="text-xl font-bold mb-2">
                Suporte
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Precisa de ajuda com alguma
                funcionalidade da plataforma?
              </p>

              <p className="text-purple-400 mt-4 text-sm font-medium">
                Estamos à disposição
              </p>

            </div>

          </section>

          {/* FORM SECTION */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* LEFT */}
              <div className="lg:col-span-2 flex flex-col justify-center">

                <span className="text-emerald-400 font-semibold uppercase tracking-widest text-sm">
                  Fale conosco
                </span>

                <h2 className="text-4xl font-black mt-4 mb-6">
                  Como podemos ajudar?
                </h2>

                <p className="text-zinc-400 leading-relaxed mb-8">
                  Preencha o formulário ao lado e envie
                  sua mensagem. Nossa equipe poderá
                  analisar sua solicitação e retornar
                  assim que possível.
                </p>

                {/* BENEFITS */}
                <div className="space-y-5">

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2
                        size={20}
                        className="text-emerald-400"
                      />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Atendimento simples
                      </p>

                      <p className="text-sm text-zinc-500">
                        Sem burocracia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <CheckCircle2
                        size={20}
                        className="text-cyan-400"
                      />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Resposta rápida
                      </p>

                      <p className="text-sm text-zinc-500">
                        Sua mensagem será analisada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <CheckCircle2
                        size={20}
                        className="text-purple-400"
                      />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Experiência melhor
                      </p>

                      <p className="text-sm text-zinc-500">
                        Sua opinião ajuda a melhorar
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* FORM */}
              <div className="lg:col-span-3">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* NOME */}
                  <div>
                    <label
                      htmlFor="nome"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
                    >
                      <User size={16} />
                      Nome
                    </label>

                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Digite seu nome"
                      className="w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
                    >
                      <AtSign size={16} />
                      E-mail
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  {/* ASSUNTO */}
                  <div>
                    <label
                      htmlFor="assunto"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
                    >
                      <FileText size={16} />
                      Assunto
                    </label>

                    <input
                      id="assunto"
                      name="assunto"
                      type="text"
                      value={form.assunto}
                      onChange={handleChange}
                      placeholder="Sobre o que deseja falar?"
                      className="w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  {/* MENSAGEM */}
                  <div>
                    <label
                      htmlFor="mensagem"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
                    >
                      <MessageSquare size={16} />
                      Mensagem
                    </label>

                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={form.mensagem}
                      onChange={handleChange}
                      placeholder="Digite sua mensagem..."
                      rows={6}
                      className="w-full rounded-2xl bg-zinc-900/70 border border-zinc-700 px-5 py-4 text-white placeholder:text-zinc-600 outline-none resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />

                    {loading
                      ? "Enviando..."
                      : "Enviar mensagem"}
                  </button>

                </form>

              </div>

            </div>

          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}