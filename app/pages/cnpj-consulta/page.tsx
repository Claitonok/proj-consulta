"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import {
    Building2,
    Search,
    X,
    Copy,
    Check,
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
    municipio: string;
    uf: string;
    numero: string;
    logradouro: string;
    bairro: string;
    cnaes_secundarios: {
        codigo: string;
        descricao: string;
    }[];
}

export default function ConsultaCnpj() {
    const [cnpj, setCnpj] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [company, setCompany] = useState<CompanyData | null>(null);

    // Estado do botão de copiar
    const [copied, setCopied] = useState(false);

    const formatCnpj = (value: string) => {
        value = value.replace(/\D/g, "");

        value = value.replace(
            /^(\d{2})(\d)/,
            "$1.$2"
        );

        value = value.replace(
            /^(\d{2})\.(\d{3})(\d)/,
            "$1.$2.$3"
        );

        value = value.replace(
            /\.(\d{3})(\d)/,
            ".$1/$2"
        );

        value = value.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

        return value.slice(0, 18);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
                cnae_fiscal:
                    data.cnae_fiscal || "Não informado",
                cnae_fiscal_descricao:
                    data.cnae_fiscal_descricao ||
                    "Não informado",
                atividade_principal:
                    data.atividade_principal ||
                    "Não informado",
                natureza_juridica:
                    data.natureza_juridica ||
                    "Não informado",
                codigo_natureza_juridica:
                    formatCodigoNaturezaJuridica(
                        data.codigo_natureza_juridica ||
                        "Não informado"
                    ),
                situacao:
                    data.descricao_situacao_cadastral ||
                    "Não informado",
                telefone:
                    formatTelefone(data.ddd_telefone_1),
                email:
                    data.email || "Não informado",
                municipio:
                    data.municipio || "Não informado",
                uf:
                    data.uf || "Não informado",
                numero:
                    data.numero || "Não informado",
                logradouro:
                    data.logradouro || "Não informado",
                bairro:
                    data.bairro || "Não informado",
                cnaes_secundarios:
                    data.cnaes_secundarios || [],
            });

            setShowModal(true);

            toast.success(
                "CNPJ consultado com sucesso!"
            );
        } catch {
            toast.error(
                "Erro ao consultar CNPJ"
            );
        } finally {
            setLoading(false);
        }
    }

    const formatCnpjDisplay = (cnpj: string) => {
        if (!cnpj || cnpj === "Não informado") {
            return cnpj;
        }

        return cnpj.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
        );
    };

    const formatCodigoNaturezaJuridica = (
        codigo: string | number
    ) => {
        if (
            !codigo ||
            codigo === "Não informado"
        ) {
            return codigo;
        }

        return String(codigo).replace(
            /^(\d{3})(\d)$/,
            "$1-$2"
        );
    };

    const formatTelefone = (
        telefone: string
    ) => {
        if (
            !telefone ||
            telefone === "Não informado"
        ) {
            return telefone;
        }

        return telefone.replace(
            /^(\d{2})(\d{4})(\d{4})$/,
            "($1) $2-$3"
        );
    };

    // COPIAR CNPJ
    const copiarCnpj = async () => {
        if (!company?.cnpj) {
            toast.error(
                "CNPJ não disponível"
            );
            return;
        }

        try {
            await navigator.clipboard.writeText(
                company.cnpj
            );

            setCopied(true);

            toast.success(
                "CNPJ copiado para a área de transferência!"
            );

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            toast.error(
                "Não foi possível copiar o CNPJ"
            );
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white">

            <HeaderConsulta />

            <main className="flex items-center justify-center px-6 py-16">

                <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-4xl p-10 shadow-2xl">

                    {/* HEADER */}
                    <div className="text-center mb-8">

                        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">

                            <Building2
                                size={38}
                                className="text-black"
                            />

                        </div>

                        <h1 className="text-4xl font-black">
                            Consulta CNPJ
                        </h1>

                        <p className="text-zinc-400 mt-3">
                            Consulte informações de
                            empresas em segundos.
                        </p>

                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            value={cnpj}
                            onChange={(e) =>
                                setCnpj(
                                    formatCnpj(
                                        e.target.value
                                    )
                                )
                            }
                            placeholder="00.000.000/0000-00"
                            className="w-full h-14 rounded-2xl bg-zinc-800 border border-zinc-700 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >

                            <Search size={20} />

                            {loading
                                ? "Consultando..."
                                : "Consultar CNPJ"}

                        </button>

                    </form>

                </div>

            </main>

            {/* MODAL */}
            {showModal && company && (

                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 z-50">

                    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">

                        {/* MODAL HEADER */}
                        <div className="flex justify-between items-center p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Dados da Empresa
                                </h2>

                                <p className="text-zinc-400 text-sm">
                                    Informações obtidas através
                                    da consulta do CNPJ
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setCopied(false);
                                }}
                                className="p-2 rounded-xl hover:bg-zinc-800 transition-colors"
                                aria-label="Fechar"
                            >
                                <X size={22} />
                            </button>

                        </div>

                        {/* CONTENT */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-90px)]">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <InfoCard
                                    title="Razão Social"
                                    value={company.nome}
                                />

                                <InfoCard
                                    title="Nome Fantasia"
                                    value={company.fantasia}
                                />

                                {/* CNPJ COM BOTÃO COPIAR */}
                                <div className="bg-zinc-800/80 border border-zinc-700 rounded-2xl p-4 hover:border-emerald-500/30 transition-colors">

                                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                        CNPJ
                                    </p>

                                    <div className="flex items-center justify-between gap-3">

                                        <p className="font-medium text-zinc-100 wrap-break-word">
                                            {company.cnpj ||
                                                "Não informado"}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={copiarCnpj}
                                            title={
                                                copied
                                                    ? "CNPJ copiado"
                                                    : "Copiar CNPJ"
                                            }
                                            aria-label={
                                                copied
                                                    ? "CNPJ copiado"
                                                    : "Copiar CNPJ"
                                            }
                                            className={`
                                                shrink-0
                                                w-10
                                                h-10
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                transition-all
                                                duration-200
                                                active:scale-90
                                                ${
                                                    copied
                                                        ? "bg-emerald-500 text-black"
                                                        : "bg-zinc-700 text-zinc-300 hover:bg-emerald-500 hover:text-black"
                                                }
                                            `}
                                        >
                                            {copied ? (
                                                <Check size={18} />
                                            ) : (
                                                <Copy size={18} />
                                            )}
                                        </button>

                                    </div>

                                </div>

                                <InfoCard
                                    title="Situação"
                                    value={company.situacao}
                                />

                                <InfoCard
                                    title="Telefone"
                                    value={company.telefone}
                                />

                                <InfoCard
                                    title="E-mail"
                                    value={company.email}
                                />

                                <InfoCard
                                    title="Cidade"
                                    value={`${company.municipio}/${company.uf}`}
                                />

                                <InfoCard
                                    title="Bairro"
                                    value={company.bairro}
                                />

                                <InfoCard
                                    title="Logradouro"
                                    value={company.logradouro}
                                />

                                <InfoCard
                                    title="Número"
                                    value={company.numero}
                                />

                                <InfoCard
                                    title="Natureza Jurídica"
                                    value={`${company.codigo_natureza_juridica} - ${company.natureza_juridica}`}
                                />

                            </div>

                            {/* CAMPOS GRANDES */}
                            <div className="mt-4 space-y-4">

                                <InfoCard
                                    title="Atividade Principal"
                                    value={`${company.cnae_fiscal} - ${company.cnae_fiscal_descricao}`}
                                />

                                {/* CNAES SECUNDÁRIOS */}
                                <div className="bg-zinc-800 rounded-2xl p-4">

                                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-3">
                                        CNAEs Secundários
                                    </p>

                                    {company.cnaes_secundarios.length > 0 ? (

                                        <div className="space-y-2 max-h-72 overflow-y-auto pr-2">

                                            {company.cnaes_secundarios.map(
                                                (cnae) => (

                                                    <div
                                                        key={cnae.codigo}
                                                        className="bg-zinc-900/70 border border-zinc-700 rounded-xl p-3"
                                                    >

                                                        <p className="text-sm font-semibold text-emerald-400">
                                                            {cnae.codigo}
                                                        </p>

                                                        <p className="text-sm text-zinc-300 mt-1">
                                                            {cnae.descricao}
                                                        </p>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <p className="font-semibold">
                                            Não informado
                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

/* INFO CARD */
function InfoCard({
    title,
    value,
}: {
    title: string;
    value: string;
}) {

    return (
        <div className="bg-zinc-800/80 border border-zinc-700 rounded-2xl p-4 hover:border-emerald-500/30 transition-colors">

            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
                {title}
            </p>

            <p className="font-medium wrap-break-word text-zinc-100">
                {value || "Não informado"}
            </p>

        </div>
    );
}