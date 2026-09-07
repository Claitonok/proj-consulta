"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";

import {
  Building2,
  Search,
  X,
  Copy,
  Check,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface CompanyData {
  nome: string;
  fantasia: string;
  cnpj: string;
  cnae_fiscal: string;
  cnae_fiscal_descricao: string;
  natureza_juridica: string;
  codigo_natureza_juridica: string | number;
  atividade_principal: string;
  situacao: string;
  telefone: string;
  email: string;
  cep: string;
  municipio: string;
  uf: string;
  numero: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cnaes_secundarios: {
    codigo: string;
    descricao: string;
  }[];
  opcao_pelo_simples: string;
  data_situacao_cadastral: string;
  descricao_identificador_matriz_filial: string;
  data_inicio_atividade: string;
}

export default function ConsultaCnpj() {
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [copied, setCopied] = useState(false);

  const formatCnpj = (value: string) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    return value.slice(0, 18);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cnpj) {
      toast.error("Informe um CNPJ");
      return;
    }

    try {
      setLoading(true);
      const cleanCnpj = cnpj.replace(/\D/g, "");

      const response = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`
      );

      if (!response.ok) {
        throw new Error("CNPJ não encontrado");
      }

      const data = await response.json();

      setCompany({
        nome: data.razao_social,
        fantasia: data.nome_fantasia,
        cnpj: formatCnpjDisplay(data.cnpj),
        cnae_fiscal: data.cnae_fiscal || "Não informado",
        cnae_fiscal_descricao:
          data.cnae_fiscal_descricao || "Não informado",
        atividade_principal:
          data.atividade_principal || "Não informado",
        natureza_juridica:
          data.natureza_juridica || "Não informado",
        codigo_natureza_juridica: formatCodigoNaturezaJuridica(
          data.codigo_natureza_juridica || "Não informado"
        ),
        situacao:
          data.descricao_situacao_cadastral || "Não informado",
        telefone: formatTelefone(data.ddd_telefone_1),
        email: data.email || "Não informado",
        cep: formatCep(data.cep || "Não informado"),
        municipio: data.municipio || "Não informado",
        uf: data.uf || "Não informado",
        numero: data.numero || "Não informado",
        logradouro: data.logradouro || "Não informado",
        complemento: data.complemento || "Não informado",
        bairro: data.bairro || "Não informado",
        cnaes_secundarios: data.cnaes_secundarios || [],
        opcao_pelo_simples:
          data.opcao_pelo_simples || "Não Enquadrado",
        data_situacao_cadastral: formatDate(
          data.data_situacao_cadastral || "Não informado"
        ),
        descricao_identificador_matriz_filial:
          data.descricao_identificador_matriz_filial || "Não informado",
        data_inicio_atividade: formatDate(
          data.data_inicio_atividade || "Não informado"
        ),
      });

      setShowModal(true);
      toast.success("CNPJ consultado com sucesso!");
    } catch {
      toast.error("Erro ao consultar CNPJ");
    } finally {
      setLoading(false);
    }
  }

  const formatCnpjDisplay = (cnpj: string) => {
    if (!cnpj || cnpj === "Não informado") return cnpj;
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };

  const formatCodigoNaturezaJuridica = (codigo: string | number) => {
    if (!codigo || codigo === "Não informado") return codigo;
    return String(codigo).replace(/^(\d{3})(\d)$/, "$1-$2");
  };

  const formatTelefone = (telefone: string) => {
    if (!telefone || telefone === "Não informado") return telefone;
    return telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  };

  const formatCep = (cep: string) => {
    if (!cep || cep === "Não informado") return cep;
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "Não informado") return "";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;
    return `${day}/${month}/${year}`;
  };

  const copiarCnpj = async () => {
    if (!company?.cnpj) {
      toast.error("CNPJ não disponível");
      return;
    }

    try {
      await navigator.clipboard.writeText(company.cnpj);
      setCopied(true);
      toast.success("CNPJ copiado para a área de transferência!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar o CNPJ");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      {/* Glows de fundo estilo Neon/Glass */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <HeaderConsulta />

      <main className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Building2 size={32} className="text-slate-950" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">
              Consulta CNPJ
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
              Consulte instantaneamente as informações de cadastros de empresas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cnpj"
                className="text-xs font-semibold text-slate-300 tracking-wide uppercase ml-1"
              >
                CNPJ da Empresa
              </label>

              <div className="relative flex items-center">
                <Search
                  size={20}
                  className="absolute left-4 text-slate-500 pointer-events-none"
                />
                <input
                  id="cnpj"
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                  placeholder="00.000.000/0000-00"
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-12 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all font-mono tracking-wider text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold rounded-xl py-3.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Consultando...</span>
              ) : (
                <>
                  <Search size={18} />
                  <span>Consultar CNPJ</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* MODAL REDESENHADO */}
      {showModal && company && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">
                    {company.nome}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    {company.fantasia && company.fantasia !== "Não informado"
                      ? `${company.fantasia} • `
                      : ""}
                    {company.cnpj}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setCopied(false);
                }}
                className="text-slate-400 hover:text-slate-100 p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-140px)] custom-scrollbar">
              {/* Card Destaque: CNPJ Copiável */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    CNPJ / Matriz-Filial
                  </p>
                  <p className="text-sm font-medium text-slate-200 mt-0.5">
                    {company.cnpj} — {company.descricao_identificador_matriz_filial}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copiarCnpj}
                  className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-xs font-semibold ${
                    copied
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-slate-950"
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>

              {/* Grid Informações Gerais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoCard
                  icon={<Calendar size={16} className="text-emerald-400" />}
                  title="Início das Atividades"
                  value={company.data_inicio_atividade}
                />
                <InfoCard
                  icon={<AlertCircle size={16} className="text-emerald-400" />}
                  title="Situação Cadastral"
                  value={`${company.situacao} (${company.data_situacao_cadastral})`}
                />
                <InfoCard
                  icon={<Briefcase size={16} className="text-emerald-400" />}
                  title="Natureza Jurídica"
                  value={`${company.codigo_natureza_juridica} - ${company.natureza_juridica}`}
                />
                <InfoCard
                  icon={<FileText size={16} className="text-emerald-400" />}
                  title="Opção pelo Simples"
                  value={company.opcao_pelo_simples}
                />
                <InfoCard
                  icon={<Mail size={16} className="text-emerald-400" />}
                  title="E-mail"
                  value={company.email}
                />
                <InfoCard
                  icon={<Phone size={16} className="text-emerald-400" />}
                  title="Telefone"
                  value={company.telefone}
                />
              </div>

              {/* Endereço */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">
                  Endereço
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InfoCard
                    icon={<MapPin size={16} className="text-emerald-400" />}
                    title="Logradouro"
                    value={`${company.logradouro}, ${company.numero}`}
                  />
                  <InfoCard
                    icon={<MapPin size={16} className="text-emerald-400" />}
                    title="Complemento"
                    value={company.complemento}
                  />
                  <InfoCard
                    icon={<MapPin size={16} className="text-emerald-400" />}
                    title="Bairro"
                    value={company.bairro}
                  />
                  <InfoCard
                    icon={<MapPin size={16} className="text-emerald-400" />}
                    title="Cidade / UF"
                    value={`${company.municipio} / ${company.uf} (${company.cep})`}
                  />
                </div>
              </div>

              {/* Atividades Econômicas */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">
                  Atividades Econômicas
                </h3>

                <InfoCard
                  icon={<Briefcase size={16} className="text-emerald-400" />}
                  title="Atividade Principal"
                  value={`${company.cnae_fiscal} - ${company.cnae_fiscal_descricao}`}
                />

                {/* CNAEs Secundários */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <p className="text-xs font-medium text-slate-400">
                    CNAEs Secundários
                  </p>

                  {company.cnaes_secundarios.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {company.cnaes_secundarios.map((cnae) => (
                        <div
                          key={cnae.codigo}
                          className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs"
                        >
                          <span className="font-mono font-semibold text-emerald-400 block mb-0.5">
                            {cnae.codigo}
                          </span>
                          <span className="text-slate-300">
                            {cnae.descricao}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Nenhum CNAE secundário informado.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-900/50 flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setCopied(false);
                }}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors rounded-xl px-6 py-2.5 text-sm font-medium cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* InfoCard com visual unificado ao da busca de CEP */
function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
      <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <span className="text-xs sm:text-sm font-medium text-slate-200 text-right max-w-[60%] truncate">
        {value || "Não informado"}
      </span>
    </div>
  );
}